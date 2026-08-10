'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Globe,
  LineChart,
  Maximize,
  MessageSquare,
  Minimize,
  Moon,
  Palette,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Timer,
  TrendingDown,
  Users,
  Workflow,
  X,
  Zap,
} from 'lucide-react'
import { m } from '@/components/motion'
import { site } from '@/content/site'

/* ── Language ──────────────────────────────────────────────── */

type Lang = 'en' | 'hi'
type Bi = { en: string; hi: string }

const LangContext = createContext<Lang>('en')

function useT() {
  const lang = useContext(LangContext)
  return useCallback((o: Bi) => o[lang], [lang])
}

/* ── Deck data (bilingual) ─────────────────────────────────── */

const proof = [
  { title: 'Dharshakti Sweets & Restaurant', tag: 'Website · QR Ordering', img: '/projects/dharshakti.png' },
  { title: 'SR Petrochemicals', tag: 'Corporate Website · SEO', img: '/projects/srpetrochemicals.png' },
  { title: 'Bright Public School Godhi', tag: 'Web · Social · Meta Ads', img: '/projects/bpsgodhi.png' },
  { title: 'Ankita Beauty Salon', tag: 'Branding · Web · Social', img: '/projects/ankitabeautysalon.png' },
  { title: 'Grafiya', tag: 'Brand Identity · Website', img: '/projects/grafiya.png' },
]

const problems: { icon: typeof Search; title: Bi; desc: Bi }[] = [
  {
    icon: Search,
    title: { en: 'Customers check you online first', hi: 'ग्राहक पहले आपको online देखते हैं' },
    desc: {
      en: 'Before visiting or buying, people search Google and Instagram. If they can’t find you, they pick someone they can.',
      hi: 'खरीदने या आने से पहले लोग Google और Instagram पर खोजते हैं। आप नहीं मिले, तो जो मिला उसे चुन लेते हैं।',
    },
  },
  {
    icon: TrendingDown,
    title: { en: 'No website = no trust', hi: 'Website नहीं = भरोसा नहीं' },
    desc: {
      en: 'An outdated or missing website kills credibility instantly — before you ever get a chance to talk.',
      hi: 'पुरानी या गायब website तुरंत भरोसा तोड़ देती है — बात करने का मौका मिलने से पहले ही।',
    },
  },
  {
    icon: MessageSquare,
    title: { en: 'Manual replies, missed leads', hi: 'Manual reply, छूटते ग्राहक' },
    desc: {
      en: 'Enquiries at 11pm go unanswered. By morning, that customer has already bought from someone else.',
      hi: 'रात 11 बजे की enquiry का जवाब नहीं मिला — सुबह तक ग्राहक किसी और से खरीद चुका।',
    },
  },
  {
    icon: Users,
    title: { en: 'Competitors are one tap away', hi: 'Competitor बस एक tap दूर' },
    desc: {
      en: 'The business with the better online presence wins the customer — even if your product is better.',
      hi: 'जिसकी online पहचान बेहतर, ग्राहक उसी का — चाहे आपका product बेहतर हो।',
    },
  },
]

const impacts: { stat: string; label: Bi }[] = [
  {
    stat: '70%',
    label: {
      en: 'of customers judge a business by its online presence — that first impression happens without you.',
      hi: 'ग्राहक आपके online presence से आपको आंकते हैं — पहली छाप आपके बिना ही बन जाती है।',
    },
  },
  {
    stat: '60 sec',
    label: {
      en: 'is all a visitor gives a slow or outdated website before leaving — straight to a competitor.',
      hi: 'बस इतना समय मिलता है धीमी या पुरानी website को — फिर visitor सीधा competitor के पास।',
    },
  },
  {
    stat: '0 leads',
    label: {
      en: 'get captured while you sleep, without automation. Night-time enquiries simply disappear.',
      hi: 'रात में capture होती हैं बिना automation के। enquiries बस गायब हो जाती हैं।',
    },
  },
]

