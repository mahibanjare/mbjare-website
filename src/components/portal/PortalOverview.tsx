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

const dotColor: Record<string, string> = {
  Open: 'bg-gold',
  'In Progress': 'bg-accent',
  Resolved: 'bg-green-500',
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
  const pct = total ? resolved / total : 0

  const tiles = [
    { label: 'Total', value: total, icon: Layers, tone: 'text-fg', ring: 'bg-fg/[0.06]' },
    { label: 'Open', value: open, icon: Inbox, tone: 'text-gold', ring: 'bg-gold/10' },
    { label: 'In Progress', value: progress, icon: Loader, tone: 'text-accent', ring: 'bg-accent-soft' },
    { label: 'Resolved', value: resolved, icon: CheckCircle2, tone: 'text-green-600', ring: 'bg-green-500/10' },
  ]

  // donut geometry
  const R = 34
  const C = 2 * Math.PI * R
  const recent = tickets.slice(0, 5)

  return (
    <div>
      {/* Greeting */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-7">
        <div>
          <h1 className="display-font text-2xl sm:text-3xl font-semibold text-fg">
            Namaste, {clientName.split(' ')[0]} 👋
          </h1>
          <p className="text-fg/45 text-sm mt-1">Yahan aapke sab support tickets ek jagah.</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] mono-font uppercase tracking-[0.15em] text-accent px-3 py-1.5 rounded-full border border-accent/25 bg-accent-soft">
          <Clock size={12} /> 2-hr reply
        </span>
      </div>

      {/* Progress ring + stat tiles */}
      <div className="grid lg:grid-cols-[auto_1fr] gap-4 mb-5">
        {/* Ring card */}
        <div className="glass-card p-6 flex items-center gap-5">
          <div className="relative w-[92px] h-[92px] shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r={R} fill="none" stroke="currentColor" strokeWidth="7" className="text-fg/10" />
              <circle
                cx="40"
                cy="40"
                r={R}
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                className="text-green-500 ring-anim"
                style={{ ['--circ' as string]: `${C}px`, strokeDasharray: `${pct * C} ${C}` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="display-font text-xl font-bold text-fg leading-none">
                {Math.round(pct * 100)}%
              </span>
              <span className="mono-font text-[8px] uppercase tracking-[0.15em] text-fg/40 mt-0.5">done</span>
            </div>
          </div>
          <div className="min-w-0">
            <div className="mono-font text-[10px] uppercase tracking-[0.15em] text-fg/45 mb-1">Resolution rate</div>
            <p className="text-fg text-sm leading-snug">
              {total === 0
                ? 'Abhi koi ticket nahi.'
                : resolved === total
                  ? 'Sab tickets resolved! 🎉'
                  : `${resolved} of ${total} tickets resolved.`}
            </p>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {tiles.map((s) => (
            <div key={s.label} className="glass-card p-4 flex flex-col justify-between">
              <div className={`w-9 h-9 rounded-xl ${s.ring} flex items-center justify-center mb-3`}>
                <s.icon size={16} className={s.tone} />
              </div>
              <div>
                <div className="display-font text-2xl font-bold text-fg leading-none">{s.value}</div>
                <div className="mono-font text-[9px] uppercase tracking-[0.14em] text-fg/40 mt-1.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent timeline + CTA */}
      <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-5 items-start">
        {/* Recent activity — timeline */}
        <div className="glass-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
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
            <div className="text-center py-10">
              <Inbox size={26} className="text-fg/25 mx-auto mb-3" />
              <p className="text-fg/45 text-sm mb-4">Abhi tak koi ticket nahi.</p>
              <button type="button" onClick={onRaise} className="btn-primary !py-2.5 !px-5 text-sm">
                <Plus size={14} /> Pehla ticket raise karein
              </button>
            </div>
          ) : (
            <ol className="relative pl-6">
              <span className="absolute left-[7px] top-1 bottom-1 w-px bg-fg/10" aria-hidden />
              {recent.map((t) => (
                <li key={t.id} className="relative mb-5 last:mb-0">
                  <span
                    className={`absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-bg-2 ${dotColor[t.status] ?? 'bg-fg/30'}`}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={onViewTickets}
                    className="w-full text-left group"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="mono-font text-[10px] text-fg/35">#{t.ticket_no} · {fmt(t.created_at)}</span>
                      <StatusBadge status={t.status} />
                    </div>
                    <p className="text-fg text-sm font-medium mt-0.5 truncate group-hover:text-accent transition-colors">
                      {t.subject}
                    </p>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* Quick raise CTA */}
        <div className="anchor-card p-6">
          <span className="foil-strip" aria-hidden />
          <MessageSquare size={22} className="text-gold-b mb-4" />
          <h3 className="display-font text-lg font-semibold text-fg mb-1.5">Koi nayi problem?</h3>
          <p className="text-fg/60 text-sm leading-relaxed mb-5">
            Service ya system se related koi bhi issue ho — ek ticket raise karein, hum turant dekhenge.
          </p>
          <button type="button" onClick={onRaise} className="btn-gold text-sm">
            <Plus size={15} /> Raise a Ticket
          </button>
        </div>
      </div>
    </div>
  )
}
