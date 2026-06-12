import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center hero-glow">
      <div className="text-center px-6">
        <div className="display-font text-[120px] font-bold text-outline leading-none mb-6">404</div>
        <h1 className="display-font text-3xl font-bold text-fg mb-4">Page not found</h1>
        <p className="text-fg/40 mb-10">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={15} /> Back to Home
        </Link>
      </div>
    </section>
  )
}
