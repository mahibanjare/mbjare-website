import { site } from '@/content/site'
import type { Service } from '@/types/content'

/**
 * Centralised JSON-LD builders. Each returns a plain object that is
 * serialised into a <script type="application/ld+json"> tag.
 * Keeping them here avoids duplicating schema across pages and keeps
 * the entity definition (name, address, contact) consistent for both
 * classic SEO (Google/Bing rich results) and GEO (AI answer engines).
 */

const ORG_ID = `${site.url}/#organization`
const WEBSITE_ID = `${site.url}/#website`

export const organizationSchema = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  slogan: site.tagline,
  image: `${site.url}/logo.png`,
  logo: `${site.url}/logo.png`,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Raipur',
    addressRegion: 'Chhattisgarh',
    addressCountry: 'IN',
  },
  areaServed: [
    { '@type': 'State', name: 'Chhattisgarh' },
    { '@type': 'Country', name: 'India' },
  ],
  openingHours: 'Mo-Sa 10:00-19:00',
  sameAs: site.socials.map((s) => s.href),
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: site.url,
  name: site.name,
  publisher: { '@id': ORG_ID },
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function serviceSchema(service: Service) {
  return {
    '@type': 'Service',
    name: service.title,
    description: service.desc,
    serviceType: service.title,
    url: `${site.url}/services/${service.slug}`,
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'State', name: 'Chhattisgarh' },
      { '@type': 'Country', name: 'India' },
    ],
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}

/** Wrap one or more schema nodes into a single @context graph. */
export function graph(...nodes: object[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  }
}
