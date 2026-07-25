import { ArrowUpRight } from 'lucide-react'
import { services } from '@/content/services'
import { FadeUp } from '@/components/motion'
import Icon from '@/components/ui/Icon'
import { SpotlightLink } from '@/components/ui/Spotlight'

export default function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {list.map((s, i) => (
        <FadeUp key={s.slug} index={i % 3}>
          <SpotlightLink
            href={`/services/${s.slug}`}
            className="glass-card spotlight-card flex flex-col h-full group transition-transform duration-300 p-7"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="icon-tile w-12 h-12 transition-all duration-300 group-hover:bg-accent group-hover:text-[#021014] group-hover:shadow-[0_8px_24px_var(--glow)]">
                <Icon name={s.icon} size={20} />
              </div>
              {s.badge && (
                <span className="mono-font text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border border-gold/40 text-gold">
                  {s.badge}
                </span>
              )}
            </div>

            <h3 className="display-font font-semibold text-fg text-lg mb-2 transition-colors group-hover:text-accent-2">
              {s.title}
            </h3>
            <p className="text-fg/40 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
            <div className="flex items-center justify-between text-xs pt-4 border-t border-fg/[0.06]">
              <span className="mono-font text-fg/35">{s.price}</span>
              <span className="flex items-center gap-1 font-medium text-accent-2 group-hover:gap-2 transition-all">
                Details
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </SpotlightLink>
        </FadeUp>
      ))}
    </div>
  )
}
