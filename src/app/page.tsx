import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/sections/Hero'
import PackagesSection from '@/components/sections/PackagesSection'
import StatsSection from '@/components/sections/StatsSection'
import WhyUs from '@/components/sections/WhyUs'
import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import FaqTeaser from '@/components/sections/FaqTeaser'
import FounderNote from '@/components/sections/FounderNote'
import CTA from '@/components/sections/CTA'
import { FadeUp } from '@/components/motion'

const marqueeItems = [
  'Websites', 'Branding', 'Creative Posts & Reels', 'Business Automation',
  'Admin Panels', 'Google Business', 'QR Ordering', 'Meta Ads', 'Dashboards',
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Editorial ticker */}
      <div className="py-5 border-b border-fg/[0.08] overflow-hidden">
        <div className="marquee-track gap-12">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="display-font italic text-sm text-fg/35 whitespace-nowrap flex items-center gap-12">
              {item} <span className="text-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>

      <StatsSection />

      {/* Packages preview */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="kicker mb-3">01 · What We Do</div>
              <h2 className="display-font text-4xl md:text-6xl font-semibold text-fg max-w-2xl">
                Packages built around <span className="text-outline">your business</span>
              </h2>
              <p className="text-fg/40 text-sm mt-4 max-w-lg">
                Every package mirrors a project we&apos;ve already delivered — click the live
                proof on any card and see it running.
              </p>
            </div>
            <Link href="/services" className="btn-ghost text-sm whitespace-nowrap">
              Packages & Services <ArrowRight size={14} />
            </Link>
          </FadeUp>
          <PackagesSection />
        </div>
      </section>

      <WhyUs />
      <Process />
      <Testimonials />
      <FaqTeaser />
      <FounderNote />
      <CTA />
    </>
  )
}
