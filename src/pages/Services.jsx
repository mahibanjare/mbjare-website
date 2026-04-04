import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import {
  Globe, Smartphone, MessageSquare, FileSpreadsheet,
  Share2, Palette, MapPin, Mail, Database, Server,
  ArrowRight, CheckCircle, Zap
} from 'lucide-react'

const services = [
  {
    id: 'website-development',
    icon: Globe,
    title: 'Website Development',
    subtitle: 'Beautiful. Fast. Converting.',
    desc: 'Custom websites with React, Next.js and WordPress — blazing fast, SEO-optimized, and built to convert visitors into customers. Mobile-first, always.',
    features: [
      'Custom React / Next.js / WordPress',
      'Mobile-first responsive design',
      'Core Web Vitals optimized',
      'On-page SEO setup included',
      'CMS integration',
      '30-day post-launch support',
    ],
    price: 'Starting ₹9,999',
    timeline: '1–2 weeks',
    accent: '#0891b2',
    gradient: 'from-[#0891b2] to-[#06b6d4]',
  },
  {
    id: 'app-development',
    icon: Smartphone,
    title: 'App Development',
    subtitle: 'iOS & Android. One Codebase.',
    desc: 'Cross-platform apps with React Native and Flutter. From MVP to full product — we ship apps users genuinely enjoy using.',
    features: [
      'React Native / Flutter',
      'iOS & Android deployment',
      'REST API integration',
      'Push notifications',
      'App Store submission',
      'Performance optimization',
    ],
    price: 'Starting ₹24,999',
    timeline: '4–6 weeks',
    accent: '#7c3aed',
    gradient: 'from-[#7c3aed] to-[#a855f7]',
  },
  {
    id: 'whatsapp-api',
    icon: MessageSquare,
    title: 'WhatsApp Automation',
    subtitle: 'Automate. Engage. Convert.',
    desc: 'Integrate WhatsApp Business API to automate support, send order updates, qualify leads, and run campaigns — all on autopilot.',
    features: [
      'WhatsApp Business API setup',
      'Automated chatbot flows',
      'Broadcast campaigns',
      'Google Sheet sync',
      'Lead capture & qualification',
      'Analytics dashboard',
    ],
    price: 'Starting ₹4,999',
    timeline: '3–5 days',
    accent: '#009688',
    gradient: 'from-[#009688] to-[#26a69a]',
  },
  {
    id: 'google-sheet',
    icon: FileSpreadsheet,
    title: 'Google Sheet Automation',
    subtitle: 'Kill Manual Work. Forever.',
    desc: 'Custom Google Apps Script automations that connect your sheets to any API, send emails, generate reports, and eliminate hours of data entry.',
    features: [
      'Google Apps Script development',
      'Auto-email & WhatsApp triggers',
      'Form → Sheet → Email flows',
      'Multi-sheet data pipelines',
      'Custom dashboards',
      'Error alerts & monitoring',
    ],
    price: 'Starting ₹2,999',
    timeline: '2–4 days',
    accent: '#d97706',
    gradient: 'from-[#d97706] to-[#f59e0b]',
  },
  {
    id: 'social-media',
    icon: Share2,
    title: 'Social Media Management',
    subtitle: 'Grow Your Audience. Daily.',
    desc: 'Strategic content, creatives, posting schedules, and ad campaigns to grow your brand on Instagram, Facebook, LinkedIn, and more.',
    features: [
      '30 posts per month',
      'Premium Canva-quality creatives',
      'Caption + hashtag strategy',
      'Reels & Story content',
      'Monthly analytics report',
      'Meta Ads management',
    ],
    price: 'Starting ₹5,999/mo',
    timeline: 'Ongoing monthly',
    accent: '#db2777',
    gradient: 'from-[#db2777] to-[#ec4899]',
  },
  {
    id: 'graphic-design',
    icon: Palette,
    title: 'Graphic Design & Branding',
    subtitle: 'Look Like a Million Bucks.',
    desc: 'Logo, brand identity, UI/UX, business cards, banners, and marketing materials that make your business look premium and trustworthy.',
    features: [
      'Logo + full brand identity',
      'Business card design',
      'Social media templates (20+)',
      'Banner & poster design',
      'Brand style guide',
      'Unlimited revisions',
    ],
    price: 'Starting ₹1,999',
    timeline: '3–5 days',
    accent: '#ea580c',
    gradient: 'from-[#ea580c] to-[#fb923c]',
  },
  {
    id: 'google-business',
    icon: MapPin,
    title: 'Google Business Setup',
    subtitle: 'Dominate Local Search.',
    desc: 'Complete Google Business Profile setup and optimization to appear at the top of local searches and attract nearby customers.',
    features: [
      'Profile setup & verification',
      'Photo & description optimization',
      'Review response strategy',
      'Local SEO keyword targeting',
      'Q&A section setup',
      'Monthly performance report',
    ],
    price: 'Starting ₹1,499',
    timeline: '1–2 days',
    accent: '#009688',
    gradient: 'from-[#009688] to-[#4db6ac]',
  },
  {
    id: 'email-automation',
    icon: Mail,
    title: 'Email Automation',
    subtitle: 'Nurture Leads While You Sleep.',
    desc: 'Automated email sequences that welcome new leads, follow up with prospects, and convert customers — without you lifting a finger.',
    features: [
      'Welcome sequence setup',
      '5–7 email drip campaigns',
      'Mailchimp / SendGrid setup',
      'Lead magnet delivery',
      'A/B subject line testing',
      'Open & click rate optimization',
    ],
    price: 'Starting ₹3,999',
    timeline: '3–5 days',
    accent: '#4f46e5',
    gradient: 'from-[#4f46e5] to-[#6366f1]',
  },
  {
    id: 'data-management',
    icon: Database,
    title: 'Data Management',
    subtitle: 'Your Data. Your Power.',
    desc: 'Organize, clean, and structure your business data. Build dashboards and pipelines that give you real insights for smarter decisions.',
    features: [
      'Data cleaning & structuring',
      'Custom dashboards (Looker Studio)',
      'Automated reporting',
      'Database design (Supabase / Firebase)',
      'API data pipelines',
      'Real-time alerts',
    ],
    price: 'Starting ₹3,499',
    timeline: '3–7 days',
    accent: '#0284c7',
    gradient: 'from-[#0284c7] to-[#0ea5e9]',
  },
  {
    id: 'domain-hosting',
    icon: Server,
    title: 'Domain & Hosting',
    subtitle: '99.9% Uptime. Always Online.',
    desc: 'Right domain, SSL, and hosting plan for your business. We handle setup, security, and maintenance so you never go down.',
    features: [
      'Domain registration & transfer',
      'SSL certificate setup',
      'cPanel / Hostinger / Vercel setup',
      'Professional email hosting',
      'DNS management',
      'Speed optimization',
    ],
    price: 'Starting ₹999/yr',
    timeline: '1 day',
    accent: '#64748b',
    gradient: 'from-[#64748b] to-[#94a3b8]',
  },
]

