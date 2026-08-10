/**
 * One-time seed: site.ts ke FAQs ko Supabase (mbjare_faqs) me daalta hai.
 * Run: node scripts/seed-faqs.ts
 * Duplicate-safe — jo question pehle se hai usse skip karta hai.
 */
import fs from 'node:fs'
import { faqs } from '../src/content/site.ts'

const env = Object.fromEntries(
  fs
    .readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
    }),
)

const url = env.NEXT_PUBLIC_SUPABASE_URL
const key = env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY .env.local me nahi mile')
  process.exit(1)
}

const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }

const existingRes = await fetch(`${url}/rest/v1/mbjare_faqs?select=q`, { headers })
if (!existingRes.ok) {
  console.error(`Supabase read failed (${existingRes.status}):`, (await existingRes.text()).slice(0, 300))
  process.exit(1)
}
const have = new Set(((await existingRes.json()) as { q: string }[]).map((r) => r.q))

const rows = faqs
  .map((f, i) => ({ sort: (i + 1) * 10, q: f.q, a: f.a }))
  .filter((f) => !have.has(f.q))

if (rows.length === 0) {
  console.log(`Kuch naya nahi — saare ${faqs.length} FAQs pehle se Supabase me hain.`)
  process.exit(0)
}

const res = await fetch(`${url}/rest/v1/mbjare_faqs`, {
  method: 'POST',
  headers: { ...headers, Prefer: 'return=minimal' },
  body: JSON.stringify(rows),
})

if (!res.ok) {
  console.error(`Insert failed (${res.status}):`, (await res.text()).slice(0, 300))
  process.exit(1)
}
console.log(`Done ✓ — ${rows.length} FAQs Supabase me save ho gaye (${have.size} pehle se the).`)
