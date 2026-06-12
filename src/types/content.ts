export interface Service {
  slug: string
  icon: string
  title: string
  subtitle: string
  desc: string
  features: string[]
  price: string
  timeline: string
  badge?: 'NEW' | 'AI' | 'POPULAR'
}

export interface Project {
  title: string
  url?: string
  category: 'Websites' | 'Branding' | 'Social & Ads' | 'Automation'
  desc: string
  deliverables: string[]
  tags: string[]
  year: string
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
