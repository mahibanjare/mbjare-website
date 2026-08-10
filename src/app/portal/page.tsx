import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Inbox, Loader, CheckCircle2 } from 'lucide-react'
import { getClient, getMyTickets } from '@/app/portal/actions'
import { getServices } from '@/lib/content'
import { supabaseConfigured } from '@/lib/supabase'
import ClientLogin from '@/components/portal/ClientLogin'
import RaiseTicketForm from '@/components/portal/RaiseTicketForm'
import TicketList from '@/components/portal/TicketList'
import PortalTopbar from '@/components/portal/PortalTopbar'

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
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 hero-glow">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center text-center mb-8">
            <Image src="/logo.svg" alt="Mbjare InfoTech" width={64} height={64} className="logo-glow logo-reveal mb-5" />
            <div className="kicker mb-2">Client Portal</div>
            <h1 className="display-font text-2xl font-semibold text-fg">
              Support, <span className="text-outline">simplified.</span>
            </h1>
          </div>

          {!supabaseConfigured && (
            <p className="text-center text-fg/40 text-xs mb-5">
              Portal setup hone tak login band hai (Supabase connect karna baaki hai).
            </p>
          )}

          <ClientLogin />

          <Link
            href="/"
            className="mt-8 flex items-center justify-center gap-1.5 text-xs text-fg/40 hover:text-fg transition-colors"
          >
            <ArrowLeft size={13} /> Website par wapas
          </Link>
        </div>
      </main>
    )
  }

  // ── Logged-in: portal app shell ────────────────────────────────────
  const [tickets, services] = await Promise.all([getMyTickets(), getServices()])
  const categories = ['General / Other', ...services.map((s) => s.title)]

  const stats = [
    { label: 'Open', value: tickets.filter((t) => t.status === 'Open').length, icon: Inbox, tone: 'text-gold' },
    { label: 'In Progress', value: tickets.filter((t) => t.status === 'In Progress').length, icon: Loader, tone: 'text-accent' },
    { label: 'Resolved', value: tickets.filter((t) => t.status === 'Resolved').length, icon: CheckCircle2, tone: 'text-green-600' },
  ]

  return (
    <main className="min-h-screen">
      <PortalTopbar client={client} />

      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 sm:py-10">
        {/* Greeting */}
        <div className="mb-7">
          <h1 className="display-font text-2xl sm:text-3xl font-semibold text-fg">
            Namaste, {client.name.split(' ')[0]} 👋
          </h1>
          <p className="text-fg/45 text-sm mt-1">
            Yahan se apni koi bhi problem ya request raise karein — hum turant dekhenge.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-9">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-4 sm:p-5">
              <s.icon size={18} className={`${s.tone} mb-2`} />
              <div className="display-font text-2xl sm:text-3xl font-bold text-fg leading-none">{s.value}</div>
              <div className="mono-font text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-fg/40 mt-1.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Raise + Track */}
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 items-start">
          <div className="lg:sticky lg:top-24">
            <RaiseTicketForm categories={categories} />
          </div>
          <TicketList tickets={tickets} />
        </div>
      </div>
    </main>
  )
}
