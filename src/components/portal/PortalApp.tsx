'use client'

import { useEffect, useState } from 'react'
import { LayoutDashboard, PlusCircle, Table2, LogOut, Building2, MessageSquare, Sparkles } from 'lucide-react'
import type { Client, Ticket } from '@/types/content'
import { clientLogout } from '@/app/portal/actions'
import PortalOverview from './PortalOverview'
import RaiseTicketForm from './RaiseTicketForm'
import TicketTable from './TicketTable'

const NAV = [
  { key: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'raise', label: 'Generate Ticket', icon: PlusCircle },
  { key: 'tickets', label: 'My Tickets', icon: Table2 },
] as const

type TabKey = (typeof NAV)[number]['key']

export default function PortalApp({
  client,
  tickets,
  categories,
}: {
  client: Client
  tickets: Ticket[]
  categories: string[]
}) {
  const [tab, setTab] = useState<TabKey>('overview')
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const title =
    tab === 'overview' ? 'Support Dashboard' : tab === 'raise' ? 'Generate Ticket' : 'My Tickets'

  return (
    <div className="md:flex min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 lg:w-72 shrink-0 md:border-r border-fg/10 p-4 md:p-5 md:h-screen md:sticky md:top-0 md:overflow-y-auto bg-bg-2/40">
        {/* Brand card */}
        <div className="glass-card p-4 flex items-center gap-3 mb-4">
          <div className="brand-icon w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
            <Building2 size={20} />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-fg text-sm truncate leading-tight">
              {client.company || client.name}
            </div>
            <div className="text-xs text-accent font-medium">Client</div>
            <div className="inline-flex items-center gap-1.5 mt-1.5 text-[11px] text-fg/45">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {tickets.length} Tickets
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
          {NAV.map((n) => {
            const on = tab === n.key
            return (
              <button
                key={n.key}
                type="button"
                onClick={() => setTab(n.key)}
                aria-current={on ? 'page' : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 md:w-full ${
                  on
                    ? 'brand-icon text-white shadow-[0_10px_24px_-8px_var(--glow)]'
                    : 'text-fg/60 hover:text-fg hover:bg-fg/[0.04]'
                }`}
              >
                <n.icon size={18} className={on ? 'text-white' : 'text-fg/45'} />
                {n.label}
                {on && <span className="ml-auto w-2 h-2 rounded-full bg-white/90" />}
              </button>
            )
          })}

          {/* WhatsApp support — AI-consultant vibe */}
          <a
            href="https://wa.me/918815223300"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-fg/60 hover:text-fg hover:bg-fg/[0.04] transition-all shrink-0 md:w-full"
          >
            <MessageSquare size={18} className="text-fg/45" />
            WhatsApp Support
            <Sparkles size={14} className="ml-auto text-gold" />
          </a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur-xl border-b border-fg/[0.08]">
          <div className="px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="brand-icon w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                <LayoutDashboard size={20} />
              </div>
              <div className="min-w-0">
                <h1 className="brand-title display-font text-xl sm:text-2xl font-bold leading-tight">
                  {title}
                </h1>
                <p className="text-fg/50 text-xs sm:text-sm flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                  <span>Welcome back, {client.name.split(' ')[0]}</span>
                  <span className="text-fg/25">•</span>
                  <span className="mono-font tabular-nums">
                    {now ? now.toLocaleDateString('en-IN') : '—'}
                  </span>
                  <span className="text-fg/25 hidden sm:inline">•</span>
                  <span className="mono-font tabular-nums hidden sm:inline">
                    {now ? now.toLocaleTimeString('en-IN') : ''}
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-accent-soft text-accent text-[11px] font-semibold">
                    {client.company ? 'Company' : 'Client'}
                  </span>
                </p>
              </div>
            </div>

            <form action={clientLogout}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 h-10 rounded-xl border border-fg/15 text-fg/60 text-sm font-medium hover:text-red-600 hover:border-red-400 transition-all"
              >
                <LogOut size={15} /> <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </header>

        {/* Content */}
        <div className="px-5 sm:px-8 py-6 sm:py-8">
          <div key={tab} className="tab-in">
            {tab === 'overview' && (
              <PortalOverview
                tickets={tickets}
                categories={categories}
                onRaise={() => setTab('raise')}
                onViewTickets={() => setTab('tickets')}
              />
            )}
            {tab === 'tickets' && <TicketTable tickets={tickets} />}
            {tab === 'raise' && (
              <RaiseTicketForm categories={categories} onSuccess={() => setTab('tickets')} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
