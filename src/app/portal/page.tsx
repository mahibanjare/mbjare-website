import type { Metadata } from 'next'
import { LogOut, Clock, User2, Inbox } from 'lucide-react'
import { getClient, getMyTickets, clientLogout } from '@/app/portal/actions'
import { getServices } from '@/lib/content'
import { supabaseConfigured } from '@/lib/supabase'
import ClientLogin from '@/components/portal/ClientLogin'
import RaiseTicketForm from '@/components/portal/RaiseTicketForm'
import StatusBadge from '@/components/portal/StatusBadge'

export const metadata: Metadata = {
  title: 'Client Portal — Support Tickets',
  description: 'Mbjare InfoTech client portal — raise and track your support tickets.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function fmt(d: string) {
  try {
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return d
  }
}

export default async function PortalPage() {
  const client = supabaseConfigured ? await getClient() : null

  if (!client) {
    return (
      <section className="pt-44 pb-28 min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          {!supabaseConfigured && (
            <p className="text-center text-fg/40 text-sm mb-6">
              Portal setup hone tak login band hai (Supabase connect karna baaki hai).
            </p>
          )}
          <ClientLogin />
        </div>
      </section>
    )
  }

  const [tickets, services] = await Promise.all([getMyTickets(), getServices()])
  const categories = ['General / Other', ...services.map((s) => s.title)]

  const open = tickets.filter((t) => t.status !== 'Resolved').length
  const resolved = tickets.filter((t) => t.status === 'Resolved').length

  return (
    <section className="pt-36 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div>
            <div className="kicker mb-2">Client Portal</div>
            <h1 className="display-font text-3xl md:text-4xl font-semibold text-fg">
              Namaste, {client.name.split(' ')[0]}
            </h1>
          </div>
          <form action={clientLogout}>
            <button type="submit" className="btn-ghost !py-2 !px-4 text-xs">
              <LogOut size={13} /> Logout
            </button>
          </form>
        </div>
        <p className="text-fg/45 text-sm mb-10 flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-1.5"><User2 size={13} /> {client.email}</span>
          <span className="inline-flex items-center gap-1.5"><Inbox size={13} /> {open} open</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {resolved} resolved</span>
        </p>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">
          {/* Raise */}
          <RaiseTicketForm categories={categories} />

          {/* Track */}
          <div>
            <h2 className="display-font text-xl font-semibold text-fg mb-5">Aapke tickets</h2>
            {tickets.length === 0 ? (
              <div className="glass-card p-6 text-fg/45 text-sm">
                Abhi koi ticket nahi. Left side se apna pehla ticket raise karein.
              </div>
            ) : (
              <div className="space-y-3">
                {tickets.map((t) => (
                  <div key={t.id} className="glass-card p-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <span className="mono-font text-[10px] text-fg/35">#{t.ticket_no}</span>
                        <h3 className="display-font font-semibold text-fg text-sm leading-snug">
                          {t.subject}
                        </h3>
                      </div>
                      <StatusBadge status={t.status} />
                    </div>
                    <p className="text-fg/50 text-xs leading-relaxed mb-3">{t.description}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-fg/40 mono-font">
                      <span>{t.category}</span>
                      <span>·</span>
                      <span>{t.priority} priority</span>
                      <span>·</span>
                      <span>Raised {fmt(t.created_at)}</span>
                      {t.assigned_to && (
                        <>
                          <span>·</span>
                          <span>Assigned: {t.assigned_to}</span>
                        </>
                      )}
                    </div>
                    {t.status === 'Resolved' && t.resolution && (
                      <p className="mt-3 pt-3 border-t border-fg/[0.08] text-fg/60 text-xs leading-relaxed">
                        <span className="text-green-600 font-semibold">Resolved:</span> {t.resolution}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
