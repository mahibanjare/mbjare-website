# 🔧 Turnstile Error 110200 - Troubleshooting Guide

## ❌ Error Details
```
[Cloudflare Turnstile] Error: 110200
POST https://challenges.cloudflare.com/... 400 (Bad Request)
```

## 🎯 Most Likely Causes & Solutions

### **CAUSE #1: Domain Not Configured (Most Common)**
**Problem:** Turnstile site key is not configured for your domain.

**Solution:**
1. Go to [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click on your Turnstile site
3. Under "Domains", add your domain:
   - For local testing: `localhost`
   - For production: `yourdomain.com`
   - For Vercel preview: `*.vercel-preview.app`

### **CAUSE #2: Site Key Expired**
**Problem:** Your Turnstile site key has expired.

**Solution:**
1. Go to Cloudflare Turnstile Dashboard
2. Check if your site key is still active
3. If expired, create a new site key
4. Update `.env` file with new keys

### **CAUSE #3: Widget Configuration**
**Problem:** Widget is not loading properly.

**Solution:** Test with our test page:
- Visit: `http://localhost:5174/turnstile-test`
- Check if widget loads and works

## 🧪 Quick Test

I've created a test page for you. Visit:
```
http://localhost:5174/turnstile-test
```

This page will show:
- ✅ If Turnstile loads successfully
- ✅ If verification works
- ✅ Your current site key
- ✅ Any errors

## 🔍 Debug Steps

### Step 1: Check Console
Open browser DevTools (F12) and check console for errors.

### Step 2: Verify Keys
Your current keys in `.env`:
```
VITE_TURNSTILE_SITE_KEY=0x4AAAAAAC0yI12Vp8MlMw9E
TURNSTILE_SECRET_KEY=0x4AAAAAAC0yIyD4XFYCb0LH_lAJQQ6BNQs
```

### Step 3: Test on Different Domains
- Local: `http://localhost:5174`
- Production: Your live site
- Vercel: Preview deployment

## 🚀 Quick Fixes

### If Local Works But Production Doesn't:
Add your production domain to Turnstile dashboard.

### If Both Don't Work:
1. Check if site key is valid in Cloudflare
2. Verify domain configuration
3. Try creating a new site key

### If Widget Doesn't Load:
1. Check internet connection
2. Clear browser cache
3. Try incognito mode

## 📞 Need Help?

If the test page shows errors:
1. Screenshot the error
2. Check browser console
3. Share the exact error message

## ✅ Expected Behavior

When working correctly:
- Widget should load instantly
- No console errors
- Verification should work
- Token should be generated

---

**Test the widget first:** http://localhost:5174/turnstile-test

Then check your Cloudflare Turnstile dashboard domain settings! 🔧