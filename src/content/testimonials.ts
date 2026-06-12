import type { Testimonial, Stat } from '@/types/content'

export const testimonials: Testimonial[] = [
  { name: 'Rahul Sharma', role: 'Founder, ShopEasy', msg: 'Website launched in 10 days. Sales tripled in 30 days. Mbjare literally changed my business.', rating: 5 },
  { name: 'Priya Verma', role: 'Owner, Beauty Hub', msg: 'WhatsApp bot handles 80% of my customer queries now. I gained 15 hours a week back.', rating: 5 },
  { name: 'Amit Tiwari', role: 'Manager, TechCorp', msg: 'Google Sheet automation saved my team 20+ hours every week. Worth every rupee.', rating: 5 },
  { name: 'Sneha Gupta', role: 'Director, Gupta Enterprises', msg: "They don't just build — they think about growth. Best tech partner we've ever worked with.", rating: 5 },
  { name: 'Vikram Singh', role: 'CEO, StartupHub CG', msg: 'World-class quality at startup-friendly prices. I keep coming back for every new project.', rating: 5 },
  { name: 'Megha Joshi', role: 'Founder, TalentBridge', msg: 'Our app went from idea to Play Store in 6 weeks. Mbjare team is absolutely incredible.', rating: 5 },
]

export const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 30, suffix: '+', label: 'Happy Clients' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate' },
  { value: 24, suffix: '/7', label: 'AI Working For You' },
]
