# Tasmoda — Living Architecture (Home Decor & Bespoke Admin Studio)

> **Live Local Development Server:** `http://localhost:3000`  
> **Merchant Admin Studio:** `http://localhost:3000/admin`  
> **Target Deployment:** Vercel (Edge / Serverless Full-Stack Next.js 14+)  

---

## 🏛️ What Was Built

### 1. Customer Luxury Storefront (`/`)
- **Editorial Design System (`editorial-warm`):** Warm alabaster canvas (`#FDFBF7`), soft oat stone (`#F6F2EB`), Fraunces serif typography, and brushed bronze/terracotta accents (`#9E7D56`).
- **GSAP Kinetic Motion:** Smooth text staggers, fade-ups, and interactive hover scales on heroes and cards.
- **"Shop The Room" Spatial Lookbook:** Real-time interior scenes featuring pulsating hotspot pins. Clicking any pin displays a product card with dimensions, materials, and a 1-click **Add to Bag** action.
- **Curated Catalog Grid:** Filter by room (Living Room, Dining, Bedroom, Lighting, Objects) with instant sorting (Featured, Price, Rating) and live search.
- **Interactive Product Quick-View (PDP):** Multi-angle gallery, material swatches (Travertine, Fired Clay, French Linen), exact 3D dimensions (W × D × H in cm & kg), and craftsmanship care guides.
- **Dynamic Slide-Over Bag:** Real-time subtotal, free delivery progress bar ($250 threshold), promo code engine (try `TASMODA10` for 10% off), and instant checkout simulator with celebratory confetti.

### 2. Bespoke Merchant Admin Studio (`/admin`) — 10x Better Than Shopify
- **Overview & Intelligence:** Gross revenue, orders, AOV, and store conversion KPIs paired with an interactive monthly revenue bar chart and low-inventory warnings.
- **Unified Product Studio:** Single-screen product editor. Add/edit titles, images, materials, 3D dimensions, prices, and stock units without navigating multiple sub-tabs or suffering Shopify app latency.
- **Visual Lookbook Pin Studio:** Click anywhere on room photography to map interactive hotspots, attach catalog products, and instantly publish them to the live storefront.
- **Orders & White-Glove Dispatch:** Pipeline tracking (Pending, Processing, Dispatched, Delivered), 1-click status advancement, printable branded packing slips/invoices, and direct WhatsApp customer notifications.
- **Zero Shopify App Subscriptions:** Bundles, lookbooks, custom swatches, and notification pipelines are built directly into your application.

---

## 🚀 Running Locally & Deploying to Vercel

### Running Locally
```bash
# In d:\ANTI_GRAVITY\NEW_PROJECT
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the storefront, or [http://localhost:3000/admin](http://localhost:3000/admin) for the admin suite.

### Deploying to Vercel
1. Initialize or push this repository to GitHub/GitLab:
   ```bash
   git add .
   git commit -m "feat: initial Tasmoda luxury storefront and bespoke admin studio"
   ```
2. Import the project directly into [Vercel](https://vercel.com):
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
3. Click **Deploy** — your luxury home decor brand is live in under 60 seconds!
