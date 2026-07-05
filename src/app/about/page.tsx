import type { Metadata } from 'next'
import StatsSection from '@/components/sections/StatsSection'
import CTA from '@/components/sections/CTA'
import { milestones, values, team } from '@/content/site'
import Icon from '@/components/ui/Icon'
import { FadeUp, Stagger } from '@/components/motion'

export const metadata: Metadata = {
  title: 'About — The AI-First Team Behind Mbjare',
  description:
    'We are a Raipur-based AI-first digital agency helping Indian businesses build, automate and grow online.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-16 hero-glow">
        <div className="max-w-5xl mx-auto px-6">
          <div className="anim-rise">
            <div className="section-tag mb-6">About Us</div>
            <h1 className="display-font text-[clamp(2.5rem,6vw,72px)] font-bold text-fg mb-8 leading-tight">
              Small team. <span className="text-outline">Big outcomes.</span>
              <br />
              AI in everything.
            </h1>
            <p className="text-fg/45 text-lg max-w-2xl leading-relaxed">
              We started Mbjare InfoTech with one belief: every business — from a salon in
              Arang to a petrochemicals company — deserves world-class digital tools.
              Today we build AI-powered websites, bots and automations that make that real.
            </p>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Story + milestones */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          <FadeUp>
            <h2 className="display-font text-4xl font-bold text-fg mb-6">Our Story</h2>
            <div className="space-y-4 text-fg/45 text-base leading-relaxed">
              <p>
                Mbjare InfoTech was founded in 2025 in Raipur, Chhattisgarh — with a laptop,
                a vision, and our first client signed in week one.
              </p>
              <p>
                Since then we&apos;ve built brands end-to-end: live client websites like SR
                Petrochemicals and BPS Godhi, brand rebuilds like Ankita Beauty Salon,
                identities built from scratch like Grafiya, plus the automations and ad
                campaigns that keep them growing.
              </p>
              <p>
                Now we&apos;re going all-in on AI — chatbots, agents and intelligent workflows —
                so our clients stay years ahead of their competition, not months.
              </p>
            </div>
          </FadeUp>

          <Stagger className="space-y-3">
            {milestones.map((mst, i) => (
              <FadeUp key={mst.year} index={i}>
                <div className="glass-card p-4 flex items-center gap-4">
                  <span className="mono-font text-fg font-bold text-xs w-16 flex-shrink-0">{mst.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-2 flex-shrink-0" />
                  <span className="text-fg/55 text-sm">{mst.event}</span>
                </div>
              </FadeUp>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-t border-fg/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-14">
            <div className="section-tag mb-5">Our Values</div>
            <h2 className="display-font text-4xl font-bold text-fg">What we stand for</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <FadeUp key={v.title} index={i}>
                <div className="glass-card p-6 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-fg/[0.04] border border-fg/10 flex items-center justify-center mb-5 text-fg">
                    <Icon name={v.icon} size={20} />
                  </div>
                  <h3 className="display-font font-semibold text-fg text-[17px] mb-3">{v.title}</h3>
                  <p className="text-fg/40 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 border-t border-fg/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp className="mb-14">
            <div className="section-tag mb-5">The Team</div>
            <h2 className="display-font text-4xl font-bold text-fg">The people who ship</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <FadeUp key={member.name} index={i}>
                <div className="glass-card p-6 text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-fg/[0.04] border border-fg/10 flex items-center justify-center mx-auto mb-4 text-4xl">
                    {member.emoji}
                  </div>
                  <h3 className="display-font font-bold text-fg text-base mb-1">{member.name}</h3>
                  <div className="mono-font text-[10px] uppercase tracking-widest text-fg/40 mb-3">{member.role}</div>
                  <p className="text-fg/40 text-xs leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {member.skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 border border-fg/12 text-fg/45 text-[10px] rounded-full mono-font">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
