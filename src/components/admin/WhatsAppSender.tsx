'use client'

import { useMemo, useState, useSyncExternalStore } from 'react'
import { Check, MessageCircle, RotateCcw } from 'lucide-react'
import CopyButton from '@/components/admin/CopyButton'

type Person = { ticket: string; name: string; mobile: string; business: string }

const STORE = 'garba-wa-sent'

/* "Sent" ticks live in localStorage (per browser); this tiny store lets React read them without effects. */
const listeners = new Set<() => void>()
const subscribe = (fn: () => void) => {
  listeners.add(fn)
  window.addEventListener('storage', fn)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', fn)
  }
}
const readStore = (key: string) => {
  try {
    return localStorage.getItem(key) || '{}'
  } catch {
    return '{}'
  }
}
const writeStore = (key: string, value: string | null) => {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
  } catch {}
  listeners.forEach((fn) => fn())
}

const templates = (resultUrl: string, winner: string) => ({
  morning: {
    label: '☀️ सुबह 8 बजे — Winner ~3 बजे',
    text: `🙏 नमस्ते {name} जी!

आपकी *Mbjare गरबा Lucky Draw* entry पक्की है ✅
🎟 आपका Lucky Number: *{ticket}*

🏆 Winner आज *20 Oct (दशहरा), दोपहर ~3 बजे* घोषित किया जाएगा।
👉 Live result यहाँ देखें: ${resultUrl}

🎬 इनाम: 3 Reels का FREE Mobile Shoot
— Team Mbjare · 8815223300`,
  },
  result: {
    label: '🏆 Result के बाद',
    text: `🙏 नमस्ते {name} जी!

*Mbjare गरबा Lucky Draw* का result आ गया है 🎉
🏆 Winner: *${winner || '—'}*
🎟 आपका Lucky Number था: {ticket}

पूरा result और सारे participants यहाँ देखें: ${resultUrl}

भाग लेने के लिए धन्यवाद! अपने business की Website, Social Media या WhatsApp Automation के लिए free consultation: 8815223300
— Team Mbjare`,
  },
})

/** Same message without the personal parts — for a WhatsApp group / broadcast list. */
const broadcast = (tpl: string) =>
  tpl.replaceAll('{name} जी', 'सभी').replaceAll('{name}', '').replace(/^.*\{ticket\}.*\n?/gm, '')

const fill = (tpl: string, p: Person) =>
  tpl.replaceAll('{name}', p.name.split(' ')[0]).replaceAll('{ticket}', p.ticket).replaceAll('{business}', p.business)

export default function WhatsAppSender({
  people,
  resultUrl,
  hasResult,
  winner,
}: {
  people: Person[]
  resultUrl: string
  hasResult: boolean
  winner: string
}) {
  const tpls = useMemo(() => templates(resultUrl, winner), [resultUrl, winner])
  const [kind, setKind] = useState<'morning' | 'result'>(hasResult ? 'result' : 'morning')
  const [text, setText] = useState(tpls[kind].text)
  const key = `${STORE}:${kind}`
  const raw = useSyncExternalStore(subscribe, () => readStore(key), () => '{}')
  const sent = useMemo<Record<string, boolean>>(() => {
    try {
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }, [raw])

  const mark = (ticket: string) => writeStore(key, JSON.stringify({ ...sent, [ticket]: true }))
  const reset = () => writeStore(key, null)

  const done = people.filter((p) => sent[p.ticket]).length
  const sample = people[0] ?? { ticket: 'G12345', name: 'Rahul', mobile: '', business: '' }

  return (
    <div className="mt-6 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 items-start">
      <section className="glass-card p-5">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(tpls) as (keyof typeof tpls)[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setKind(k)
                setText(tpls[k].text)
              }}
              className={`px-3.5 h-9 rounded-xl text-sm font-semibold transition-all ${
                kind === k ? 'brand-icon text-white' : 'border border-fg/15 text-fg/60 hover:text-fg'
              }`}
            >
              {tpls[k].label}
            </button>
          ))}
        </div>
        {kind === 'result' && !hasResult && (
          <p className="text-xs text-gold mt-3">Winner अभी घोषित नहीं हुआ है — पहले draw करें।</p>
        )}
        <label className="block text-xs uppercase tracking-wider text-fg/45 mt-4 mb-1.5" htmlFor="wa-msg">
          Message ({'{name}'} और {'{ticket}'} अपने-आप भर जाएँगे)
        </label>
        <textarea
          id="wa-msg"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={13}
          className="w-full rounded-xl bg-bg-2 border border-fg/12 text-fg text-sm p-3 leading-relaxed focus:outline-none focus:border-accent"
        />
        <div className="text-xs uppercase tracking-wider text-fg/45 mt-4 mb-1.5">Preview ({sample.name})</div>
        <pre className="whitespace-pre-wrap text-sm bg-[#E7F8EE] text-[#173233] rounded-xl p-3 font-sans">
          {fill(text, sample)}
        </pre>
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <CopyButton text={broadcast(text)} label="Broadcast/Group के लिए copy" />
        </div>
      </section>

      <section className="glass-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="font-semibold text-fg">
            भेजे गए: {done} / {people.length}
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-xs text-fg/50 hover:text-fg"
          >
            <RotateCcw size={13} /> ✓ हटाएँ
          </button>
        </div>
        <div className="h-2 rounded-full bg-fg/10 mt-3 overflow-hidden">
          <div className="h-full brand-icon transition-all" style={{ width: `${people.length ? (done / people.length) * 100 : 0}%` }} />
        </div>
        <ul className="mt-4 divide-y divide-fg/[0.07]">
          {people.map((p) => {
            const href = `https://wa.me/91${p.mobile}?text=${encodeURIComponent(fill(text, p))}`
            const ok = sent[p.ticket]
            return (
              <li key={p.ticket} className="flex items-center gap-3 py-2.5">
                <span className="mono-font text-xs px-2 py-1 rounded-md bg-fg/[0.06] text-fg/70 shrink-0">{p.ticket}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-fg truncate">{p.name}</div>
                  <div className="text-xs text-fg/45 truncate">
                    {p.business || '—'} · {p.mobile}
                  </div>
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => mark(p.ticket)}
                  className={`inline-flex items-center gap-1.5 px-3 h-9 rounded-xl text-sm font-semibold shrink-0 transition-all ${
                    ok ? 'border border-fg/15 text-fg/50' : 'bg-[#1F9E5A] text-white hover:brightness-110'
                  }`}
                >
                  {ok ? <Check size={15} /> : <MessageCircle size={15} />} {ok ? 'भेजा' : 'भेजें'}
                </a>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
