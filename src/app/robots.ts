import type { MetadataRoute } from 'next'
import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard search + AI answer-engine crawlers — all explicitly welcome.
      // Being explicit keeps us citable in ChatGPT, Perplexity, Google AI
      // Overviews, Claude, etc. instead of relying on a blanket "*" rule.
      {
        userAgent: [
          '*',
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'Applebot',
          'Applebot-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
