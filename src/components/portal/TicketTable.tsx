'use client'

import { Fragment, useMemo, useState } from 'react'
import { ChevronDown, Inbox, Search } from 'lucide-react'
import type { Ticket } from '@/types/content'
import StatusBadge from './StatusBadge'

const priorityColor: Record<string, string> = {
  High: 'text-red-600',
  Medium: 'text-gold',
  Low: 'text-fg/45',
}

function fmt(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return d
  }
}

const FILTERS = ['All', 'Open', 'In Progress', 'Resolved'] as const

export default function TicketTable({ tickets }: { tickets: Ticket[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(null)

  const counts = {
    All: tickets.length,
    Open: tickets.filter((t) => t.status === 'Open').length,
    'In Progress': tickets.filter((t) => t.status === 'In Progress').length,
    Resolved: tickets.filter((t) => t.status === 'Resolved').length,
  }

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tickets
      .filter((t) => filter === 'All' || t.status === filter)
      .filter(
        (t) =>
          !q ||
          t.subject.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          String(t.ticket_no).includes(q),
      )
  }, [tickets, filter, query])

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="display-font text-xl font-semibold text-fg">Aapke tickets</h2>
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search subject, #, category…"
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-bg border border-fg/15 text-fg text-sm transition-colors focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              filter === f
                ? 'bg-accent text-[#fffdf8]'
                : 'border border-fg/15 text-fg/55 hover:text-fg hover:border-fg/30'
            }`}
          >
            {f} <span className={filter === f ? 'text-[#fffdf8]/70' : 'text-fg/35'}>{counts[f]}</span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="glass-card p-10 text-center">
          <Inbox size={26} className="text-fg/25 mx-auto mb-3" />
          <p className="text-fg/45 text-sm">
            {tickets.length === 0
              ? 'Abhi koi ticket nahi. “Raise Ticket” tab se apna pehla ticket banayein.'
              : query
                ? `“${query}” ke liye koi ticket nahi mila.`
                : `Koi “${filter}” ticket nahi.`}
          </p>
        </div>
      ) : (
        <div className="glass-card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-fg/10 text-left bg-fg/[0.02]">
                  {['#', 'Subject', 'Category', 'Priority', 'Status', 'Raised', 'Assigned'].map((h) => (
                    <th
                      key={h}
                      className="mono-font text-[10px] uppercase tracking-[0.15em] text-fg/40 font-medium py-3.5 px-3 first:pl-5"
                    >
                      {h}
                    </th>
                  ))}
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {shown.map((t) => {
                  const isOpen = open === t.id
                  return (
                    <Fragment key={t.id}>
                      <tr
                        onClick={() => setOpen(isOpen ? null : t.id)}
                        className={`border-b border-fg/[0.06] cursor-pointer transition-colors ${isOpen ? 'bg-bg-2' : 'hover:bg-bg-2'}`}
                      >
                        <td className="py-3.5 pl-5 pr-3 mono-font text-xs text-fg/40">{t.ticket_no}</td>
                        <td className="py-3.5 px-3 text-fg font-medium max-w-[220px] truncate">{t.subject}</td>
                        <td className="py-3.5 px-3 text-fg/55 whitespace-nowrap">{t.category}</td>
                        <td className={`py-3.5 px-3 whitespace-nowrap font-medium ${priorityColor[t.priority] ?? ''}`}>
                          {t.priority}
                        </td>
                        <td className="py-3.5 px-3"><StatusBadge status={t.status} /></td>
                        <td className="py-3.5 px-3 text-fg/45 whitespace-nowrap">{fmt(t.created_at)}</td>
                        <td className="py-3.5 px-3 pr-3 text-fg/55 whitespace-nowrap">{t.assigned_to || '—'}</td>
                        <td className="pr-4">
                          <ChevronDown size={15} className={`text-fg/35 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </td>
                      </tr>
                      {isOpen && (
                        <tr className="border-b border-fg/[0.06] bg-bg-2/60">
                          <td colSpan={8} className="px-5 py-4">
                            <p className="mono-font text-[10px] uppercase tracking-[0.15em] text-fg/40 mb-1.5">Details</p>
                            <p className="text-fg/70 text-sm leading-relaxed mb-3">{t.description}</p>
                            {t.status === 'Resolved' && t.resolution && (
                              <div className="p-3 rounded-xl bg-green-500/[0.06] border border-green-500/20">
                                <p className="text-fg/70 text-sm leading-relaxed">
                                  <span className="text-green-600 font-semibold">Resolved: </span>
                                  {t.resolution}
                                </p>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
