'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id: string) => void
    }
    __turnstileLoaded?: boolean
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

export default function TurnstileWidget({
  onVerify,
  onExpire,
}: {
  onVerify: (token: string) => void
  onExpire?: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return
      if (widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        theme: 'auto',
        callback: onVerify,
        'expired-callback': () => onExpire?.(),
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
      if (!script) {
        script = document.createElement('script')
        script.src = SCRIPT_SRC
        script.async = true
        document.head.appendChild(script)
      }
      script.addEventListener('load', renderWidget)
    }

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef} className="flex justify-center min-h-[65px]" />
}
