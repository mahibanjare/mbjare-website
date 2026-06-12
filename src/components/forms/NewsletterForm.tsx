'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'newsletter', formData: { Email: email } }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="flex items-center gap-2 text-sm text-fg/70">
        <CheckCircle2 size={16} /> You&apos;re in! Watch your inbox.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 min-w-0 bg-fg/[0.03] border border-fg/10 rounded-full px-4 py-2.5 text-sm text-fg placeholder:text-fg/25 focus:outline-none focus:border-fg/35 transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-label="Subscribe"
          className="btn-primary !p-3 disabled:opacity-50"
        >
          <ArrowRight size={15} />
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-fg/45">Something went wrong — try again.</p>
      )}
    </form>
  )
}
