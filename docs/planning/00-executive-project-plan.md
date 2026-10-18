# CAR CHOICE BD — Executive Project Discovery & Master Implementation Plan

> **Document ID:** `CCBD-DOC-00`  
> **Brand:** Car Choice BD  
> **Location:** `d:/CarChoice/docs/planning/00-executive-project-plan.md`  
> **Project Phase:** Phase 0 (Discovery, Audit, Architecture & Requirements)  
> **Status:** Completed & Ready for Review  
> **Target Delivery Timeframe:** 4 Weeks  
> **Strict Phase Boundary:** Planning & Architecture Only — Zero Application Source Code Written.

---

## 1. Executive Summary & Business Mission

**Car Choice BD** is an automotive enterprise specializing in the direct import and retail distribution of authentic, high-grade Japanese reconditioned vehicles in Bangladesh. Situated strategically adjacent to the regional automotive licensing authority (*Near BRTA Office, Amchattar, Rajshahi, Bangladesh, 6203*), Car Choice BD serves high-net-worth individuals, business executives, and discerning families across Bangladesh.

The primary objective of this project is to architect, design, and deliver a **production-ready, state-of-the-art web application and administrative management console** within an intensive four-week delivery timeline. 

The digital experience will replace the chaotic, low-trust atmosphere of typical used-car buying with a **Cinematic Dark Luxury** showroom that prioritizes absolute transparency: guaranteed genuine Japanese auction sheets, certified odometer readings, high-resolution multi-angle photography, and frictionless communication via WhatsApp and direct telephone hotlines.

---

## 2. Key Discovery Findings & Real Client Assets

### 2.1 Empirical Audit of Reference Benchmark (`gari-import.com.bd`)
Through comprehensive browser automation, DOM inspection, and multi-viewport stress testing (`1440px`, `1024px`, `390px`), the reference portal was thoroughly analyzed:
* **Core Strengths of Reference Model:**
  * High-density live stock catalog with 1,000+ searchable vehicles.
  * Integration of original Japanese auction sheet scans directly into vehicle galleries to eliminate customer fear of odometer tampering.
  * Direct WhatsApp sales conversion CTA on every vehicle page.
  * Dedicated Auction Sheet Verification service (charging ৳850 per chassis search).
  * High-converting "Delivered Cars" social proof gallery featuring real Bangladeshi customers receiving keys.
* **Critical Flaws & Opportunities for Car Choice BD:**
  * Generic white Bootstrap aesthetic lacking luxury appeal or emotional resonance.
  * Overcrowded mobile viewports consuming up to 20% of vertical space with text-heavy banners.
  * Absence of a persistent thumb-zone bottom action bar for instant WhatsApp/call conversion.
  * Clunky horizontal scrolling on mobile inventory tables.

### 2.2 Local Asset Forensic Audit (`d:/CarChoice/public/`)
* **`Profile_Pic_Logo.jpeg` (2048 × 2048 px, 2.03 MB):** Confirms official brand identity: dual interlocking chrome 'C's forming a sports coupe silhouette with gold beveling and serif roman typography on midnight navy. **Must be preserved exactly.**
* **`Cover_Photo.png` (2048 × 762 px, 1.61 MB):** Provides verified factual business credentials:
  * Tagline: *"Your Trusted Destination for Japanese Reconditioned Vehicles."*
  * Pillars: *Certified Quality, Authentic Auction Grades, Direct Import from Japan, Reliable & Trusted*.
  * Showroom Address: *Near BRTA Office, Amchattar, Rajshahi, Bangladesh, 6203*.
  * Official Hotline / WhatsApp: `+880 1838-581250`.
  * Official Domain: `www.carchoicebd.com`.
  * Secondary Signature: *"Drive Excellence"* (with crimson red underline stroke).
* **`Animated_Logo.mp4` (1080p, 10s duration):** 3D chrome/neon motion reveal sequence. Suitable for an optional, skippable brand intro or hero video teaser.
* **`favicon.svg` & `icons.svg`:** Identified as third-party template leftovers; discarded from production.

---

## 3. Recommended Technical Architecture

To deliver genuine enterprise reliability while keeping the project beginner-friendly and maintainable:

```
┌──────────────────────────────────────────────────────────────┐
│                    CAR CHOICE BD PLATFORM                     │
├───────────────────────────────┬──────────────────────────────┤
│      PUBLIC CUSTOMER WEB      │    SECURE ADMIN DASHBOARD    │
│    (SEO & Direct WhatsApp)    │     (Inventory & Leads)      │
├───────────────────────────────┴──────────────────────────────┤
│            Next.js 14+ App Router (React + TypeScript)       │
│            Tailwind CSS (Cinematic Dark Luxury Tokens)       │
│            Framer Motion (Lightweight Hardware Transforms)   │
├──────────────────────────────────────────────────────────────┤
│               Supabase Cloud Platform (PostgreSQL)            │
│    • PostgreSQL Database with Strict Row Level Security (RLS)│
│    • Supabase Auth (Secure Staff Session Cookies)            │
│    • Supabase Storage (Optimized WebP Vehicle Media CDN)     │
├──────────────────────────────────────────────────────────────┤
│                   Production Edge Infrastructure              │
│    • Vercel Edge Cloud Deployment with Automatic SSL / HTTPS │
│    • Custom Domain: carchoicebd.com                          │
│    • Direct WhatsApp wa.me Integration (+880 1838-581250)    │
└──────────────────────────────────────────────────────────────┘
```

