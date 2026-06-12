import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import StatsSection from '@/components/sections/StatsSection'
import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import { FadeUp } from '@/components/motion'

const marqueeItems = [
  'AI Chatbots', 'Websites', 'Apps', 'WhatsApp Automation', 'Branding',
  'Meta Ads', 'Sheet Automation', 'AI Workflows', 'Local SEO', 'Dashboards',
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Marquee strip */}
      <div className="py-6 border-b border-fg/[0.06] overflow-hidden">
        <div className="marquee-track gap-12">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mono-font text-xs uppercase tracking-[0.3em] text-fg/30 whitespace-nowrap flex items-center gap-12">
              {item} <span className="text-fg/15">✦</span>
            </span>
          ))}
        </div>
      </div>

      <StatsSection />

      {/* Services preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="section-tag mb-5">What We Do</div>
              <h2 className="display-font text-4xl md:text-5xl font-bold text-fg max-w-xl">
                Everything your business needs to <span className="text-outline">win online</span>
              </h2>
            </div>
            <Link href="/services" className="btn-ghost text-sm whitespace-nowrap">
              All Services <ArrowRight size={14} />
            </Link>
          </FadeUp>
          <ServicesGrid limit={6} />
        </div>
      </section>

      <Process />
      <Testimonials />
      <CTA />
    </>
  )
}