const solutions: { icon: typeof Globe; title: Bi; desc: Bi }[] = [
  {
    icon: Globe,
    title: { en: 'Website that sells', hi: 'Website जो बेचती है' },
    desc: { en: 'Fast, premium, built to convert visitors into enquiries.', hi: 'तेज़, premium, visitors को ग्राहक बनाने के लिए बनी।' },
  },
  {
    icon: Bot,
    title: { en: 'AI chatbot — 24/7', hi: 'AI chatbot — 24/7' },
    desc: { en: 'Answers customers in Hindi & English, even at 2am.', hi: 'हिंदी और English में जवाब — रात 2 बजे भी।' },
  },
  {
    icon: MessageSquare,
    title: { en: 'WhatsApp automation', hi: 'WhatsApp automation' },
    desc: { en: 'Auto-replies, order updates, campaigns — on autopilot.', hi: 'Auto-reply, order updates, campaigns — सब autopilot पर।' },
  },
  {
    icon: Palette,
    title: { en: 'Branding that earns trust', hi: 'Branding जो भरोसा जीते' },
    desc: { en: 'A logo and identity that make you look like a ₹1Cr company.', hi: 'ऐसा logo और पहचान कि आप ₹1Cr की company लगें।' },
  },
  {
    icon: Zap,
    title: { en: 'Ads that bring buyers', hi: 'Ads जो खरीदार लाएँ' },
    desc: { en: 'Meta & Google campaigns tracked down to the rupee.', hi: 'Meta और Google campaigns — हर रुपये का हिसाब।' },
  },
  {
    icon: LineChart,
    title: { en: 'Dashboards & automation', hi: 'Dashboards और automation' },
    desc: { en: 'Your business numbers, live — no manual registers.', hi: 'आपके business के आँकड़े live — कोई manual register नहीं।' },
  },
]

const whyUs: { icon: typeof Users; title: Bi; desc: Bi }[] = [
  {
    icon: Users,
    title: { en: 'Talk directly to the makers', hi: 'सीधे बनाने वालों से बात' },
    desc: {
      en: 'No call centres. You deal with the team that actually builds — on WhatsApp, every day.',
      hi: 'कोई call centre नहीं। जो team बनाती है, उसी से WhatsApp पर सीधी बात — रोज़।',
    },
  },
  {
    icon: Sparkles,
    title: { en: '5★ from every client', hi: 'हर client से 5★' },
    desc: {
      en: 'Every single client we’ve worked with rates us 5 stars — and would recommend us.',
      hi: 'अब तक के हर client ने हमें 5 star दिया है — और आगे recommend भी करते हैं।',
    },
  },
  {
    icon: Timer,
    title: { en: 'Ridiculously fast', hi: 'बेहद तेज़ delivery' },
    desc: {
      en: 'Websites live in 1–2 weeks, automations in days. Replies within 2 hours, always.',
      hi: 'Website 1–2 हफ्ते में live, automation कुछ दिनों में। जवाब 2 घंटे के अंदर, हमेशा।',
    },
  },
  {
    icon: Workflow,
    title: { en: 'AI-first advantage', hi: 'AI-first बढ़त' },
    desc: {
      en: 'We build systems that sell, reply and grow your business 24/7 — while you sleep.',
      hi: 'हम ऐसे system बनाते हैं जो 24/7 बेचते, जवाब देते और business बढ़ाते हैं — आपके सोते हुए भी।',
    },
  },
]

const promiseStrip: Bi[] = [
  { en: 'Free strategy call', hi: 'Free strategy call' },
  { en: '50% upfront · 50% on delivery', hi: '50% शुरू में · 50% delivery पर' },
  { en: '30 days free support', hi: '30 दिन free support' },
  { en: 'We don’t stop until you love it', hi: 'जब तक आपको पसंद न आए, हम रुकते नहीं' },
]

const pricing: { service: string; price: Bi; note: Bi }[] = [
  { service: 'Website Development', price: { en: 'from ₹9,999', hi: '₹9,999 से' }, note: { en: 'Live in 1–2 weeks', hi: '1–2 हफ्ते में live' } },
  { service: 'Business Automation', price: { en: 'from ₹2,999', hi: '₹2,999 से' }, note: { en: 'Sheets · WhatsApp · Email · AI', hi: 'Sheets · WhatsApp · Email · AI' } },
  { service: 'Branding & Logo Design', price: { en: 'from ₹1,999', hi: '₹1,999 से' }, note: { en: 'Complete brand kit', hi: 'पूरा brand kit' } },
  { service: 'Social Media Management', price: { en: 'from ₹5,999/mo', hi: '₹5,999/माह से' }, note: { en: 'Posts + reels + growth', hi: 'Posts + reels + growth' } },
  { service: 'Google Business Setup', price: { en: 'from ₹1,499', hi: '₹1,499 से' }, note: { en: 'Live in 1–2 days', hi: '1–2 दिन में live' } },
  { service: 'Meta Ads & Marketing', price: { en: 'from ₹4,999/mo', hi: '₹4,999/माह से' }, note: { en: '+ ad spend', hi: '+ ad spend' } },
]

