import Image from 'next/image'
import type { ClientLogo } from '@/types/content'
import { getClientLogos } from '@/lib/content'

function Item({ c }: { c: ClientLogo }) {
  const inner = c.logo ? (
    <Image
      src={c.logo}
      alt={c.name}
      width={180}
      height={56}
      quality={90}
      className="h-10 md:h-12 w-auto max-w-[160px] object-contain grayscale opacity-60 transition-all duration-300 group-hover/logo:grayscale-0 group-hover/logo:opacity-100"
    />
  ) : (
    <span className="display-font text-lg md:text-xl font-semibold text-fg/35 whitespace-nowrap transition-colors group-hover/logo:text-fg">
      {c.name}
    </span>
  )

  const cls = 'group/logo flex items-center justify-center h-14 px-2 shrink-0'
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

  // Repeat short lists so one half of the track is wider than the screen
  const base: ClientLogo[] = []
  while (base.length < 10) base.push(...logos)
  const duration = Math.max(24, base.length * 4)

  return (
    <section aria-label="Our clients" className={`py-8 overflow-hidden ${className}`}>
      <p className="mono-font text-[10px] uppercase tracking-[0.3em] text-fg/35 text-center mb-5">
        Trusted by growing businesses
      </p>
      <div className="marquee-mask overflow-hidden">
        <div
          className="marquee-track marquee-reverse items-center gap-14 md:gap-20 pr-14 md:pr-20"
          style={{ animationDuration: `${duration}s` }}
        >
          {[...base, ...base].map((c, i) => (
            <Item key={i} c={c} />
          ))}
        </div>
      </div>
    </section>
  )
}
