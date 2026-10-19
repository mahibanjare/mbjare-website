'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setDone(true)
          setTimeout(() => setDone(false), 2000)
        } catch {
          window.prompt('Copy करें:', text)
        }
      }}
      className="inline-flex items-center gap-1.5 px-3 h-9 rounded-xl border border-fg/15 text-fg/70 text-sm font-medium hover:text-fg hover:border-accent transition-all"
    >
      {done ? <Check size={14} className="text-accent" /> : <Copy size={14} />} {done ? 'Copied' : label}
    </button>
  )
}
