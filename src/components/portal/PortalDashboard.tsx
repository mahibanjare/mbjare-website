'use client'

import { useState } from 'react'
import { LayoutDashboard, Table2, PlusCircle, MessageCircle } from 'lucide-react'
import type { Client, Ticket } from '@/types/content'
import PortalOverview from './PortalOverview'
import RaiseTicketForm from './RaiseTicketForm'
import TicketTable from './TicketTable'

const NAV = [
  { key: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'tickets', label: 'My Tickets', icon: Table2 },
  { key: 'raise', label: 'Raise Ticket', icon: PlusCircle },
] as const

type TabKey = (typeof NAV)[number]['key']

export default function PortalDashboard({
  client,
  tickets,
  categories,
}: {
  client: Client
  tickets: Ticket[]
  categories: string[]
}) {
  const [tab, setTab] = useState<TabKey>('overview')

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
      {/* Sidebar */}
      <aside className="w-full md:w-52 lg:w-60 shrink-0 md:sticky md:top-24">
        <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
          {NAV.map((n) => {
            const active = tab === n.key
            const count = n.key === 'tickets' ? tickets.length : undefined
            return (
              <button
                key={n.key}
                type="button"
                onClick={() => setTab(n.key)}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 md:w-full ${
                  active ? 'text-fg bg-fg/[0.05]' : 'text-fg/50 hover:text-fg hover:bg-fg/[0.03]'
                }`}
              >
                {/* Active rail (desktop) */}
                <span
                  className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full bg-accent transition-all duration-300 ${
                    active ? 'h-5 opacity-100' : 'h-0 opacity-0'
                  }`}
                  aria-hidden
                />
                <n.icon
                  size={17}
                  className={active ? 'text-accent' : 'text-fg/40 group-hover:text-fg/70'}
                />
                {n.label}
                {count !== undefined && (
                  <span
                    className={`ml-auto text-[11px] mono-font px-1.5 py-0.5 rounded-md ${
                      active ? 'bg-accent/15 text-accent' : 'text-fg/35'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Help card (desktop) */}
        <a
          href="https://wa.me/918815223300"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex mt-4 glass-card p-4 flex-col gap-2 hover:border-accent/30 transition-colors"
        >
          <MessageCircle size={18} className="text-accent" />
          <span className="text-fg text-sm font-medium leading-snug">Turant madad chahiye?</span>
          <span className="text-fg/45 text-xs leading-relaxed">WhatsApp par humein message karein — 2 ghante me reply.</span>
        </a>
      </aside>

      {/* Content */}
      <section className="flex-1 min-w-0 w-full">
        <div key={tab} className="tab-in">
          {tab === 'overview' && (
            <PortalOverview
              clientName={client.name}
              tickets={tickets}
              onRaise={() => setTab('raise')}
              onViewTickets={() => setTab('tickets')}
            />
          )}
          {tab === 'tickets' && <TicketTable tickets={tickets} />}
          {tab === 'raise' && (
            <RaiseTicketForm categories={categories} onSuccess={() => setTab('tickets')} />
          )}
        </div>
      </section>
    </div>
  )
}
