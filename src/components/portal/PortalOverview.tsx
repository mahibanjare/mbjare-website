'use client'

import { Inbox, Loader, CheckCircle2, Layers, ArrowRight, Plus, Clock, MessageSquare } from 'lucide-react'
import type { Ticket } from '@/types/content'
import StatusBadge from './StatusBadge'

function fmt(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
  } catch {
    return d
  }
}

export default function PortalOverview({
  clientName,
  tickets,
  onRaise,
  onViewTickets,
}: {
  clientName: string
  tickets: Ticket[]
  onRaise: () => void
  onViewTickets: () => void
}) {
  const open = tickets.filter((t) => t.status === 'Open').length
  const progress = tickets.filter((t) => t.status === 'In Progress').length
  const resolved = tickets.filter((t) => t.status === 'Resolved').length
  const total = tickets.length

  const stats = [
    { label: 'Total', value: total, icon: Layers, tone: 'text-fg', ring: 'bg-fg/[0.06]' },
    { label: 'Open', value: open, icon: Inbox, tone: 'text-gold', ring: 'bg-gold/10' },
    { label: 'In Progress', value: progress, icon: Loader, tone: 'text-accent', ring: 'bg-accent-soft' },
    { label: 'Resolved', value: resolved, icon: CheckCircle2, tone: 'text-green-600', ring: 'bg-green-500/10' },
  ]

  const segs = [
    { n: open, cls: 'bg-gold' },
    { n: progress, cls: 'bg-accent' },
    { n: resolved, cls: 'bg-green-500' },
  ].filter((s) => s.n > 0)

  const recent = tickets.slice(0, 4)

  return (
    <div>
      {/* Greeting */}
      <div className="mb-7">
        <h1 className="display-font text-2xl sm:text-3xl font-semibold text-fg">
          Namaste, {clientName.split(' ')[0]} 👋
        </h1>
        <p className="text-fg/45 text-sm mt-1 flex items-center gap-1.5">
          <Clock size={13} className="text-accent" /> Hum har request ka reply 2 ghante ke andar dete hain.
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-4 sm:p-5">
            <div className={`w-9 h-9 rounded-xl ${s.ring} flex items-center justify-center mb-3`}>
              <s.icon size={17} className={s.tone} />
            </div>
            <div className="display-font text-2xl sm:text-3xl font-bold text-fg leading-none">{s.value}</div>
            <div className="mono-font text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-fg/40 mt-1.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Status distribution bar */}
      {total > 0 && (
        <div className="glass-card p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="mono-font text-[10px] uppercase tracking-[0.15em] text-fg/45">
              Status breakdown
            </span>
            <span className="mono-font text-[10px] text-fg/40">
              {Math.round((resolved / total) * 100)}% resolved
            </span>
          </div>
          <div className="flex h-2.5 rounded-full overflow-hidden bg-fg/[0.06] mb-3">
            {segs.map((s, i) => (
              <div key={i} className={s.cls} style={{ width: `${(s.n / total) * 100}%` }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[11px] text-fg/50">
            <span className="inline-flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-gold" /> Open {open}</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-accent" /> In Progress {progress}</span>
            <span className="inline-flex items-center gap-1.5"><i className="w-2 h-2 rounded-full bg-green-500" /> Resolved {resolved}</span>
          </div>
        </div>
      )}

      {/* Recent + CTA */}
      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-5 items-start">
        {/* Recent tickets */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="display-font text-lg font-semibold text-fg">Recent activity</h2>
            {total > 0 && (
              <button
                type="button"
                onClick={onViewTickets}
                className="text-xs text-accent hover:text-fg transition-colors inline-flex items-center gap-1"
              >
                View all <ArrowRight size={12} />
              </button>
            )}
          </div>
          {recent.length === 0 ? (
            <div className="text-center py-8">
              <Inbox size={24} className="text-fg/25 mx-auto mb-2" />
              <p className="text-fg/45 text-sm">Abhi koi ticket nahi.</p>
            </div>
          ) : (
            <ul className="divide-y divide-fg/[0.06]">
              {recent.map((t) => (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={onViewTickets}
                    className="w-full text-left py-3 flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0">
                      <span className="mono-font text-[10px] text-fg/35">#{t.ticket_no}</span>
                      <p className="text-fg text-sm font-medium truncate group-hover:text-accent transition-colors">
                        {t.subject}
                      </p>
                      <span className="mono-font text-[10px] text-fg/35">{fmt(t.created_at)}</span>
                    </div>
                    <StatusBadge status={t.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick raise CTA */}
        <div className="anchor-card p-6">
          <span className="foil-strip" aria-hidden />
          <MessageSquare size={22} className="text-gold-b mb-4" />
          <h3 className="display-font text-lg font-semibold text-fg mb-1.5">Koi nayi problem?</h3>
          <p className="text-fg/60 text-sm leading-relaxed mb-5">
            Apni service ya system se related koi bhi issue ho — ek ticket raise karein, hum turant dekhenge.
          </p>
          <button type="button" onClick={onRaise} className="btn-gold text-sm">
            <Plus size={15} /> Raise a Ticket
          </button>
        </div>
      </div>
    </div>
  )
}
