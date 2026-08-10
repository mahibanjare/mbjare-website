const styles: Record<string, string> = {
  Open: 'border-gold/45 text-gold bg-gold/10',
  'In Progress': 'border-accent/45 text-accent bg-accent-soft',
  Resolved: 'border-green-500/45 text-green-600 bg-green-500/10',
}

export default function StatusBadge({ status }: { status: string }) {
  const cls = styles[status] ?? 'border-fg/25 text-fg/60'
  return (
    <span className={`mono-font text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md border ${cls}`}>
      {status}
    </span>
  )
}
