'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send, CheckCircle2 } from 'lucide-react'
import { raiseTicket } from '@/app/portal/actions'

const PRIORITIES = [
  { value: 'Low', dot: 'bg-fg/40' },
  { value: 'Medium', dot: 'bg-gold' },
  { value: 'High', dot: 'bg-red-500' },
] as const

export default function RaiseTicketForm({
  categories,
  onSuccess,
}: {
  categories: string[]
  onSuccess?: () => void
}) {
  const [state, action, pending] = useActionState(raiseTicket, undefined)
  const [priority, setPriority] = useState('Medium')
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset()
      setPriority('Medium')
      router.refresh()
      const t = setTimeout(() => onSuccess?.(), 900)
      return () => clearTimeout(t)
    }
  }, [state, router, onSuccess])

  return (
    <div className="glass-card p-6 sm:p-7 max-w-2xl">
      <div className="mb-6">
        <h2 className="display-font text-xl font-semibold text-fg">Naya ticket raise karein</h2>
        <p className="text-fg/45 text-sm mt-1">Jitni detail denge, utni jaldi resolve hoga.</p>
      </div>

      <form ref={formRef} action={action}>
        <input type="hidden" name="priority" value={priority} />

        {/* Subject */}
        <label className="block mb-4">
          <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
            Subject
          </span>
          <input
            name="subject"
            required
            placeholder="Ek line me apni problem"
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm transition-colors focus:outline-none focus:border-accent"
          />
        </label>

        {/* Category */}
        <label className="block mb-4">
          <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
            Service / Category
          </span>
          <select
            name="category"
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm transition-colors focus:outline-none focus:border-accent"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        {/* Priority — segmented control */}
        <div className="mb-4">
          <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
            Priority
          </span>
          <div className="flex gap-1.5 p-1 rounded-xl bg-bg border border-fg/15">
            {PRIORITIES.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                  priority === p.value
                    ? 'bg-accent text-[#fffdf8] shadow-[var(--sh)]'
                    : 'text-fg/55 hover:text-fg'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${priority === p.value ? 'bg-[#fffdf8]' : p.dot}`} />
                {p.value}
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <label className="block mb-5">
          <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
            Details
          </span>
          <textarea
            name="description"
            required
            rows={5}
            placeholder="Poori detail likhein — kya problem hai, kahan aa rahi hai, kab se…"
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm transition-colors focus:outline-none focus:border-accent resize-y"
          />
        </label>

        {state?.error && (
          <p className="text-red-600 text-sm mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {state.error}
          </p>
        )}
        {state?.ok && (
          <p className="text-green-600 text-sm mb-4 flex items-center gap-2 font-medium">
            <CheckCircle2 size={15} /> Ticket raise ho gaya ✓ Team jald dekhegi…
          </p>
        )}

        <button type="submit" disabled={pending} className="btn-primary disabled:opacity-50">
          <Send size={15} /> {pending ? 'Bhej rahe hain…' : 'Submit Ticket'}
        </button>
      </form>
    </div>
  )
}
