# Google Sheets + Turnstile Integration - Setup Guide

This guide will help you complete the setup of Google Sheets data saving with Cloudflare Turnstile spam protection.

## ✅ Already Completed

- ✅ Installed `react-turnstile` package
- ✅ Updated `.env` file with Turnstile keys
- ✅ Created Vercel API route (`/api/submit-contact.js`)
- ✅ Updated Contact form with Turnstile widget
- ✅ Added Newsletter form to Footer
- ✅ Created Google Apps Script code

## 📋 Step-by-Step Setup (Required)

### STEP 1: Deploy Google Apps Script

This is the **most important step** - without this, data won't be saved!

1. **Open your Google Sheet:**
   - Go to: https://docs.google.com/spreadsheets/d/1gVkMa08DuzvOX28l_EO27iWb6xr32nrb47haV8g-y5A/

2. **Create the sheet tabs** (if not already there):
   - Create a sheet named: **Contact Submissions**
   - Create a sheet named: **Newsletter Subscribers**
   - You can rename sheets by right-clicking the tab at the bottom

3. **Open Apps Script:**
   - Go to **Extensions > Apps Script** (top menu)
   - A new tab will open

4. **Copy the script:**
   - In this project, find the file: `GOOGLE_APPS_SCRIPT.gs`
   - Copy ALL the code from that file

5. **Paste into Apps Script:**
   - In the Apps Script editor, delete the default code
   - Paste the entire code from `GOOGLE_APPS_SCRIPT.gs`
   - Press **Ctrl+S** to save

6. **Deploy as Web App:**
   - Click **Deploy** (top right)
   - Select **New deployment**
   - Choose type: **Web app**
   - Execute as: Your email address
   - Who has access: **Anyone**
   - Click **Deploy**

7. **Copy the deployment URL:**
   - A popup will show the deployment URL
   - It looks like: `https://script.google.com/macros/d/1A...../usercontent`
   - **Copy this entire URL**

8. **Add to .env file:**
   - Open `.env` in your project
   - Find: `GOOGLE_APPS_SCRIPT_URL=YOUR_GOOGLE_APPS_SCRIPT_URL_HERE`
   - Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the URL you copied
   - Save the file

### STEP 2: Test the Deployment

When deployed to Vercel:

1. Go to your website (or local dev server)
2. Fill out the Contact form
3. Complete the Turnstile verification
4. Submit the form
5. Check your Google Sheet - the data should appear!

## 🧪 Local Testing

To test locally before deploying to Vercel:

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Run the project locally with API support
vercel dev
```

Then:
1. Open `http://localhost:3000`
2. Fill the form and submit
3. Data should appear in your Google Sheet

## 📊 What Gets Saved

### Contact Form → "Contact Submissions" sheet:
- Timestamp
- Name
- Email
- Phone
- Business Name
- Business Address
- Service
- Budget
- Message

### Newsletter → "Newsletter Subscribers" sheet:
- Email
- SubscribedDate
- Source (will be "Website Footer")

## 🔐 Security Notes

- ✅ **Turnstile** validates all submissions (prevents bots)
- ✅ **Server-side verification** in API route double-checks the Turnstile token
- ✅ **Timestamps** automatically added (India timezone - IST)
- ✅ **CORS protected** - requests must come from your domain
- ⚠️ **Never expose secret keys** in frontend code - they stay in `.env`

## 🚀 Deployment to Vercel

1. Make sure `.env` file has `GOOGLE_APPS_SCRIPT_URL` set
2. Push to Git:
   ```bash
   git add .
   git commit -m "Add Google Sheets + Turnstile integration"
   git push
   ```
3. Vercel will auto-deploy
4. Test the live site

## ❌ Troubleshooting

### "Turnstile verification failed"
- Check that `VITE_TURNSTILE_SITE_KEY` in `.env` is correct
- Make sure Turnstile keys haven't expired in Cloudflare dashboard

### "Failed to save data" error
- **Most common:** `GOOGLE_APPS_SCRIPT_URL` not set or incorrect
  - Check if you've added the URL to `.env`
  - Verify the URL is complete and working
  
- **Script error:** Go to Google Apps Script > Executions tab to see logs

### Turnstile widget not showing
- Check browser console for errors
- Verify `VITE_TURNSTILE_SITE_KEY` is correct
- Make sure `react-turnstile` is installed: `npm list react-turnstile`

### Empty data in sheets
- Check if column headers exactly match the code
- For Contact form: Timestamp, Name, Email, Phone, Business Name, Business Address, Service, Budget, Message
- For Newsletter: Email, SubscribedDate, Source

## 📝 Files Changed

New files created:
- `/api/submit-contact.js` - Vercel API endpoint
- `/src/components/TurnstileWidget.jsx` - Reusable Turnstile widget
- `/src/components/NewsletterForm.jsx` - Newsletter subscription form
- `/src/utils/formSubmit.js` - Form submission utility
- `GOOGLE_APPS_SCRIPT.gs` - Google Apps Script code
- `/SETUP_GUIDE.md` - This file

Modified files:
- `src/pages/Contact.jsx` - Updated with Turnstile + API submission
- `src/components/Footer.jsx` - Added Newsletter form
- `.env` - Added Turnstile and Google Sheets config
- `package.json` - Added react-turnstile dependency

## 📞 Support

If you encounter issues:
1. Check the browser console (F12) for error messages
2. Check the Vercel deployment logs
3. Check Google Apps Script > Executions tab for script errors
4. Make sure all URLs and keys are correctly set in `.env`

---

**You're all set!** The system is now ready to collect contact form data and newsletter subscriptions directly into Google Sheets with spam protection. 🎉
