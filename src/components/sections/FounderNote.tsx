import { FadeUp } from '@/components/motion'
import { site } from '@/content/site'

export default function FounderNote() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="hero-glow absolute inset-0 opacity-50" aria-hidden />
      <div className="relative max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="glass-card p-8 md:p-12">
            <div className="section-tag mb-7">A note from the founder</div>

            <blockquote className="display-font text-2xl md:text-[28px] leading-snug text-fg font-medium">
              &ldquo;When you hire Mbjare, you&apos;re not hiring a faceless agency. You&apos;re
              hiring a small, obsessed team that treats your business like our own.
              <span className="text-fg/50">
                {' '}If we take on your project, we&apos;re personally accountable for it —
                honest about timelines, reachable on WhatsApp, and relentless until it actually
                grows your business.
              </span>{' '}
              That&apos;s not a sales line. That&apos;s a promise.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 mt-9 pt-7 border-t border-fg/[0.08]">
              <span className="avatar-ring w-12 h-12 text-sm shrink-0">MB</span>
              <div>
                <div className="text-fg font-semibold">Founder &amp; Team</div>
                <div className="mono-font text-[11px] uppercase tracking-widest text-fg/35 mt-0.5">
                  Mbjare InfoTech · {site.location}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
