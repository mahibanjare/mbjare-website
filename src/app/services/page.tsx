import type { Metadata } from 'next'
import ServicesGrid from '@/components/sections/ServicesGrid'
import CTA from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'Services — AI, Web, Apps & Automation',
  description:
    'AI chatbots, websites, apps, WhatsApp automation, branding, Meta ads and more. Future-proof digital services with transparent pricing.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-16 hero-glow">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="anim-rise">
            <div className="section-tag mx-auto w-fit mb-6">Our Services</div>
            <h1 className="display-font text-[clamp(2.5rem,6vw,72px)] font-bold text-fg mb-6 leading-tight">
              Future-proof services.
              <br />
              <span className="text-outline">Transparent pricing.</span>
            </h1>
            <p className="text-fg/45 text-lg max-w-2xl mx-auto">
              From AI chatbots to full digital ecosystems — every service is built to
              compound your growth, not just tick a box.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <ServicesGrid />
        </div>
      </section>

      <CTA />
    </>
  )
}
