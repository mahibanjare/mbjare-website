'use client'

import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'

/** Tracks the cursor inside the card and exposes its position as CSS vars
 *  (--mx / --my) so `.spotlight-card::before` can render a glow that follows it. */
function handleMove(e: MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export function SpotlightLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  return (
    <Link href={href} className={className} onMouseMove={handleMove}>
      {children}
    </Link>
  )
}

export function SpotlightDiv({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className} onMouseMove={handleMove}>
      {children}
    </div>
  )
}
