'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Pencil, Trash2, X, Upload, Search, Check, LogOut, ShieldCheck,
  Globe, Package, Briefcase, Star, HelpCircle, Users, LifeBuoy, type LucideIcon,
} from 'lucide-react'
import { saveRow, deleteRow, logout, uploadImage } from '@/app/admin/actions'
import type { Collection, Field } from '@/lib/adminSchema'

type Row = Record<string, unknown> & { id?: string }

const COLLECTION_ICON: Record<string, LucideIcon> = {
  mbjare_services: Globe,
  mbjare_packages: Package,
  mbjare_projects: Briefcase,
  mbjare_testimonials: Star,
  mbjare_faqs: HelpCircle,
  mbjare_clients: Users,
  mbjare_tickets: LifeBuoy,
}

const ticketStatusColor: Record<string, string> = {
  Open: 'border-gold/45 text-gold bg-gold/10',
  'In Progress': 'border-accent/45 text-accent bg-accent-soft',
  Resolved: 'border-green-500/45 text-green-600 bg-green-500/10',
}

function getValue(field: Field, row: Row): unknown {
  if (field.parent) {
    const p = row[field.parent]
    return p && typeof p === 'object' ? (p as Record<string, unknown>)[field.subKey!] : undefined
  }
  return row[field.key]
}

function toInput(field: Field, value: unknown): string {
  if (value === null || value === undefined) return ''
  if (field.type === 'lines') return Array.isArray(value) ? (value as string[]).join('\n') : ''
  if (field.type === 'json') return JSON.stringify(value, null, 2)
  return String(value)
}

function fromInput(field: Field, raw: string): unknown {
  const v = raw.trim()
  if (field.type === 'lines') return v ? v.split('\n').map((l) => l.trim()).filter(Boolean) : []
  if (field.type === 'json') {
    try {
      return v ? JSON.parse(v) : {}
    } catch {
      throw new Error(`"${field.label}" me valid JSON nahi hai`)
    }
  }
  if (field.type === 'number') return v ? Number(v) : 0
  return v || null
}

function ImageField({ field, initial }: { field: Field; initial: string }) {
  const [url, setUrl] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setErr('')
    setBusy(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await uploadImage(fd)
    setBusy(false)
    if ('error' in res) setErr(res.error)
    else setUrl(res.url)
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          name={field.key}
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={field.hint ?? 'URL ya upload karo →'}
          className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
        />
        <label className={`btn-ghost !py-2 !px-4 text-xs cursor-pointer shrink-0 ${busy ? 'opacity-50 pointer-events-none' : ''}`}>
          <Upload size={13} /> {busy ? 'Uploading…' : 'Upload'}
          <input type="file" accept="image/*" onChange={onFile} className="hidden" />
        </label>
      </div>
      {err && <p className="text-red-600 text-xs mt-2">{err}</p>}
      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="Preview" className="mt-3 h-20 rounded-lg border border-fg/10 object-cover" />
      )}
    </div>
  )
}

