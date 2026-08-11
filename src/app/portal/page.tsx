import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getClient, getMyTickets } from '@/app/portal/actions'
import { getServices } from '@/lib/content'
import { supabaseConfigured } from '@/lib/supabase'
import ClientLogin from '@/components/portal/ClientLogin'
import PortalApp from '@/components/portal/PortalApp'

export const metadata: Metadata = {
  title: 'Client Portal — Support Tickets',
  description: 'Mbjare InfoTech client portal — raise and track your support tickets.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function PortalPage() {
  const client = supabaseConfigured ? await getClient() : null

  // ── Logged-out: full-screen branded login ──────────────────────────
  if (!client) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 hero-glow relative overflow-hidden">
        <div className="orb orb-1" aria-hidden />
        <div className="orb orb-2" aria-hidden />
        <div className="w-full max-w-sm relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <Image src="/logo.svg" alt="Mbjare InfoTech" width={64} height={64} className="logo-glow logo-reveal mb-5" />
            <div className="section-tag mb-4">Client Support Portal</div>
            <h1 className="display-font text-[28px] leading-tight font-semibold text-fg">
              Support, <span className="text-outline">simplified.</span>
            </h1>
            <p className="text-fg/45 text-sm mt-2">
              Login karein — apne tickets raise aur track karein, ek hi jagah.
            </p>
          </div>

          {!supabaseConfigured && (
            <p className="text-center text-fg/40 text-xs mb-5">
              Portal setup hone tak login band hai (Supabase connect karna baaki hai).
            </p>
          )}

          <ClientLogin />

          <div className="mt-6 flex items-center justify-center gap-x-5 gap-y-2 flex-wrap text-[11px] text-fg/35 mono-font uppercase tracking-[0.15em]">
            <span className="inline-flex items-center gap-1.5"><span className="teal-dot w-1.5 h-1.5" /> Secure</span>
            <span className="inline-flex items-center gap-1.5"><span className="teal-dot w-1.5 h-1.5" /> Private</span>
            <span className="inline-flex items-center gap-1.5"><span className="teal-dot w-1.5 h-1.5" /> 2-hr reply</span>
          </div>

          <Link
            href="/"
            className="mt-7 flex items-center justify-center gap-1.5 text-xs text-fg/40 hover:text-fg transition-colors"
          >
            <ArrowLeft size={13} /> Website par wapas
          </Link>
        </div>
      </main>
    )
  }

  // ── Logged-in: SaaS-style portal app ───────────────────────────────
  const [tickets, services] = await Promise.all([getMyTickets(), getServices()])
  const categories = ['General / Other', ...services.map((s) => s.title)]

  return <PortalApp client={client} tickets={tickets} categories={categories} />
}