function ServiceBlock({ s, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })
  const Icon = s.icon

  return (
    <div
      id={s.id}
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(44px)',
        transition: `all 0.65s cubic-bezier(0.4,0,0.2,1) ${(index % 3) * 0.08}s`,
      }}
      className="glass-card shimmer-border group relative overflow-hidden"
    >
      {/* Colored top stripe */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${s.gradient} opacity-70`} />

      <div className="p-7 relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${s.accent}22, ${s.accent}0a)`,
              border: `1px solid ${s.accent}40`,
              width: 52, height: 52,
            }}
          >
            <Icon size={22} style={{ color: s.accent }} />
          </div>
          <div className="text-right">
            <div className="font-bold text-sm mono-font" style={{ color: s.accent }}>{s.price}</div>
            <div className="text-white/30 text-xs mt-0.5">⏱ {s.timeline}</div>
          </div>
        </div>

        <h3 className="display-font font-bold text-white text-[18px] mb-1">{s.title}</h3>
        <div
          className={`text-[10px] mono-font uppercase tracking-widest mb-4 bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent`}
        >
          {s.subtitle}
        </div>
        <p className="text-white/45 text-sm leading-relaxed mb-5">{s.desc}</p>

        {/* Feature list */}
        <ul className="space-y-2 mb-7">
          {s.features.map(f => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-white/55">
              <CheckCircle size={12} style={{ color: s.accent, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group/lnk"
          style={{ color: s.accent }}
        >
          Get This Service
          <ArrowRight size={13} className="group-hover/lnk:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${s.accent}0a, transparent 70%)` }}
      />
    </div>
  )
}

export default function Services() {
  return (
    <div className="pt-32 pb-28 page-enter">

      {/* ── HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative">
        <div className="orb w-[600px] h-[400px] bg-[rgba(0,150,136,0.07)] -top-20 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative z-10">
          <div className="section-tag mx-auto w-fit">
            <Zap size={11} /> Services
          </div>
          <h1 className="display-font text-[clamp(2.5rem,6vw,72px)] font-bold text-white mb-6 leading-tight">
            Full-Stack <span className="gradient-text">Digital Power</span>
            <br />For Your Business
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Every digital service your business needs — under one roof, delivered at startup speed, with agency-level quality.
          </p>
          <Link to="/contact" className="btn-primary">
            Get Free Quote → No Commitment
          </Link>
        </div>
      </div>

      {/* ── QUICK STATS ROW */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: '10+', l: 'Services Offered' },
            { n: '2 wks', l: 'Avg. Delivery Time' },
            { n: '₹999', l: 'Starting Price' },
            { n: '100%', l: 'Satisfaction Rate' },
          ].map(({ n, l }) => (
            <div key={l} className="glass-card p-4 text-center">
              <div className="display-font text-2xl font-bold text-white mb-1">{n}</div>
              <div className="text-white/35 text-xs mono-font uppercase tracking-wider">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICE GRID */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceBlock key={s.id} s={s} index={i} />
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA */}
      <div className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <div className="glass-deep border border-[rgba(0,150,136,0.2)] p-12 relative overflow-hidden">
          <div className="orb w-56 h-56 bg-[rgba(0,150,136,0.1)] top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="display-font text-4xl font-bold text-white mb-4">
              Not Sure What You Need?
            </h2>
            <p className="text-white/40 mb-8 max-w-sm mx-auto">
              Book a free 30-min call. We'll analyze your business and suggest exactly what will drive the most growth.
            </p>
            <Link to="/contact" className="btn-primary group">
              Book Free Consultation
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
