import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { faqs, site } from '@/content/site'
import { breadcrumbSchema, faqSchema, graph } from '@/lib/seo'
import { FadeUp } from '@/components/motion'

export const metadata: Metadata = {
  title: 'FAQ — Pricing, Timelines & How We Work',
  description:
    'Answers about Mbjare InfoTech: pricing, delivery timelines, AI chatbots, WhatsApp automation, and working with us across Raipur and Pan-India.',
  alternates: { canonical: '/faq' },
}

const jsonLd = graph(
  faqSchema(faqs),
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'FAQ', path: '/faq' },
  ]),
)

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-40 pb-12 hero-glow">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="anim-rise">
            <div className="section-tag mx-auto w-fit mb-6">FAQ</div>
            <h1 className="display-font text-[clamp(2.5rem,6vw,64px)] font-bold text-fg mb-5 leading-tight">
              Questions, <span className="text-outline">answered</span>
            </h1>
            <p className="text-fg/45 text-lg max-w-xl mx-auto">
              Everything about pricing, timelines and how {site.name} works. Still unsure?
              WhatsApp us — we reply within 2 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FadeUp key={f.q} index={i}>
                <details className="glass-card group">
                  <summary className="p-5 cursor-pointer list-none flex items-center justify-between text-fg font-medium text-sm">
                    {f.q}
                    <span className="text-fg/30 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                  </summary>
                  <p className="px-5 pb-5 text-fg/45 text-sm leading-relaxed">{f.a}</p>
                </details>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Link href="/contact" className="btn-primary">
            Still have a question? Talk to us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
