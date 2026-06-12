import Link from 'next/link'
import { ArrowRight, MessageSquare, ChevronDown, Zap, Code2, Star } from 'lucide-react'
import { site } from '@/content/site'

const trustedBy = ['SR Petrochemicals', 'BPS Godhi', 'Ankita Beauty Salon', 'Grafiya']

const chips = [
  { icon: Code2, label: '50+ Projects Delivered' },
  { icon: Star, label: '30+ Happy Clients' },
  { icon: Zap, label: '2-Hour Response Time' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-glow overflow-hidden">
      {/* Backdrop grid */}
      <div className="absolute inset-0 opacity-[0.05] hero-grid" />

      {/* Floating aurora orbs — pure CSS, GPU-composited */}
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-24">
        <div className="section-tag mx-auto w-fit mb-8 anim-rise">
          <span className="teal-dot w-1.5 h-1.5" /> India&apos;s AI-First Digital Agency
        </div>

        <h1 className="display-font text-[clamp(2.8rem,7.5vw,86px)] font-bold leading-[1.04] mb-7 anim-rise anim-d1">
          <span className="text-fg">We Build </span>
          <span className="text-gradient">AI-Powered</span>
          <br />
          <span className="text-outline">Digital Engines</span>
          <br />
          <span className="text-fg">That Grow Your Business</span>
        </h1>

        <p className="text-fg/45 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed anim-rise anim-d2">
          Websites, apps, AI chatbots &amp; automations that work while you sleep.
          From zero to ₹10L revenue — we&apos;ve helped 30+ businesses transform digitally.
        </p>

        {/* Stat chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 anim-rise anim-d2">
          {chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fg/10 bg-fg/[0.03] text-fg/55 text-xs font-medium"
            >
              <c.icon size={12} className="text-accent-2" /> {c.label}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 anim-rise anim-d3">
          <Link href="/contact" className="btn-primary">
            Start Your Project — It&apos;s Free <ArrowRight size={16} />
          </Link>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <MessageSquare size={15} /> WhatsApp Us
          </a>
        </div>

        {/* Trust strip — real clients, live on the internet */}
        <div className="mt-16 anim-rise anim-d4">
          <div className="mono-font text-[10px] uppercase tracking-[0.35em] text-fg/30 mb-5">
            Trusted by real businesses
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustedBy.map((name) => (
              <span
                key={name}
                className="display-font text-sm font-semibold text-fg/35 hover:text-accent-2 transition-colors"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 anim-rise anim-d4">
        <ChevronDown size={18} className="text-fg/30 scroll-cue" />
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 hairline" />
    </section>
  )
}
