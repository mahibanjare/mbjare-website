'use server'

import { createHash } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { Client, Ticket } from '@/types/content'
import { sbSelectWhere, sbInsert, supabaseConfigured } from '@/lib/supabase'

const COOKIE = 'mb_client'
const secret = () => process.env.SUPABASE_SERVICE_ROLE_KEY ?? 'mbjare-portal'

interface ClientRow extends Client {
  password: string
}

function sign(id: string): string {
  return createHash('sha256').update(`${id}:${secret()}`).digest('hex').slice(0, 32)
}

export async function getClient(): Promise<Client | null> {
  const store = await cookies()
  const raw = store.get(COOKIE)?.value
  if (!raw) return null
  const [id, sig] = raw.split('.')
  if (!id || sig !== sign(id)) return null
  const rows = await sbSelectWhere<ClientRow>('mbjare_clients', 'id', id, 'sort.asc')
  const c = rows?.[0]
  if (!c || !c.active) return null
  return { id: c.id, name: c.name, company: c.company, email: c.email, active: c.active }
}

export async function clientLogin(
  _prev: { error: string } | undefined,
  formData: FormData,
): Promise<{ error: string } | undefined> {
  if (!supabaseConfigured) return { error: 'Portal abhi setup ho raha hai. Thodi der baad try karein.' }
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  if (!email || !password) return { error: 'Email aur password dono daalein.' }

  const rows = await sbSelectWhere<ClientRow>('mbjare_clients', 'email', email, 'sort.asc')
  const c = rows?.[0]
  if (!c || c.password !== password || !c.active) return { error: 'Galat email ya password.' }

  const store = await cookies()
  store.set(COOKIE, `${c.id}.${sign(c.id)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  redirect('/portal')
}

export async function clientLogout() {
  const store = await cookies()
  store.delete(COOKIE)
  redirect('/portal')
}

export async function getMyTickets(): Promise<Ticket[]> {
  const client = await getClient()
  if (!client) return []
  return (await sbSelectWhere<Ticket>('mbjare_tickets', 'client_id', client.id)) ?? []
}

export async function raiseTicket(
  _prev: { error?: string; ok?: boolean } | undefined,
  formData: FormData,
): Promise<{ error?: string; ok?: boolean }> {
  const client = await getClient()
  if (!client) return { error: 'Session expire ho gaya — dobara login karein.' }

  const subject = String(formData.get('subject') ?? '').trim()
  const description = String(formData.get('description') ?? '').trim()
  const category = String(formData.get('category') ?? 'General').trim()
  const priority = String(formData.get('priority') ?? 'Medium').trim()
  if (!subject || !description) return { error: 'Subject aur description dono zaroori hain.' }

  const res = await sbInsert('mbjare_tickets', {
    client_id: client.id,
    client_name: `${client.name}${client.company ? ` (${client.company})` : ''}`,
    subject,
    description,
    category,
    priority,
    status: 'Open',
  })
  if ('error' in res) return { error: res.error }
  return { ok: true }
}
