/**
 * Tiny dependency-free Supabase (PostgREST) client — server-side only.
 * Uses the service-role key, so these helpers must never be imported
 * into client components.
 *
 * When the env vars are missing the site silently falls back to the
 * local content files in src/content — so the site always works.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseConfigured = Boolean(url && key)

const headers = () => ({
  apikey: key as string,
  Authorization: `Bearer ${key}`,
  'Content-Type': 'application/json',
})

/** Cached read for site pages — revalidates every 5 min or on admin save. */
export async function sbSelect<T>(table: string): Promise<T[] | null> {
  if (!supabaseConfigured) return null
  try {
    const res = await fetch(`${url}/rest/v1/${table}?select=*&order=sort.asc.nullslast`, {
      headers: headers(),
      next: { revalidate: 300, tags: ['content'] },
    })
    if (!res.ok) return null
    const rows = (await res.json()) as T[]
    return Array.isArray(rows) && rows.length > 0 ? rows : null
  } catch {
    return null
  }
}

/** Uncached read for the admin panel. */
export async function sbSelectAdmin<T>(table: string): Promise<T[] | null> {
  if (!supabaseConfigured) return null
  try {
    const res = await fetch(`${url}/rest/v1/${table}?select=*&order=sort.asc.nullslast`, {
      headers: headers(),
      cache: 'no-store',
    })
    if (!res.ok) return null
    return (await res.json()) as T[]
  } catch {
    return null
  }
}

export async function sbUpsert(table: string, row: Record<string, unknown>): Promise<string | null> {
  if (!supabaseConfigured) return 'Supabase is not configured'
  const res = await fetch(`${url}/rest/v1/${table}?on_conflict=id`, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(row),
    cache: 'no-store',
  })
  return res.ok ? null : `Save failed (${res.status}): ${(await res.text()).slice(0, 300)}`
}

export async function sbDelete(table: string, id: string): Promise<string | null> {
  if (!supabaseConfigured) return 'Supabase is not configured'
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: headers(),
    cache: 'no-store',
  })
  return res.ok ? null : `Delete failed (${res.status})`
}
