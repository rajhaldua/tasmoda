# Product Design Document: Tasmoda Home Decor

> **Mode:** Startup / Direct-to-Consumer Brand  
> **Workflow:** `/office-hours`  
> **Target Deployment:** Vercel (Full-Stack Next.js 14+ / TypeScript)  
> **Aesthetic & Tech:** High-end Minimalist Editorial Decor + GSAP Motion + Superdesign Visuals  

---

## 1. YC Office Hours: The Six Forcing Questions

### 1.1 What is the specific pain you've experienced with standard Shopify?
- **Generic Shopify Admin Clunkiness:** Shopify's backend treats home decor like t-shirts. Managing dimensions, materials, care guides, finishes, room scene hotspots, and lookbook styling requires installing 5–10 third-party apps ($20–$50/mo each), which slow down both the backend and storefront.
- **Storefront Rigidity & Liquid Bottlenecks:** Achieving bespoke, luxury home decor animations (like Zara Home, Ferm Living, or CB2) on Shopify Liquid requires brittle theme code overrides that break with app updates.
- **App Bloat & High Monthly Overhead:** For a modern brand, recurring app subscriptions for product bundling, room visualizers, swatch pickers, and custom admin dashboards erode gross margins.

### 1.2 Who exactly are the first 100 customers & target audience?
- **Audience:** Urban professionals, new homeowners, interior enthusiasts, and aesthetic-conscious gifters looking for curated, timeless home accents (vases, lamps, artisanal rugs, ceramic tableware, wall art, accent furniture).
- **First 10 Buyers:** Warm network, architectural & interior design enthusiasts discovered via Instagram/Pinterest lookbooks and aesthetic Reels/TikToks.

### 1.3 What do they do today? (The Competition & Workarounds)
- **Customer Side:** Browse West Elm, H&M Home, or generic Amazon listings. They struggle to visualize how items pair together in a real space without cohesive room curation.
- **Admin/Merchant Side:** Juggling Shopify + Shopify Apps + Excel spreadsheets for stock, order status, and lookbook styling.

### 1.4 Why will Tasmoda be 10x better?
1. **Storefront (Customer Delight):** 
   - Editorial, magazine-grade layout with butter-smooth GSAP micro-animations (kinetic typography, smooth entrance reveals, curated cursor interactions).
   - "Shop the Room" / Lookbook Hotspots: Click pins on high-res room scenes to add entire curated sets to cart with 1 click.
   - Material/Dimension Visualizer: Realistic scale indicator and finish switcher that loads instantly.
2. **Admin Panel (Merchant Superpower — 10x over Shopify):**
   - **Visual Merchandiser:** Live spatial lookbook builder — upload a room photo, drag-and-drop product pins directly on the image, set hotspots, and publish to storefront in seconds.
   - **Unified Single-Screen Product Studio:** Edit title, imagery, 3D/AR or room tags, material swatches, dimension specs, stock levels, and SEO preview without clicking through 5 sub-tabs.
   - **Live Storefront Command Center:** Change announcement bars, hero banners, curated collections, and featured drops with real-time preview before publishing.
   - **Zero Monthly App Tax:** Native support for swatches, bundles, discount logic, and WhatsApp customer pinging built directly into the system.

### 1.5 What is the narrowest possible wedge? (Ship in days, not months)
- **Scope of V1 Wedge:**
  1. **Responsive Luxury Storefront:**
     - Curated Home Page (Hero with GSAP reveal, Editorial Collections grid, "Shop the Look" room feature, Featured Accent pieces, Brand Ethos section).
     - Product Catalog & Filter (Filter by room: Living Room, Dining, Bedroom, Decor Accents, and price/finish).
     - Rich Product Detail Page (PDP): Swatch selection, dimension guide, multi-angle zoom gallery, sticky add-to-cart, related items.
     - Dynamic Slide-over Cart & Mock/Stripe Checkout.
  2. **Bespoke Tasmoda Admin Panel (`/admin`):**
     - Dashboard Overview: Revenue, Orders, Average Order Value (AOV), Top Selling Decor Items.
     - Product Studio: Add/Edit/Delete products with multiple images, variant swatches, dimensions, and categories.
     - Lookbook & Merchandising Manager: Upload room photos and pin products directly to coordinates.
     - Order & Inventory Pipeline: Track Pending, Packed, Shipped, Delivered status with 1-click invoice generation.
  3. **Universal Responsiveness:** Mobile-first touch drawer navigation, tablet grid adjustments, and wide-screen desktop luxury spacing.

### 1.6 How will we know it's working? (Metrics)
- **Storefront:** Sub-1s page load time on mobile (Core Web Vitals 95+), zero animation stutter (60 FPS GSAP), >3.5% conversion rate on lookbook interactions.
- **Admin:** Merchant can create a new product and pin it to a lookbook in under 60 seconds (vs 6+ minutes across multiple Shopify app screens).

---

## 2. Technical Architecture & Stack Recommendation

| Layer | Recommended Technology | Why Chosen for Vercel & Tasmoda |
|---|---|---|
| **Framework** | **Next.js 14+ (App Router, TypeScript)** | First-class Vercel deployment, SSR/ISR for SEO, server actions for instant mutations, API routes. |
| **Styling** | **Tailwind CSS + CSS Variables** | Bespoke luxury aesthetic token system (warm neutrals, sand, travertine, charcoal, bronze). |
| **Motion** | **GSAP (GreenSock) + ScrollTrigger** | Silk-smooth reveals, parallax image scaling, magnetic buttons, and pinned section transitions. |
| **Database & Auth** | **Supabase (PostgreSQL) / Prisma OR Local Mock Mode** | Relational integrity for orders/products/lookbooks; instant deployment with zero server maintenance. |
| **Icons & UI Primitives** | **Lucide-React + Radix UI (Headless)** | Accessible dialogs, drawers, dropdowns, and clean iconography without bloat. |
| **State Management** | **Zustand** | Lightweight cart, drawer state, and admin draft caching. |

---

## 3. Implementation Approaches & Effort Estimates

### Option A: Custom Full-Stack Next.js Monorepo (RECOMMENDED)
- **Description:** Next.js App Router holding both the public storefront `/(store)` and authenticated admin suite `/(admin)`. Shared components, shared types, single Vercel deployment.
- **Pros:** Zero cross-origin headaches, instant SSR, unified TypeScript types, free hosting on Vercel tier to start.
- **AI-Assisted Build Time:** ~1 to 2 days for complete MVP with mock/live database.
- **Human Dev Time:** ~3 to 4 weeks.

### Option B: Headless MedusaJS + Next.js Storefront
- **Description:** MedusaJS backend hosted separately (Render/Railway) + Next.js storefront on Vercel.
- **Pros:** Uses open-source headless commerce backend.
- **Cons:** Two distinct deployments, requires Redis + Postgres hosting, heavier maintenance, Medusa admin is still table-heavy rather than visual decor-focused.
- **AI-Assisted Build Time:** ~3 to 5 days.
- **Human Dev Time:** ~5 to 6 weeks.

---

## 4. Next Step Actions
1. **User Sign-Off** on the Wedge Scope and visual identity.
2. Initialize repository with Next.js 14, Tailwind, GSAP, and Lucide.
3. Establish Tasmoda Design Tokens (Palette: Travertine `#F5F2EB`, Alabaster `#FAF9F6`, Charcoal `#1F1F1F`, Warm Ochre/Bronze `#9E7D56`).
4. Generate high-fidelity decor assets & room scenes using Superdesign / image generation.
5. Build the Storefront & Visual Merchandising Admin.
