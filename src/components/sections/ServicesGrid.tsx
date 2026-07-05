import Image from 'next/image'
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
            className="glass-card spotlight-card overflow-hidden flex flex-col h-full group transition-transform duration-300"
          >
            {/* Premium image banner */}
            <div className="relative h-40 overflow-hidden">
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Teal tint + fade into card body */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/45 to-transparent" />
              <div className="absolute inset-0 bg-accent/15 mix-blend-multiply" />
              {/* Floating icon */}
              <div className="absolute bottom-3 left-4 w-11 h-11 rounded-2xl bg-bg/70 backdrop-blur-md border border-accent-3/25 flex items-center justify-center text-accent-2 transition-all duration-300 group-hover:bg-accent group-hover:text-[#021014] group-hover:border-accent group-hover:shadow-[0_8px_24px_var(--glow)]">
                <Icon name={s.icon} size={19} />
              </div>
              {s.badge && (
                <span className="absolute top-3 right-3 mono-font text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-accent-3/25 text-accent-2 bg-bg/70 backdrop-blur-md">
                  {s.badge}
                </span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
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
            </div>
          </SpotlightLink>
        </FadeUp>
      ))}
    </div>
  )
}
