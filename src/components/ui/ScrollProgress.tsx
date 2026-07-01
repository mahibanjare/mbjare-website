'use client'

import { useScroll, useSpring, m } from 'framer-motion'

/** Slim teal bar across the top that fills as the page scrolls. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return <m.div className="scroll-progress" style={{ scaleX }} aria-hidden />
}
