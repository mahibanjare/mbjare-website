import { FadeUp, Stagger } from '@/components/motion'

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

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <FadeUp key={s.n} index={i}>
              <div className="glass-card p-7 h-full">
                <div className="display-font text-5xl font-bold text-outline mb-6">{s.n}</div>
                <h3 className="display-font text-lg font-semibold text-fg mb-3">{s.title}</h3>
                <p className="text-fg/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
