'use server'

import { createHash } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { sbUpsert, sbDelete, sbUploadImage, sbSelectAdmin, sbInsertMany } from '@/lib/supabase'
import { tableWhitelist } from '@/lib/adminSchema'
import { missingDefaults, seedTables } from '@/lib/contentSeed'

const COOKIE = 'mb_admin'

function token(): string | null {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) return null
  return createHash('sha256').update(`mbjare-admin:${pw}`).digest('hex')
}

export async function isAdmin(): Promise<boolean> {
  const t = token()
  if (!t) return false
  const store = await cookies()
  return store.get(COOKIE)?.value === t
}

export async function login(_prev: { error: string } | undefined, formData: FormData) {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) return { error: 'ADMIN_PASSWORD env variable set nahi hai.' }
  if (formData.get('password') !== pw) return { error: 'Galat password.' }
  const store = await cookies()
  store.set(COOKIE, token()!, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  redirect('/admin')
}

export async function logout() {
  const store = await cookies()
  store.delete(COOKIE)
  redirect('/admin')
}

export async function saveRow(table: string, row: Record<string, unknown>): Promise<string | null> {
  if (!(await isAdmin())) return 'Not authorized'
  if (!tableWhitelist.includes(table)) return 'Unknown collection'
  // First entry in a seeded table: copy the built-in entries in too, so they stay on the site
  if (seedTables.includes(table) && !row.id) {
    const existing = await sbSelectAdmin<Record<string, unknown>>(table)
    if (existing && existing.length === 0) {
      const seedErr = await sbInsertMany(table, missingDefaults(table, []))
      if (seedErr) return seedErr
    }
  }
  const err = await sbUpsert(table, row)
  if (!err) revalidateTag('content', 'max')
  return err
}

/** Copy built-in entries (portfolio / testimonials / FAQs) missing from the table back in. */
export async function importDefaults(table: string): Promise<string | null> {
  if (!(await isAdmin())) return 'Not authorized'
  if (!seedTables.includes(table)) return 'Unknown collection'
  const existing = await sbSelectAdmin<Record<string, unknown>>(table)
  if (!existing) return 'Table read nahi ho payi'
  const err = await sbInsertMany(table, missingDefaults(table, existing))
  if (!err) revalidateTag('content', 'max')
  return err
}

export async function deleteRow(table: string, id: string): Promise<string | null> {
  if (!(await isAdmin())) return 'Not authorized'
  if (!tableWhitelist.includes(table)) return 'Unknown collection'
  const err = await sbDelete(table, id)
  if (!err) revalidateTag('content', 'max')
  return err
}

export async function uploadImage(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  if (!(await isAdmin())) return { error: 'Not authorized' }
  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) return { error: 'Koi file select nahi hui' }
  if (file.size > 4.5 * 1024 * 1024) return { error: 'File 4.5 MB se badi hai — chhoti image use karo' }
  if (!file.type.startsWith('image/')) return { error: 'Sirf image files upload ho sakti hain' }
  return sbUploadImage(file)
}
