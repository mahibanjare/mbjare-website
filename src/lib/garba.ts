/**
 * Garba Lucky Draw — public data helpers.
 *
 * Uses the same publishable key as public/garba.html, so it works without
 * the service-role key. The two RPCs it calls are SECURITY DEFINER and only
 * return ticket / name / business — never mobile numbers
 * (see supabase/garba_lucky_draw.sql, section 9).
 */

export const GARBA_SUPABASE_URL = 'https://hybxysivdyznsoempdnr.supabase.co'
export const GARBA_PUBLISHABLE_KEY = 'sb_publishable_7XINhgxsr4h2UPSEJaPy0A_CxaZdogA'

export const GARBA_CLOSES_AT = '2026-10-20T11:59:59+05:30'
export const GARBA_RESULT_URL = 'https://www.mbjare.com/garba/winner'

export const garbaOpen = () => Date.now() < Date.parse(GARBA_CLOSES_AT)

export type GarbaEntry = { ticket: string; name: string; business_name: string }

/** Full row (admin only — includes mobile numbers, read with the service-role key). */
export type GarbaRow = {
  id: number
  created_at: string
  ticket: string
  name: string
  mobile: string
  has_business: boolean
  business_name: string | null
  business_type: string | null
  ref_name: string | null
  ref_mobile: string | null
  source: string | null
  status: string
}

export type GarbaResult = {
  winner_ticket: string
  winner_name: string
  winner_business: string | null
  seal_hash: string
  seal_reveal: string
  total_entries: number
  drawn_at: string
}

async function rpc<T>(fn: string): Promise<T[] | null> {
  try {
    const res = await fetch(`${GARBA_SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: {
        apikey: GARBA_PUBLISHABLE_KEY,
        Authorization: `Bearer ${GARBA_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
      cache: 'no-store',
    })
    if (!res.ok) return null
    return (await res.json()) as T[]
  } catch {
    return null
  }
}

export const garbaEntries = () => rpc<GarbaEntry>('garba_draw_entries')

export async function garbaResult(): Promise<GarbaResult | null> {
  const rows = await rpc<GarbaResult>('garba_public_result')
  return rows?.[0] ?? null
}

/** HTML-escape for the hand-written HTML pages. */
export const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
