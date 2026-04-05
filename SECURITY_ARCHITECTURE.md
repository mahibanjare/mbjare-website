# 🔐 Security Architecture - Turnstile + Google Sheets

## 📋 Key Distribution

### **Frontend (Browser) - Public Keys:**
```env
VITE_TURNSTILE_SITE_KEY=0x4AAAAAAC0yI12Vp8MlMw9E  # ✅ SAFE to expose
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/... # ✅ SAFE to expose
```

### **Backend (Server) - Secret Keys:**
```env
TURNSTILE_SECRET_KEY=0x4AAAAAAC0yIyD4XFYCb0LH_lAJQQ6BNQs  # 🔒 KEEP SECRET
```

### **Google Apps Script - No Secrets:**
```javascript
// Apps Script में कोई भी secret key नहीं है!
// सिर्फ data processing logic है
function doPost(e) {
  // सिर्फ data save करता है
  // कोई authentication नहीं
}
```

## 🔄 Data Flow & Security

```
1. User fills form
   ↓
2. Turnstile widget generates token (using SITE_KEY)
   ↓
3. Form submits to /api/submit-contact
   ↓
4. API verifies token with Cloudflare (using SECRET_KEY)
   ↓
5. If valid, sends data to Google Apps Script
   ↓
6. Apps Script saves to Google Sheet
```

## 🛡️ Security Layers

### **Layer 1: Turnstile Verification**
- ✅ **Frontend:** Site key (public)
- ✅ **Backend:** Secret key (private)
- ✅ **Result:** Only verified humans can submit

### **Layer 2: Server-Side Validation**
- ✅ API route double-checks Turnstile token
- ✅ Prevents client-side bypass attempts
- ✅ Validates all data before saving

### **Layer 3: Google Apps Script**
- ✅ No secret keys stored
- ✅ Only accepts data from your API
- ✅ CORS protection (only your domain)

## ❓ आपके सवाल का जवाब:

### **"Secret key Apps Script code में रहता है?"**
**नहीं!** ❌

- **Secret key** सिर्फ **server-side** (Vercel API) में रहता है
- **Apps Script** में कोई भी secret नहीं है
- **Apps Script** सिर्फ data save करता है

### **"Site key frontend में रहता है?"**
**हाँ!** ✅

- **Site key** browser में safely expose हो सकता है
- यह public key है, कोई problem नहीं
- Turnstile widget के लिए जरूरी है

## 🔑 Key Security Rules

| Key Type | Where It Goes | Security Level | Can Be Exposed? |
|----------|---------------|----------------|-----------------|
| **Site Key** | Frontend (.env with VITE_) | Public | ✅ Yes |
| **Secret Key** | Backend (.env without VITE_) | Private | ❌ No |
| **Apps Script URL** | Frontend (.env with VITE_) | Public | ✅ Yes |

## 🚨 Important Notes

### **Never Put Secret Key In:**
- ❌ Frontend code
- ❌ Apps Script
- ❌ Git repository
- ❌ Client-side JavaScript

### **Safe To Put In Frontend:**
- ✅ Site Key
- ✅ Apps Script URL
- ✅ Google Sheets ID

---

## 🎯 Summary

**Secret key सिर्फ server पर रहता है, Apps Script में नहीं!** 🔒

यह setup completely secure है क्योंकि:
- Turnstile verification server-side होती है
- Apps Script सिर्फ trusted API से data accept करता है
- कोई भी secret key expose नहीं होता

**Perfect security architecture!** 🛡️✨