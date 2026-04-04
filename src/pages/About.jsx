import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import { ArrowRight, Zap, Target, Heart, Rocket, Users } from 'lucide-react'
import CountUp from 'react-countup'

const team = [
  { name: 'Founder / CEO',    role: 'Lead Developer & Strategist', bio: 'Passionate about building tech that solves real business problems. Codes, strategizes, and ships.',           emoji: '👨‍💻', skills: ['React', 'Node.js', 'Strategy'] },
  { name: 'Design Lead',      role: 'UI/UX & Brand Designer',      bio: 'Crafting interfaces users fall in love with. Believes great design is invisible.',                           emoji: '🎨', skills: ['Figma', 'Branding', 'Motion'] },
  { name: 'Automation Expert',role: 'Google & WhatsApp Automation', bio: 'Turns repetitive workflows into zero-click magic. If a human does it twice, a bot should do it.',          emoji: '⚡', skills: ['Apps Script', 'APIs', 'Bots'] },
  { name: 'Growth Lead',      role: 'Social Media & Paid Ads',     bio: 'Growing brands with content and campaigns. Obsessed with ROAS and engagement numbers.',                    emoji: '📈', skills: ['Meta Ads', 'SEO', 'Content'] },
]

const values = [
  { icon: Target,  title: 'Results First',       desc: 'Every project is measured by one KPI: did it grow your business? We don\'t ship anything we\'re not proud of.' },
  { icon: Heart,   title: 'Client Obsession',    desc: 'We respond within 2 hours and treat every client project like our own startup. Your success is our success.' },
  { icon: Rocket,  title: 'Move Fast',           desc: 'Speed is our superpower. Most websites in 2 weeks, automations in 3-5 days. No endless delays.' },
  { icon: Users,   title: 'Long-term Partners',  desc: 'We don\'t build and disappear. Our clients stay with us for years because we keep delivering.' },
]

const milestones = [
  { year: '2025 Q1', event: 'Mbjare InfoTech founded — first client in week 1' },
  { year: '2025 Q2', event: 'First 10 clients onboarded across Chhattisgarh' },
  { year: '2025 Q3', event: 'Launched WhatsApp Automation & App Dev services' },
  { year: '2025 Q4', event: '30+ happy clients, ₹10L+ revenue generated for clients' },
  { year: '2026 Q1', event: '50+ projects delivered. Website rebuilt in React + Supabase 🚀' },
]

function MilestoneCard({ milestone, index }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(40px)',
        transition: `all 0.5s ease ${index * 0.1}s`,
      }}
      className="flex items-center gap-4 glass-card p-4 group hover:border-[rgba(0,150,136,0.35)]"
    >
      <span className="mono-font text-[#009688] font-bold text-xs w-16 flex-shrink-0">{milestone.year}</span>
      <div className="w-1.5 h-1.5 rounded-full bg-[#009688] flex-shrink-0 shadow-[0_0_8px_rgba(0,150,136,0.8)]" />
      <span className="text-white/60 text-sm">{milestone.event}</span>
    </div>
  )
}

