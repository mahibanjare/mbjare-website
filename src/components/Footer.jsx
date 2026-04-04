import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowRight, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'
import logo from '../assets/logo1.png'

const services = [
  'Website Development', 'App Development', 'WhatsApp API',
  'Google Sheet Automation', 'Social Media Management',
  'Graphic Design', 'Google Business Setup', 'Email Automation'
]

const links = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const socials = [
  { icon: Instagram, href: 'https://instagram.com/mbjare', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/mbjare', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/mbjare', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@mbjare', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="relative bg-dark-800 border-t border-white/[0.06] overflow-hidden">
      <div className="orb w-[600px] h-[300px] bg-[#009688]/5 -top-32 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Mbjare InfoTech"
                className="h-12 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0,210,200,0.45))' }}
              />
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              India's next-gen digital agency — we build, automate & grow businesses that dominate online.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/40 hover:text-[#009688] hover:border-[rgba(0,150,136,0.4)]/40 transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="display-font font-semibold text-white text-sm uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s}>
                  <Link to="/services" className="text-white/40 hover:text-[#4db6ac] text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#009688]" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="display-font font-semibold text-white text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {links.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="text-white/40 hover:text-white text-sm transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
              <li><a href="https://mbjare.com/privacy.php" className="text-white/40 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="https://mbjare.com/term.php" className="text-white/40 hover:text-white text-sm transition-colors duration-300">Terms of Service</a></li>
            </ul>

            <div className="mt-8 space-y-3 text-sm">
              <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2 text-white/40 hover:text-[#4db6ac] transition-colors duration-300">
                <Phone size={13} /> +91 XXXX XXXXXX
              </a>
              <a href="mailto:hello@mbjare.com" className="flex items-center gap-2 text-white/40 hover:text-[#4db6ac] transition-colors duration-300">
                <Mail size={13} /> hello@mbjare.com
              </a>
              <div className="flex items-center gap-2 text-white/40">
                <MapPin size={13} /> Raipur, Chhattisgarh
              </div>
            </div>
          </div>

          <div>
            <h4 className="display-font font-semibold text-white text-sm uppercase tracking-widest mb-6">Stay Connected</h4>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Want agency updates, automation ideas, or quote alerts? Email us or message on WhatsApp.
            </p>
            <a href="mailto:hello@mbjare.com" className="btn-primary w-full justify-center text-xs py-3">Email Us</a>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © 2026 Mbjare InfoTech. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex items-center gap-2 text-white/25 text-xs">
            <span className="teal-dot w-1.5 h-1.5" />
            Build • Automate • Dominate
          </div>
        </div>
      </div>
    </footer>
  )
}
