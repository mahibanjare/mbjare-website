import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, Clock, IndianRupee } from 'lucide-react'
import { services, getService } from '@/content/services'
import { breadcrumbSchema, graph, serviceSchema } from '@/lib/seo'
import CTA from '@/components/sections/CTA'
import Icon from '@/components/ui/Icon'
import { FadeUp } from '@/components/motion'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: `${service.title} — ${service.price}`,
    description: service.desc,
    alternates: { canonical: `/services/${slug}` },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const jsonLd = graph(
    serviceSchema(service),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-40 pb-20 hero-glow">
        <div className="max-w-5xl mx-auto px-6">
          <div className="anim-rise">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-fg/[0.05] border border-fg/12 flex items-center justify-center text-fg">
                <Icon name={service.icon} size={24} />
              </div>
              {service.badge && (
                <span className="mono-font text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-fg/20 text-fg/70 bg-fg/[0.05]">
                  {service.badge}
                </span>
              )}
            </div>
            <h1 className="display-font text-[clamp(2.4rem,5.5vw,64px)] font-bold text-fg leading-tight mb-4">
              {service.title}
            </h1>
            <p className="display-font text-xl text-fg/55 mb-6">{service.subtitle}</p>
            <p className="text-fg/45 text-lg max-w-2xl leading-relaxed mb-6">{service.desc}</p>

            {/* Answer-first summary — one extractable sentence with the key
                facts (what, who, where, price, speed) for AI answer engines. */}
            <p className="text-fg/70 text-base max-w-2xl leading-relaxed mb-10 border-l-2 border-accent-2 pl-4">
              <strong className="text-fg font-semibold">In short:</strong> Mbjare InfoTech provides{' '}
              {service.title.toLowerCase()} for small and medium businesses across Chhattisgarh and
              across India, with pricing at {service.price} and typical delivery in {service.timeline}.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="glass-card px-5 py-3 flex items-center gap-2.5 text-sm">
                <IndianRupee size={15} className="text-fg/40" />
                <span className="text-fg">{service.price}</span>
              </div>
              <div className="glass-card px-5 py-3 flex items-center gap-2.5 text-sm">
                <Clock size={15} className="text-fg/40" />
                <span className="text-fg">{service.timeline}</span>
              </div>
            </div>

            <Link href="/contact" className="btn-primary">
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-fg/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <h2 className="display-font text-3xl font-bold text-fg mb-10">
              What&apos;s included
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-4">
            {service.features.map((f, i) => (
              <FadeUp key={f} index={i % 2}>
                <div className="glass-card p-5 flex items-center gap-3.5">
                  <CheckCircle2 size={17} className="text-accent-2 flex-shrink-0" />
                  <span className="text-fg/65 text-sm">{f}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-20 border-t border-fg/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="display-font text-2xl font-bold text-fg mb-8">Explore other services</h2>
          <div className="flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="px-4 py-2.5 text-sm text-fg/50 border border-fg/10 rounded-full hover:text-fg hover:border-fg/35 transition-all"
                >
                  {s.title}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
