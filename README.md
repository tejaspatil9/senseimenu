# 🍜 Sensei Digital Menu — Next.js App

A luxury digital menu experience for **Sensei Modern Asian** restaurant, built with Next.js 14 + Tailwind CSS.

---

## 🚀 Quick Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 File Structure

```
sensei-menu/
├── app/
│   ├── layout.tsx          # Root layout + fonts
│   ├── page.tsx            # Main landing page
│   └── globals.css         # All styles + animations
├── components/
│   ├── SplashScreen.tsx    # Animated splash with logo
│   ├── MenuOverlay.tsx     # Full menu with category tabs
│   ├── Reviews.tsx         # Google review system
│   └── menuData.ts         # All menu items & data
├── public/
│   └── images/
│       ├── logo.png
│       ├── hero.mp4
│       ├── food1-4.jpeg
│       └── ambience1-2.jpeg
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎴 **Splash Screen** | Logo animation with wave rings, auto-dismisses in 3s |
| 🎬 **Hero Video** | Octagon-shaped video frame with gold border |
| 📋 **Full Menu** | All categories: Small Plates, Dumplings, Sushi, Ramen, Rice & Noodles, Beverages, Desserts |
| ⭐ **Reviews** | 1–3 stars saved locally, 4–5 stars redirect to Google |
| 📱 **Connect** | WhatsApp, Instagram, Call, Google Maps |
| 🏷️ **TABLE OS** | Powered by branding in footer |

---

## 🎨 Design System

- **Colors:** Sensei Forest Green `#1B4D3E` + Warm Gold `#C9A96E` + Deep Dark `#070f0b`
- **Fonts:** Playfair Display (headings) + Cormorant Garamond (body) + Cinzel (labels) + Noto Serif JP (accents)
- **Motion:** CSS keyframe animations, intersection observer scroll reveals, smooth slide-up menu

---

## 🔧 Customization

### Update phone number (WhatsApp/Call)
In `app/page.tsx`, search for `+917900000000` and replace with actual number.

### Update Google Review URL
In `components/Reviews.tsx`, update `GOOGLE_REVIEW_URL` to the restaurant's actual Google review link.

### Add more menu items
Edit `components/menuData.ts` — each section follows the `MenuSection` type.

---

## 📦 Dependencies

```json
{
  "next": "14.2.0",
  "react": "^18",
  "tailwindcss": "^3.4.0"
}
```

No external UI libraries needed — fully custom components.

---

*Powered by **TABLE OS** Digital Menu*
