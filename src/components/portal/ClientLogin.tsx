'use client'

import { useActionState } from 'react'
import { LogIn } from 'lucide-react'
import { clientLogin } from '@/app/portal/actions'

export default function ClientLogin() {
  const [state, action, pending] = useActionState(clientLogin, undefined)
  return (
    <form action={action} className="glass-card p-8 w-full max-w-sm mx-auto">
      <h1 className="display-font text-2xl font-semibold text-fg mb-1">Client Login</h1>
      <p className="text-fg/45 text-sm mb-6">
        Apne tickets raise aur track karne ke liye login karein.
      </p>
      <label className="block mb-4">
        <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
          Email
        </span>
        <input
          type="email"
          name="email"
          required
          autoFocus
          className="w-full px-4 py-3 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
        />
      </label>
      <label className="block mb-5">
        <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
          Password
        </span>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-3 rounded-xl bg-bg border border-fg/15 text-fg text-sm focus:outline-none focus:border-accent"
        />
      </label>
      {state?.error && <p className="text-red-600 text-sm mb-4">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-50">
        <LogIn size={15} /> {pending ? 'Checking…' : 'Login'}
      </button>
      <p className="text-fg/40 text-xs mt-5 text-center">
        Login details nahi hai? WhatsApp par humein message karein — hum aapka account bana denge.
      </p>
    </form>
  )
}