const steps: { n: string; title: Bi; desc: Bi }[] = [
  {
    n: '01',
    title: { en: 'Today — this meeting', hi: 'आज — यही meeting' },
    desc: {
      en: 'Free strategy call. We understand your business and goals — zero cost, zero pressure.',
      hi: 'Free strategy call। हम आपका business और लक्ष्य समझते हैं — बिना किसी खर्च या दबाव के।',
    },
  },
  {
    n: '02',
    title: { en: 'Within 48 hours', hi: '48 घंटे के अंदर' },
    desc: {
      en: 'You get a clear plan and a written quote. You approve before anything starts.',
      hi: 'साफ plan और लिखित quote आपके हाथ में। आपकी मंज़ूरी के बाद ही काम शुरू।',
    },
  },
  {
    n: '03',
    title: { en: '1–2 weeks — we build', hi: '1–2 हफ्ते — निर्माण' },
    desc: {
      en: 'Fast, focused sprint. You see progress in real time on WhatsApp.',
      hi: 'तेज़, focused काम। WhatsApp पर live progress दिखती रहती है।',
    },
  },
  {
    n: '04',
    title: { en: 'Launch & grow', hi: 'Launch और growth' },
    desc: {
      en: 'Go live with 30 days of free support. Then we optimize and keep compounding.',
      hi: '30 दिन free support के साथ live। फिर लगातार बेहतर, लगातार आगे।',
    },
  },
]

/* ── Motion helpers ────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const

/** Staggered entrance for elements inside a slide — plays right after the slide lands. */
function Item({ children, i = 0, className }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay: 0.2 + i * 0.09 }}
    >
      {children}
    </m.div>
  )
}

/** Spring pop for big stats. */
function Pop({ children, i = 0, className }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.35 + i * 0.15 }}
    >
      {children}
    </m.div>
  )
}

/* ── Slides ────────────────────────────────────────────────── */

function SlideCover() {
  const t = useT()
  return (
    <div className="text-center max-w-4xl mx-auto">
      <Item i={0}>
        <div className="est-line mx-auto w-fit mb-8">
          {t({ en: 'Mbjare InfoTech · Digital Growth Partner', hi: 'Mbjare InfoTech · आपका डिजिटल ग्रोथ पार्टनर' })}
        </div>
      </Item>
      <Item i={1}>
        <h1 className="display-font text-[clamp(3rem,8vw,104px)] font-bold leading-[1.02] tracking-[-0.03em] mb-8">
          <span className="text-fg">Build. </span>
          <span className="text-gradient-anim">Automate.</span>
          <br />
          <span className="text-fg">Grow.</span>
        </h1>
      </Item>
      <Item i={2}>
        <p className="text-fg/50 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed">
          {t({
            en: 'How we turn your business into a 24/7 digital engine — and what it costs you to wait.',
            hi: 'हम आपके business को बनाते हैं एक 24/7 डिजिटल इंजन — और दिखाते हैं कि इंतज़ार की कीमत क्या है।',
          })}
        </p>
      </Item>
      <Item i={3}>
        <p className="mono-font text-[11px] uppercase tracking-[0.3em] text-fg/30 mt-12">
          {site.url.replace('https://', '')}&ensp;·&ensp;{site.phone}
        </p>
      </Item>
    </div>
  )
}

