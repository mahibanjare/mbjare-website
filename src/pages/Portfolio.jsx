import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, ArrowRight, Zap, TrendingUp } from 'lucide-react'

const categories = ['All', 'Web Development', 'Mobile App', 'Automation', 'Digital Marketing']

const projects = [
  {
    title: 'ShopEasy E-Commerce',
    category: 'Web Development',
    desc: 'Full-stack shopping portal with Razorpay payments, real-time order tracking, and an admin dashboard.',
    tags: ['React', 'Node.js', 'Razorpay'],
    result: '3× Sales Growth',
    metric: '+218% revenue in 30 days',
    emoji: '🛒',
    accent: '#0891b2',
  },
  {
    title: 'Restaurant Ordering App',
    category: 'Mobile App',
    desc: 'Online food ordering with WhatsApp notifications, live kitchen status & table management.',
    tags: ['React Native', 'WhatsApp API'],
    result: '500+ Daily Orders',
    metric: 'Reduced wait time by 60%',
    emoji: '🍽️',
    accent: '#d97706',
  },
  {
    title: 'HR Automation Suite',
    category: 'Automation',
    desc: 'Automated attendance tracking, payroll calculation & reporting via Google Sheets for 50-person team.',
    tags: ['Apps Script', 'Gmail API'],
    result: '20 hrs/week Saved',
    metric: 'Zero manual data entry',
    emoji: '⚡',
    accent: '#009688',
  },
  {
    title: 'Real Estate Portal',
    category: 'Web Development',
    desc: 'Property listing site with lead capture, CRM, and automated WhatsApp follow-up sequences.',
    tags: ['React', 'Supabase', 'WhatsApp'],
    result: '200+ Leads/Month',
    metric: '4.2× lead conversion rate',
    emoji: '🏠',
    accent: '#7c3aed',
  },
  {
    title: 'Medical Clinic Website',
    category: 'Web Development',
    desc: 'Doctor appointment booking system with SMS reminders and patient history portal.',
    tags: ['React', 'Node.js', 'SMS API'],
    result: '150+ Bookings/Month',
    metric: '0 missed appointments',
    emoji: '🏥',
    accent: '#db2777',
  },
  {
    title: 'Social Media Dashboard',
    category: 'Digital Marketing',
    desc: 'Unified analytics dashboard for 5 social accounts with automated monthly reporting.',
    tags: ['Meta API', 'React', 'Charts'],
    result: '5× Engagement',
    metric: 'Followers grew 340%',
    emoji: '📊',
    accent: '#4f46e5',
  },
  {
    title: 'WhatsApp Lead Bot',
    category: 'Automation',
    desc: 'AI-powered qualification bot that captures, scores, and books appointments automatically.',
    tags: ['WhatsApp API', 'Google Sheets'],
    result: '80% Auto-Qualified',
    metric: '3× faster lead response',
    emoji: '🤖',
    accent: '#009688',
  },
  {
    title: 'Coaching Institute App',
    category: 'Mobile App',
    desc: 'Student portal with video lectures, live tests, attendance tracking & fee management.',
    tags: ['Flutter', 'Firebase'],
    result: '1200+ Students',
    metric: 'App Store rating: 4.8★',
    emoji: '🎓',
    accent: '#d97706',
  },
  {
    title: 'Inventory Management System',
    category: 'Automation',
    desc: 'Real-time stock tracking with automated low-inventory WhatsApp alerts for retail chain.',
    tags: ['Google Sheets', 'WhatsApp API'],
    result: 'Zero Stock-outs',
    metric: 'Saved ₹2L in excess stock',
    emoji: '📦',
    accent: '#64748b',
  },
]

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${(index % 3) * 0.09}s`,
      }}
      className="glass-card shimmer-border group overflow-hidden cursor-pointer"
    >
      {/* Top accent bar */}
      <div
        className="h-[3px] w-full transition-all duration-500 group-hover:h-[4px]"
        style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.accent}88)` }}
      />

      <div className="p-6">
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-14 h-14 rounded-2xl text-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}08)`,
              border: `1px solid ${project.accent}30`,
            }}
          >
            {project.emoji}
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: `${project.accent}18`,
              color: project.accent,
              border: `1px solid ${project.accent}35`,
            }}
          >
            <TrendingUp size={11} />
            {project.result}
          </div>
        </div>

        <h3 className="display-font font-bold text-white text-[17px] mb-2">{project.title}</h3>
        <p className="text-white/45 text-sm leading-relaxed mb-4">{project.desc}</p>

        {/* Metric pill */}
        <div className="flex items-center gap-2 mb-5 p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
          <span className="text-white/55 text-xs">{project.metric}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-xs mono-font"
              style={{ background: `${project.accent}10`, color: `${project.accent}cc`, border: `1px solid ${project.accent}25` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-white/25 group-hover:text-white/60 transition-colors duration-300 text-xs font-medium">
          <ExternalLink size={12} />
          <span>View Case Study</span>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{ background: `radial-gradient(ellipse at 30% 0%, ${project.accent}09, transparent 65%)` }}
      />
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <div className="pt-32 pb-28 page-enter">

      {/* ── HEADER */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative">
        <div className="orb w-[600px] h-[400px] bg-[rgba(0,150,136,0.07)] -top-10 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="relative z-10">
          <div className="section-tag mx-auto w-fit">
            <Zap size={11} /> Our Work
          </div>
          <h1 className="display-font text-[clamp(2.5rem,6vw,72px)] font-bold text-white mb-6">
            Projects That <span className="gradient-text">Moved Needles</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Real results for real businesses. Every project is built with one goal — to grow your revenue.
          </p>
        </div>
      </div>

      {/* ── FILTER TABS */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-2.5 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? 'bg-[#009688] text-white shadow-[0_4px_20px_rgba(0,150,136,0.4)]'
                  : 'glass-card text-white/45 hover:text-white hover:border-[rgba(0,150,136,0.3)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID */}
      <div className="max-w-7xl mx-auto px-6">
        <div
          key={active}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>

      {/* ── CTA */}
      <div className="max-w-4xl mx-auto px-6 mt-24 text-center">
        <div className="glass-deep border border-[rgba(0,150,136,0.2)] p-14 relative overflow-hidden">
          <div className="orb w-60 h-60 bg-[rgba(0,150,136,0.1)] top-0 left-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="display-font text-4xl font-bold text-white mb-4">
              Want Results Like These?
            </h2>
            <p className="text-white/40 mb-8 max-w-sm mx-auto">
              Your business could be the next success story. Let's build something the market won't forget.
            </p>
            <Link to="/contact" className="btn-primary group">
              Start Your Project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
