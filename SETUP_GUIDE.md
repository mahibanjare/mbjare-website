# 🚀 MBJARE INFOTECH — Complete Setup Guide
> **Reusable for every new client.** Follow this exact process each time.

---

## 📋 What This Guide Covers
1. Fresh Supabase project setup
2. Google OAuth (login) setup
3. Local development
4. Making yourself Admin
5. Deploying to Vercel
6. Reusing for a new client

---

## STEP 1 — Create a Fresh Supabase Project

1. Go to **https://supabase.com** → Sign in → New Project
2. Fill in:
   - **Name:** `mbjare-infotech` (or client name)
   - **Database Password:** Save this somewhere safe
   - **Region:** `Southeast Asia (Singapore)` — closest to India
3. Click **Create new project** → wait ~2 minutes

---

## STEP 2 — Run the SQL Schema

1. In Supabase dashboard → **SQL Editor** (left sidebar)
2. Click **New query**
3. Open the file `supabase_schema.sql` from this project
4. **Select All → Paste → Click Run**
5. You should see: `Success. No rows returned`

✅ This creates all tables, RLS policies, triggers, and seed data in one shot.

---

## STEP 3 — Get Your API Keys

1. Supabase → **Settings** (bottom left gear icon) → **API**
2. Copy:
   - **Project URL** → looks like `https://abcdefgh.supabase.co`
   - **anon public key** → long JWT string starting with `eyJ...`

3. In your project folder, create `.env` file:
```bash
cp .env.example .env
```

4. Fill in `.env`:
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...your_anon_key_here
VITE_SHEET_AUTH_URL=https://script.google.com/macros/s/your-script-id/exec
```

---

## STEP 4 — Setup Google OAuth Login

1. Go to **https://console.cloud.google.com**
2. Create a new project (or use existing)
3. **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
4. Application type: **Web application**
5. Add Authorized redirect URIs:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
6. Copy the **Client ID** and **Client Secret**

7. Back in Supabase → **Authentication** → **Providers** → **Google**
8. Toggle **Enable** → paste Client ID + Client Secret → Save

9. Also in Supabase → **Authentication** → **URL Configuration**:
   - **Site URL:** `http://localhost:5173` (dev) or your domain (production)
   - **Redirect URLs:** Add both:
     ```
     http://localhost:5173/auth/callback
     https://yourdomain.com/auth/callback
     ```

---

## STEP 5 — Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open: **http://localhost:5173**

---

## STEP 6 — Make Yourself Admin

1. Open the site → click **Login** → **Continue with Google**
2. After logging in successfully, go to Supabase → **SQL Editor**
3. Run this (replace with YOUR email):
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';
```
4. Refresh the site → you'll now see the **Admin** panel at `/admin`

---

## STEP 7 — Deploy to Vercel

```bash
# Install Vercel CLI (one-time)
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: mbjare-infotech
# - Framework: Vite
# - Build command: npm run build
# - Output dir: dist
```

Add environment variables in Vercel:
1. Vercel Dashboard → Your project → **Settings** → **Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL` = your value
   - `VITE_SUPABASE_ANON_KEY` = your value

3. Redeploy: `vercel --prod`

4. **Important:** Update Google OAuth redirect URLs to include your Vercel domain.
5. **Important:** Update Supabase Site URL to your Vercel domain.

---

## 🔄 REUSING FOR A NEW CLIENT

To set up a fresh copy for a new client, follow these steps:

### Option A — Same Supabase, new tables (not recommended)
Not ideal — clients' data would be mixed.

### Option B — New Supabase project per client (RECOMMENDED)

1. **Supabase:** Create a new project for the client
2. **SQL:** Run `supabase_schema.sql` on their new project
3. **Code:** Clone/copy this project folder
4. **.env:** Update with new client's Supabase URL + key
5. **Branding:** Update these files:
   - `src/assets/logo.png` — replace with client logo
   - `src/pages/Home.jsx` — update company name, tagline, services
   - `src/pages/Contact.jsx` — update phone, email, location
   - `src/components/Footer.jsx` — update social links, address
   - `src/components/Navbar.jsx` — update brand name
6. **Deploy:** New Vercel project for the client
7. **Admin:** Make client's email admin via SQL

### Checklist for each new client
- [ ] New Supabase project created
- [ ] SQL schema run successfully
- [ ] `.env` updated with new keys
- [ ] Logo & branding updated
- [ ] Contact details updated (phone, email, WhatsApp link)
- [ ] Google OAuth configured for new domain
- [ ] Deployed to Vercel (or client's hosting)
- [ ] Client email made admin
- [ ] Tested: Contact form → appears in Supabase leads table
- [ ] Tested: Newsletter → appears in Supabase newsletter table
- [ ] Tested: Login → redirects to dashboard
- [ ] Tested: Admin panel → can add/edit testimonials, services, portfolio

---

## 🐛 Troubleshooting

### Contact form shows success but data not in Supabase
→ Check: Is `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` correct in `.env`?
→ Check: Did you run the full `supabase_schema.sql`? The `leads_insert_public` policy must exist.
→ Test: Open browser console → look for red errors when submitting the form.

### Newsletter "Already subscribed" for new email
→ Check: Is there a duplicate in the `newsletter` table?
→ Check: Is the `UNIQUE` constraint on `email` column present?

### Login redirects to `/login` again (infinite loop)
→ Check: Is the redirect URL in Google Console exactly matching your Supabase callback URL?
→ Check: Is the Site URL in Supabase Auth settings correct?
→ Check: Browser console for auth errors.

### Admin panel shows "Access Denied" or redirects to dashboard
→ You need to manually set your role: `UPDATE profiles SET role = 'admin' WHERE email = 'your@email.com';`

### RLS policy errors in console (e.g., "new row violates row-level security")
→ Re-run the `supabase_schema.sql` completely. Make sure you didn't skip any policy.

---

## 📁 Project Structure

```
src/
├── assets/          # Logo and images
├── components/
│   ├── Navbar.jsx   # Top navigation
│   ├── Footer.jsx   # Footer + Newsletter form
│   └── ScrollToTop.jsx
├── context/
│   └── AuthContext.jsx  # Global auth state
├── lib/
│   └── supabase.js      # All Supabase functions
├── pages/
│   ├── Home.jsx          # Landing page
│   ├── Services.jsx      # Services page
│   ├── Portfolio.jsx     # Portfolio page
│   ├── About.jsx         # About page
│   ├── Contact.jsx       # Contact form (→ leads table)
│   ├── auth/
│   │   ├── Login.jsx         # Google OAuth login page
│   │   └── AuthCallback.jsx  # OAuth redirect handler
│   ├── dashboard/
│   │   └── UserDashboard.jsx # Client ticket portal
│   └── admin/
│       └── AdminPanel.jsx    # Full admin panel
└── App.jsx          # Routes + layout
```

---

## 🗄️ Supabase Tables Reference

| Table | Purpose | Who can write |
|-------|---------|---------------|
| `profiles` | User accounts (auto-created on signup) | User (own row) |
| `leads` | Contact form submissions | Anyone (public) |
| `newsletter` | Email subscribers | Anyone (public) |
| `tickets` | Support tickets | Logged-in users |
| `ticket_messages` | Ticket chat | Logged-in users |
| `testimonials` | Client reviews | Admin only |
| `services` | Services offered | Admin only |
| `portfolio` | Portfolio projects | Admin only |
| `articles` | Blog posts | Admin only |