function SlideProblem() {
  const t = useT()
  return (
    <div className="max-w-5xl mx-auto w-full">
      <Item i={0}>
        <div className="kicker mb-3">{t({ en: '01 · The Problem', hi: '01 · समस्या' })}</div>
        <h2 className="display-font text-3xl md:text-5xl font-bold text-fg mb-10">
          {t({ en: 'Your customers are online.', hi: 'आपके ग्राहक online हैं।' })}
          <br />
          <span className="text-outline">{t({ en: 'Is your business?', hi: 'क्या आपका business है?' })}</span>
        </h2>
      </Item>
      <div className="grid sm:grid-cols-2 gap-4">
        {problems.map((p, i) => (
          <Item key={p.title.en} i={i + 1}>
            <div className="glass-card p-6 h-full">
              <div className="icon-tile w-11 h-11 mb-4"><p.icon size={19} /></div>
              <h3 className="display-font font-semibold text-fg text-lg mb-2">{t(p.title)}</h3>
              <p className="text-fg/45 text-sm leading-relaxed">{t(p.desc)}</p>
            </div>
          </Item>
        ))}
      </div>
    </div>
  )
}

function SlideImpact() {
  const t = useT()
  return (
    <div className="max-w-5xl mx-auto w-full">
      <Item i={0}>
        <div className="kicker mb-3">{t({ en: '02 · The Cost of Waiting', hi: '02 · इंतज़ार की कीमत' })}</div>
        <h2 className="display-font text-3xl md:text-5xl font-bold text-fg mb-10">
          {t({ en: 'Every day offline is ', hi: 'हर दिन offline रहना यानी ' })}
          <span className="text-gradient">{t({ en: 'money lost', hi: 'नुकसान' })}</span>
        </h2>
      </Item>
      <Item i={1}>
        <div className="anchor-card p-8 md:p-10">
          <span className="foil-strip" aria-hidden />
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {impacts.map((s, i) => (
              <div key={s.stat}>
                <Pop i={i}>
                  <div className="display-font text-4xl md:text-5xl font-bold text-gold mb-3">{s.stat}</div>
                </Pop>
                <p className="text-sm leading-relaxed">{t(s.label)}</p>
              </div>
            ))}
          </div>
          <div className="hairline mb-6" />
          <p className="text-base md:text-lg font-medium text-fg">
            {t({
              en: 'The cost of doing nothing is invisible — until your competitor’s board goes up next door.',
              hi: 'कुछ न करने की कीमत दिखती नहीं — जब तक बगल में competitor का बोर्ड न लग जाए।',
            })}
          </p>
        </div>
      </Item>
    </div>
  )
}

function SlideSolution() {
  const t = useT()
  return (
    <div className="max-w-5xl mx-auto w-full">
      <Item i={0}>
        <div className="kicker mb-3">{t({ en: '03 · The Solution', hi: '03 · समाधान' })}</div>
        <h2 className="display-font text-3xl md:text-5xl font-bold text-fg mb-4">
          {t({ en: 'One partner. A complete ', hi: 'एक partner। पूरा ' })}
          <span className="text-gradient">{t({ en: 'digital engine.', hi: 'डिजिटल इंजन।' })}</span>
        </h2>
        <p className="text-fg/45 text-base md:text-lg mb-10 max-w-2xl">
          {t({
            en: 'Everything under one roof — one team, one point of accountability. Each part feeds the other, so the whole engine compounds.',
            hi: 'सब कुछ एक ही छत के नीचे — एक team, एक जिम्मेदारी। हर हिस्सा दूसरे को ताकत देता है, इसलिए पूरा इंजन बढ़ता जाता है।',
          })}
        </p>
      </Item>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {solutions.map((s, i) => (
          <Item key={s.title.en} i={i + 1}>
            <div className="glass-card p-5 h-full">
              <div className="icon-tile w-10 h-10 mb-4"><s.icon size={18} /></div>
              <h3 className="display-font font-semibold text-fg text-base mb-1.5">{t(s.title)}</h3>
              <p className="text-fg/45 text-[13px] leading-relaxed">{t(s.desc)}</p>
            </div>
          </Item>
        ))}
      </div>
    </div>
  )
}

