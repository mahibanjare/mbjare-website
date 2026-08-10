import type { Metadata } from 'next'
import ServicesGrid from '@/components/sections/ServicesGrid'
import PackagesSection from '@/components/sections/PackagesSection'
import CTA from '@/components/sections/CTA'
import { FadeUp } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Packages & Services — Built Around Your Business',
  description:
    'Five growth packages proven on real clients — brand launch, rebrand, online ordering, local growth and business automation. Plus individual services with transparent pricing.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-16 hero-glow">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="anim-rise">
            <div className="section-tag mx-auto w-fit mb-6">Packages & Services</div>
            <h1 className="display-font text-[clamp(2.5rem,6vw,72px)] font-bold text-fg mb-6 leading-tight">
              Built around your business.
              <br />
              <span className="text-outline">Not our menu.</span>
            </h1>
            <p className="text-fg/45 text-lg max-w-2xl mx-auto">
              Five packages. Five real clients. Five live proofs you can click and
              verify — each one solves a different stage of your business.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <PackagesSection />
          <FadeUp>
            <p className="text-center text-fg/40 text-sm mt-8">
              Every package is customizable — book a free strategy call and we&apos;ll shape it
              around your business.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-12">
            <div className="kicker mb-3">Prefer one thing at a time?</div>
            <h2 className="display-font text-4xl md:text-6xl font-semibold text-fg max-w-3xl">
              For businesses that refuse to look <span className="text-outline">ordinary.</span>
            </h2>
            <p className="text-fg/45 text-base mt-4">
              Individual services. Transparent pricing. No retainers required.
            </p>
          </FadeUp>
          <ServicesGrid />
        </div>
      </section>

      <CTA />
    </>
  )
}
