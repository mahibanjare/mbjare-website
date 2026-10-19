import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { isAdmin } from '@/app/admin/actions'
import { sbSelectAdmin, supabaseConfigured } from '@/lib/supabase'
import { garbaResult, GARBA_RESULT_URL, type GarbaRow } from '@/lib/garba'
import WhatsAppSender from '@/components/admin/WhatsAppSender'

export const metadata: Metadata = { title: 'Garba WhatsApp', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function GarbaWhatsAppPage() {
  if (!(await isAdmin())) redirect('/admin')

  const [rows, result] = await Promise.all([
    supabaseConfigured ? sbSelectAdmin<GarbaRow>('garba_lucky_draw', 'id.asc') : Promise.resolve(null),
    garbaResult(),
  ])

  const people = (rows ?? []).map((r) => ({
    ticket: r.ticket,
    name: r.name,
    mobile: r.mobile,
    business: r.business_name ?? '',
  }))

  return (
    <main className="min-h-screen px-5 sm:px-8 py-8 max-w-5xl mx-auto">
      <Link href="/admin/garba" className="inline-flex items-center gap-1.5 text-sm text-fg/50 hover:text-fg transition-colors">
        <ArrowLeft size={15} /> गरबा Lucky Draw
      </Link>
      <div className="section-tag mt-4 mb-3">WhatsApp Broadcast</div>
      <h1 className="brand-title display-font text-3xl sm:text-4xl font-bold leading-tight">Participants को WhatsApp भेजो</h1>
      <p className="text-fg/55 text-sm mt-2 max-w-2xl">
        हर नाम के आगे वाला बटन दबाने पर WhatsApp उसी participant के नंबर पर, उनके नाम और Lucky Number के साथ message
        लेकर खुलेगा — बस <b>Send</b> दबाना है। भेजे गए नामों पर ✓ लग जाता है (इसी browser में याद रहता है)।
      </p>

      {!supabaseConfigured || !rows ? (
        <p className="glass-card p-5 mt-6 text-sm text-fg/55">
          Entries load नहीं हो पाईं{!supabaseConfigured ? ' — Supabase connect नहीं है' : ''}। Page refresh करें।
        </p>
      ) : (
        <WhatsAppSender people={people} resultUrl={GARBA_RESULT_URL} hasResult={Boolean(result)} winner={result ? `${result.winner_ticket} – ${result.winner_business || result.winner_name}` : ''} />
      )}
    </main>
  )
}
