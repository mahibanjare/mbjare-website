'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, LogOut, X } from 'lucide-react'
import { saveRow, deleteRow, logout } from '@/app/admin/actions'
import type { Collection, Field } from '@/lib/adminSchema'

type Row = Record<string, unknown> & { id?: string }

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
  const [pending, startTransition] = useTransition()

  const col = collections.find((c) => c.table === active)!
  const rows = data[active] ?? []

  const submit = (form: FormData) => {
    setStatus('')
    let payload: Row
    try {
      payload = { ...(editing?.id ? { id: editing.id } : {}) }
      for (const f of col.fields) payload[f.key] = fromInput(f, String(form.get(f.key) ?? ''))
    } catch (e) {
      setStatus((e as Error).message)
      return
    }
    startTransition(async () => {
      const err = await saveRow(col.table, payload)
      if (err) setStatus(err)
      else {
        setEditing(null)
        setStatus('Saved ✓ — site 1 second me update ho jayegi')
        router.refresh()
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
    <div className="max-w-5xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="display-font text-3xl font-semibold text-fg">Content Admin</h1>
        <button type="button" onClick={() => logout()} className="btn-ghost !py-2 !px-4 text-xs">
          <LogOut size={13} /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {collections.map((c) => (
          <button
            key={c.table}
            type="button"
            onClick={() => {
              setActive(c.table)
              setEditing(null)
              setStatus('')
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active === c.table
                ? 'bg-accent text-[#fffdf8]'
                : 'border border-fg/15 text-fg/55 hover:text-fg'
            }`}
          >
            {c.title} ({(data[c.table] ?? []).length})
          </button>
        ))}
      </div>

      {status && <p className="text-sm mb-5 text-accent font-medium">{status}</p>}

      {/* Editor */}
      {editing !== null ? (
        <form action={submit} className="glass-card p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="display-font text-xl font-semibold text-fg">
              {editing.id ? 'Edit' : 'New'} — {col.title}
            </h2>
            <button type="button" onClick={() => setEditing(null)} aria-label="Close" className="text-fg/40 hover:text-fg">
              <X size={18} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {col.fields.map((f) => (
              <label key={f.key} className={`block ${f.type === 'textarea' || f.type === 'lines' || f.type === 'json' ? 'md:col-span-2' : ''}`}>
                <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
                  {f.label}
                </span>
                {f.type === 'text' || f.type === 'number' ? (
                  <input
                    name={f.key}
                    type={f.type === 'number' ? 'number' : 'text'}
                    defaultValue={toInput(f, editing[f.key])}
                    placeholder={f.hint}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
                  />
                ) : (
                  <textarea
                    name={f.key}
                    rows={f.type === 'json' ? 5 : 4}
                    defaultValue={toInput(f, editing[f.key])}
                    placeholder={f.hint}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent ${f.type === 'json' ? 'mono-font text-xs' : ''}`}
                  />
                )}
              </label>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button type="submit" disabled={pending} className="btn-primary !py-2.5 !px-6 text-sm disabled:opacity-50">
              {pending ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="btn-ghost !py-2.5 !px-6 text-sm">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button type="button" onClick={() => setEditing({})} className="btn-primary !py-2.5 !px-5 text-sm mb-6">
          <Plus size={15} /> Add {col.title.replace(/s$/, '')}
        </button>
      )}

      {/* Rows */}
      <div className="space-y-2.5 pb-24">
        {rows.length === 0 && (
          <p className="text-fg/40 text-sm">
            Abhi koi row nahi — site checked-in content use kar rahi hai. &ldquo;Add&rdquo; se pehli entry banao.
          </p>
        )}
        {rows.map((row) => (
          <div key={String(row.id)} className="glass-card px-5 py-3.5 flex items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="text-fg text-sm font-medium truncate block">
                {String(row[col.labelField] ?? '(untitled)')}
              </span>
              {'slug' in row && <span className="mono-font text-[10px] text-fg/35">{String(row.slug)}</span>}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setEditing(row)
                  setStatus('')
                }}
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
        ))}
      </div>
    </div>
  )
}