function SlideProof() {
  const t = useT()
  return (
    <div className="max-w-5xl mx-auto w-full">
      <Item i={0}>
        <div className="kicker mb-2">{t({ en: '04 · Proof', hi: '04 · सबूत' })}</div>
        <h2 className="display-font text-3xl md:text-4xl font-bold text-fg mb-2">
          {t({ en: 'Real clients. ', hi: 'असली clients। ' })}
          <span className="text-outline">{t({ en: 'Live right now.', hi: 'अभी live।' })}</span>
        </h2>
        <p className="text-fg/45 text-sm md:text-base mb-6">
          {t({
            en: 'Open any of these on your phone right now — every one rates us ',
            hi: 'इनमें से कोई भी अपने phone पर अभी खोलकर देखिए — हर client ने हमें दिया है ',
          })}
          <span className="text-gold font-semibold">5★</span>
        </p>
      </Item>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {proof.map((p, i) => (
          <Item key={p.title} i={i + 1}>
            <figure className="glass-card overflow-hidden h-full">
              <div className="relative aspect-video overflow-hidden border-b border-fg/[0.06]">
                <Image src={p.img} alt={p.title} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover object-top" />
              </div>
              <figcaption className="p-3">
                <div className="text-fg text-[13px] font-semibold leading-tight">{p.title}</div>
                <div className="mono-font text-[9px] uppercase tracking-[0.15em] text-fg/35 mt-0.5">{p.tag}</div>
              </figcaption>
            </figure>
          </Item>
        ))}
        <Item i={6}>
          <div className="glass-card flex flex-col items-center justify-center p-5 text-center h-full">
            <div className="display-font text-3xl md:text-4xl font-bold text-gold mb-1.5">5★</div>
            <p className="text-fg/50 text-[13px]">
              {t({ en: 'from every single client we’ve worked with', hi: 'हमारे हर एक client की तरफ से' })}
            </p>
          </div>
        </Item>
      </div>
    </div>
  )
}

function SlideWhyUs() {
  const t = useT()
  return (
    <div className="max-w-5xl mx-auto w-full">
      <Item i={0}>
        <div className="kicker mb-3">{t({ en: '05 · Why Mbjare', hi: '05 · Mbjare ही क्यों' })}</div>
        <h2 className="display-font text-3xl md:text-5xl font-bold text-fg mb-10">
          {t({ en: 'Built different, ', hi: 'अलग सोच, ' })}
          <span className="text-gradient">{t({ en: 'on purpose', hi: 'जानबूझकर' })}</span>
        </h2>
      </Item>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {whyUs.map((r, i) => (
          <Item key={r.title.en} i={i + 1}>
            <div className="glass-card p-6 h-full">
              <div className="icon-tile w-11 h-11 mb-4"><r.icon size={19} /></div>
              <h3 className="display-font font-semibold text-fg text-lg mb-2">{t(r.title)}</h3>
              <p className="text-fg/45 text-sm leading-relaxed">{t(r.desc)}</p>
            </div>
          </Item>
        ))}
      </div>
      <Item i={5}>
        <div className="anchor-card px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="foil-strip" aria-hidden />
          {promiseStrip.map((p) => (
            <span key={p.en} className="inline-flex items-center gap-2 text-sm font-medium">
              <ShieldCheck size={15} className="text-accent-2 shrink-0" /> {t(p)}
            </span>
          ))}
        </div>
      </Item>
    </div>
  )
}

function SlidePricing() {
  const t = useT()
  return (
    <div className="max-w-4xl mx-auto w-full">
      <Item i={0}>
        <div className="kicker mb-3">{t({ en: '06 · Investment', hi: '06 · निवेश' })}</div>
        <h2 className="display-font text-3xl md:text-5xl font-bold text-fg mb-10">
          {t({ en: 'Premium work. ', hi: 'Premium काम। ' })}
          <span className="text-gradient">{t({ en: 'Honest pricing.', hi: 'ईमानदार दाम।' })}</span>
        </h2>
      </Item>
      <div className="glass-card divide-y divide-fg/[0.06]">
        {pricing.map((p, i) => (
          <m.div
            key={p.service}
            className="flex items-center justify-between gap-4 px-6 py-4"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease, delay: 0.3 + i * 0.08 }}
          >
            <div>
              <div className="text-fg font-semibold text-sm md:text-base">{p.service}</div>
              <div className="mono-font text-[10px] uppercase tracking-[0.15em] text-fg/35 mt-0.5">{t(p.note)}</div>
            </div>
            <div className="display-font text-base md:text-lg font-bold text-accent-2 whitespace-nowrap">{t(p.price)}</div>
          </m.div>
        ))}
      </div>
      <Item i={7}>
        <p className="mono-font text-[11px] uppercase tracking-[0.2em] text-fg/35 mt-6 text-center">
          {t({
            en: '50% to start · 50% only on delivery · every quote confirmed in writing',
            hi: '50% शुरू में · 50% सिर्फ delivery पर · हर quote लिखित में',
          })}
        </p>
      </Item>
    </div>
  )
}

