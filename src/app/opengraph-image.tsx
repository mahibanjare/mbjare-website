import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Branded social-share card, generated at build time. Shown whenever a
// link to the site is shared on WhatsApp, LinkedIn, X, etc.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #14141f 60%, #1a1030 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, letterSpacing: 2, color: '#a78bfa' }}>
          {site.name.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.05 }}>{site.tagline}</div>
          <div style={{ fontSize: 34, color: '#c4b5fd', marginTop: 28, maxWidth: 900 }}>
            India&apos;s AI-first digital agency — websites, apps, AI chatbots &amp; automation.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#8b8b9e' }}>
          {site.location} · {site.url.replace('https://', '')}
        </div>
      </div>
    ),
    size,
  )
}
