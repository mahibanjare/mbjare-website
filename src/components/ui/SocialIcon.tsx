// Brand glyphs drawn in lucide's stroke style — lucide-react dropped brand icons.
const paths: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.5" fill="currentColor" stroke="none" />
    </>
  ),
  Twitter: (
    <>
      <path d="M4.5 4.5L19.5 19.5" />
      <path d="M19.5 4.5L4.5 19.5" />
    </>
  ),
  LinkedIn: (
    <>
      <rect x="2.5" y="2.5" width="19" height="19" rx="3.5" />
      <line x1="7.5" y1="11" x2="7.5" y2="17" />
      <circle cx="7.5" cy="7.6" r="0.5" fill="currentColor" stroke="none" />
      <path d="M11.5 17v-3.5a2.6 2.6 0 0 1 5.2 0V17" />
      <line x1="11.5" y1="11" x2="11.5" y2="17" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.4l4.8 2.6-4.8 2.6z" fill="currentColor" stroke="none" />
    </>
  ),
}

export default function SocialIcon({ name, size = 16 }: { name: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  )
}