function SlideSteps() {
  const t = useT()
  return (
    <div className="max-w-5xl mx-auto w-full">
      <Item i={0}>
        <div className="kicker mb-3">{t({ en: '07 · Getting Started', hi: '07 · शुरुआत कैसे' })}</div>
        <h2 className="display-font text-3xl md:text-5xl font-bold text-fg mb-10">
          {t({ en: 'From this meeting ', hi: 'इसी meeting से ' })}
          <span className="text-gradient">{t({ en: 'to launch', hi: 'launch तक' })}</span>
        </h2>
      </Item>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <Item key={s.n} i={i + 1}>
            <div className="glass-card p-6 pt-12 relative h-full">
              <span className="step-num" aria-hidden>{s.n}</span>
              <h3 className="display-font font-semibold text-fg text-base mb-2">{t(s.title)}</h3>
              <p className="text-fg/45 text-[13px] leading-relaxed">{t(s.desc)}</p>
            </div>
          </Item>
        ))}
      </div>
    </div>
  )
}

function SlideCTA() {
  const t = useT()
  return (
    <div className="text-center max-w-3xl mx-auto">
      <Item i={0}>
        <div className="est-line mx-auto w-fit mb-8">
          {t({ en: 'The Next Step Is Yours', hi: 'अगला कदम आपका' })}
        </div>
      </Item>
      <Item i={1}>
        <h2 className="display-font text-[clamp(2.5rem,7vw,80px)] font-bold leading-[1.05] tracking-[-0.03em] text-fg mb-6">
          {t({ en: 'Let’s build your', hi: 'चलिए बनाते हैं आपका' })}
          <br />
          <span className="text-gradient-anim">{t({ en: 'digital engine.', hi: 'डिजिटल इंजन।' })}</span>
        </h2>
      </Item>
      <Item i={2}>
        <p className="text-fg/50 text-lg mb-10">
          {t({
            en: 'Start today with a free strategy call — no cost, no obligation, no pressure.',
            hi: 'आज ही free strategy call से शुरुआत कीजिए — कोई खर्च नहीं, कोई दबाव नहीं।',
          })}
        </p>
      </Item>
      <Item i={3}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageSquare size={16} /> {t({ en: 'WhatsApp Us Now', hi: 'अभी WhatsApp कीजिए' })}
          </a>
          <a href={site.phoneHref} className="btn-ghost">
            <Phone size={15} /> {site.phone}
          </a>
        </div>
      </Item>
      <Item i={4}>
        <p className="mono-font text-[11px] uppercase tracking-[0.25em] text-fg/35">
          {site.email}&ensp;·&ensp;{site.url.replace('https://', '')}&ensp;·&ensp;Raipur → Pan-India
        </p>
      </Item>
    </div>
  )
}

/* ── Deck shell ────────────────────────────────────────────── */

const SLIDES: { key: string; C: () => ReactNode }[] = [
  { key: 'cover', C: SlideCover },
  { key: 'problem', C: SlideProblem },
  { key: 'impact', C: SlideImpact },
  { key: 'solution', C: SlideSolution },
  { key: 'proof', C: SlideProof },
  { key: 'why', C: SlideWhyUs },
  { key: 'pricing', C: SlidePricing },
  { key: 'steps', C: SlideSteps },
  { key: 'cta', C: SlideCTA },
]

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 90 : -90 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.55, ease } },
  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -90 : 90, transition: { duration: 0.3, ease } }),
}

