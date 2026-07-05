import Link from 'next/link'
import { Check, MessagesSquare, Gauge, TrendingUp, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'
import { FadeUp } from '@/components/motion'

const reasons = [
  {
    icon: MessagesSquare,
    title: 'Talk directly to the makers',
    desc: 'No call centres, no account managers. You deal straight with the team that designs and builds your project — reachable on WhatsApp, every day.',
  },
  {
    icon: TrendingUp,
    title: 'Results, not just deliverables',
    desc: 'We measure success by one thing — your growth. More leads, more sales, less manual work. And so far, every single client has rated us 5★.',
  },
  {
    icon: Gauge,
    title: 'Ridiculously fast',
    desc: 'Most websites go live in 2 weeks, automations in 3–5 days. And we reply to you within 2 hours — every single time.',
  },
  {
    icon: Sparkles,
    title: 'AI-first advantage',
    desc: 'We don’t just build websites. We build systems that sell, reply and grow your business 24/7 — while you sleep.',
  },
]

const promises = [
  'Free strategy call — zero obligation, zero pressure',
  'Pay just 50% upfront, the rest only on delivery',
  '30 days of free support after launch',
  'We don’t stop until you genuinely love it',
]

export default function WhyUs() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag mb-5 mx-auto w-fit"><span className="text-fg/35">02</span> Why Mbjare</div>
          <h2 className="display-font text-4xl md:text-5xl font-bold text-fg">
            Why real businesses <span className="text-outline">choose us</span> — and stay
          </h2>
          <p className="text-fg/45 text-lg mt-5">
            Hiring an agency is a leap of faith. Here&apos;s exactly why founders across
            Chhattisgarh (and Pan-India) trust Mbjare with their growth.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-2 gap-5 items-start">
          {/* Reasons */}
          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map((r, i) => (
              <FadeUp key={r.title} index={i % 2}>
                <div className="glass-card p-6 h-full">
                  <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent-3/20 flex items-center justify-center text-accent-2 mb-5">
                    <r.icon size={20} />
                  </div>
                  <h3 className="display-font font-semibold text-fg text-lg mb-2">{r.title}</h3>
                  <p className="text-fg/45 text-sm leading-relaxed">{r.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Guarantee card */}
          <FadeUp index={1}>
            <div className="glass-card p-8 h-full relative overflow-hidden">
              <div className="hero-glow absolute inset-0 opacity-60" aria-hidden />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent text-[#021014] flex items-center justify-center shadow-[0_8px_24px_var(--glow)]">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="mono-font text-[10px] uppercase tracking-[0.25em] text-accent-2">
                      Our Promise
                    </div>
                    <div className="display-font text-xl font-bold text-fg">
                      A risk-free way to start
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {promises.map((p) => (
                    <div key={p} className="guarantee-check">
                      <span className="gc-tick">
                        <Check size={14} strokeWidth={3} />
                      </span>
                      <span className="text-fg/75 text-sm leading-relaxed pt-0.5">{p}</span>
                    </div>
                  ))}
                </div>

                <div className="hairline mb-6" />
                <p className="text-fg/55 text-sm leading-relaxed mb-6">
                  You have <span className="text-fg font-semibold">nothing to lose</span> and a
                  faster-growing business to gain. Let&apos;s map it out together — free.
                </p>
                <Link href="/contact" className="btn-primary w-full sm:w-auto">
                  Claim Your Free Strategy Call <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
