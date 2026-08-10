import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  async redirects() {
    // Old standalone service pages merged into /services/business-automation
    const merged = [
      'ai-chatbots-agents',
      'ai-workflow-automation',
      'whatsapp-automation',
      'google-sheet-automation',
      'email-automation',
      'data-dashboards',
    ];
    return merged.map((slug) => ({
      source: `/services/${slug}`,
      destination: '/services/business-automation',
      permanent: true,
    }));
  },
};

export default nextConfig;
