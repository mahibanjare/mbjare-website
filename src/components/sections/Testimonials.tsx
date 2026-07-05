import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/content/testimonials'
import { FadeUp } from '@/components/motion'

function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <div className="glass-card p-6 w-[340px] flex-shrink-0 relative group">
      <Quote
        size={40}
        className="absolute top-5 right-5 text-accent/15 group-hover:text-accent/30 transition-colors"
        aria-hidden
      />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={13} className="fill-accent-2 text-accent-2" />
        ))}
      </div>
      <p className="text-fg/60 text-sm leading-relaxed mb-6">&ldquo;{t.msg}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-fg/[0.06]">
        <span className="avatar-ring w-10 h-10 text-xs shrink-0">{initials(t.name)}</span>
        <div>
          <div className="text-fg text-sm font-semibold">{t.name}</div>
          <div className="mono-font text-[10px] uppercase tracking-widest text-fg/30 mt-0.5">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <FadeUp>
          <div className="section-tag mb-5"><span className="text-fg/35">04</span> Client Love</div>
          <h2 className="display-font text-4xl md:text-5xl font-bold text-fg">
            Trusted by businesses <span className="text-outline">like yours</span>
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent-2 text-accent-2" />
                ))}
              </div>
              <span className="text-fg font-semibold text-sm">5.0</span>
              <span className="text-fg/40 text-sm">from every client we&apos;ve worked with</span>
            </div>
            <span className="hidden sm:block w-px h-4 bg-fg/15" />
            <span className="text-fg/40 text-sm">
              <span className="text-fg font-semibold">100%</span> would recommend Mbjare
            </span>
          </div>
        </FadeUp>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />
        <div className="marquee-track gap-5 pr-5">
          {[...testimonials, ...testimonials].map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
