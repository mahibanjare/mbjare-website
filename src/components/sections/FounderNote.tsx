import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { Caveat } from 'next/font/google'
import { FadeUp } from '@/components/motion'
import { site } from '@/content/site'

const signature = Caveat({ subsets: ['latin'], weight: '600', display: 'swap' })

/* Drop a real photo at public/founder.png (or .jpg / .webp) and it
   replaces the initials automatically — no code change needed. */
const founderPhoto = ['founder.png', 'founder.jpg', 'founder.webp']
  .map((f) => (fs.existsSync(path.join(process.cwd(), 'public', f)) ? `/${f}` : null))
  .find(Boolean)

export default function FounderNote() {
  return (
    <section className="py-28 relative overflow-hidden">
      <div className="hero-glow absolute inset-0 opacity-50" aria-hidden />
      <div className="relative max-w-3xl mx-auto px-6">
        <FadeUp>
          <div className="anchor-card p-8 md:p-12">
            <span className="foil-strip" aria-hidden />
            <div className="kicker mb-7">A note from the founder</div>

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

            {/* Handwritten sign-off */}
            <div className={`${signature.className} text-[38px] leading-none text-gold-b -rotate-2 mt-9`}>
              Mahi Banjare
            </div>

            <div className="flex items-center gap-4 mt-6 pt-7 border-t border-fg/[0.08]">
              {founderPhoto ? (
                <Image
                  src={founderPhoto}
                  alt="Mahi Banjare — Founder, Mbjare InfoTech"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover shrink-0 ring-1 ring-gold/40"
                />
              ) : (
                <span className="avatar-ring w-12 h-12 text-sm shrink-0">MB</span>
              )}
              <div>
                <div className="text-fg font-semibold">Mahi Banjare — Founder</div>
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
