import type { Metadata } from 'next'
import { isAdmin } from '@/app/admin/actions'
import { collections } from '@/lib/adminSchema'
import { sbSelectAdmin, supabaseConfigured } from '@/lib/supabase'
import LoginForm from '@/components/admin/LoginForm'
import AdminDashboard from '@/components/admin/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const authed = await isAdmin()

  if (!process.env.ADMIN_PASSWORD) {
    return (
      <Shell>
        <SetupCard
          title="Admin panel setup baaki hai"
          steps={[
            '.env.local me ADMIN_PASSWORD set karo (koi strong password)',
            'Supabase project banao (dusri email wale account me)',
            'supabase/schema.sql ko Supabase SQL Editor me run karo',
            '.env.local me NEXT_PUBLIC_SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY bharo',
            'Dev server restart karo — phir /admin pe login karna',
          ]}
        />
      </Shell>
    )
  }

  if (!authed) {
    return (
      <Shell>
        <LoginForm />
      </Shell>
    )
  }

  if (!supabaseConfigured) {
    return (
      <Shell>
        <SetupCard
          title="Supabase connect karna baaki hai"
          steps={[
            'Supabase project banao (supabase.com — dusri email se)',
            'SQL Editor me supabase/schema.sql ka content paste karke Run karo',
            'Project Settings → API se URL aur service_role key copy karo',
            '.env.local me NEXT_PUBLIC_SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY bharo',
            'Dev server restart karo — phir yahan content edit kar paoge',
          ]}
        />
      </Shell>
    )
  }

  const data: Record<string, Record<string, unknown>[]> = {}
  await Promise.all(
    collections.map(async (c) => {
      data[c.table] = ((await sbSelectAdmin<Record<string, unknown>>(c.table)) ?? []) as Record<
        string,
        unknown
      >[]
    }),
  )

  return (
    <section className="pt-36 pb-24">
      <AdminDashboard collections={collections} data={data} />
    </section>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-44 pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-6">{children}</div>
    </section>
  )
}

function SetupCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="glass-card p-8">
      <h1 className="display-font text-2xl font-semibold text-fg mb-5">{title}</h1>
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 text-sm text-fg/60">
            <span className="display-font italic text-accent shrink-0">( 0{i + 1} )</span>
            {s}
          </li>
        ))}
      </ol>
      <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/35 mt-6">
        Jab tak Supabase empty hai, site checked-in content dikhati rahegi — kuch nahi tootega.
      </p>
    </div>
  )
}
