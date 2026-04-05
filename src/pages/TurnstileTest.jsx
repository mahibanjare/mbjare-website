import { useState } from 'react'
import TurnstileWidget from '../components/TurnstileWidget'

export default function TurnstileTest() {
  const [token, setToken] = useState(null)
  const [status, setStatus] = useState('')

  const handleVerify = (token) => {
    setToken(token)
    setStatus('✅ Turnstile verified successfully!')
  }

  const handleError = () => {
    setStatus('❌ Turnstile verification failed')
  }

  const handleExpire = () => {
    setStatus('⏰ Verification expired, please verify again')
    setToken(null)
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-dark-800 rounded-lg p-8 border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Turnstile Test Page
        </h1>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-white/60 mb-4">
              Test if Turnstile is working correctly
            </p>

            <TurnstileWidget
              onVerify={handleVerify}
              onError={handleError}
              onExpire={handleExpire}
            />
          </div>

          <div className="text-center">
            <p className="text-white/80 font-medium mb-2">Status:</p>
            <p className="text-sm text-white/60">{status || 'Waiting for verification...'}</p>
          </div>

          {token && (
            <div className="bg-green-900/20 border border-green-500/30 rounded p-4">
              <p className="text-green-400 text-sm font-mono break-all">
                Token: {token.substring(0, 50)}...
              </p>
            </div>
          )}

          <div className="text-xs text-white/40 space-y-2">
            <p><strong>Site Key:</strong> {import.meta.env.VITE_TURNSTILE_SITE_KEY}</p>
            <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