* **Why Next.js App Router?** Delivers server-side rendered HTML and Schema.org metadata essential for Google rankings and rich link previews on WhatsApp and Facebook.
* **Why Supabase PostgreSQL?** Eliminates weeks of manual backend boilerplate; delivers production-grade auth, object storage, and database-level security policies (RLS) on Day 1.

---

## 4. Key Architectural & UX Decisions

1. **Dual-Mode Inventory Catalog:** Offers both a **Luxury Card Grid** (for visual buyers) and a **Dense Spec Table** (for commercial buyers and brokers).
2. **Persistent Mobile Action Bar:** Mobile devices (`≤ 768px`) feature a permanent bottom bar with `[📞 Call Hotline]` and `[💬 WhatsApp Sales]`, guaranteeing zero friction for immediate lead generation.
3. **Explicit Communication Boundaries:** WhatsApp conversations occur in the official WhatsApp Business app (`wa.me/+8801838581250`); website inquiry submissions persist into the admin dashboard with one-click WhatsApp quick-reply buttons.
4. **Disciplined Glassmorphism:** Translucent frosted acrylic panels (`rgba(16, 24, 40, 0.75)` with `backdrop-filter: blur(16px)`) paired with solid dark navy sections (`#0B111E`) to create optical depth while protecting mobile battery and rendering performance.
5. **Private Customer Data Isolation:** Database Row Level Security (RLS) guarantees customer inquiries, phone numbers, and pre-orders are never returned in public API payloads.

---

## 5. Four-Week Delivery Master Roadmap

* **Week 1 (Oct 17 – Oct 23): Foundation & Database Engine**  
  *Deliverables:* Next.js project setup, Tailwind luxury tokens, Supabase database schema, RLS policies, authentication, and seed inventory.
* **Week 2 (Oct 24 – Oct 30): Public Customer Web Application**  
  *Deliverables:* Homepage, Live Stock catalog with multi-filters, Vehicle Detail page with gallery and Japanese auction sheet lightbox, WhatsApp deep-links, Pre-order sourcing form, and mobile sticky action bar.
* **Week 3 (Oct 31 – Nov 06): Secure Admin Portal & Lead Management**  
  *Deliverables:* Admin login, vehicle CRUD, multi-image drag-and-drop uploader, inquiry inbox with status tracking, pre-orders console, and delivered cars module.
* **Week 4 (Nov 07 – Nov 13): QA, SEO, Deployment & Client Handover**  
  *Deliverables:* Cross-device viewport testing, Core Web Vitals optimization, Schema.org Vehicle JSON-LD, Vercel deployment to `carchoicebd.com`, and staff training.

---

## 6. Planning Documentation Index

All planning deliverables have been authored and organized inside `d:/CarChoice/docs/planning/`:

1. **[`00-executive-project-plan.md`](file:///d:/CarChoice/docs/planning/00-executive-project-plan.md):** Master project summary, business scope, and executive roadmap.
2. **[`01-reference-website-audit.md`](file:///d:/CarChoice/docs/planning/01-reference-website-audit.md):** Forensic audit of `gari-import.com.bd` with section breakdown, evidence, and comparison matrix.
3. **[`02-sitemap-and-page-specification.md`](file:///d:/CarChoice/docs/planning/02-sitemap-and-page-specification.md):** Public sitemap, route hierarchy, section order, components, and acceptance criteria.
4. **[`03-functional-requirements-and-user-journeys.md`](file:///d:/CarChoice/docs/planning/03-functional-requirements-and-user-journeys.md):** Public features, admin dashboard specifications, 7 end-to-end user journeys, and acceptance tests.
5. **[`04-brand-design-and-motion-system.md`](file:///d:/CarChoice/docs/planning/04-brand-design-and-motion-system.md):** "Cinematic Dark Luxury" design tokens, typography, glassmorphism rules, component styling, and motion timings.
6. **[`05-technical-architecture-and-data-model.md`](file:///d:/CarChoice/docs/planning/05-technical-architecture-and-data-model.md):** Technology evaluation, PostgreSQL schema, RLS policies, API routes, and anti-spam architecture.
7. **[`06-four-week-roadmap-and-quality-plan.md`](file:///d:/CarChoice/docs/planning/06-four-week-roadmap-and-quality-plan.md):** 28-day sprint breakdown, scope contingency rules, testing matrix, and SEO quality plan.
8. **[`07-open-questions-risks-and-assumptions.md`](file:///d:/CarChoice/docs/planning/07-open-questions-risks-and-assumptions.md):** Prioritized client questions, technical risk mitigations, and documented operational defaults.
9. **[`08-asset-inventory.md`](file:///d:/CarChoice/docs/planning/08-asset-inventory.md):** Media analysis of client logos, banner copy, video assets, and missing asset supply lists.

---

## 7. Strict Phase Boundary Gate

> [!CAUTION]
> **PHASE 0 BOUNDARY STRICTLY ENFORCED**
> 
> * No application source code has been written.
> * No package manifests (`package.json`) or dependencies have been initialized.
> * No database services, external accounts, or production deployments have been executed.
> * All research and planning documentation is strictly confined to `d:/CarChoice/docs/planning/`.
> * The project is at a complete review gate awaiting explicit client/user approval.
