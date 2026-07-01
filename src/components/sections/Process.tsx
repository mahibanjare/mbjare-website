import { FadeUp, Stagger } from '@/components/motion'
import { SpotlightDiv } from '@/components/ui/Spotlight'

const steps = [
  { n: '01', title: 'Discover', desc: 'Free strategy call. We understand your business, goals, and where AI + automation can multiply results.' },
  { n: '02', title: 'Design', desc: 'We map the solution — design, content, flows — and you approve before a single line of code ships.' },
  { n: '03', title: 'Build', desc: 'Fast, focused sprints. Websites in 1–2 weeks, automations in days. You see progress in real time.' },
  { n: '04', title: 'Grow', desc: 'Launch is day one. We optimize, automate, and iterate so your digital engine keeps compounding.' },
]

export default function Process() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="mb-14">
          <div className="section-tag mb-5">How We Work</div>
          <h2 className="display-font text-4xl md:text-5xl font-bold text-fg">
            From idea to <span className="text-outline">impact</span> — in weeks
          </h2>
        </FadeUp>

        {/* Timeline rail with glowing nodes (large screens) */}
        <div className="relative hidden lg:block mb-8">
          <div className="absolute top-[6px] left-[12.5%] right-[12.5%] h-px process-rail" />
          <div className="grid grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="flex justify-center">
                <span className="process-node" />
              </div>
            ))}
          </div>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <FadeUp key={s.n} index={i}>
              <SpotlightDiv className="glass-card spotlight-card p-7 h-full group transition-transform duration-300">
                <div className="display-font text-5xl font-bold text-gradient mb-6 transition-transform duration-300 group-hover:-translate-y-0.5">
                  {s.n}
                </div>
                <h3 className="display-font text-lg font-semibold text-fg mb-3 transition-colors group-hover:text-accent-2">
                  {s.title}
                </h3>
                <p className="text-fg/40 text-sm leading-relaxed">{s.desc}</p>
              </SpotlightDiv>
            </FadeUp>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
