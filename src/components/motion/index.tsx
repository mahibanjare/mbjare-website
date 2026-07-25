'use client'

import { LazyMotion, domAnimation, m, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>
}

const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: i * 0.08 },
  }),
}

export function FadeUp({
  children,
  index = 0,
  className,
  once = true,
}: {
  children: ReactNode
  index?: number
  className?: string
  once?: boolean
}) {
  return (
    <m.div
      className={className}
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
    >
      {children}
    </m.div>
  )
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {children}
    </m.div>
  )
}

/* Gentle infinite bob — ds hero-logo float, framer-motion edition */
export function FloatY({
  children,
  className,
  amplitude = 9,
  duration = 7,
}: {
  children: ReactNode
  className?: string
  amplitude?: number
  duration?: number
}) {
  const reduced = useReducedMotion()
  return (
    <m.div
      className={className}
      animate={reduced ? undefined : { y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </m.div>
  )
}

export { m }
