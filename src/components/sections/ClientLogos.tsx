import Image from 'next/image'
import type { ClientLogo } from '@/types/content'
import { getClientLogos } from '@/lib/content'

function Item({ c }: { c: ClientLogo }) {
  const inner = c.logo ? (
    // Uploaded logos are mostly square with a light background and built-in padding,
    // so show them on a white tile and zoom in slightly to trim that padding
    <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white overflow-hidden border border-fg/[0.08] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover/logo:scale-105">
      <Image
        src={c.logo}
        alt={c.name}
        fill
        quality={90}
        sizes="(max-width: 768px) 112px, 144px"
        className="object-contain scale-[1.12]"
      />
    </div>
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
          className="marquee-track marquee-reverse items-center gap-6 md:gap-10 pr-6 md:pr-10 py-3"
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
