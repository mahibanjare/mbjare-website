import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Globe, Database, Palette, Share2,
  MapPin, Mail, Smartphone, MessageSquare, FileSpreadsheet,
  Star, ChevronRight, TrendingUp, Shield, Clock, Zap,
  Code2, Cpu, BarChart3, CheckCircle2, Sparkles
} from 'lucide-react'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { TypeAnimation } from 'react-type-animation'

// ── DATA ──────────────────────────────────────────────────────────────────────
const services = [
  { icon: Globe,          title: 'Website Development',      desc: 'Lightning-fast, conversion-optimized websites. React, Next.js, WordPress — built to rank & sell.', tags: ['React','Next.js','WordPress'], accent: '#0891b2' },
  { icon: Smartphone,     title: 'App Development',          desc: 'iOS & Android apps that users love. From MVP to full product — shipped in weeks, not months.', tags: ['React Native','Flutter'], accent: '#7c3aed' },
  { icon: MessageSquare,  title: 'WhatsApp Automation',      desc: 'Turn WhatsApp into your 24/7 sales & support engine. Bots, broadcasts, lead flows.', tags: ['Meta API','Automation'], accent: '#059669' },
  { icon: FileSpreadsheet,title: 'Google Sheet Automation',  desc: 'Eliminate manual data entry forever. Custom scripts that connect your sheets to any API.', tags: ['Apps Script','No-Code'], accent: '#d97706' },
  { icon: Share2,         title: 'Social Media Management',  desc: 'Content, creatives & paid ads that grow your brand on Instagram, Facebook & LinkedIn.', tags: ['Meta Ads','Content'], accent: '#db2777' },
  { icon: Palette,        title: 'Graphic Design & Branding',desc: 'Logos, brand kits, UI/UX & marketing assets that make you look like a ₹1Cr company.', tags: ['Figma','Brand'], accent: '#ea580c' },
  { icon: MapPin,         title: 'Google Business Setup',    desc: 'Dominate local search. Show up first when customers search for your service nearby.', tags: ['Local SEO','Maps'], accent: '#009688' },
  { icon: Mail,           title: 'Email Automation',         desc: 'Drip sequences that nurture leads and close deals while you sleep.', tags: ['Sequences','SMTP'], accent: '#4f46e5' },
  { icon: Database,       title: 'Data Management',          desc: 'Clean pipelines, smart dashboards, and real-time reports for data-driven decisions.', tags: ['Analytics','Dashboards'], accent: '#0284c7' },
]

const stats = [
  { value: 50,  suffix: '+', label: 'Projects Delivered', icon: Code2 },
  { value: 30,  suffix: '+', label: 'Happy Clients',       icon: Star },
  { value: 100, suffix: '%', label: 'Satisfaction Rate',   icon: CheckCircle2 },
  { value: 2,   suffix: 'yrs',label: 'In Business',        icon: TrendingUp },
]

const testimonials = [
  { name: 'Rahul Sharma',  role: 'Founder, ShopEasy',       msg: 'Website launched in 10 days. Sales tripled in 30 days. Mbjare literally changed my business.',       rating: 5 },
  { name: 'Priya Verma',   role: 'Owner, Beauty Hub',        msg: 'WhatsApp bot handles 80% of my customer queries now. I gained 15 hours a week back.',                rating: 5 },
  { name: 'Amit Tiwari',   role: 'Manager, TechCorp',        msg: 'Google Sheet automation saved my team 20+ hours every week. Worth every rupee.',                      rating: 5 },
  { name: 'Sneha Gupta',   role: 'Director, Gupta Enterprises', msg: 'They don\'t just build — they think about growth. Best tech partner we\'ve ever worked with.',    rating: 5 },
  { name: 'Vikram Singh',  role: 'CEO, StartupHub CG',       msg: 'World-class quality at startup-friendly prices. I keep coming back for every new project.',          rating: 5 },
  { name: 'Megha Joshi',   role: 'Founder, TalentBridge',    msg: 'Our app went from idea to Play Store in 6 weeks. Mbjare team is absolutely incredible.',             rating: 5 },
]

const marqueeItems = [
  '⚡ Web Development', '🤖 WhatsApp Bots', '📱 Mobile Apps',
  '📊 Sheet Automation', '🎨 Brand Design', '📈 Meta Ads',
  '🗺️ Local SEO', '✉️ Email Flows', '☁️ Cloud Setup', '🔒 Secure Hosting',
]

