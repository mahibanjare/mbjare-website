'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// three.js is heavy — load it in its own chunk, client-only, after paint.
const EngineScene = dynamic(() => import('./EngineScene'), { ssr: false })

export default function Scene3D() {
  const [show, setShow] = useState(false)
  const [lowPower, setLowPower] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setLowPower(window.matchMedia('(max-width: 768px)').matches)
    // Defer mounting past first paint so LCP is unaffected.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    const start = () => setShow(true)
    const idle = w.requestIdleCallback
      ? w.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 300)
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(idle)
      else window.clearTimeout(idle)
    }
  }, [])

  if (!show) return null
  return <EngineScene lowPower={lowPower} />
}
