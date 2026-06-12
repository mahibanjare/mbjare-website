import type { Project } from '@/types/content'

export const categories = ['All', 'Websites', 'Branding', 'Social & Ads'] as const

export const projects: Project[] = [
  {
    title: 'SR Petrochemicals',
    url: 'https://srpetrochemicals.in',
    category: 'Websites',
    desc: 'Corporate website for a petrochemicals business — product range, company profile and enquiry pipeline, built to rank and convert.',
    deliverables: ['Website design & development', 'On-page SEO', 'Enquiry system'],
    tags: ['Corporate', 'SEO', 'Web'],
    year: '2025',
  },
  {
    title: 'BPS Godhi',
    url: 'https://bpsgodhi.in',
    category: 'Social & Ads',
    desc: 'Complete digital presence built from zero — website, social media optimization, and Meta ad campaigns driving real local reach.',
    deliverables: ['Website', 'Digital presence setup', 'Social media optimization', 'Meta ad campaigns'],
    tags: ['Web', 'Meta Ads', 'Social'],
    year: '2025',
  },
  {
    title: 'Ankita Beauty Salon, Arang',
    url: 'https://ankitabeautysalonarang.in',
    category: 'Branding',
    desc: 'Full brand refresh for a growing salon — complete logo rebuild, new website, and social media optimization that matches the new identity.',
    deliverables: ['Logo rebuild', 'Website design & development', 'Social media optimization'],
    tags: ['Branding', 'Web', 'Social'],
    year: '2025',
  },
  {
    title: 'Grafiya',
    url: 'https://grafiya.in',
    category: 'Branding',
    desc: 'Brand identity built from scratch — original logo design and a website that puts the new brand front and center.',
    deliverables: ['Logo design', 'Website design & development'],
    tags: ['Branding', 'Web'],
    year: '2025',
  },
]