const process = [
  { step: '01', title: 'Discovery Call',    desc: 'Free 30-min strategy session. We listen, understand your goals, and ask the right questions.',        icon: Cpu },
  { step: '02', title: 'Plan & Quote',      desc: 'Custom roadmap + transparent pricing within 24hrs. No hidden costs, no vague estimates.',             icon: BarChart3 },
  { step: '03', title: 'Build & Iterate',   desc: 'Our team executes fast, sharing updates daily via WhatsApp. You always know what\'s happening.',      icon: Code2 },
  { step: '04', title: 'Launch & Grow',     desc: 'Go live with confidence. 30-day free support + monthly growth reviews if you need them.',             icon: TrendingUp },
]

const whyUs = [
  { icon: Zap,       title: 'Ship in Days, Not Months', desc: 'We move at startup speed. Most projects are live in 1-2 weeks.' },
  { icon: Shield,    title: 'Quality or Money Back',    desc: 'If you\'re not satisfied, we iterate until you are. Simple.' },
  { icon: Clock,     title: 'WhatsApp-First Support',   desc: 'Reply in under 2 hours, every day. No ticketing system nonsense.' },
  { icon: Sparkles,  title: 'Growth-Obsessed',          desc: 'We ask "did it grow your business?" — not just "did we ship it?".' },
]

const techStack = ['React', 'Next.js', 'Node.js', 'Supabase', 'Flutter', 'Figma', 'Meta API', 'Google Cloud', 'WhatsApp API', 'Tailwind', 'TypeScript', 'Firebase']

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function ProcessCard({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const Icon = item.icon
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `all 0.65s ease ${index * 0.13}s`,
      }}
      className="relative text-center group"
    >
      {/* Connector line between cards */}
      {index < process.length - 1 && (
        <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-[rgba(0,150,136,0.3)] to-transparent" />
      )}
      <div className="w-20 h-20 rounded-2xl glass-deep border border-[rgba(0,150,136,0.25)] flex items-center justify-center mx-auto mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300">
        <Icon size={22} className="text-[#4db6ac]" />
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#009688] text-black text-[10px] font-bold mono-font flex items-center justify-center">
          {index + 1}
        </span>
      </div>
      <h3 className="display-font font-semibold text-white text-base mb-2">{item.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed px-2">{item.desc}</p>
    </div>
  )
}

function StatCard({ stat, index }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const Icon = stat.icon
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `all 0.5s ease ${index * 0.1}s`,
      }}
      className="text-center group"
    >
      <div className="w-12 h-12 rounded-2xl glass-card mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon size={18} className="text-[#009688]" />
      </div>
      <div className="display-font text-5xl font-bold stat-num mb-1">
        {inView ? <CountUp end={stat.value} duration={2.5} /> : '0'}{stat.suffix}
      </div>
      <div className="text-white/40 text-xs mono-font uppercase tracking-widest">{stat.label}</div>
    </div>
  )
}

