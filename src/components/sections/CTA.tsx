import Link from 'next/link'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { site } from '@/content/site'
import { FadeUp } from '@/components/motion'

export default function CTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="hero-glow absolute inset-0" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="display-font text-[clamp(2.2rem,5.5vw,60px)] font-bold leading-tight mb-6">
            <span className="text-fg">Ready to </span>
            <span className="text-gradient">automate &amp; grow</span>
            <span className="text-fg">?</span>
          </h2>
          <p className="text-fg/45 text-lg mb-10 max-w-xl mx-auto">
            Free 30-minute strategy call. We&apos;ll map exactly how AI and automation
            can grow your business — no obligation.
          </p>
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
        </FadeUp>
      </div>
    </section>
  )
}
