import Link from 'next/link'
import { ArrowRight, MessageSquare, ChevronDown } from 'lucide-react'
import { site } from '@/content/site'

const trustedBy = ['Dharshakti Sweets', 'SR Petrochemicals', 'Bright Public School Godhi', 'Ankita Beauty Salon', 'Grafiya']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-glow overflow-hidden">
      {/* ds-style dotted grid, fading downward */}
      <div className="absolute inset-0 opacity-40 dot-grid" aria-hidden />

      {/* Floating aurora orbs — pure CSS, GPU-composited */}
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-36 pb-24">
        {/* Gold eyebrow — the only gold in the hero */}
        <div className="est-line mx-auto w-fit mb-8 anim-rise">
          India&apos;s AI-First Digital Agency
        </div>

        <h1 className="display-font text-[clamp(2.8rem,7.5vw,86px)] font-bold leading-[1.04] tracking-[-0.03em] mb-8 anim-rise anim-d1">
          <span className="text-fg">We Build </span>
          <span className="text-gradient-anim">AI-Powered</span>
          <br />
          <span className="text-outline">Digital Engines</span>
          <br />
          <span className="text-fg">That Grow Your Business</span>
        </h1>

        <p className="text-fg/45 text-lg md:text-xl max-w-xl mx-auto mb-6 leading-relaxed anim-rise anim-d2">
          Websites, apps, AI chatbots &amp; automations that{' '}
          <span className="text-fg font-medium">work while you sleep</span> — built
          end-to-end, rated 5★ by every client.
        </p>

        {/* Quiet proof line — one voice, no competing chips */}
        <p className="mono-font text-[11px] uppercase tracking-[0.25em] text-fg/35 mb-12 anim-rise anim-d2">
          5 brands built end-to-end&ensp;·&ensp;5★ from every client&ensp;·&ensp;2-hour replies
        </p>

        {/* One primary action. One quiet alternative. */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 anim-rise anim-d3">
          <Link href="/contact" className="btn-primary">
            Start Your Project — It&apos;s Free <ArrowRight size={16} />
          </Link>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <MessageSquare size={15} /> WhatsApp Us
          </a>
        </div>

        {/* Trust strip — quiet, editorial */}
        <div className="mt-20 anim-rise anim-d4">
          <div className="mono-font text-[10px] uppercase tracking-[0.35em] text-fg/30 mb-6">
            Brands we&apos;ve built — live on the internet
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {trustedBy.map((name) => (
              <span
                key={name}
                className="display-font text-sm font-semibold text-fg/40 hover:text-fg transition-colors duration-300"
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
