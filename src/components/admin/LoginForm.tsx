'use client'

import { useActionState } from 'react'
import { login } from '@/app/admin/actions'

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined)
  return (
    <form action={action} className="glass-card p-8 w-full max-w-sm mx-auto">
      <h1 className="display-font text-2xl font-semibold text-fg mb-1">Admin Login</h1>
      <p className="text-fg/40 text-sm mb-6">Mbjare InfoTech content panel</p>
      <input
        type="password"
        name="password"
        required
        autoFocus
        placeholder="Password"
        className="w-full px-4 py-3 rounded-xl bg-bg border border-fg/15 text-fg text-sm mb-4 focus:outline-none focus:border-accent"
      />
      {state?.error && <p className="text-red-600 text-sm mb-4">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-primary w-full disabled:opacity-50">
        {pending ? 'Checking…' : 'Login'}
      </button>
    </form>
  )
}
