'use client'

import { useEffect, useMemo, useState } from 'react'
import { Users2, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, Plus, Inbox } from 'lucide-react'
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
  Open: 'bg-amber-500',
  'In Progress': 'bg-blue-500',
  Resolved: 'bg-green-500',
}

/* Lightweight SVG area chart — no dependencies */
function AreaChart({ data }: { data: number[] }) {
  const W = 320
  const H = 120
  const pad = 8
  const max = Math.max(1, ...data)
  const step = data.length > 1 ? (W - pad * 2) / (data.length - 1) : 0
  const pts = data.map((v, i) => [pad + i * step, H - pad - (v / max) * (H - pad * 2 - 6)] as const)
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const area = `${line} L${(pad + (data.length - 1) * step).toFixed(1)} ${H - pad} L${pad} ${H - pad} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-36">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(37,99,235)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(37,99,235)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={pad} x2={W - pad} y1={pad + g * (H - pad * 2)} y2={pad + g * (H - pad * 2)} stroke="currentColor" className="text-fg/10" strokeDasharray="3 4" />
      ))}
      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="rgb(79,70,229)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="2.5" fill="rgb(79,70,229)" />
      ))}
    </svg>
  )
}

export default function PortalOverview({
  tickets,
  categories,
  onRaise,
  onViewTickets,
}: {
  tickets: Ticket[]
  categories: string[]
  onRaise: () => void
  onViewTickets: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const [fType, setFType] = useState('All')
  const [fStatus, setFStatus] = useState('All')
  const [fPriority, setFPriority] = useState('All')

  useEffect(() => setMounted(true), [])

  const filtered = useMemo(
    () =>
      tickets
        .filter((t) => fType === 'All' || t.category === fType)
        .filter((t) => fStatus === 'All' || t.status === fStatus)
        .filter((t) => fPriority === 'All' || t.priority === fPriority),
    [tickets, fType, fStatus, fPriority],
  )

  const total = filtered.length
  const resolved = filtered.filter((t) => t.status === 'Resolved').length
  const pending = filtered.filter((t) => t.status !== 'Resolved').length
  const pct = total ? resolved / total : 0

  // last 7 days activity
  const buckets = useMemo(() => {
    if (!mounted) return new Array(7).fill(0)
    const days = new Array(7).fill(0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    for (const t of filtered) {
      const d = new Date(t.created_at)
      d.setHours(0, 0, 0, 0)
      const diff = Math.round((today.getTime() - d.getTime()) / 86400000)
      if (diff >= 0 && diff < 7) days[6 - diff] += 1
    }
    return days
  }, [filtered, mounted])

  const cards = [
    { label: 'Total Tickets', value: total, icon: Users2, grad: 'from-blue-500 to-blue-600', up: true },
    { label: 'Resolved', value: resolved, icon: CheckCircle2, grad: 'from-emerald-500 to-green-600', up: true },
    { label: 'Pending Issues', value: pending, icon: AlertTriangle, grad: 'from-rose-500 to-red-600', up: pending === 0 },
  ]

  const R = 34
  const C = 2 * Math.PI * R
  const recent = filtered.slice(0, 4)

  const selectCls =
    'w-full px-4 py-3 rounded-2xl bg-bg-2 border border-fg/12 text-fg text-sm font-medium shadow-sm focus:outline-none focus:border-accent'

  return (
    <div>
      {/* Filters */}
      <div className="glass-card p-3 sm:p-4 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select value={fType} onChange={(e) => setFType(e.target.value)} className={selectCls}>
          <option value="All">All Type of Work</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={fStatus} onChange={(e) => setFStatus(e.target.value)} className={selectCls}>
          {['All', 'Open', 'In Progress', 'Resolved'].map((s) => (
            <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>
          ))}
        </select>
        <select value={fPriority} onChange={(e) => setFPriority(e.target.value)} className={selectCls}>
          {['All', 'Low', 'Medium', 'High'].map((p) => (
            <option key={p} value={p}>{p === 'All' ? 'All Priority' : p}</option>
          ))}
        </select>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6">
        {cards.map((s) => (
          <div key={s.label} className="glass-card p-5 sm:p-6 relative">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-white shadow-lg mb-4`}>
              <s.icon size={22} />
            </div>
            <div className="absolute top-6 right-6">
              {s.up ? (
                <TrendingUp size={18} className="text-green-500" />
              ) : (
                <TrendingDown size={18} className="text-red-500" />
              )}
            </div>
            <div className="text-fg/50 text-sm mb-1">{s.label}</div>
            <div className="display-font text-4xl font-bold text-fg leading-none">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Activity */}
        <div className="glass-card p-5 sm:p-6">
          <h2 className="display-font text-lg font-semibold text-fg mb-1">Ticket Activity</h2>
          <p className="text-fg/40 text-xs mb-4">Last 7 days</p>
          {total === 0 ? (
            <div className="h-36 flex items-center justify-center text-fg/35 text-sm">Koi data nahi</div>
          ) : (
            <AreaChart data={buckets} />
          )}
        </div>

        {/* Resolution donut */}
        <div className="glass-card p-5 sm:p-6 flex items-center gap-6">
          <div className="relative w-[120px] h-[120px] shrink-0">
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r={R} fill="none" stroke="currentColor" strokeWidth="8" className="text-fg/10" />
              <circle
                cx="40" cy="40" r={R} fill="none" stroke="rgb(34,197,94)" strokeWidth="8" strokeLinecap="round"
                className="ring-anim"
                style={{ ['--circ' as string]: `${C}px`, strokeDasharray: `${pct * C} ${C}` }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="display-font text-2xl font-bold text-fg leading-none">{Math.round(pct * 100)}%</span>
              <span className="mono-font text-[9px] uppercase tracking-[0.15em] text-fg/40 mt-1">done</span>
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="display-font text-lg font-semibold text-fg mb-2">Resolution Status</h2>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-center gap-2 text-fg/60"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Resolved <span className="ml-auto font-semibold text-fg">{resolved}</span></li>
              <li className="flex items-center gap-2 text-fg/60"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending <span className="ml-auto font-semibold text-fg">{pending}</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent */}
      <div className="glass-card p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="display-font text-lg font-semibold text-fg">Recent activity</h2>
          {total > 0 && (
            <button type="button" onClick={onViewTickets} className="text-xs text-blue-600 hover:text-fg transition-colors inline-flex items-center gap-1 font-medium">
              View all <ArrowRight size={12} />
            </button>
          )}
        </div>
        {recent.length === 0 ? (
          <div className="text-center py-8">
            <Inbox size={26} className="text-fg/25 mx-auto mb-3" />
            <p className="text-fg/45 text-sm mb-4">Koi ticket nahi mila.</p>
            <button type="button" onClick={onRaise} className="btn-primary !py-2.5 !px-5 text-sm">
              <Plus size={14} /> Generate Ticket
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-fg/[0.06]">
            {recent.map((t) => (
              <li key={t.id}>
                <button type="button" onClick={onViewTickets} className="w-full text-left py-3 flex items-center gap-3 group">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor[t.status] ?? 'bg-fg/30'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-fg text-sm font-medium truncate group-hover:text-blue-600 transition-colors">{t.subject}</p>
                    <span className="mono-font text-[10px] text-fg/35">#{t.ticket_no} · {fmt(t.created_at)}</span>
                  </div>
                  <StatusBadge status={t.status} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
