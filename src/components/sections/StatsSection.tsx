'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { stats } from '@/content/testimonials'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="display-font text-5xl md:text-6xl font-bold text-gradient">
      {n}
      <span className="text-accent-2">{suffix}</span>
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-20 border-y border-fg/[0.06]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
        {stats.map((s) => (
          <div key={s.label} className="stat-cell relative text-center px-4">
            <Counter value={s.value} suffix={s.suffix} />
            <div className="mono-font text-[10px] uppercase tracking-[0.25em] text-fg/35 mt-3">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
