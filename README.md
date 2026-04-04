# 🚀 Mbjare InfoTech — World-Class Website

Built with **React + Vite + Tailwind CSS**

---

## ✨ Features

- ⚡ **Blazing fast** — Vite + React 18
- 🎨 **Jaw-dropping design** — Custom cursor, animated hero, glassmorphism cards
- 📱 **Fully responsive** — Mobile-first design
- 🔥 **Animated** — Scroll reveals, TypeAnimation, CountUp, Marquee
- 📬 **Lead capture** — Contact form with local email client flow
- 📰 **Newsletter** — Email CTA for direct updates
- 🗂️ **5 Pages** — Home, Services, Portfolio, About, Contact
- 🧭 **React Router** — Smooth page transitions
- 🍞 **Toast notifications** — react-hot-toast
- 🖱️ **Custom cursor** — Orange glow cursor effect
- 🔍 **SEO ready** — Meta tags, Open Graph

---

## 📁 Project Structure

```
mbjare-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky navbar + mobile menu
│   │   ├── Footer.jsx        # Full footer with newsletter
│   │   └── ScrollToTop.jsx   # Auto scroll on route change
│   ├── pages/
│   │   ├── Home.jsx          # Epic landing page
│   │   ├── Services.jsx      # All 10 services
│   │   ├── Portfolio.jsx     # 9 projects with filter
│   │   ├── About.jsx         # Team, values, timeline
│   │   └── Contact.jsx       # Form + FAQ
│   ├── lib/
│   │   └── supabase.js       # Supabase client + helpers
│   ├── App.jsx               # Routes
│   ├── main.jsx              # Entry point
│   └── index.css             # Tailwind + custom styles
├── supabase_schema.sql        # ← Run this in Supabase
├── .env.example               # ← Copy to .env
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🛠️ Setup Instructions

### Step 1 — Install Dependencies
```bash
cd mbjare-website
npm install
```

### Step 2 — Setup Supabase
1. Go to [supabase.com](https://supabase.com) → Create new project
2. Go to **SQL Editor** → New query
3. Paste the contents of `supabase_schema.sql` and run it
4. Go to **Settings → API** → Copy your **Project URL** and **anon public key**

### Step 3 — Configure Environment Variables
```bash
cp .env.example .env
```
> Note: Never commit `.env` to version control. Only `.env.example` belongs in the repo.

Edit `.env`:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_SHEET_AUTH_URL=https://script.google.com/macros/s/your-script-id/exec
```

### Step 4 — Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) 🎉

### Step 5 — Build for Production
```bash
npm run build
```

---

## 🚀 Deployment

### Option A: Vercel (Recommended — Free)
```bash
npm install -g vercel
vercel
```
Add your env vars in Vercel dashboard → Settings → Environment Variables.

### Option B: Netlify
```bash
npm run build
# Drag & drop the `dist` folder to netlify.com
```

### Option C: Your Existing Hosting (cPanel)
```bash
npm run build
# Upload the `dist` folder contents to your public_html directory
```

---

## 🔧 Customization Checklist

After setup, update these:

- [ ] **Phone number**: Search `+91XXXXXXXXXX` → Replace with your number
- [ ] **Email**: Replace `hello@mbjare.com` with your email
- [ ] **WhatsApp link**: Update all `wa.me/91XXXXXXXXXX` links
- [ ] **Social media links**: Update in `Footer.jsx`
- [ ] **Portfolio projects**: Update in `Portfolio.jsx`
- [ ] **Team details**: Update in `About.jsx`
- [ ] **Pricing**: Update in `Services.jsx`

---

## 📊 Supabase Tables

| Table | Purpose |
|-------|---------|
| `leads` | Contact form & quote requests |
| `newsletter` | Email subscribers |
| `testimonials` | Client reviews |
| `portfolio` | Project showcase |
| `articles` | Blog (optional) |

**Admin Dashboard**: Go to Supabase → Table Editor to see all leads from your contact form.

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `react-router-dom` | Page routing |
| `framer-motion` | Animations (optional, ready to use) |
| `react-hot-toast` | Toast notifications |
| `react-countup` | Animated number counters |
| `react-type-animation` | Typewriter hero text |
| `react-intersection-observer` | Scroll reveal animations |
| `@supabase/supabase-js` | Database & backend |
| `lucide-react` | Beautiful icons |

---

## 🎨 Design System

- **Primary font**: Clash Display (headings)
- **Body font**: Satoshi
- **Mono font**: JetBrains Mono (tags/labels)
- **Primary color**: `#f97316` (Orange)
- **Background**: `#050505` (Near black)
- **Theme**: Dark luxury with orange accents

---

Made with ❤️ in Raipur | Mbjare InfoTech 2026
