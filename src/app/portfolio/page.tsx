import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'
import { getProjects } from '@/lib/content'
import CTA from '@/components/sections/CTA'
import ClientLogos from '@/components/sections/ClientLogos'
import { FadeUp } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Portfolio — Real Client Work',
  description:
    'Live client websites, brand identities and ad campaigns: Dharshakti Sweets & Restaurant, SR Petrochemicals, Bright Public School Godhi, Ankita Beauty Salon, Grafiya and more.',
  alternates: { canonical: '/portfolio' },
}

export default async function PortfolioPage() {
  const projects = await getProjects()
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

      <ClientLogos className="mb-12 border-y border-fg/[0.08]" />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 space-y-20 md:space-y-28">
          {projects.map((p, i) => {
            const flip = i % 2 === 1
            const host = p.url?.replace(/^https?:\/\//, '').replace(/\/$/, '')
            return (
              <FadeUp key={p.title}>
                <article className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Screenshot in a browser frame — shown at or below its native size so it stays sharp */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${p.title} live website`}
                    className={`lg:col-span-7 group block ${flip ? 'lg:order-2' : ''}`}
                  >
                    <div className="rounded-2xl overflow-hidden border border-fg/10 bg-bg-2 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)]">
                      <div className="flex items-center gap-3 px-4 h-9 border-b border-fg/[0.08] bg-fg/[0.03]">
                        <span className="flex gap-1.5 shrink-0" aria-hidden>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                        </span>
                        {host && (
                          <span className="mono-font text-[10px] text-fg/40 truncate mx-auto px-3 py-0.5 rounded-md bg-fg/[0.05] max-w-[70%]">
                            {host}
                          </span>
                        )}
                      </div>
                      <div className="relative aspect-[16/10] bg-fg/[0.04]">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={`${p.title} — live website`}
                            fill
                            quality={90}
                            priority={i === 0}
                            sizes="(max-width: 1024px) 100vw, 740px"
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center display-font text-3xl text-fg/20">
                            {p.title}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>

                  {/* Details */}
                  <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="display-font italic text-accent text-lg">{String(i + 1).padStart(2, '0')}</span>
                      <span className="h-px w-8 bg-fg/15" />
                      <span className="mono-font text-[10px] uppercase tracking-[0.25em] text-fg/45 border border-fg/10 rounded-full px-3 py-1.5">
                        {p.category}
                      </span>
                      {p.year && <span className="mono-font text-xs text-fg/30 ml-auto">{p.year}</span>}
                    </div>

                    <h2 className="display-font text-3xl md:text-4xl font-bold text-fg leading-tight mb-4">{p.title}</h2>
                    <p className="text-fg/55 text-[15px] leading-relaxed mb-6">{p.desc}</p>

                    {p.deliverables.length > 0 && (
                      <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5 mb-6">
                        {p.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-fg/70">
                            <Check size={15} className="text-accent mt-0.5 shrink-0" /> {d}
                          </li>
                        ))}
                      </ul>
                    )}

                    {p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-7">
                        {p.tags.map((t) => (
                          <span key={t} className="mono-font text-[10px] uppercase tracking-wider text-fg/45 bg-fg/[0.04] rounded-full px-2.5 py-1">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}

                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary !py-2.5 !px-5 text-sm">
                        Visit live website <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </article>
              </FadeUp>
            )
          })}
        </div>
      </section>

      <CTA />
    </>
  )
}
