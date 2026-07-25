import type { Testimonial, Stat } from '@/types/content'

// Grounded in real portfolio work — one testimonial per live client project.
export const testimonials: Testimonial[] = [
  {
    name: 'Dharshakti Sweets & Restaurant',
    role: 'Website · QR Ordering, Arang',
    msg: 'Customers scan a QR at the table and order in Hindi or English, and we see every order live at the reception. Our 45-year-old brand finally has a digital home as premium as our sweets.',
    rating: 5,
  },
  {
    name: 'SR Petrochemicals',
    role: 'Corporate Website · SEO',
    msg: 'Our website finally matches the scale of our business. The enquiry pipeline brings in qualified leads, and we now rank for the products that matter.',
    rating: 5,
  },
  {
    name: 'Bright Public School Godhi',
    role: 'Web · Social · Meta Ads',
    msg: 'They built our entire digital presence from zero — website, social media, and Meta ad campaigns that delivered real local reach. Results we can actually see.',
    rating: 5,
  },
  {
    name: 'Ankita Beauty Salon',
    role: 'Branding · Web · Social, Arang',
    msg: 'The brand refresh transformed how the salon looks online — a fresh logo, a website I am proud of, and social media that finally matches our new identity.',
    rating: 5,
  },
  {
    name: 'Grafiya',
    role: 'Brand Identity · Website',
    msg: 'From a blank page to a complete brand — original logo and a website that puts our identity front and centre. Exactly what we needed to launch with confidence.',
    rating: 5,
  },
]

export const stats: Stat[] = [
  { value: 5, suffix: '', label: 'Client Brands Built End-to-End' },
  { value: 5, suffix: '★', label: 'Rating From Every Client' },
  { value: 2, suffix: 'hr', label: 'Typical Reply Time' },
  { value: 24, suffix: '/7', label: 'AI Working For You' },
]