function ServiceCard({ service, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })
  const Icon = service.icon
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.6s ease ${(index % 3) * 0.1}s`,
      }}
      className="glass-card shimmer-border p-6 group"
    >
      <div className="icon-ring mb-5" style={{ '--accent': service.accent }}>
        <Icon size={20} style={{ color: service.accent }} />
      </div>
      <h3 className="display-font font-bold text-white text-[17px] mb-2">{service.title}</h3>
      <p className="text-white/45 text-sm leading-relaxed mb-5">{service.desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {service.tags.map(t => (
          <span key={t} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs mono-font">
            {t}
          </span>
        ))}
      </div>
      <Link to="/services" className="flex items-center gap-1.5 text-xs font-semibold text-[#009688] hover:text-[#4db6ac] transition-colors group/lnk">
        Learn More <ChevronRight size={13} className="group-hover/lnk:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}

function TestimonialCard({ t }) {
  return (
    <div className="glass-card p-6 min-w-[300px] max-w-[340px] flex-shrink-0 group hover:border-[rgba(0,150,136,0.35)]">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={13} fill="#009688" className="text-[#009688]" />
        ))}
      </div>
      <p className="text-white/65 text-sm leading-relaxed mb-5 italic">"{t.msg}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#009688] to-[#00695c] flex items-center justify-center text-white font-bold text-sm">
          {t.name[0]}
        </div>
        <div>
          <div className="text-white text-sm font-semibold">{t.name}</div>
          <div className="text-white/35 text-xs">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const fn = e => {
      if (!heroRef.current) return
      const r = heroRef.current.getBoundingClientRect()
      setMouse({
        x: ((e.clientX - r.left) / r.width  - 0.5) * 24,
        y: ((e.clientY - r.top)  / r.height - 0.5) * 24,
      })
    }
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <div className="page-enter">

      {/* ══════════════════════════════════════════ HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient orbs */}
        <div className="orb w-[700px] h-[700px] bg-[rgba(0,150,136,0.1)] -top-32 -right-32" style={{ transform: `translate(${mouse.x*0.4}px,${mouse.y*0.4}px)` }} />
        <div className="orb w-[500px] h-[500px] bg-[rgba(0,120,100,0.07)] -bottom-32 -left-32" style={{ transform: `translate(${-mouse.x*0.2}px,${-mouse.y*0.2}px)` }} />
        <div className="orb w-[300px] h-[300px] bg-[rgba(0,188,212,0.06)] top-1/3 left-1/4" style={{ transform: `translate(${mouse.x*0.15}px,${mouse.y*0.15}px)` }} />

        {/* Grid */}
        <div className="absolute inset-0 grid-bg" />

        {/* Subtle horizontal scan line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,150,136,0.4)] to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-36 pb-24">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[rgba(0,150,136,0.3)] bg-[rgba(0,150,136,0.07)] backdrop-blur-md mb-10 animate-fade-in">
            <span className="teal-dot w-1.5 h-1.5" />
            <span className="mono-font text-[#4db6ac] text-[11px] tracking-[0.18em] uppercase">
              India's Next-Gen Digital Agency
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#009688] text-black text-[10px] font-bold">NEW</span>
          </div>

          {/* Heading */}
          <h1 className="display-font text-[clamp(3rem,8vw,90px)] font-bold leading-[1.04] tracking-tight mb-8 animate-slide-up">
            <span className="text-white">We Build </span>
            <span className="gradient-text">
              <TypeAnimation
                sequence={[
                  'Websites', 2200,
                  'Mobile Apps', 2200,
                  'WhatsApp Bots', 2200,
                  'Automations', 2200,
                  'Your Future', 2200,
                ]}
                wrapper="span"
                repeat={Infinity}
                speed={45}
              />
            </span>
            <br />
            <span className="text-white/85">That </span>
            <span className="italic text-white/30">Actually</span>
            <span className="text-white/85"> Grow Your Business</span>
          </h1>

          {/* Sub */}
          <p className="text-white/45 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            From zero to ₹10L revenue — we've helped 30+ businesses transform digitally.
            Websites, apps, bots & automations that work while you sleep. 🚀
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link to="/contact" className="btn-primary group">
              Start Your Project — It's Free
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio" className="btn-ghost">
              See Our Work
            </Link>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            {['✅ Free Discovery Call', '⚡ 2-Week Delivery', '🛡️ 30-Day Support', '💯 Money-Back Promise'].map(item => (
              <span key={item} className="px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-white/40 text-xs">
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20 text-[10px] mono-font">
          <span>scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[rgba(0,150,136,0.4)] to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════ MARQUEE */}
      <section className="py-5 border-y border-[rgba(0,150,136,0.1)] overflow-hidden" style={{ background: 'rgba(0,150,136,0.03)' }}>
        <div className="marquee-wrapper">
          {[1, 2].map(n => (
            <div key={n} className={`marquee-content${n === 2 ? '-2' : ''}`}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/25 mono-font text-[11px] uppercase tracking-widest whitespace-nowrap">
                  <span className="text-[#009688] text-base">✦</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════ STATS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-deep p-12 grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ SERVICES */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-[rgba(0,150,136,0.06)] top-0 right-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="section-tag mx-auto w-fit"><Zap size={11} />Services</div>
            <h2 className="display-font text-[clamp(2.2rem,5vw,58px)] font-bold text-white mb-5">
              Everything Your Business Needs<br />
              <span className="gradient-text">Under One Roof</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              End-to-end digital services from strategy to execution — we handle the tech so you can handle the growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-ghost group inline-flex">
              View All Services + Pricing
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ TECH STACK STRIP */}
      <section className="py-14 px-6 border-y border-[rgba(0,150,136,0.08)]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-white/25 mono-font text-xs uppercase tracking-widest mb-8">Tech Stack We Master</p>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map(tech => (
              <span key={tech} className="px-4 py-2 glass-card text-white/50 text-xs mono-font hover:text-[#4db6ac] hover:border-[rgba(0,150,136,0.3)] transition-all duration-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ HOW WE WORK */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="orb w-[600px] h-[400px] bg-[rgba(0,150,136,0.05)] -bottom-20 left-1/2 -translate-x-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="section-tag mx-auto w-fit">How We Work</div>
            <h2 className="display-font text-[clamp(2rem,4.5vw,52px)] font-bold text-white mb-4">
              Simple. Fast. <span className="gradient-text">Brilliant.</span>
            </h2>
            <p className="text-white/40 max-w-lg mx-auto">
              4 steps from idea to live product. No confusion, no surprises — just results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => <ProcessCard key={item.step} item={item} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ WHY US */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="section-tag">Why Mbjare</div>
              <h2 className="display-font text-[clamp(2rem,4.5vw,52px)] font-bold text-white mb-6">
                We Treat Your <br />
                <span className="gradient-text">Business Like Ours</span>
              </h2>
              <p className="text-white/45 text-lg leading-relaxed mb-10">
                We're not an agency that takes money and disappears. We obsess over your results, 
                move faster than you expect, and become your long-term tech partner.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {whyUs.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(0,150,136,0.1)] border border-[rgba(0,150,136,0.2)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(0,150,136,0.2)] transition-all duration-300">
                      <Icon size={15} className="text-[#009688]" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">{title}</div>
                      <div className="text-white/40 text-xs leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary group mt-10 inline-flex">
                Let's Work Together <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Floating proof cards */}
            <div className="relative h-[460px] hidden lg:block">
              <div className="absolute top-0 right-0 w-72 glass-deep p-5 rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-[rgba(0,150,136,0.2)] flex items-center justify-center">
                    <CheckCircle2 size={14} className="text-[#009688]" />
                  </div>
                  <span className="text-white text-sm font-semibold">Delivered On Time ✓</span>
                </div>
                <div className="text-white/40 text-xs">E-commerce for ShopEasy — sales 3x in 30 days</div>
              </div>
              <div className="absolute top-36 left-0 w-72 glass-deep p-5 -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="mono-font text-[#4db6ac] text-[10px] uppercase tracking-widest mb-2">Client ROI This Month</div>
                <div className="display-font text-4xl font-bold stat-num">₹3.6L+</div>
                <div className="text-white/35 text-xs mt-1">Revenue generated across active client projects</div>
              </div>
              <div className="absolute bottom-0 right-8 w-72 glass-deep p-5 rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="flex items-center gap-1.5 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#009688" className="text-[#009688]" />)}
                  <span className="text-white/50 text-xs ml-1">5.0 / 5.0</span>
                </div>
                <div className="text-white text-sm font-medium mb-1">"Best tech partner in India!"</div>
                <div className="text-white/35 text-xs">— Vikram Singh, StartupHub CG</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════ TESTIMONIALS */}
      <section className="py-24 overflow-hidden" style={{ background: 'rgba(0,150,136,0.025)' }}>
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <div className="section-tag mx-auto w-fit">Testimonials</div>
          <h2 className="display-font text-[clamp(2rem,4.5vw,52px)] font-bold text-white mb-4">
            Real Clients. <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="text-white/35">Don't take our word for it — hear from the businesses we've transformed.</p>
        </div>
        {/* Auto-scroll testimonials */}
        <div className="flex gap-5 px-6 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
          {testimonials.map(t => <TestimonialCard key={t.name} t={t} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════ CTA BANNER */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="glass-deep relative overflow-hidden p-16 text-center border border-[rgba(0,150,136,0.2)]">
            {/* Inner glow */}
            <div className="orb w-80 h-80 bg-[rgba(0,150,136,0.12)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,150,136,0.6)] to-transparent" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass-card border border-[rgba(0,150,136,0.3)]">
                <span className="teal-dot w-1.5 h-1.5" />
                <span className="text-[#4db6ac] mono-font text-[11px] uppercase tracking-widest">Limited Slots — March 2026</span>
              </div>
              <h2 className="display-font text-[clamp(2.2rem,5vw,60px)] font-bold text-white mb-6">
                Ready to Build Something<br />
                <span className="gradient-text">the Market Won't Forget?</span>
              </h2>
              <p className="text-white/40 text-lg max-w-xl mx-auto mb-10">
                Book a free 30-minute strategy call. We'll map out exactly how to grow your business online — no commitment needed.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary group animate-glow">
                  Book Free Strategy Call
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hi!%20I%20want%20a%20free%20strategy%20call"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  💬 WhatsApp Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
