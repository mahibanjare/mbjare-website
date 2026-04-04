import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const navLinks = [
  { label: 'Home',      path: '/' },
  { label: 'Services',  path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About',     path: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-2 bg-[rgba(3,10,9,0.82)] backdrop-blur-2xl border-b border-[rgba(0,150,136,0.12)]'
          : 'py-4 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src={logo} alt="Mbjare InfoTech" className="h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0,210,200,0.5))' }} />
            <span className="mono-font text-[9px] text-[#4db6ac]/45 tracking-[0.25em] uppercase hidden sm:block mt-0.5">InfoTech</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300
                  ${location.pathname === link.path
                    ? 'text-[#4db6ac] bg-[rgba(0,150,136,0.10)] border border-[rgba(0,150,136,0.22)]'
                    : 'text-white/55 hover:text-white hover:bg-white/[0.05]'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/40 hover:text-[#4db6ac] transition-colors duration-300">
              <span className="teal-dot w-1.5 h-1.5" /> Available Now
            </a>
            <Link to="/contact" className="btn-primary text-xs py-2.5 px-5">Get Free Quote</Link>
          </div>

          {/* Hamburger */}
          <button type="button" onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white rounded-xl border border-white/10 hover:border-[rgba(0,150,136,0.35)] transition-all">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <button onClick={() => setOpen(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
          <X size={22} />
        </button>
        <img src={logo} alt="Mbjare" className="h-16 w-auto object-contain mb-2"
          style={{ filter: 'drop-shadow(0 0 16px rgba(0,210,200,0.6))' }} />
        {navLinks.map((link, i) => (
          <Link key={link.path} to={link.path}
            style={{ animationDelay: `${i * 0.08}s` }}
            className={`display-font text-4xl font-bold transition-colors duration-300
              ${location.pathname === link.path ? 'text-[#009688]' : 'text-white/65 hover:text-white'}`}>
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="btn-primary mt-6">Get Free Quote</Link>
        <div className="flex items-center gap-2 text-white/25 text-xs mt-4">
          <span className="teal-dot w-1.5 h-1.5" /> Open for new projects
        </div>
      </div>
    </>
  )
}
