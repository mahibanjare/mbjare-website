import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import SocialIcon from '@/components/ui/SocialIcon'
import { site } from '@/content/site'
import { services } from '@/content/services'
import NewsletterForm from '@/components/forms/NewsletterForm'

export default function Footer() {
  return (
    <footer className="relative border-t border-fg/[0.07] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <Image src="/logo-footer.png" alt="Mbjare InfoTech" width={88} height={64} className="logo-glow" />
            </div>
            <p className="text-fg/40 text-sm leading-relaxed mb-6 max-w-xs">
              {site.description}
            </p>
            <div className="flex gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="w-10 h-10 flex items-center justify-center text-fg/55 border border-fg/15 rounded-full hover:text-white hover:bg-accent hover:border-accent transition-all duration-300"
                >
                  <SocialIcon name={s.label} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <div className="mono-font text-[10px] uppercase tracking-[0.3em] text-fg/40 mb-5">Services</div>
            <ul className="space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm text-fg/60 hover:text-accent-2 transition-colors inline-flex items-center gap-1.5 group">
                    {s.title}
                    <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <div className="mono-font text-[10px] uppercase tracking-[0.3em] text-fg/40 mb-5">Contact</div>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-2 text-fg/60 hover:text-accent-2 transition-colors">
                  <Phone size={13} /> {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex items-center gap-2 text-fg/60 hover:text-accent-2 transition-colors">
                  <Mail size={13} /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-fg/50">
                <MapPin size={13} /> Raipur, Chhattisgarh
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <div className="mono-font text-[10px] uppercase tracking-[0.3em] text-fg/40 mb-5">Stay Updated</div>
            <p className="text-fg/40 text-xs mb-4">Growth tips, AI automation ideas & offers. No spam.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-fg/45">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span className="mono-font uppercase tracking-widest">Build. Automate. Dominate.</span>
        </div>
      </div>
    </footer>
  )
}
