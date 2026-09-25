import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 allows only quality 75 by default — portfolio screenshots use 90
    qualities: [75, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
  experimental: {
    // Admin image uploads go through a Server Action (default limit is 1 MB)
    serverActions: { bodySizeLimit: '5mb' },
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
