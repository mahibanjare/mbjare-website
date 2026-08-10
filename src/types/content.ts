export interface Service {
  slug: string
  icon: string
  title: string
  subtitle: string
  desc: string
  image: string
  features: string[]
  price: string
  timeline: string
  badge?: 'NEW' | 'AI' | 'POPULAR'
  /** Slugs of services that pair naturally with this one */
  related?: string[]
}

export interface GrowthPackage {
  slug: string
  icon: string
  name: string
  tagline: string
  /** Who this package is designed for */
  forWho: string
  includes: string[]
  /** The business outcome the client actually buys */
  outcome: string
  price: string
  priceNote?: string
  timeline: string
  badge?: string
  /** Live client project that proves this package works */
  proof: { client: string; url: string; image?: string; note: string }
  /** Slugs of the individual services bundled inside */
  services: string[]
}

export interface Project {
  title: string
  url?: string
  category: 'Websites' | 'Branding' | 'Social & Ads' | 'Automation'
  desc: string
  deliverables: string[]
  tags: string[]
  year: string
  /** Screenshot of the live site, served from /public (e.g. /projects/name.png) */
  image?: string
}

export interface Testimonial {
  name: string
  role: string
  msg: string
  rating: number
}

export interface Stat {
  value: number
  suffix: string
  label: string
}
