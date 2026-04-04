import { useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle, Zap, Clock, ArrowRight } from 'lucide-react'

const services = [
  'Website Development', 'Mobile App Development', 'WhatsApp API / Bot',
  'Google Sheet Automation', 'Social Media Management', 'Graphic Design / Branding',
  'Google Business Setup', 'Email Automation', 'Data Management',
  'Full Digital Package', 'Other / Not Sure',
]

const budgets = [
  'Under ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹30,000',
  '₹30,000 – ₹50,000', '₹50,000+', 'Let\'s discuss',
]

const faqs = [
  { q: 'How fast do you deliver?',             a: 'Most websites: 1-2 weeks. Automations: 3-5 days. Apps: 4-6 weeks. We always give exact timelines before starting.' },
  { q: 'Do you offer payment in installments?', a: 'Yes! We do 50% upfront and 50% on delivery for most projects. Flexible arrangements always possible.' },
  { q: 'What happens after the project is done?', a: '30 days of free post-launch support is included. After that, affordable monthly maintenance packages available.' },
  { q: 'Do you work with clients outside Raipur?', a: 'Absolutely — we work Pan-India. Everything managed remotely via WhatsApp, Zoom, and email.' },
  { q: 'Can I see examples before committing?',  a: 'Yes! Our Portfolio page has case studies, and we share more relevant examples on the discovery call.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const openEmailClient = (values) => {
    const subject = `Project inquiry from ${values.name}`
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone && `Phone: ${values.phone}`,
      values.service && `Service: ${values.service}`,
      values.budget && `Budget: ${values.budget}`,
      '',
      'Message:',
      values.message,
    ].filter(Boolean).join('\n')

    window.location.href = `mailto:hello@mbjare.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async e => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      openEmailClient(form)
      setSent(true)
      toast.success("Message prepared! Your email client should open next.")
      setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
    } catch (err) {
      console.error('Contact form error:', err)
      toast.error('Could not open email client. Please contact us directly via WhatsApp or email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-32 pb-28 page-enter">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── HEADER */}
        <div className="text-center mb-16 relative">
          <div className="orb w-[500px] h-[300px] bg-[rgba(0,150,136,0.07)] -top-10 left-1/2 -translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <div className="section-tag mx-auto w-fit mb-6"><Zap size={11} /> Get In Touch</div>
            <h1 className="display-font text-[clamp(2.5rem,6vw,68px)] font-bold text-white mb-5">
              Let's Build Something <span className="gradient-text">Extraordinary</span>
            </h1>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              Fill the form or WhatsApp us directly. We respond within 2 hours — always.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-24">

          {/* ── LEFT INFO CARDS */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { href: 'https://wa.me/91XXXXXXXXXX', Icon: MessageSquare, color: '#009688', title: 'WhatsApp Us', sub: 'Fastest — usually < 30 min', val: '+91 XXXX XXXXXX' },
              { href: 'mailto:hello@mbjare.com',    Icon: Mail,           color: '#0891b2', title: 'Email Us',     sub: 'Detailed queries & proposals', val: 'hello@mbjare.com' },
              { href: 'tel:+91XXXXXXXXXX',          Icon: Phone,          color: '#7c3aed', title: 'Call Us',      sub: 'Mon–Sat, 10am–7pm IST',      val: '+91 XXXX XXXXXX' },
            ].map(({ href, Icon, color, title, sub, val }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 p-5 group block"
                style={{ '--hc': color }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm mb-0.5">{title}</div>
                  <div className="text-white/35 text-xs mb-1">{sub}</div>
                  <div className="text-xs mono-font truncate" style={{ color }}>{val}</div>
                </div>
                <ArrowRight size={14} className="text-white/15 group-hover:text-white/50 transition-colors flex-shrink-0" />
              </a>
            ))}

            {/* Location */}
            <div className="glass-card flex items-center gap-4 p-5">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-white/40" />
              </div>
              <div>
                <div className="text-white font-semibold text-sm mb-0.5">Location</div>
                <div className="text-white/35 text-xs">Raipur, Chhattisgarh, India</div>
                <div className="text-white/20 text-xs mt-0.5">Remote work available Pan-India</div>
              </div>
            </div>

            {/* Promise card */}
            <div className="glass-deep border border-[rgba(0,150,136,0.2)] p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-xl bg-[rgba(0,150,136,0.1)] border border-[rgba(0,150,136,0.2)] flex items-center justify-center">
                  <Clock size={14} className="text-[#009688]" />
                </div>
                <span className="text-white font-semibold text-sm">Our Promise to You</span>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Reply within 2 hours, every day',
                  'Free consultation — zero pressure',
                  'Transparent pricing, no hidden fees',
                  '30-day free support post-launch',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-white/50 text-sm">
                    <CheckCircle size={12} className="text-[#009688] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT FORM */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="glass-deep border border-[rgba(0,150,136,0.25)] p-16 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-[rgba(0,150,136,0.15)] border border-[rgba(0,150,136,0.3)] flex items-center justify-center mb-6 animate-bounce">
                  <CheckCircle size={36} className="text-[#009688]" />
                </div>
                <h2 className="display-font text-3xl font-bold text-white mb-4">Message Sent! 🎉</h2>
                <p className="text-white/45 mb-7 max-w-xs text-sm leading-relaxed">
                  We've received your message and will respond within 2 hours. Get ready to build something amazing!
                </p>
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hi!%20I%20just%20filled%20your%20contact%20form"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-primary"
                >
                  💬 Also WhatsApp Us
                </a>
                <button onClick={() => setSent(false)} className="mt-4 text-white/25 text-xs hover:text-white/50 transition-colors">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="glass-card p-8 space-y-5">
                {/* Top shimmer line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[rgba(0,150,136,0.5)] to-transparent" />

                <div className="mb-2">
                  <h2 className="display-font text-2xl font-bold text-white mb-1">Get Your Free Quote</h2>
                  <p className="text-white/35 text-sm">No commitment. Just a friendly conversation about your goals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-[10px] mb-2 mono-font uppercase tracking-widest">Your Name *</label>
                    <input name="name" value={form.name} onChange={onChange} placeholder="Rahul Sharma" className="input-dark" required />
                  </div>
                  <div>
                    <label className="block text-white/40 text-[10px] mb-2 mono-font uppercase tracking-widest">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" className="input-dark" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/40 text-[10px] mb-2 mono-font uppercase tracking-widest">WhatsApp Number</label>
                    <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 98765 43210" className="input-dark" />
                  </div>
                  <div>
                    <label className="block text-white/40 text-[10px] mb-2 mono-font uppercase tracking-widest">Budget Range</label>
                    <select name="budget" value={form.budget} onChange={onChange} className="input-dark appearance-none">
                      <option value="">Select budget</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] mb-2 mono-font uppercase tracking-widest">Service Needed</label>
                  <select name="service" value={form.service} onChange={onChange} className="input-dark appearance-none">
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-white/40 text-[10px] mb-2 mono-font uppercase tracking-widest">Tell Us About Your Project *</label>
                  <textarea
                    name="message" value={form.message} onChange={onChange}
                    placeholder="Describe your project, goals, deadline, and any specific requirements..."
                    rows={5} className="input-dark resize-none" required
                  />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full justify-center group">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>Send My Quote Request <Send size={14} className="group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>

                <p className="text-white/20 text-xs text-center">🔒 Your information is 100% private. We never spam or sell data.</p>
              </form>
            )}
          </div>
        </div>

        {/* ── FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="display-font text-4xl font-bold text-white text-center mb-12">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <span className="text-white font-medium pr-4 text-sm">{q}</span>
                  <span className={`text-[#009688] text-xl font-light flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-white/45 text-sm leading-relaxed border-t border-white/[0.05] pt-4">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
