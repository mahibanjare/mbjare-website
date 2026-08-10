import type { GrowthPackage } from '@/types/content'

/**
 * Growth packages — the way we actually sell.
 * Every package mirrors a real delivered project, so every card
 * carries live proof a prospect can click and verify.
 */
export const packages: GrowthPackage[] = [
  {
    slug: 'launch-pad',
    icon: 'Rocket',
    name: 'The Launch Pad',
    tagline: 'Zero to live brand. In 2 weeks.',
    forWho: 'New businesses & startups that need everything, fast.',
    includes: [
      'Logo & complete brand kit',
      'Website with admin panel',
      'Google Business Profile setup',
      'WhatsApp connect on every page',
    ],
    outcome: 'Customers can find you, trust you and contact you — from day one.',
    price: '₹11,999',
    priceNote: '₹13,497 if bought separately',
    timeline: '2 weeks',
    badge: 'NEW BUSINESS',
    proof: {
      client: 'Grafiya',
      url: 'https://grafiya.in',
      image: '/projects/grafiya.png',
      note: 'Brand + website built from scratch',
    },
    services: ['branding-logo-design', 'website-development', 'google-business-setup'],
  },
  {
    slug: 'glow-up',
    icon: 'Sparkles',
    name: 'The Glow-Up',
    tagline: 'Same business. Brand-new look.',
    forWho: 'Running businesses whose look no longer matches their quality.',
    includes: [
      'Logo redesign',
      'Website rebuild with admin panel',
      'Social profiles makeover',
      'Brand guidelines doc',
    ],
    outcome: 'Customers say "wow" before they even walk in.',
    price: '₹13,999',
    timeline: '2 weeks',
    proof: {
      client: 'Ankita Beauty Salon',
      url: 'https://ankitabeautysalonarang.in',
      image: '/projects/ankitabeautysalon.png',
      note: 'Full refresh — logo, website, social',
    },
    services: ['branding-logo-design', 'website-development', 'social-media-management'],
  },
  {
    slug: 'digital-dukaan',
    icon: 'Store',
    name: 'The Digital Dukaan',
    tagline: 'Your shop. Open 24/7. Online.',
    forWho: 'Restaurants, sweet shops & retail that want orders — not just visits.',
    includes: [
      'Premium website — English + हिंदी',
      'QR menu / catalogue & online ordering',
      'WhatsApp ordering',
      'Live orders dashboard at your counter',
      'Data saved to Google Sheets / Supabase',
    ],
    outcome: 'Orders reach your counter in real time — no calls, no confusion.',
    price: 'From ₹19,999',
    timeline: '2–3 weeks',
    badge: 'FLAGSHIP',
    proof: {
      client: 'Dharshakti Sweets & Restaurant',
      url: 'https://dharshakti.in',
      image: '/projects/dharshakti.png',
      note: '45-year-old brand, now taking orders online',
    },
    services: ['website-development', 'business-automation'],
  },
  {
    slug: 'local-hero',
    icon: 'Trophy',
    name: 'The Local Hero',
    tagline: 'Be the first name in your area.',
    forWho: 'Schools, salons, clinics & local services fighting for local attention.',
    includes: [
      'Website + Google Business setup',
      'Social media — creative posts & reels',
      'Meta ad campaigns',
      'Monthly growth reports',
    ],
    outcome: 'When your area searches, they find you first — and keep seeing you.',
    price: '₹10,999 + ₹9,999/mo',
    timeline: 'Live in 2 weeks · grows monthly',
    proof: {
      client: 'Bright Public School Godhi',
      url: 'https://bpsgodhi.in',
      image: '/projects/bpsgodhi.png',
      note: 'Digital presence from zero + real local reach',
    },
    services: ['website-development', 'google-business-setup', 'social-media-management', 'meta-ads'],
  },
  {
    slug: 'autopilot',
    icon: 'Zap',
    name: 'The Autopilot',
    tagline: "Your business runs. Even when you don't.",
    forWho: 'Any business drowning in manual follow-ups, entries and reports.',
    includes: [
      'Google Sheet automation',
      'WhatsApp auto-replies & broadcasts',
      'Email drips & follow-ups',
      'AI workflows + live dashboards',
    ],
    outcome: 'Enquiries answered, leads followed up, reports generated — on autopilot.',
    price: 'From ₹2,999',
    timeline: '3–7 days',
    badge: 'AI',
    proof: {
      client: 'Dharshakti',
      url: 'https://dharshakti.in',
      image: '/projects/dharshakti.png',
      note: 'Live reception dashboard — every order auto-logged',
    },
    services: ['business-automation'],
  },
]

export const getPackage = (slug: string) => packages.find((p) => p.slug === slug)
