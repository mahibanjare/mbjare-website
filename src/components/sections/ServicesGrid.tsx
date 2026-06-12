import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/content/services'
import { FadeUp } from '@/components/motion'
import Icon from '@/components/ui/Icon'

export default function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {list.map((s, i) => (
        <FadeUp key={s.slug} index={i % 3}>
          <Link href={`/services/${s.slug}`} className="glass-card p-7 flex flex-col h-full group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-fg/[0.04] border border-fg/10 flex items-center justify-center group-hover:bg-accent group-hover:text-fg text-fg transition-all duration-300">
                <Icon name={s.icon} size={20} />
              </div>
              {s.badge && (
                <span className="mono-font text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-fg/20 text-fg/70 bg-fg/[0.05]">
                  {s.badge}
                </span>
              )}
            </div>
            <h3 className="display-font font-semibold text-fg text-lg mb-2">{s.title}</h3>
            <p className="text-fg/40 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="mono-font text-fg/35">{s.price}</span>
              <span className="flex items-center gap-1 text-fg/50 group-hover:text-fg transition-colors">
                Details <ArrowUpRight size={12} />
              </span>
            </div>
          </Link>
        </FadeUp>
      ))}
    </div>
  )
}
