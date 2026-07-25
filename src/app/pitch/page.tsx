import type { Metadata } from 'next'
import PitchDeck from '@/components/pitch/PitchDeck'

// Client-facing presentation — kept out of search engines and the sitemap.
// The tab title stays neutral so nothing "internal" shows on a client's screen.
export const metadata: Metadata = {
  title: 'Presentation',
  robots: { index: false, follow: false },
}

export default function PitchPage() {
  return <PitchDeck />
}
