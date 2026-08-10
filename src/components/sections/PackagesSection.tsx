import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, IndianRupee } from 'lucide-react'
import { getPackages } from '@/lib/content'
import { FadeUp } from '@/components/motion'
import Icon from '@/components/ui/Icon'

export default async function PackagesSection() {
  const packages = await getPackages()
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {packages.map((p, i) => {
        const flagship = p.badge === 'FLAGSHIP'
        return (
          <FadeUp key={p.slug} index={i % 2} className={flagship ? 'lg:col-span-2' : ''}>
            <div
              className={`glass-card h-full p-7 sm:p-8 flex flex-col group transition-transform duration-300 ${
                flagship ? 'border-gold/25 lg:flex-row lg:gap-10' : ''
              }`}
            >
              <div className={flagship ? 'lg:flex-1' : ''}>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="icon-tile w-12 h-12 transition-all duration-300 group-hover:bg-accent group-hover:text-[#fffdf8] group-hover:shadow-[0_8px_24px_var(--glow)]">
                    <Icon name={p.icon} size={20} />
                  </div>
                  {p.badge && (
                    <span className="mono-font text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border border-gold/40 text-gold">
                      {p.badge}
                    </span>
                  )}
                </div>

                <h3 className="display-font font-bold text-fg text-2xl mb-1.5">{p.name}</h3>
                <p className="display-font text-fg/55 mb-4">{p.tagline}</p>
                <p className="text-fg/40 text-sm leading-relaxed mb-5">
                  <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-accent-2 mr-2">For</span>
                  {p.forWho}
                </p>

                {/* Includes */}
                <ul className="space-y-2.5 mb-5">
                  {p.includes.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-fg/65">
                      <CheckCircle2 size={15} className="text-accent-2 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Outcome */}
                <p className="text-fg/70 text-sm leading-relaxed border-l-2 border-accent-2 pl-4 mb-6">
                  {p.outcome}
                </p>
              </div>

              <div className={flagship ? 'lg:w-80 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center' : 'mt-auto'}>
                {/* Live proof */}
                <a
                  href={p.proof.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-3.5 flex items-center gap-3.5 mb-6 group/proof hover:border-fg/25 transition-colors"
                >
                  {p.proof.image && (
                    <Image
                      src={p.proof.image}
                      alt={p.proof.client}
                      width={72}
                      height={48}
                      className="rounded-lg object-cover w-[72px] h-12 flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="mono-font text-[9px] uppercase tracking-[0.2em] text-gold mb-1">
                      Live proof
                    </div>
                    <div className="text-fg text-sm font-medium truncate">{p.proof.client}</div>
                    <div className="text-fg/40 text-xs truncate">{p.proof.note}</div>
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="text-fg/30 flex-shrink-0 transition-transform group-hover/proof:translate-x-0.5 group-hover/proof:-translate-y-0.5"
                  />
                </a>

                {/* Price + CTA */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm mb-5">
                  <span className="flex items-center gap-1.5 text-fg">
                    <IndianRupee size={14} className="text-fg/40" />
                    {p.price}
                  </span>
                  <span className="flex items-center gap-1.5 text-fg/45">
                    <Clock size={14} className="text-fg/30" />
                    {p.timeline}
                  </span>
                  {p.priceNote && (
                    <span className="mono-font text-[10px] text-fg/35 line-through">{p.priceNote}</span>
                  )}
                </div>
                <Link href="/contact" className="btn-primary w-fit text-sm">
                  Get This Package <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </FadeUp>
        )
      })}
    </div>
  )
}
