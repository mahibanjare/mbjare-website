import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = `${site.name} — ${site.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Branded social-share card, generated at build time. Shown whenever a
// link to the site is shared on WhatsApp, LinkedIn, X, etc.
// Editorial Studio voice: warm ivory paper, ink serif, emerald flourish.
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
          padding: '64px 80px 56px',
          background: '#faf6ee',
          color: '#1d1a13',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        {/* Emerald + gold foil strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 10, background: '#0e5d4c', display: 'flex' }} />
        <div style={{ position: 'absolute', top: 0, left: 440, width: 320, height: 10, background: '#c6942a', display: 'flex' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 28, letterSpacing: 8, color: '#0e5d4c', fontFamily: 'monospace' }}>
            MBJARE INFOTECH
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: '#a3730f' }}>
            Rated 5.0 by every client
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 600, lineHeight: 1.1, maxWidth: 1040 }}>
            We build brands, websites &amp; automations
          </div>
          <div style={{ display: 'flex', fontSize: 68, fontStyle: 'italic', color: '#0e5d4c', lineHeight: 1.15 }}>
            that grow real businesses.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(29, 26, 19, 0.14)',
            paddingTop: 26,
            fontSize: 23,
            color: 'rgba(29, 26, 19, 0.62)',
          }}
        >
          <div style={{ display: 'flex' }}>{site.location} · mbjare.com</div>
          <div style={{ display: 'flex' }}>5 brands built end-to-end — live on the internet</div>
        </div>
      </div>
    ),
    size,
  )
}
