import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { site } from '@/content/site'

const trustedBy = [
  { name: 'Dharshakti Sweets', url: 'https://dharshakti.in' },
  { name: 'SR Petrochemicals', url: 'https://srpetrochemicals.in' },
  { name: 'Bright Public School Godhi', url: 'https://bpsgodhi.in' },
  { name: 'Ankita Beauty Salon', url: 'https://ankitabeautysalonarang.in' },
  { name: 'Grafiya', url: 'https://grafiya.in' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden hero-glow">
      <div className="max-w-7xl mx-auto px-6 pt-40 pb-16 lg:pt-44 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-12 items-center">
        {/* Editorial copy — left */}
        <div>
          <div className="est-line w-fit mb-8 anim-rise">
            Digital Studio — Raipur, India
          </div>

          <h1 className="display-font text-[clamp(2.6rem,5.5vw,72px)] font-semibold leading-[1.06] mb-7 anim-rise anim-d1">
            We build brands, websites &amp; automations{' '}
            <span className="text-outline">that grow real businesses.</span>
          </h1>

          <p className="text-fg/55 text-lg max-w-lg mb-6 leading-relaxed anim-rise anim-d2">
            Every brand on this page was designed, built and is run end-to-end by
            us — and it&apos;s all <span className="text-fg font-medium">live on the internet</span>,
            rated 5★ by every client.
          </p>

          <p className="mono-font text-[11px] uppercase tracking-[0.25em] text-fg/40 mb-10 anim-rise anim-d2">
            5 brands built end-to-end&ensp;·&ensp;5★ from every client&ensp;·&ensp;2-hour replies
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 anim-rise anim-d3">
            <Link href="/contact" className="btn-primary">
              Book a Free Call <ArrowRight size={16} />
            </Link>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <MessageSquare size={15} /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* Real work collage — right */}
        <div className="relative anim-rise anim-d2 pb-10 sm:pb-14">
          <div className="shot-frame float-a">
            <div className="shot-bar" aria-hidden><i /><i /><i /></div>
            <Image
              src="/projects/dharshakti.png"
              alt="Dharshakti Sweets & Restaurant — live client website with QR ordering"
              width={680}
              height={425}
              priority
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="shot-frame absolute -bottom-2 -left-4 sm:-left-8 w-[54%] float-b">
            <div className="shot-bar" aria-hidden><i /><i /><i /></div>
            <Image
              src="/projects/bpsgodhi.png"
              alt="Bright Public School Godhi — live client website"
              width={380}
              height={238}
              priority
              className="rounded-md w-full h-auto"
            />
          </div>
          <span className="absolute -top-3 right-5 mono-font text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-gold/50 text-gold bg-bg-2 shadow-sm">
            Live — dharshakti.in
          </span>
        </div>
      </div>

      {/* Trust strip — client names, editorial serif */}
      <div className="max-w-7xl mx-auto px-6 pb-16 anim-rise anim-d4">
        <div className="mono-font text-[10px] uppercase tracking-[0.35em] text-fg/35 mb-5">
          Brands we&apos;ve built — live on the internet
        </div>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {trustedBy.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="display-font italic text-base text-fg/45 hover:text-accent transition-colors duration-300"
            >
              {c.name}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 hairline" />
    </section>
  )
}
