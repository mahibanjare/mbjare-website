import { useRef, forwardRef } from 'react'
import Turnstile from 'react-turnstile'

const TurnstileWidget = forwardRef(({ onVerify, onError, onExpire }, ref) => {
  const internalRef = useRef(null)

  // Use external ref if provided, otherwise use internal ref
  const turnstileRef = ref || internalRef

  const handleVerify = (token) => {
    onVerify(token)
  }

  const handleError = () => {
    if (onError) onError()
  }

  const handleExpire = () => {
    if (onExpire) onExpire()
  }

  return (
    <div className="flex justify-center">
      <Turnstile
        ref={turnstileRef}
        sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
        onVerify={handleVerify}
        onError={handleError}
        onExpire={handleExpire}
        theme="dark"
        size="normal"
      />
    </div>
  )
})

TurnstileWidget.displayName = 'TurnstileWidget'

export default TurnstileWidget
