import type { Project } from '@/types/content'

export const categories = ['All', 'Websites', 'Branding', 'Social & Ads'] as const

export const projects: Project[] = [
  {
    title: 'Dharshakti Sweets & Restaurant',
    url: 'https://dharshakti.in',
    category: 'Websites',
    desc: 'Complete digital storefront for a 45-year-old sweets & restaurant brand — premium website with online QR menu ordering, bilingual EN/हिंदी experience, WhatsApp ordering and a live reception dashboard.',
    deliverables: [
      'Website design & development',
      'Online QR menu & ordering system',
      'Live reception order dashboard',
      'Bilingual EN/Hindi experience',
    ],
    tags: ['Web', 'Ordering', 'QR'],
    year: '2026',
    image: '/projects/dharshakti.png',
  },
  {
    title: 'SR Petrochemicals',
    url: 'https://srpetrochemicals.in',
    category: 'Websites',
    desc: 'Corporate website for a petrochemicals business — product range, company profile and enquiry pipeline, built to rank and convert.',
    deliverables: ['Website design & development', 'On-page SEO', 'Enquiry system'],
    tags: ['Corporate', 'SEO', 'Web'],
    year: '2025',
    image: '/projects/srpetrochemicals.png',
  },
  {
    title: 'Bright Public School Godhi',
    url: 'https://bpsgodhi.in',
    category: 'Social & Ads',
    desc: 'Complete digital presence built from zero — website, social media optimization, and Meta ad campaigns driving real local reach.',
    deliverables: ['Website', 'Digital presence setup', 'Social media optimization', 'Meta ad campaigns'],
    tags: ['Web', 'Meta Ads', 'Social'],
    year: '2025',
    image: '/projects/bpsgodhi.png',
  },
  {
    title: 'Ankita Beauty Salon, Arang',
    url: 'https://ankitabeautysalonarang.in',
    category: 'Branding',
    desc: 'Full brand refresh for a growing salon — complete logo rebuild, new website, and social media optimization that matches the new identity.',
    deliverables: ['Logo rebuild', 'Website design & development', 'Social media optimization'],
    tags: ['Branding', 'Web', 'Social'],
    year: '2025',
    image: '/projects/ankitabeautysalon.png',
  },
  {
    title: 'Grafiya',
    url: 'https://grafiya.in',
    category: 'Branding',
    desc: 'Brand identity built from scratch — original logo design and a website that puts the new brand front and center.',
    deliverables: ['Logo design', 'Website design & development'],
    tags: ['Branding', 'Web'],
    year: '2025',
    image: '/projects/grafiya.png',
  },
]
