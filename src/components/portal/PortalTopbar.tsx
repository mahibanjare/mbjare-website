'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LogOut, ArrowLeft } from 'lucide-react'
import { clientLogout } from '@/app/portal/actions'
import type { Client } from '@/types/content'

export default function PortalTopbar({ client }: { client: Client }) {
  const initials = client.name
    .split(' ')
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')

  return (
    <header className="sticky top-0 z-40 nav-blur border-b border-fg/[0.08] backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Image src="/logo.svg" alt="Mbjare InfoTech" width={40} height={40} className="logo-glow shrink-0" />
          <div className="min-w-0 hidden xs:block sm:block">
            <div className="mono-font text-[9px] uppercase tracking-[0.25em] text-accent leading-none">
              Client Portal
            </div>
            <div className="text-fg text-sm font-semibold truncate leading-tight mt-0.5">
              Support Desk
            </div>
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
          <div className="flex items-center gap-2.5">
            <span className="avatar-ring w-9 h-9 text-xs shrink-0">{initials || 'C'}</span>
            <div className="hidden sm:block min-w-0">
              <div className="text-fg text-sm font-medium truncate max-w-[160px] leading-tight">
                {client.name}
              </div>
              {client.company && (
                <div className="mono-font text-[10px] text-fg/40 truncate max-w-[160px] leading-tight">
                  {client.company}
                </div>
              )}
            </div>
          </div>
          <form action={clientLogout}>
            <button
              type="submit"
              aria-label="Logout"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-fg/15 text-fg/55 hover:text-red-600 hover:border-red-400 transition-all"
            >
              <LogOut size={15} />
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}
