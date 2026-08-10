'use client'

import { usePathname } from 'next/navigation'

/**
 * Hides the marketing site chrome (navbar, footer, floats) on app-like
 * routes such as /portal so they render as a standalone experience.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/portal')) return null
  return <>{children}</>
}
