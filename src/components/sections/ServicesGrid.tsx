import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getServices } from '@/lib/content'
import { FadeUp } from '@/components/motion'

/* Editorial numbered index — services as full-width rows, not cards. */
export default async function ServicesGrid({ limit }: { limit?: number }) {
  const services = await getServices()
  const list = limit ? services.slice(0, limit) : services
  return (
    <div className="border-t border-fg/10">
      {list.map((s, i) => (
        <FadeUp key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            className="group grid sm:grid-cols-[96px_1fr_auto] gap-3 sm:gap-8 sm:items-center py-8 sm:py-9 px-2 sm:px-4 border-b border-fg/10 transition-colors duration-300 hover:bg-bg-2"
          >
            <span className="display-font italic text-fg/30 text-lg leading-none pt-1.5 sm:pt-0">
              ( {String(i + 1).padStart(2, '0')} )
            </span>

            <span className="min-w-0">
              <span className="flex items-center gap-3 flex-wrap">
                <h3 className="display-font text-2xl md:text-[32px] font-semibold text-fg leading-snug transition-colors group-hover:text-accent">
                  {s.title}
                </h3>
                {s.badge && (
                  <span className="mono-font text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border border-gold/40 text-gold">
                    {s.badge}
                  </span>
                )}
              </span>
              <p className="text-fg/45 text-sm leading-relaxed max-w-2xl mt-2">{s.desc}</p>
            </span>

            <span className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-3">
              <span className="mono-font text-xs text-fg/50 whitespace-nowrap">{s.price}</span>
              <span className="w-10 h-10 rounded-full border border-fg/15 flex items-center justify-center text-fg/40 transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-[#fffdf8]">
                <ArrowUpRight size={16} />
              </span>
            </span>
          </Link>
        </FadeUp>
      ))}
    </div>
  )
}
