'use server'

import { createHash } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'
import { sbUpsert, sbDelete } from '@/lib/supabase'
import { tableWhitelist } from '@/lib/adminSchema'

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
  const err = await sbUpsert(table, row)
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
