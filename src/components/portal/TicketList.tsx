'use client'

import { useState } from 'react'
import { Clock, User2, Tag, AlertCircle, Inbox } from 'lucide-react'
import type { Ticket } from '@/types/content'
import StatusBadge from './StatusBadge'

const priorityColor: Record<string, string> = {
  High: 'text-red-600',
  Medium: 'text-gold',
  Low: 'text-fg/45',
}

const statusRail: Record<string, string> = {
  Open: 'before:bg-gold',
  'In Progress': 'before:bg-accent',
  Resolved: 'before:bg-green-500',
}

function fmt(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return d
  }
}

const FILTERS = ['All', 'Open', 'In Progress', 'Resolved'] as const

export default function TicketList({ tickets }: { tickets: Ticket[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

  const counts = {
    All: tickets.length,
    Open: tickets.filter((t) => t.status === 'Open').length,
    'In Progress': tickets.filter((t) => t.status === 'In Progress').length,
    Resolved: tickets.filter((t) => t.status === 'Resolved').length,
  }

  const shown = filter === 'All' ? tickets : tickets.filter((t) => t.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="display-font text-xl font-semibold text-fg">Aapke tickets</h2>
        <span className="mono-font text-[11px] text-fg/40">{tickets.length} total</span>
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
        <div className="glass-card p-8 text-center">
          <Inbox size={26} className="text-fg/25 mx-auto mb-3" />
          <p className="text-fg/45 text-sm">
            {tickets.length === 0
              ? 'Abhi koi ticket nahi. Upar se apna pehla ticket raise karein.'
              : `Koi "${filter}" ticket nahi.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {shown.map((t) => (
            <div
              key={t.id}
              className={`glass-card p-5 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 ${statusRail[t.status] ?? 'before:bg-fg/20'}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2 pl-2">
                <div className="min-w-0">
                  <span className="mono-font text-[10px] text-fg/35">#{t.ticket_no}</span>
                  <h3 className="display-font font-semibold text-fg text-[15px] leading-snug">
                    {t.subject}
                  </h3>
                </div>
                <StatusBadge status={t.status} />
              </div>

              <p className="text-fg/55 text-xs leading-relaxed mb-3 pl-2">{t.description}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-fg/45 pl-2">
                <span className="inline-flex items-center gap-1">
                  <Tag size={11} /> {t.category}
                </span>
                <span className={`inline-flex items-center gap-1 ${priorityColor[t.priority] ?? ''}`}>
                  <AlertCircle size={11} /> {t.priority}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} /> {fmt(t.created_at)}
                </span>
                {t.assigned_to && (
                  <span className="inline-flex items-center gap-1">
                    <User2 size={11} /> {t.assigned_to}
                  </span>
                )}
              </div>

              {t.status === 'Resolved' && t.resolution && (
                <div className="mt-3 ml-2 p-3 rounded-xl bg-green-500/[0.06] border border-green-500/20">
                  <p className="text-fg/70 text-xs leading-relaxed">
                    <span className="text-green-600 font-semibold">Resolved: </span>
                    {t.resolution}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
