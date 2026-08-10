'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { raiseTicket } from '@/app/portal/actions'

export default function RaiseTicketForm({
  categories,
  onSuccess,
}: {
  categories: string[]
  onSuccess?: () => void
}) {
  const [state, action, pending] = useActionState(raiseTicket, undefined)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset()
      router.refresh()
      onSuccess?.()
    }
  }, [state, router, onSuccess])

  return (
    <form ref={formRef} action={action} className="glass-card p-6 md:p-7">
      <h2 className="display-font text-xl font-semibold text-fg mb-5">Naya ticket raise karein</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block sm:col-span-2">
          <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
            Subject
          </span>
          <input
            name="subject"
            required
            placeholder="Ek line me apni problem"
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
            Service / Category
          </span>
          <select
            name="category"
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
            Priority
          </span>
          <select
            name="priority"
            defaultValue="Medium"
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
            Details
          </span>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Poori detail likhein — kya problem hai, kahan aa rahi hai…"
            className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
          />
        </label>
      </div>

      {state?.error && <p className="text-red-600 text-sm mt-4">{state.error}</p>}
      {state?.ok && <p className="text-accent text-sm mt-4 font-medium">Ticket raise ho gaya ✓ Team jald dekhegi.</p>}

      <button type="submit" disabled={pending} className="btn-primary mt-5 disabled:opacity-50">
        <Plus size={15} /> {pending ? 'Bhej rahe hain…' : 'Submit Ticket'}
      </button>
    </form>
  )
}
