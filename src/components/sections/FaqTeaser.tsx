import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFaqs } from '@/lib/content'
import { FadeUp } from '@/components/motion'

export default async function FaqTeaser() {
  const faqs = (await getFaqs()).slice(0, 5)
  return (
    <section className="py-28">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="mb-12">
          <div className="kicker mb-3">05 · Questions</div>
          <h2 className="display-font text-4xl md:text-6xl font-semibold text-fg">
            Everything you&apos;re wondering — <span className="text-outline">answered.</span>
          </h2>
        </FadeUp>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FadeUp key={f.q} index={i}>
              <details className="glass-card group">
                <summary className="p-5 cursor-pointer list-none flex items-center justify-between gap-3 text-fg font-semibold text-sm [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-accent group-open:rotate-45 transition-transform duration-300 text-2xl leading-none flex-none">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-fg/50 text-sm leading-relaxed">{f.a}</p>
              </details>
            </FadeUp>
          ))}
        </div>

        <FadeUp className="mt-8">
          <Link
            href="/faq"
            className="display-font italic text-accent hover:text-fg transition-colors inline-flex items-center gap-2"
          >
            All questions <ArrowRight size={15} />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
