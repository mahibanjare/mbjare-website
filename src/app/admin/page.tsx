import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
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
      <AuthShell heading="Admin setup baaki hai">
        <SetupCard
          steps={[
            '.env.local (ya Vercel) me ADMIN_PASSWORD set karo — koi strong password',
            'Supabase project banao (dusri email wale account me)',
            'supabase/schema.sql ko Supabase SQL Editor me run karo',
            'NEXT_PUBLIC_SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY bharo',
            'Server restart karo — phir /admin pe login',
          ]}
        />
      </AuthShell>
    )
  }

  if (!authed) {
    return (
      <AuthShell heading="Content Studio">
        <LoginForm />
      </AuthShell>
    )
  }

  if (!supabaseConfigured) {
    return (
      <AuthShell heading="Supabase connect karna baaki hai">
        <SetupCard
          steps={[
            'Supabase project banao (supabase.com — dusri email se)',
            'SQL Editor me supabase/schema.sql paste karke Run karo',
            'Project Settings → API se URL aur service_role key copy karo',
            'NEXT_PUBLIC_SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY bharo',
            'Server restart karo — phir content edit kar paoge',
          ]}
        />
      </AuthShell>
    )
  }

  const data: Record<string, Record<string, unknown>[]> = {}
  await Promise.all(
    collections.map(async (c) => {
      data[c.table] = ((await sbSelectAdmin<Record<string, unknown>>(c.table, c.order)) ?? []) as Record<
        string,
        unknown
      >[]
    }),
  )

  return <AdminDashboard collections={collections} data={data} />
}

function AuthShell({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 hero-glow relative overflow-hidden">
      <div className="orb orb-1" aria-hidden />
      <div className="orb orb-2" aria-hidden />
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <Image src="/logo.svg" alt="Mbjare InfoTech" width={60} height={60} className="logo-glow logo-reveal mb-5" />
          <div className="section-tag mb-4">Admin — Content Studio</div>
          <h1 className="display-font text-[26px] leading-tight font-semibold text-fg">{heading}</h1>
        </div>
        {children}
        <Link
          href="/"
          className="mt-7 flex items-center justify-center gap-1.5 text-xs text-fg/40 hover:text-fg transition-colors"
        >
          <ArrowLeft size={13} /> Website par wapas
        </Link>
      </div>
    </main>
  )
}

function SetupCard({ steps }: { steps: string[] }) {
  return (
    <div className="glass-card p-7">
      <ol className="space-y-3.5">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 text-sm text-fg/65 leading-relaxed">
            <span className="display-font italic text-accent shrink-0">( 0{i + 1} )</span>
            {s}
          </li>
        ))}
      </ol>
      <p className="mono-font text-[10px] uppercase tracking-[0.2em] text-fg/35 mt-6 pt-5 border-t border-fg/[0.08]">
        Tab tak site checked-in content dikhati rahegi — kuch nahi tootega.
      </p>
    </div>
  )
}
