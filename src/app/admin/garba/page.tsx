import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft, Disc3, Trophy, MessageCircle, FileText, ExternalLink } from 'lucide-react'
import { isAdmin } from '@/app/admin/actions'
import { sbSelectAdmin, supabaseConfigured } from '@/lib/supabase'
import { garbaOpen, garbaResult, GARBA_RESULT_URL, type GarbaRow } from '@/lib/garba'
import CopyButton from '@/components/admin/CopyButton'

export const metadata: Metadata = { title: 'Garba Lucky Draw', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const ist = (d: string) =>
  new Date(d).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true })

export default async function GarbaAdminPage() {
  if (!(await isAdmin())) redirect('/admin')

  const [rows, result] = await Promise.all([
    supabaseConfigured ? sbSelectAdmin<GarbaRow>('garba_lucky_draw', 'id.asc') : Promise.resolve(null),
    garbaResult(),
  ])
  const entries = rows ?? []
  const open = garbaOpen()

  const actions = [
    { href: '/admin/garba/draw', icon: Disc3, title: 'Lucky Draw निकालो', text: 'Spin wheel — 20 Oct दोपहर ~3 बजे स्क्रीन पर चलाएँ', external: false },
    { href: '/admin/garba/whatsapp', icon: MessageCircle, title: 'WhatsApp भेजो', text: 'सुबह 8 बजे: "Winner ~3 बजे घोषित होगा" — हर participant को', external: false },
    { href: '/garba/winner', icon: Trophy, title: 'Public Result link', text: 'सबको भेजने वाला link — winner + सारे participants', external: true },
    { href: '/garba', icon: FileText, title: 'Garba Form', text: open ? 'Entries चालू — 20 Oct सुबह 11:59 तक' : 'Entries बंद हो चुकी हैं', external: true },
  ]

  return (
    <main className="min-h-screen px-5 sm:px-8 py-8 max-w-6xl mx-auto">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-fg/50 hover:text-fg transition-colors">
        <ArrowLeft size={15} /> Content Studio
      </Link>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="section-tag mb-3">Navratri Campaign</div>
          <h1 className="brand-title display-font text-3xl sm:text-4xl font-bold leading-tight">गरबा Lucky Draw</h1>
          <p className="text-fg/55 text-sm mt-1">
            Entries {open ? 'चालू हैं' : 'बंद'} · Deadline 20 Oct, 11:59 AM · Draw ~3:00 PM
          </p>
        </div>
        <div className="flex gap-3">
          <Stat label="Entries" value={String(entries.length || '—')} />
          <Stat label="Business" value={String(entries.filter((e) => e.has_business).length || '—')} />
          <Stat label="Winner" value={result ? result.winner_ticket : 'बाकी'} />
        </div>
      </header>

      {result && (
        <div className="glass-card p-5 mt-6 flex flex-wrap items-center gap-4 border border-gold/40">
          <Trophy className="text-gold shrink-0" size={28} />
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-fg">
              Winner घोषित: {result.winner_ticket} — {result.winner_business || result.winner_name}
            </div>
            <div className="text-xs text-fg/50 mt-0.5">{ist(result.drawn_at)} · {result.total_entries} entries</div>
          </div>
          <CopyButton text={GARBA_RESULT_URL} label="Result link copy" />
        </div>
      )}

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {actions.map(({ href, icon: Icon, title, text, external }) => (
          <Link
            key={href}
            href={href}
            target={external ? '_blank' : undefined}
            className="glass-card p-5 group hover:-translate-y-0.5 transition-transform"
          >
            <div className="brand-icon w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Icon size={20} />
            </div>
            <div className="font-semibold text-fg mt-4 flex items-center gap-1.5">
              {title} {external && <ExternalLink size={13} className="text-fg/35" />}
            </div>
            <p className="text-sm text-fg/55 mt-1 leading-relaxed">{text}</p>
          </Link>
        ))}
      </section>

      <div className="glass-card p-4 mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className="text-fg/55">Public result link:</span>
        <code className="mono-font text-accent break-all">{GARBA_RESULT_URL.replace('https://', '')}</code>
        <CopyButton text={GARBA_RESULT_URL} label="Copy" />
      </div>

      <section className="mt-8">
        <h2 className="display-font text-xl font-semibold text-fg mb-3">सारी Entries ({entries.length})</h2>
        {!supabaseConfigured ? (
          <p className="glass-card p-5 text-sm text-fg/55">Supabase connect नहीं है — entries यहाँ नहीं दिख सकतीं।</p>
        ) : !rows ? (
          <p className="glass-card p-5 text-sm text-fg/55">Entries load नहीं हो पाईं। Page refresh करें।</p>
        ) : (
          <div className="glass-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-fg/45 text-xs uppercase tracking-wider border-b border-fg/[0.08]">
                  {['Ticket', 'नाम', 'Mobile', 'Business', 'Type / Referral', 'Source', 'समय'].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr
                    key={e.id}
                    className={`border-b border-fg/[0.06] last:border-0 ${result?.winner_ticket === e.ticket ? 'bg-gold/10' : ''}`}
                  >
                    <td className="px-4 py-3 mono-font font-medium whitespace-nowrap">
                      {e.ticket} {result?.winner_ticket === e.ticket && '🏆'}
                    </td>
                    <td className="px-4 py-3 text-fg whitespace-nowrap">{e.name}</td>
                    <td className="px-4 py-3 mono-font whitespace-nowrap">
                      <a className="text-accent hover:underline" href={`tel:+91${e.mobile}`}>{e.mobile}</a>
                    </td>
                    <td className="px-4 py-3 text-fg/75">{e.has_business ? e.business_name : '—'}</td>
                    <td className="px-4 py-3 text-fg/55">
                      {e.has_business ? e.business_type : [e.ref_name, e.ref_mobile].filter(Boolean).join(' · ') || '—'}
                    </td>
                    <td className="px-4 py-3 text-fg/55 whitespace-nowrap">{e.source ?? '—'}</td>
                    <td className="px-4 py-3 text-fg/45 whitespace-nowrap">{ist(e.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card px-4 py-3 min-w-[92px] text-center">
      <div className="display-font text-2xl font-bold text-fg leading-none">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-fg/45 mt-1.5">{label}</div>
    </div>
  )
}
