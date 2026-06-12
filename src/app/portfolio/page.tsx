import type { Metadata } from 'next'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/content/projects'
import CTA from '@/components/sections/CTA'
import { FadeUp } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Portfolio — Real Client Work',
  description:
    'Live client websites, brand identities and ad campaigns: SR Petrochemicals, BPS Godhi, Ankita Beauty Salon, Grafiya and more.',
}

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-40 pb-16 hero-glow">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="anim-rise">
            <div className="section-tag mx-auto w-fit mb-6">Our Work</div>
            <h1 className="display-font text-[clamp(2.5rem,6vw,72px)] font-bold text-fg mb-6 leading-tight">
              Real clients. <span className="text-outline">Live results.</span>
            </h1>
            <p className="text-fg/45 text-lg max-w-2xl mx-auto">
              Every project below is live on the internet right now — websites, brands and
              campaigns we&apos;ve built for real businesses. Click through and see for yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <FadeUp key={p.title} index={i % 2}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 flex flex-col h-full group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="mono-font text-[10px] uppercase tracking-[0.25em] text-fg/35 border border-fg/10 rounded-full px-3 py-1.5">
                    {p.category}
                  </span>
                  <span className="mono-font text-xs text-fg/25">{p.year}</span>
                </div>

                <h2 className="display-font text-2xl font-bold text-fg mb-3 flex items-center gap-2.5">
                  {p.title}
                  <ExternalLink size={16} className="text-fg/30 group-hover:text-fg transition-colors" />
                </h2>
                <p className="text-fg/45 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>

                <div className="space-y-2 mb-6">
                  {p.deliverables.map((d) => (
                    <div key={d} className="flex items-center gap-2.5 text-sm text-fg/55">
                      <span className="w-1 h-1 rounded-full bg-accent-2" /> {d}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-fg/[0.07]">
                  <div className="flex gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="mono-font text-[10px] uppercase tracking-wider text-fg/30">
                        #{t}
                      </span>
                    ))}
                  </div>
                  {p.url && (
                    <span className="mono-font text-[10px] uppercase tracking-wider text-fg/40 group-hover:text-fg transition-colors">
                      {p.url.replace('https://', '')}
                    </span>
                  )}
                </div>
              </a>
            </FadeUp>
          ))}
        </div>
      </section>

      <CTA />
    </>
  )
}
