'use client'

import { useState } from 'react'
import { LayoutDashboard, Table2, PlusCircle } from 'lucide-react'
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
      <aside className="w-full md:w-52 lg:w-56 shrink-0 md:sticky md:top-24">
        <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
          {NAV.map((n) => {
            const active = tab === n.key
            const count = n.key === 'tickets' ? tickets.length : undefined
            return (
              <button
                key={n.key}
                type="button"
                onClick={() => setTab(n.key)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all shrink-0 md:w-full ${
                  active
                    ? 'bg-accent text-[#fffdf8] shadow-[var(--sh)]'
                    : 'text-fg/55 hover:text-fg hover:bg-fg/[0.04] border border-transparent md:border-fg/10'
                }`}
              >
                <n.icon size={16} />
                {n.label}
                {count !== undefined && (
                  <span className={`ml-auto text-[11px] mono-font ${active ? 'text-[#fffdf8]/70' : 'text-fg/35'}`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Content */}
      <section className="flex-1 min-w-0 w-full">
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
      </section>
    </div>
  )
}
