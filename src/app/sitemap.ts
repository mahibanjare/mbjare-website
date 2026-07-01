import type { MetadataRoute } from 'next'
import { services } from '@/content/services'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticPages = ['', '/services', '/portfolio', '/about', '/faq', '/contact'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const servicePages = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages]
}
