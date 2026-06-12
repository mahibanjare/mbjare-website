import type { Metadata } from 'next'
import { MessageSquare, Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import { site, faqs } from '@/content/site'
import { FadeUp } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Contact — Get Your Free Quote',
  description:
    'Free strategy call for websites, AI chatbots, apps and automation. We reply within 2 hours — WhatsApp, email or the form.',
}

const channels = [
  { href: site.whatsapp, icon: MessageSquare, title: 'WhatsApp Us', sub: 'Fastest — usually < 30 min', val: site.phone },
  { href: site.emailHref, icon: Mail, title: 'Email Us', sub: 'Detailed queries & proposals', val: site.email },
  { href: site.phoneHref, icon: Phone, title: 'Call Us', sub: site.hours, val: site.phone },
]

export default function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-12 hero-glow">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="anim-rise">
            <div className="section-tag mx-auto w-fit mb-6">Get In Touch</div>
            <h1 className="display-font text-[clamp(2.5rem,6vw,68px)] font-bold text-fg mb-5 leading-tight">
              Let&apos;s build something <span className="text-outline">great</span>
            </h1>
            <p className="text-fg/45 text-lg max-w-xl mx-auto">
              Free consult, honest advice, exact pricing. We reply within 2 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-8">
          {/* Channels */}
          <div className="lg:col-span-2 space-y-4">
            {channels.map((c, i) => (
              <FadeUp key={c.title} index={i}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="glass-card p-6 flex items-center gap-5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-fg/[0.04] border border-fg/10 flex items-center justify-center text-fg group-hover:bg-accent group-hover:text-fg transition-all">
                    <c.icon size={20} />
                  </div>
                  <div>
                    <div className="display-font font-semibold text-fg">{c.title}</div>
                    <div className="text-fg/35 text-xs mb-0.5">{c.sub}</div>
                    <div className="text-fg/60 text-sm">{c.val}</div>
                  </div>
                </a>
              </FadeUp>
            ))}

            <FadeUp index={3}>
              <div className="glass-card p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-fg/[0.04] border border-fg/10 flex items-center justify-center text-fg">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="display-font font-semibold text-fg">Visit Us</div>
                  <div className="text-fg/35 text-xs">{site.location}</div>
                </div>
              </div>
            </FadeUp>

            <FadeUp index={4}>
              <div className="glass-card p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-fg/[0.04] border border-fg/10 flex items-center justify-center text-fg">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="display-font font-semibold text-fg">Response Time</div>
                  <div className="text-fg/35 text-xs">Within 2 hours · {site.hours}</div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <FadeUp>
              <ContactForm />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <h2 className="display-font text-4xl font-bold text-fg text-center mb-12">
              Frequently asked
            </h2>
          </FadeUp>
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
    </>
  )
}
