import Link from 'next/link'
import { ArrowRight, MessageSquare, Star, Clock, ShieldCheck } from 'lucide-react'
import { site } from '@/content/site'
import { FadeUp } from '@/components/motion'

const badges = [
  { icon: Star, label: '5★ from every client' },
  { icon: Clock, label: 'Replies in 2 hours' },
  { icon: ShieldCheck, label: '50% on delivery' },
]

export default function CTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="hero-glow absolute inset-0" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <div className="section-tag badge-glow mx-auto w-fit mb-6">
            <span className="teal-dot w-1.5 h-1.5" /> Only a few project slots open this month
          </div>
          <h2 className="display-font text-[clamp(2.2rem,5.5vw,60px)] font-bold leading-tight mb-6">
            <span className="text-fg">Ready to </span>
            <span className="text-gradient">automate &amp; grow</span>
            <span className="text-fg">?</span>
          </h2>
          <p className="text-fg/45 text-lg mb-8 max-w-xl mx-auto">
            Book a free 30-minute strategy call. We&apos;ll map exactly how AI and automation
            can grow your business — no cost, no obligation, no pressure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10">
            {badges.map((b) => (
              <span key={b.label} className="inline-flex items-center gap-2 text-sm text-fg/50">
                <b.icon size={14} className="text-accent-2" /> {b.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Get Your Free Quote <ArrowRight size={16} />
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MessageSquare size={15} /> WhatsApp Us
            </a>
          </div>

          <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-fg/30 mt-8">
            No spam · No obligation · Reply within 2 hours
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
