# Dream Catcher Study Lounge &ndash; Official Website

> A premium, 3D-animated, mobile-first marketing website for **Dream Catcher Study Lounge**, a silent, air-conditioned study space in East Fort, Thrissur, Kerala for CA, CMA, ACCA, MBBS/NEET PG, PSC, and UPSC aspirants.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **React Three Fiber (@react-three/fiber + @react-three/drei)**, **GSAP**, **Lenis Smooth Scroll**, and **Lucide Icons**.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 20 / 24)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🛠️ How to Edit Details

All site content, contact numbers, timings, pricing placeholders, and seat configuration are centralized for quick non-technical edits.

### 1. Editing Contact Details, Timings & Address
Open `src/config/site.ts`:
- **Phone Numbers**:
  ```ts
  phonePrimary: "9947087014",
  phoneSecondary: "7306004752",
  phoneDisplayPrimary: "+91 99470 87014",
  phoneDisplaySecondary: "+91 73060 04752",
  whatsappNumber: "919947087014",
  ```
- **Address & Landmarks**:
  ```ts
  address: "Near East Fort Junction, East Fort, Thrissur, Kerala - 680005",
  landmark: "Walking distance from East Fort junction, close to major coaching centers",
  ```
- **Opening Hours**:
  ```ts
  openingHoursText: "Open Daily 6:00 AM – 11:30 PM (24/7 access option for registered members)",
  ```

### 2. Editing Prices (or Setting "Get a Quote")
In `src/config/site.ts`, inspect `plans`:
```ts
{
  id: "monthly",
  name: "Monthly Resident Member",
  duration: "30 Days",
  price: "₹1,999", // Set exact price here, or leave as "" to show "Custom Student Quote"
  period: "per month",
  ...
}
```
*Note: If `price` is left blank `""` or contains `"[PRICE]"`, the card automatically switches to a "Custom Student Quote" card with a direct WhatsApp "Get a Quote" trigger.*

### 3. Updating Seat Availability (A1 to A20)
Open `src/data/seats.json`:
```json
[
  { "id": "A1", "number": 1, "status": "occupied", "category": "Standard Desk" },
  { "id": "A2", "number": 2, "status": "available", "category": "Standard Desk" }
]
```
Change `"status"` to `"available"` or `"occupied"`. The floor plan and live counter on the website update immediately.

---

## 🌐 Deploying to Vercel

1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `Dream Catcher` repository.
4. Keep the default Next.js build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
5. Click **Deploy**. Vercel will build and assign an instant production URL with automatic SSL.

---

## 🎯 Architecture & Performance Features

- **Strict WebGL Fallback**: Automatically senses `navigator.hardwareConcurrency <= 4`, `deviceMemory <= 4`, or `prefers-reduced-motion` and cleanly replaces WebGL with high-resolution CSS parallax to protect mobile battery and ensure 60fps smoothness.
- **Dynamic 3D Canvas**: 3D components load via `next/dynamic` (`ssr: false`) strictly after initial paint to guarantee fast Time-to-Interactive (TTI) and First Contentful Paint (FCP).
- **Zero Heavy 3D Models**: All 3D objects (dreamcatcher ring, book, swaying feathers, cubicle hall) are procedural geometries with DPR capped at 1.5. Total 3D asset download weight is 0 KB.
- **Mobile Bottom Bar**: Persistent quick-action bar on mobile screens (Call, WhatsApp, Directions).
- **SEO & Structured Data**: Includes OpenGraph tags, semantic headings, and a complete `LocalBusiness` JSON-LD schema with coordinates, timings, and contact numbers.
