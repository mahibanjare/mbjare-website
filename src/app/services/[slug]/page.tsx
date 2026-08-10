import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, Clock, IndianRupee } from 'lucide-react'
import { services as localServices } from '@/content/services'
import { getServices, getService, getRelatedServices } from '@/lib/content'
import { breadcrumbSchema, graph, serviceSchema } from '@/lib/seo'
import CTA from '@/components/sections/CTA'
import Icon from '@/components/ui/Icon'
import { FadeUp } from '@/components/motion'

export function generateStaticParams() {
  return localServices.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)
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
  const service = await getService(slug)
  if (!service) notFound()

  const [related, allServices] = await Promise.all([
    getRelatedServices(service),
    getServices(),
  ])

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
            {/* Editorial typographic hero — no stock imagery */}
            <div className="flex items-center gap-4 mb-8">
              <div className="icon-tile w-14 h-14">
                <Icon name={service.icon} size={24} />
              </div>
              {service.badge && (
                <span className="mono-font text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-gold/40 text-gold">
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

            {/* Owner-uploaded image (admin panel) — stock imagery stays hidden */}
            {service.image && !service.image.includes('unsplash.com') && (
              <div className="shot-frame max-w-2xl mt-12">
                <div className="shot-bar" aria-hidden><i /><i /><i /></div>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={860}
                  height={480}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            )}
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

      {/* Related services */}
      <section className="py-20 border-t border-fg/[0.06]">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="display-font text-2xl font-bold text-fg mb-3">Works great with</h2>
          <p className="text-fg/40 text-sm mb-8">
            Most clients combine {service.title.toLowerCase()} with these:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="glass-card p-5 group transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="icon-tile w-9 h-9">
                    <Icon name={s.icon} size={16} />
                  </div>
                  <span className="display-font font-semibold text-fg text-sm group-hover:text-accent-2 transition-colors">
                    {s.title}
                  </span>
                </div>
                <p className="text-fg/40 text-xs leading-relaxed line-clamp-2">{s.desc}</p>
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {allServices
              .filter((s) => s.slug !== service.slug && !(service.related ?? []).includes(s.slug))
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
