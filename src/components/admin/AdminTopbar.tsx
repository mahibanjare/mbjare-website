'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LogOut, ArrowLeft, ShieldCheck } from 'lucide-react'
import { logout } from '@/app/admin/actions'

export default function AdminTopbar() {
  return (
    <header className="sticky top-0 z-40 nav-blur border-b border-fg/[0.08] backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Mbjare InfoTech" width={40} height={40} className="logo-glow shrink-0" />
          <div>
            <div className="mono-font text-[9px] uppercase tracking-[0.25em] text-accent leading-none flex items-center gap-1.5">
              <ShieldCheck size={11} /> Admin
            </div>
            <div className="text-fg text-sm font-semibold leading-tight mt-0.5">Content Studio</div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-fg/45 hover:text-fg transition-colors"
          >
            <ArrowLeft size={13} /> Website
          </Link>
          <span className="hidden sm:block w-px h-5 bg-fg/15" />
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3.5 h-9 rounded-full border border-fg/15 text-fg/55 text-xs hover:text-red-600 hover:border-red-400 transition-all"
            >
              <LogOut size={14} /> Logout
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
