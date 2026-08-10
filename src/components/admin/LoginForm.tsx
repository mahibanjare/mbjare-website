'use client'

import { useActionState, useState } from 'react'
import { LogIn, Eye, EyeOff } from 'lucide-react'
import { login } from '@/app/admin/actions'

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)
  const [show, setShow] = useState(false)

  return (
    <form action={action} className="glass-card p-7 sm:p-8 w-full">
      <label className="block mb-5">
        <span className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/45 block mb-1.5">
          Admin password
        </span>
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            name="password"
            required
            autoFocus
            placeholder="••••••••"
            className="w-full px-4 py-3 pr-11 rounded-xl bg-bg border border-fg/15 text-fg text-sm transition-colors focus:outline-none focus:border-accent"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-fg/35 hover:text-fg transition-colors"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </label>

      {state?.error && (
        <p className="text-red-600 text-sm mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-50">
        <LogIn size={15} /> {pending ? 'Checking…' : 'Login to Studio'}
      </button>
    </form>
  )
}