export default function PitchDeck() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0])
  const [fullscreen, setFullscreen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [lang, setLang] = useState<Lang>('en')
  const siteTheme = useRef<string | null>(null)
  const touchX = useRef<number | null>(null)
  const total = SLIDES.length
  const Active = SLIDES[index].C

  const go = useCallback(
    (next: number) => {
      setState(([cur]) => {
        const clamped = Math.max(0, Math.min(total - 1, next))
        return clamped === cur ? [cur, 0] : [clamped, clamped > cur ? 1 : -1]
      })
    },
    [total],
  )

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', ' ', 'Enter', 'PageDown'].includes(e.key)) { e.preventDefault(); setState(([c]) => [Math.min(total - 1, c + 1), 1]) }
      if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); setState(([c]) => [Math.max(0, c - 1), -1]) }
      if (e.key === 'Home') setState([0, -1])
      if (e.key === 'End') setState([total - 1, 1])
      if (e.key === 'f' || e.key === 'F') toggleFullscreen()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total, toggleFullscreen])

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  /* The deck presents in its own theme (light by default) without touching the
     visitor's saved site preference — restored when the deck closes. */
  useEffect(() => {
    const root = document.documentElement
    if (siteTheme.current === null) siteTheme.current = root.getAttribute('data-theme') ?? ''
    root.setAttribute('data-theme', theme)
  }, [theme])
  useEffect(() => {
    return () => {
      const root = document.documentElement
      if (siteTheme.current) root.setAttribute('data-theme', siteTheme.current)
      else root.removeAttribute('data-theme')
    }
  }, [])

  return (
    <LangContext.Provider value={lang}>
      <div
        className="fixed inset-0 z-[70] bg-bg overflow-hidden select-none"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return
          const dx = e.changedTouches[0].clientX - touchX.current
          if (dx < -50) go(index + 1)
          if (dx > 50) go(index - 1)
          touchX.current = null
        }}
      >
        {/* Atmosphere */}
        <div className="absolute inset-0 hero-glow" aria-hidden />
        <div className="absolute inset-0 opacity-30 dot-grid" aria-hidden />
        <div className="orb orb-1" aria-hidden />
        <div className="orb orb-2" aria-hidden />

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-fg/[0.06] z-20">
          <m.div
            className="h-full bg-gradient-to-r from-accent to-accent-2"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ duration: 0.4, ease }}
          />
        </div>

        {/* Top bar — brand left, presentation controls right */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4">
          <Image src="/logo.svg" alt="Mbjare InfoTech" width={44} height={44} className="logo-glow" />
          <div className="flex items-center gap-2">
            {/* EN / हिं */}
            <div className="flex items-center rounded-full border border-fg/10 p-1 gap-0.5">
              {(['en', 'hi'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`px-3 h-7 rounded-full text-xs font-bold transition-all ${
                    lang === l ? 'bg-accent text-[#fffdf8]' : 'text-fg/50 hover:text-fg'
                  }`}
                >
                  {l === 'en' ? 'EN' : 'हिं'}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-fg/10 text-fg/50 hover:text-fg hover:border-accent/40 transition-all"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-fg/10 text-fg/50 hover:text-fg hover:border-accent/40 transition-all"
            >
              {fullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
            <Link
              href="/"
              aria-label="Exit presentation"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-fg/10 text-fg/50 hover:text-fg hover:border-accent/40 transition-all"
            >
              <X size={17} />
            </Link>
          </div>
        </div>

        {/* Slide stage — keyed by slide + language so switching either replays the entrance */}
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.section
            key={`${SLIDES[index].key}-${lang}`}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
          >
            <div className="w-full max-h-[calc(100vh-160px)] overflow-y-auto py-4">
              <Active />
            </div>
          </m.section>
        </AnimatePresence>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4">
          <span className="w-24 hidden md:block" aria-hidden />

          {/* Dots */}
          <div className="flex items-center gap-2 mx-auto md:mx-0">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-7 bg-accent-2' : 'w-1.5 bg-fg/20 hover:bg-fg/40'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="mono-font text-[11px] text-fg/35 tabular-nums">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label="Previous slide"
              className="w-11 h-11 flex items-center justify-center rounded-full border border-fg/10 text-fg/60 hover:text-fg hover:border-accent/40 transition-all disabled:opacity-25 disabled:pointer-events-none"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === total - 1}
              aria-label="Next slide"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-accent text-[#fffdf8] hover:brightness-110 transition-all disabled:opacity-25 disabled:pointer-events-none shadow-[0_8px_24px_var(--glow)]"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </LangContext.Provider>
  )
}