export default function AdminDashboard({
  collections,
  data,
}: {
  collections: Collection[]
  data: Record<string, Row[]>
}) {
  const router = useRouter()
  const [active, setActive] = useState(collections[0].table)
  const [editing, setEditing] = useState<Row | null>(null)
  const [status, setStatus] = useState('')
  const [query, setQuery] = useState('')
  const [now, setNow] = useState<Date | null>(null)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const col = collections.find((c) => c.table === active)!
  const rows = data[active] ?? []
  const totalEntries = collections.reduce((n, c) => n + (data[c.table]?.length ?? 0), 0)

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) =>
      [col.labelField, 'slug', 'email', 'client_name', 'status', 'ticket_no']
        .map((k) => String(r[k] ?? '').toLowerCase())
        .some((v) => v.includes(q)),
    )
  }, [rows, query, col])

  const submit = (form: FormData) => {
    setStatus('')
    let payload: Row
    try {
      payload = { ...(editing?.id ? { id: editing.id } : {}) }
      for (const f of col.fields) {
        const val = fromInput(f, String(form.get(f.key) ?? ''))
        if (f.parent) {
          const obj = (payload[f.parent] as Record<string, unknown> | undefined) ?? {}
          obj[f.subKey!] = val ?? ''
          payload[f.parent] = obj
        } else {
          payload[f.key] = val
        }
      }
    } catch (e) {
      setStatus((e as Error).message)
      return
    }
    startTransition(async () => {
      const err = await saveRow(col.table, payload)
      if (err) setStatus(err)
      else {
        setEditing(null)
        setStatus('saved')
        router.refresh()
        setTimeout(() => setStatus(''), 2500)
      }
    })
  }

  const remove = (row: Row) => {
    if (!row.id || !confirm(`Delete "${String(row[col.labelField] ?? row.id)}"?`)) return
    startTransition(async () => {
      const err = await deleteRow(col.table, row.id!)
      if (err) setStatus(err)
      else router.refresh()
    })
  }

  return (
    <div className="md:flex min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 lg:w-72 shrink-0 md:border-r border-fg/10 p-4 md:p-5 md:h-screen md:sticky md:top-0 md:overflow-y-auto bg-bg-2/40">
        {/* Brand card */}
        <div className="glass-card p-4 flex items-center gap-3 mb-4">
          <div className="brand-icon w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-fg text-sm truncate leading-tight">Mbjare InfoTech</div>
            <div className="text-xs text-accent font-medium">Content Studio</div>
            <div className="inline-flex items-center gap-1.5 mt-1.5 text-[11px] text-fg/45">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {totalEntries} entries
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible pb-1 md:pb-0">
          {collections.map((c) => {
            const Icon = COLLECTION_ICON[c.table] ?? Globe
            const on = active === c.table
            return (
              <button
                key={c.table}
                type="button"
                onClick={() => { setActive(c.table); setEditing(null); setQuery('') }}
                aria-current={on ? 'page' : undefined}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 md:w-full ${
                  on
                    ? 'brand-icon text-white shadow-[0_10px_24px_-8px_var(--glow)]'
                    : 'text-fg/60 hover:text-fg hover:bg-fg/[0.04]'
                }`}
              >
                <Icon size={17} className={on ? 'text-white' : 'text-fg/45'} />
                {c.title}
                <span className={`ml-auto text-[11px] mono-font px-1.5 py-0.5 rounded-md ${on ? 'bg-white/20 text-white' : 'text-fg/35'}`}>
                  {(data[c.table] ?? []).length}
                </span>
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-bg/85 backdrop-blur-xl border-b border-fg/[0.08]">
          <div className="px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="brand-icon w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                {(() => {
                  const Icon = COLLECTION_ICON[col.table] ?? Globe
                  return <Icon size={20} />
                })()}
              </div>
              <div className="min-w-0">
                <h1 className="brand-title display-font text-xl sm:text-2xl font-bold leading-tight">{col.title}</h1>
                <p className="text-fg/50 text-xs sm:text-sm flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                  <span>Content Studio</span>
                  <span className="text-fg/25">•</span>
                  <span className="mono-font tabular-nums">{now ? now.toLocaleDateString('en-IN') : '—'}</span>
                  <span className="text-fg/25 hidden sm:inline">•</span>
                  <span className="mono-font tabular-nums hidden sm:inline">{now ? now.toLocaleTimeString('en-IN') : ''}</span>
                </p>
              </div>
            </div>
            <form action={logout}>
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
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <p className="text-fg/45 text-sm">{shown.length} of {rows.length} shown</p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg/35" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-bg-2 border border-fg/12 text-fg text-sm shadow-sm focus:outline-none focus:border-accent"
                />
              </div>
              {!col.noCreate && (
                <button
                  type="button"
                  onClick={() => { setEditing({}); setStatus('') }}
                  className="btn-primary !py-2 !px-4 text-sm shrink-0"
                >
                  <Plus size={15} /> <span className="hidden sm:inline">Add</span>
                </button>
              )}
            </div>
          </div>

          {status && status !== 'saved' && <p className="text-sm mb-4 text-red-600">{status}</p>}

          {/* Rows */}
          {shown.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <p className="text-fg/45 text-sm">
                {rows.length === 0
                  ? col.noCreate
                    ? 'Abhi koi ticket nahi aayi.'
                    : 'Abhi koi entry nahi — site checked-in content use kar rahi hai. “Add” se pehli entry banao.'
                  : `“${query}” ke liye kuch nahi mila.`}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 pb-20">
              {shown.map((row) => {
                const isTicket = 'client_name' in row
                return (
                  <div key={String(row.id)} className="glass-card px-4 sm:px-5 py-3.5 flex items-center justify-between gap-4 group">
                    <button
                      type="button"
                      onClick={() => { setEditing(row); setStatus('') }}
                      className="flex items-center gap-3.5 min-w-0 flex-1 text-left"
                    >
                      {isTicket && <span className="mono-font text-[11px] text-fg/35 shrink-0">#{String(row.ticket_no)}</span>}
                      <div className="min-w-0">
                        <span className="text-fg text-sm font-medium truncate block group-hover:text-accent transition-colors">
                          {String(row[col.labelField] ?? '(untitled)')}
                        </span>
                        {'slug' in row && <span className="mono-font text-[10px] text-fg/35">/{String(row.slug)}</span>}
                        {isTicket && <span className="mono-font text-[10px] text-fg/35">{String(row.client_name ?? '')}</span>}
                        {'email' in row && !isTicket && <span className="mono-font text-[10px] text-fg/35">{String(row.email ?? '')}</span>}
                      </div>
                    </button>
                    <div className="flex items-center gap-2 shrink-0">
                      {isTicket && (
                        <span className={`hidden sm:inline mono-font text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border ${ticketStatusColor[String(row.status)] ?? 'border-fg/20 text-fg/50'}`}>
                          {String(row.status)}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => { setEditing(row); setStatus('') }}
                        aria-label="Edit"
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-fg/15 text-fg/55 hover:text-accent hover:border-accent/50 transition-all"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(row)}
                        aria-label="Delete"
                        className="w-9 h-9 flex items-center justify-center rounded-full border border-fg/15 text-fg/55 hover:text-red-600 hover:border-red-400 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      {/* Slide-over editor */}
      {editing !== null && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm fade-in" onClick={() => setEditing(null)} />
          <form action={submit} className="relative w-full max-w-xl h-full bg-bg-2 border-l border-fg/10 overflow-y-auto shadow-2xl drawer-in">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-bg-2/95 backdrop-blur border-b border-fg/10">
              <h2 className="display-font text-lg font-semibold text-fg">
                {editing.id ? 'Edit' : 'New'} · {col.title.replace(/s$/, '')}
              </h2>
              <button type="button" onClick={() => setEditing(null)} aria-label="Close" className="w-9 h-9 flex items-center justify-center rounded-full border border-fg/15 text-fg/50 hover:text-fg transition-all">
                <X size={16} />
              </button>
            </div>
            <div className="px-6 py-6 grid sm:grid-cols-2 gap-5">
              {col.fields.map((f) => (
                <label key={f.key} className={`block ${f.type === 'textarea' || f.type === 'lines' || f.type === 'json' || f.type === 'image' ? 'sm:col-span-2' : ''}`}>
                  <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">{f.label}</span>
                  {f.type === 'image' ? (
                    <ImageField field={f} initial={toInput(f, getValue(f, editing))} />
                  ) : f.type === 'text' || f.type === 'number' ? (
                    <input
                      name={f.key}
                      type={f.type === 'number' ? 'number' : 'text'}
                      defaultValue={toInput(f, getValue(f, editing))}
                      placeholder={f.hint}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
                    />
                  ) : (
                    <textarea
                      name={f.key}
                      rows={f.type === 'json' ? 5 : 4}
                      defaultValue={toInput(f, getValue(f, editing))}
                      placeholder={f.hint}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent ${f.type === 'json' ? 'mono-font text-xs' : ''}`}
                    />
                  )}
                </label>
              ))}
            </div>
            <div className="sticky bottom-0 flex items-center gap-3 px-6 py-4 bg-bg-2/95 backdrop-blur border-t border-fg/10">
              <button type="submit" disabled={pending} className="btn-primary !py-2.5 !px-6 text-sm disabled:opacity-50">
                {pending ? 'Saving…' : 'Save changes'}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="btn-ghost !py-2.5 !px-6 text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Saved toast */}
      {status === 'saved' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-fg text-bg-2 text-sm font-medium shadow-2xl fade-in">
          <Check size={15} /> Saved — site 1 second me update
        </div>
      )}
    </div>
  )
}
