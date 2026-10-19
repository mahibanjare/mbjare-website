import { createHash } from 'node:crypto'
import { isAdmin } from '@/app/admin/actions'
import { garbaEntries, GARBA_RESULT_URL } from '@/lib/garba'
import { sbUpsert } from '@/lib/supabase'
import { drawHtml } from './drawPage'

/** Spin-wheel page — admin only. */
export async function GET(request: Request) {
  if (!(await isAdmin())) return Response.redirect(new URL('/admin', request.url), 303)
  return new Response(drawHtml(), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

/**
 * Publish the winner to the public result page.
 * Winner name / business come from the database, not the browser, and the
 * seal must match: sha256("ticket|name|business|salt") === hash.
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) return Response.json({ error: 'Admin login चाहिए' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as { ticket?: string; salt?: string; hash?: string } | null
  const ticket = String(body?.ticket ?? '').trim()
  const salt = String(body?.salt ?? '')
  const hash = String(body?.hash ?? '').toLowerCase()
  if (!ticket || !/^[0-9a-f]{16}$/.test(salt) || !/^[0-9a-f]{64}$/.test(hash)) {
    return Response.json({ error: 'गलत data' }, { status: 400 })
  }

  const entries = await garbaEntries()
  if (!entries) return Response.json({ error: 'Entries load नहीं हो पाईं' }, { status: 502 })
  const p = entries.find((e) => e.ticket.trim() === ticket)
  if (!p) return Response.json({ error: 'यह ticket entries में नहीं है' }, { status: 400 })

  const name = p.name.trim()
  const business = (p.business_name ?? '').trim()
  const reveal = `${ticket}|${name}|${business}|${salt}`
  if (createHash('sha256').update(reveal).digest('hex') !== hash) {
    return Response.json({ error: 'सील कोड मेल नहीं खाता' }, { status: 400 })
  }

  const err = await sbUpsert('garba_draw_result', {
    id: 1,
    winner_ticket: ticket,
    winner_name: name,
    winner_business: business || null,
    seal_hash: hash,
    seal_reveal: reveal,
    total_entries: entries.length,
    drawn_at: new Date().toISOString(),
  })
  if (err) return Response.json({ error: err }, { status: 500 })
  return Response.json({ ok: true, url: GARBA_RESULT_URL })
}
