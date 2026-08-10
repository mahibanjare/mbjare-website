'use client'

import { usePathname } from 'next/navigation'

/**
 * Hides the marketing site chrome (navbar, footer, floats) on app-like
 * routes such as /portal so they render as a standalone experience.
 */
const APP_ROUTES = ['/portal', '/admin']

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (APP_ROUTES.some((r) => pathname?.startsWith(r))) return null
  return <>{children}</>
}
