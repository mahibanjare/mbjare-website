'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'FAQ', path: '/faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 px-4 transition-all duration-500 ${
          scrolled ? 'top-2.5' : 'top-4'
        }`}
      >
        <div
          className={`nav-pill max-w-6xl mx-auto flex items-center justify-between pl-5 pr-2.5 transition-all duration-500 ${
            scrolled ? 'py-1.5' : 'py-2'
          }`}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.svg"
              alt="Mbjare InfoTech"
              width={64}
              height={64}
              priority
              className="logo-glow transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  pathname === link.path
                    ? 'text-accent-2 bg-accent-soft border border-accent/25'
                    : 'text-fg/50 hover:text-fg hover:bg-fg/[0.05]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <span className="flex items-center gap-2 text-xs mono-font uppercase tracking-widest text-fg/35">
              <span className="teal-dot w-1.5 h-1.5" />
              Available
            </span>
            <Link href="/contact" className="btn-primary !py-2.5 !px-5 text-xs">
              Get Free Quote <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle navigation menu"
              className="w-10 h-10 flex items-center justify-center text-fg/70 hover:text-fg rounded-xl border border-fg/10 hover:border-accent/50 transition-all"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-bg/[0.98] backdrop-blur-xl flex flex-col items-center justify-center gap-7 transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Image src="/logo.svg" alt="Mbjare" width={88} height={88} className="logo-glow mb-2" />
        {navLinks.map((link, i) => (
          <Link
            key={link.path}
            href={link.path}
            style={{ transitionDelay: open ? `${i * 60}ms` : '0ms' }}
            className={`display-font text-4xl font-bold transition-all duration-500 ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            } ${pathname === link.path ? 'text-accent-2' : 'text-fg/50 hover:text-fg'}`}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className="btn-primary mt-4">
          Get Free Quote <ArrowUpRight size={15} />
        </Link>
        <div className="flex items-center gap-2 text-fg/30 text-xs mt-2">
          <span className="teal-dot w-1.5 h-1.5" /> Open for new projects
        </div>
      </div>
    </>
  )
}
