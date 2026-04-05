import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { Mail, Check } from 'lucide-react'
import TurnstileWidget from './TurnstileWidget'
import { submitForm } from '../utils/formSubmit'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [turnstileToken, setTurnstileToken] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const turnstileRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email.trim()) {
      toast.error('Please enter your email')
      return
    }

    if (!turnstileToken) {
      toast.error('Please complete the Turnstile verification')
      return
    }

    setLoading(true)
    try {
      const formData = {
        Email: email.trim(),
        SubscribedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        Source: 'Website Footer'
      }

      await submitForm(formData, turnstileToken, 'newsletter')

      toast.success('Subscribed successfully! Check your email for updates.')
      setEmail('')
      setTurnstileToken(null)
      setSubmitted(true)

      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)

    } catch (err) {
      console.error('Newsletter subscription error:', err)
      toast.error(err.message || 'Subscription failed. Please try again.')

      // Reset Turnstile on error
      if (turnstileRef.current) {
        turnstileRef.current.reset()
        setTurnstileToken(null)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTurnstileVerify = (token) => {
    setTurnstileToken(token)
  }

  const handleTurnstileError = () => {
    setTurnstileToken(null)
  }

  const handleTurnstileExpire = () => {
    setTurnstileToken(null)
  }

  if (submitted) {
    return (
      <div className="w-full bg-[rgba(0,150,136,0.1)] border border-[rgba(0,150,136,0.2)] rounded-lg p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Check size={18} className="text-[#009688]" />
          <span className="text-white font-semibold text-sm">Subscribed!</span>
        </div>
        <p className="text-white/40 text-xs">Thanks for subscribing. We'll keep you updated!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="input-dark flex-1 text-xs"
            required
          />
        </div>

        <TurnstileWidget
          ref={turnstileRef}
          onVerify={handleTurnstileVerify}
          onError={handleTurnstileError}
          onExpire={handleTurnstileExpire}
        />

        <button
          type="submit"
          disabled={loading || !turnstileToken}
          className="btn-primary w-full justify-center text-xs py-2.5 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Subscribing...
            </span>
          ) : (
            <>
              <Mail size={12} className="mr-1" />
              Subscribe to Updates
            </>
          )}
        </button>
      </form>

      <p className="text-white/20 text-xs">🔒 We respect your privacy. No spam, ever.</p>
    </div>
  )
}
