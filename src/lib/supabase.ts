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

const KEY_HINT =
  ' — Yeh error tab aata hai jab SUPABASE_SERVICE_ROLE_KEY me anon/publishable key daali gayi ho. Supabase → Project Settings → API Keys se "service_role" (secret) key copy karke .env.local me daalo aur server restart karo.'

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

/** Uncached filtered read: table where column = value, newest first. */
export async function sbSelectWhere<T>(
  table: string,
  column: string,
  value: string,
  order = 'created_at.desc',
): Promise<T[] | null> {
  if (!supabaseConfigured) return null
  try {
    const q = `${url}/rest/v1/${table}?select=*&${column}=eq.${encodeURIComponent(value)}&order=${order}`
    const res = await fetch(q, { headers: headers(), cache: 'no-store' })
    if (!res.ok) return null
    return (await res.json()) as T[]
  } catch {
    return null
  }
}

/** Insert one row, return the created row (with generated id / ticket_no). */
export async function sbInsert<T>(
  table: string,
  row: Record<string, unknown>,
): Promise<{ data: T } | { error: string }> {
  if (!supabaseConfigured) return { error: 'Supabase is not configured' }
  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'return=representation' },
    body: JSON.stringify(row),
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = (await res.text()).slice(0, 200)
    const hint = res.status === 401 || body.includes('row-level security') ? KEY_HINT : ''
    return { error: `Failed (${res.status}): ${body}${hint}` }
  }
  const rows = (await res.json()) as T[]
  return { data: rows[0] }
}

/** Update rows where id = value with the given patch. */
export async function sbUpdate(
  table: string,
  id: string,
  patch: Record<string, unknown>,
): Promise<string | null> {
  if (!supabaseConfigured) return 'Supabase is not configured'
  const res = await fetch(`${url}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify(patch),
    cache: 'no-store',
  })
  return res.ok ? null : `Update failed (${res.status})`
}

/** Uncached read for the admin panel. */
export async function sbSelectAdmin<T>(
  table: string,
  order = 'sort.asc.nullslast',
): Promise<T[] | null> {
  if (!supabaseConfigured) return null
  try {
    const res = await fetch(`${url}/rest/v1/${table}?select=*&order=${order}`, {
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
  if (res.ok) return null
  const body = (await res.text()).slice(0, 200)
  const hint = res.status === 401 || body.includes('row-level security') ? KEY_HINT : ''
  return `Save failed (${res.status}): ${body}${hint}`
}

/** Upload a file to the public `site-image` storage bucket; returns its public URL. */
export async function sbUploadImage(
  file: File,
): Promise<{ url: string } | { error: string }> {
  if (!supabaseConfigured) return { error: 'Supabase is not configured' }
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-+|-+$/g, '')
  const path = `${Date.now()}-${safe || 'image'}`
  const res = await fetch(`${url}/storage/v1/object/site-image/${path}`, {
    method: 'POST',
    headers: {
      apikey: key as string,
      Authorization: `Bearer ${key}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'true',
    },
    body: Buffer.from(await file.arrayBuffer()),
    cache: 'no-store',
  })
  if (!res.ok) {
    const body = (await res.text()).slice(0, 200)
    const hint =
      res.status === 400 && body.includes('Bucket not found')
        ? ' — Supabase me "site-image" bucket banao (SQL: supabase/storage.sql run karo).'
        : res.status === 401 || body.includes('row-level security')
          ? KEY_HINT
          : ''
    return { error: `Upload failed (${res.status}): ${body}${hint}` }
  }
  return { url: `${url}/storage/v1/object/public/site-image/${path}` }
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