function ValueCard({ value, index }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  const Icon = value.icon
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.5s ease ${index * 0.1}s`,
      }}
      className="glass-card p-6 hover:border-[rgba(0,150,136,0.25)] group"
    >
      <div className="w-12 h-12 rounded-2xl bg-[rgba(0,150,136,0.08)] border border-[rgba(0,150,136,0.2)] flex items-center justify-center mb-5 group-hover:bg-[rgba(0,150,136,0.18)] group-hover:scale-110 transition-all duration-300">
        <Icon size={20} className="text-[#009688]" />
      </div>
      <h3 className="display-font font-semibold text-white text-[17px] mb-3">{value.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{value.desc}</p>
    </div>
  )
}

function TeamCard({ member, index }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.5s ease ${index * 0.1}s`,
      }}
      className="glass-card p-6 text-center group hover:border-[rgba(0,150,136,0.25)]"
    >
      <div className="w-16 h-16 rounded-2xl bg-[rgba(0,150,136,0.1)] border border-[rgba(0,150,136,0.2)] flex items-center justify-center mx-auto mb-4 text-4xl group-hover:scale-110 transition-transform duration-300">
        {member.emoji}
      </div>
      <h3 className="display-font font-bold text-white text-base mb-1">{member.name}</h3>
      <div className="text-[#4db6ac] text-xs mono-font mb-3">{member.role}</div>
      <p className="text-white/40 text-xs leading-relaxed mb-4">{member.bio}</p>
      <div className="flex flex-wrap gap-1.5 justify-center">
        {member.skills.map(s => (
          <span key={s} className="px-2.5 py-1 bg-[rgba(0,150,136,0.07)] border border-[rgba(0,150,136,0.15)] text-[#4db6ac] text-xs rounded-full mono-font">
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

function StatItem({ value, suffix, label }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <div ref={ref} className="text-center">
      <div className="display-font text-4xl font-bold stat-num mb-1">
        {inView ? <CountUp end={value} duration={2} /> : '0'}{suffix}
      </div>
      <div className="text-white/35 text-xs mono-font uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <div className="pt-32 pb-28 page-enter relative overflow-x-hidden">

      {/* ── HERO */}
      <div className="max-w-7xl mx-auto px-6 mb-20 relative">
        <div className="orb w-[600px] h-[400px] bg-[rgba(0,150,136,0.08)] -top-10 right-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="section-tag mb-6">
            <Zap size={11} /> About Mbjare
          </div>
          <h1 className="display-font text-[clamp(2.5rem,6vw,72px)] font-bold text-white mb-8 leading-tight">
            We're the Team That<br />
            <span className="gradient-text">Builds, Automates</span>
            <br />& Dominates
          </h1>
          <p className="text-white/45 text-xl leading-relaxed max-w-2xl">
            Mbjare InfoTech was born with a simple mission — give every business access to
            world-class digital solutions that actually grow revenue, not just look pretty.
          </p>
        </div>
      </div>

      {/* ── STATS */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="glass-deep p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem value={50}  suffix="+" label="Projects Done" />
          <StatItem value={30}  suffix="+" label="Happy Clients" />
          <StatItem value={15}  suffix="+" label="Services Offered" />
          <StatItem value={100} suffix="%" label="Satisfaction Rate" />
        </div>
      </div>

      {/* ── STORY + TIMELINE */}
      <div className="max-w-7xl mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="display-font text-4xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-white/45 leading-relaxed text-[15px]">
              <p>
                It started with a frustration. Our founder kept seeing small businesses paying
                lakhs for substandard digital work from agencies that didn't understand their needs or timelines.
              </p>
              <p>
                So Mbjare was born — with one obsession: build the kind of digital products
                that make clients say <span className="text-[#4db6ac]">"I can't believe this is possible at this price."</span>
              </p>
              <p>
                Today we're a sharp, hungry team of builders who eat, sleep, and breathe
                technology. Every day we wake up to ship something better than yesterday.
              </p>
              <p className="text-[#4db6ac] font-semibold text-base">
                Born in India. Built for the world. 🚀
              </p>
            </div>
            <Link to="/contact" className="btn-primary mt-8 group inline-flex">
              Work With Us
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-3">
            <h3 className="display-font text-lg font-semibold text-white/60 mb-5 mono-font uppercase tracking-widest text-sm">Journey So Far</h3>
            {milestones.map((m, i) => <MilestoneCard key={i} milestone={m} index={i} />)}
          </div>
        </div>
      </div>

      {/* ── VALUES */}
      <div className="max-w-7xl mx-auto px-6 mb-28">
        <div className="text-center mb-12">
          <h2 className="display-font text-4xl font-bold text-white mb-4">
            What Drives <span className="gradient-text">Everything We Do</span>
          </h2>
          <p className="text-white/35 max-w-md mx-auto">The principles that guide every decision, every line of code, every design.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => <ValueCard key={v.title} value={v} index={i} />)}
        </div>
      </div>

      {/* ── TEAM */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="display-font text-4xl font-bold text-white mb-4">
            Meet the <span className="gradient-text">Dream Team</span>
          </h2>
          <p className="text-white/35">Small but mighty. Every person here is exceptional at what they do.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
        </div>
      </div>

      {/* ── CTA */}
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="glass-deep border border-[rgba(0,150,136,0.2)] p-16 relative overflow-hidden">
          <div className="orb w-72 h-72 bg-[rgba(0,150,136,0.1)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="display-font text-4xl font-bold text-white mb-4">
              Join 30+ Businesses That <span className="gradient-text">Chose Growth</span>
            </h2>
            <p className="text-white/40 mb-8 max-w-md mx-auto">
              Let's add your success story to our portfolio. Book a free call today — no commitment, just a conversation.
            </p>
            <Link to="/contact" className="btn-primary group">
              Let's Build Together
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
