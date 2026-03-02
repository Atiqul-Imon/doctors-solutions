# Facebook Pixel Setup Guide

## 🔍 Current Status

**❌ Facebook Pixel is NOT installed on the website**

### What I Checked:
- ✅ No Facebook Pixel code found in the codebase
- ✅ No `fbq()` function calls
- ✅ No pixel script tags
- ✅ No tracking scripts in layout files
- ✅ No analytics/tracking implementation

---

## 📋 Setup Requirements

### Before Setup, You Need:

1. **Facebook Business Manager Account**
   - Create at: https://business.facebook.com
   - Or use existing Facebook account

2. **Facebook Pixel ID**
   - Get from: Facebook Events Manager
   - Format: 15-17 digit number (e.g., `1234567890123456`)
   - You'll create this during setup

3. **Environment Variable**
   - We'll store Pixel ID in `.env.local`

---

## 🚀 Setup Steps

### Step 1: Create Facebook Pixel

1. Go to **Facebook Events Manager**: https://business.facebook.com/events_manager2
2. Click **"Connect Data Sources"** → **"Web"**
3. Click **"Facebook Pixel"**
4. Enter a name: `Doctor Solutions Website`
5. Enter your website URL
6. Copy your **Pixel ID** (you'll see it after creation)

### Step 2: Get Your Pixel ID

Your Pixel ID will look like: `1234567890123456`

**Save this ID** - we'll need it for the next steps.

---

## 💻 Implementation Options

### Option 1: Basic Setup (Recommended for Start)
- Simple pixel installation
- Track page views
- Track basic events

### Option 2: Advanced Setup (Recommended for Full Tracking)
- Complete pixel implementation
- Custom event tracking
- Conversion tracking
- Lead tracking
- Form submissions

**I recommend Option 2** for your Facebook ad campaigns to track conversions properly.

---

## 🎯 Events to Track

### Standard Events:
1. **PageView** - Automatic on all pages
2. **ViewContent** - When viewing services/pricing pages
3. **Lead** - When contact form is submitted
4. **InitiateCheckout** - When user starts filling form
5. **CompleteRegistration** - When consultation is booked
6. **Search** - When searching (if applicable)

### Custom Events (Optional):
- Button clicks
- Video plays
- File downloads
- Scroll depth

---

## 📝 Next Steps

I can implement Facebook Pixel for you. Here's what I'll create:

1. **Facebook Pixel Component** (`components/analytics/FacebookPixel.tsx`)
   - Clean, reusable component
   - TypeScript support
   - Next.js 15 compatible

2. **Integration in Layout** (`app/layout.tsx`)
   - Add pixel to root layout
   - Environment variable support
   - Production/development handling

3. **Event Tracking Utilities** (`lib/analytics/facebookPixel.ts`)
   - Helper functions for tracking events
   - Type-safe event tracking
   - Easy to use throughout the app

4. **Environment Setup** (`.env.local.example`)
   - Show what environment variable is needed
   - Keep Pixel ID secure

5. **Event Tracking Examples**
   - Contact form submission
   - Button clicks
   - Page views on specific pages

---

## 🔐 Environment Variable

After setup, you'll add to `.env.local`:

```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_pixel_id_here
```

**Note**: `NEXT_PUBLIC_` prefix makes it available in browser (required for pixel).

---

## ✅ Implementation Checklist

Once I implement:

- [ ] Facebook Pixel component created
- [ ] Integrated in root layout
- [ ] Environment variable setup
- [ ] PageView tracking working
- [ ] Event tracking utilities ready
- [ ] Contact form tracking ready
- [ ] Documentation provided

---

## 🎯 What This Enables

After setup, you'll be able to:

1. **Track Website Visitors**
   - See who visits your site from Facebook ads
   - Measure ad effectiveness

2. **Build Retargeting Audiences**
   - Retarget people who visited your site
   - Show ads to interested visitors

3. **Track Conversions**
   - See which ads lead to form submissions
   - Measure ROI on ad spend

4. **Optimize Ad Campaigns**
   - Facebook will optimize for conversions
   - Better ad delivery to interested people

5. **Measure Performance**
   - See conversion rates
   - Track cost per lead
   - Measure return on ad spend

---

## 📊 Example: What You'll See in Facebook

After implementation and running ads:

- **Events Manager Dashboard**:
  - PageView events (automatic)
  - ViewContent events (when viewing services)
  - Lead events (form submissions)
  - Conversion tracking

- **Ad Campaigns**:
  - See which ads drive traffic
  - See which ads convert
  - Optimize based on data

- **Audiences**:
  - Website visitors (for retargeting)
  - Form submitters (hot leads)
  - Engaged users

---

## ⚠️ Important Notes

1. **Privacy Compliance**
   - Add cookie consent if needed (GDPR/CCPA)
   - Update privacy policy
   - Disclose tracking in privacy policy

2. **Testing**
   - Test pixel in development
   - Use Facebook Pixel Helper (Chrome extension)
   - Verify events are firing

3. **Environment Variables**
   - Don't commit `.env.local` to git
   - Add to `.gitignore` (should already be there)
   - Use different Pixel IDs for dev/staging/prod if needed

---

## 🔧 Testing Tools

### Facebook Pixel Helper (Chrome Extension)
- Download: Chrome Web Store
- Shows if pixel is installed correctly
- Shows events firing in real-time
- Helps debug issues

### Facebook Events Manager Test Events
- Go to Events Manager → Test Events
- See events in real-time
- Debug tracking issues

---

## 📱 Ready to Implement?

I can set up Facebook Pixel right now. Just need:

1. **Your Pixel ID** (get from Facebook Events Manager)
   - Or I can create the setup and you add ID later

2. **Confirm**: Do you want basic or advanced tracking?
   - **Basic**: Page views only
   - **Advanced**: Full event tracking (recommended)

Once you confirm, I'll implement it! 🚀

