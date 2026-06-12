'use client'

import { useState } from 'react'
import { Send, CheckCircle2, ArrowUpRight } from 'lucide-react'
import TurnstileWidget from './TurnstileWidget'
import { services } from '@/content/services'
import { site } from '@/content/site'

const budgets = [
  'Under ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹30,000',
  '₹30,000 – ₹50,000', '₹50,000+', "Let's discuss",
]

const inputCls =
  'w-full bg-fg/[0.03] border border-fg/10 rounded-2xl px-4 py-3 text-sm text-fg placeholder:text-fg/25 focus:outline-none focus:border-fg/35 transition-colors'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', businessName: '',
    businessAddress: '', service: '', budget: '', message: '',
  })
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent'>('idle')
  const [error, setError] = useState('')

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    if (!token) {
      setError('Please complete the verification below.')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          formType: 'contact',
          formData: {
            Name: form.name, Email: form.email, Phone: form.phone,
            'Business Name': form.businessName, 'Business Address': form.businessAddress,
            Service: form.service, Budget: form.budget, Message: form.message,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setStatus('sent')
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Something went wrong — try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="glass-card p-10 text-center">
        <CheckCircle2 size={40} className="mx-auto mb-4 text-accent-2" />
        <h2 className="display-font text-3xl font-bold text-fg mb-3">Message Sent! 🎉</h2>
        <p className="text-fg/45 text-sm mb-6">
          We&apos;ll get back to you within 2 hours (Mon–Sat, 10am–7pm IST).
        </p>
        <a
          href={`${site.whatsapp}?text=Hi!%20I%20just%20filled%20your%20contact%20form`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost text-sm"
        >
          Chat on WhatsApp now <ArrowUpRight size={14} />
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="glass-card p-7 md:p-9 space-y-4">
      <div>
        <h2 className="display-font text-2xl font-bold text-fg mb-1">Get Your Free Quote</h2>
        <p className="text-fg/40 text-xs">Tell us about your project — we reply within 2 hours.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={onChange} placeholder="Your name *" required className={inputCls} />
        <input name="email" type="email" value={form.email} onChange={onChange} placeholder="Email *" required className={inputCls} />
        <input name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="Phone / WhatsApp" className={inputCls} />
        <input name="businessName" value={form.businessName} onChange={onChange} placeholder="Business name" className={inputCls} />
      </div>

      <input name="businessAddress" value={form.businessAddress} onChange={onChange} placeholder="Business address / city" className={inputCls} />

      <div className="grid sm:grid-cols-2 gap-4">
        <select name="service" value={form.service} onChange={onChange} className={`${inputCls} appearance-none [&>option]:bg-bg-2`}>
          <option value="">Service needed…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Full Digital Package">Full Digital Package</option>
          <option value="Other / Not Sure">Other / Not Sure</option>
        </select>
        <select name="budget" value={form.budget} onChange={onChange} className={`${inputCls} appearance-none [&>option]:bg-bg-2`}>
          <option value="">Budget range…</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <textarea
        name="message" value={form.message} onChange={onChange} rows={4}
        placeholder="Tell us about your project *" required className={`${inputCls} resize-none`}
      />

      <TurnstileWidget onVerify={setToken} onExpire={() => setToken(null)} />

      {error && <p className="text-sm text-fg/60 text-center">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-50">
        {status === 'loading' ? 'Sending…' : <>Send Message <Send size={15} /></>}
      </button>
    </form>
  )
}
