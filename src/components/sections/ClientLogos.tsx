import Image from 'next/image'
import type { ClientLogo } from '@/types/content'
import { getClientLogos } from '@/lib/content'

function Item({ c }: { c: ClientLogo }) {
  const inner = c.logo ? (
    <span className="logo-chip block">
      <Image
        src={c.logo}
        alt={c.name}
        width={480}
        height={240}
        quality={90}
        sizes="240px"
        className="h-20 md:h-24 w-auto max-w-[180px] md:max-w-[240px] object-contain transition-transform duration-300 group-hover/logo:scale-105"
      />
    </span>
  ) : (
    <span className="display-font text-lg md:text-xl font-semibold text-fg/35 whitespace-nowrap transition-colors group-hover/logo:text-fg">
      {c.name}
    </span>
  )

  const cls = 'group/logo flex items-center justify-center min-h-14 px-1 shrink-0'
  return c.url ? (
    <a href={c.url} target="_blank" rel="noopener noreferrer" title={c.name} className={cls}>
      {inner}
    </a>
  ) : (
    <div title={c.name} className={cls}>
      {inner}
    </div>
  )
}

/** Infinite left → right strip of client logos (managed at /admin → Client Logos). */
export default async function ClientLogos({ className = '' }: { className?: string }) {
  const logos = await getClientLogos()
  if (logos.length === 0) return null

  const duration = Math.max(20, logos.length * 5)

  // Two identical groups, each at least a full screen wide: the loop is seamless
  // and a logo never shows up twice on screen at the same time.
  const group = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 min-w-[100vw] items-center justify-around gap-10 md:gap-16 px-5 md:px-8"
    >
      {logos.map((c, i) => (
        <Item key={i} c={c} />
      ))}
    </div>
  )

  return (
    <section aria-label="Our clients" className={`py-8 overflow-hidden ${className}`}>
      <p className="mono-font text-[10px] uppercase tracking-[0.3em] text-fg/35 text-center mb-5">
        Trusted by growing businesses
      </p>
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track marquee-reverse py-2" style={{ animationDuration: `${duration}s` }}>
          {group(false)}
          {group(true)}
        </div>
      </div>
    </section>
  )
}
