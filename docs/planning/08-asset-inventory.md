# CAR CHOICE BD — Asset Inventory & Technical Media Analysis

> **Document ID:** `CCBD-DOC-08`  
> **Status:** Discovery & Audit Complete  
> **Location:** `d:/CarChoice/docs/planning/08-asset-inventory.md`  
> **Project Phase:** Phase 0 (Discovery & Planning)

---

## 1. Executive Summary

A comprehensive forensic inspection of the local workspace directory (`d:/CarChoice/public/`) was conducted. Five primary client media and template assets were discovered, verified, and analyzed for resolution, encoding, visual hierarchy, and production readiness.

The client assets establish an exceptionally strong, prestigious brand foundation. The official emblem and identity materials set Car Choice BD apart from typical mass-market Bangladeshi car portals by projecting a luxury Japanese automotive aesthetic (metallic chrome, gold rim beveling, deep navy slate texture, and Mount Fuji sunrise backdrop).

---

## 2. Local Asset Inventory Matrix

| Asset Filename | Format | Dimensions / Resolution | File Size | Verified Content & Visual Analysis | Production Suitability | Recommended Implementation Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`Profile_Pic_Logo.jpeg`** | JPEG (RGB) | `2048 × 2048` px (1:1 Square) | 2.03 MB (2,136,317 bytes) | High-definition 3D rendering of the Car Choice BD emblem. Features dual interlocking metallic chrome 'C's forming a sports coupe roofline with gold edge beveling, set above beveled serif typography ("CAR CHOICE BD") on a dark textured navy background with subtle lens glints. | **Production Ready** (Ultra-high fidelity; requires derivative optimization for web performance) | • Master brand reference<br>• Social media avatar (Facebook/Instagram/WhatsApp)<br>• Basis for favicon/app icon export<br>• Hero card luxury brand badge |
| **`Cover_Photo.png`** | PNG (RGB) | `2048 × 762` px (2.68:1 Panorama) | 1.61 MB (1,695,318 bytes) | Full cinematic brand banner featuring the 3D emblem, business tagline ("YOUR TRUSTED DESTINATION FOR JAPANESE RECONDITIONED VEHICLES"), 4 core trust pillars, Rajshahi showroom address, official phone/WhatsApp (+880 1838-581250), Mount Fuji / cherry blossom backdrop, and premium imported Japanese vehicles (Toyota Alphard, Harrier, Camry). | **Production Ready** (Rich source of authentic copy, business credentials, and color palette) | • Social media cover banner<br>• Design reference for website Hero section<br>• Asset for "About Us" and "Showroom" storytelling sections |
| **`Animated_Logo.mp4`** | MP4 (H.264 / AAC) | `1080p` (24.00 fps, ~140 kbps video stream) | 2.20 MB (2,308,574 bytes, 10s duration) | Cinematic motion reveal: starts with glowing neon-blue laser outline tracing the car silhouette, transitions into solid 3D chrome/gold metal with an anamorphic lens flare sweep, followed by beveled typography reveal ("CAR CHOICE BD") settling onto deep navy slate. | **High Value** (Must be used selectively; continuous looping would degrade UX and battery life) | • Optional one-time session splash/intro modal (with instant skip and `sessionStorage` flag)<br>• Hero section ambient video teaser or modal video showcase<br>• About Us brand story reel |
| **`favicon.svg`** | SVG (Vector XML) | `48 × 46` px | 9.52 KB (9,522 bytes) | Vector lightning-bolt / geometric icon colored in purple (`#863bff`) and cyan (`#47bfff`) with Gaussian blur filters. | **Template Artifact — Not Brand Aligned** | **DO NOT USE in production.** This is a leftover starter template icon unrelated to Car Choice BD. Must be replaced with a custom SVG derived from the official chrome/gold emblem. |
| **`icons.svg`** | SVG (Vector XML) | Variable `<symbol>` sprites | 5.03 KB (5,031 bytes) | SVG sprite sheet containing third-party tech icons: Bluesky, Discord, GitHub, Documentation, Social, and X (Twitter). | **Template Artifact — Not Directly Relevant** | Contains generic social symbols; Car Choice BD requires WhatsApp, Phone, Location Pin, Auction Gavel, Shield, Engine, Fuel, and Gauge icons. |

---

## 3. Deep-Dive Brand Asset Analysis

### 3.1 Official Logo Emblem (`Profile_Pic_Logo.jpeg`)
* **Symbolism:** Two stylized lettermarks ("C" for *Car*, "C" for *Choice*) face each other horizontally, creating the aerodynamic roofline and greenhouse silhouette of an exotic grand-tourer / sports coupe.
* **Materials & Shading:**
  * **Core Metal:** Polished chrome/liquid silver with ambient horizon line reflections.
  * **Outer Rim:** Precision chamfered warm gold border (`#D4AF37` / `#C5A059`) lending warmth and prestige.
  * **Wordmark:** "CAR CHOICE BD" set in beveled, high-contrast serif roman capitals with metallic specular highlights.
* **Background Canvas:** Deep midnight navy (`#070B14` to `#0B1220`) with subtle micro-leather or slate stippling.
* **Design Verdict:** The emblem is fully resolved and professional. It **must not be redesigned, redrawn, or altered**.

### 3.2 Brand Banner & Real Business Information (`Cover_Photo.png`)
The cover banner provides confirmed, factual business credentials directly from the client:
1. **Official Brand Name:** `Car Choice BD`
2. **Official Tagline:** *"Your Trusted Destination for Japanese Reconditioned Vehicles."*
3. **Core Sub-specialties:** `JAPANESE VEHICLES` | `GLOBAL SOURCING` | `PREMIUM SERVICE`
4. **Secondary Signature:** *"Drive Excellence"* (rendered in dynamic script with a crimson red underline stroke).
5. **Physical Showroom Address:**  
   `Near BRTA Office, Amchattar, Rajshahi, Bangladesh, 6203`  
   *(Crucial strategic positioning: located directly adjacent to the regional BRTA authority in Rajshahi).*
6. **Official Contact Hotline & WhatsApp:**  
   `+880 1838-581250`
7. **Official Domain:**  
   `www.carchoicebd.com`
8. **Verified Value Propositions (Trust Pillars):**
   * **Certified Quality** (Icon: Shield with Checkmark)
   * **Authentic Auction Grades** (Icon: Auctioneer Gavel)
   * **Direct Import From Japan** (Icon: Globe)
   * **Reliable & Trusted** (Icon: Handshake)

### 3.3 Motion Identity Asset (`Animated_Logo.mp4`)
* **Duration:** 10 seconds (00:00:10).
* **Frame Rate:** 24.00 frames per second.
* **Resolution:** 1080p vertical dimension.
* **Narrative Arc:**
  * `0.0s – 3.5s`: Laser outline animation tracing vehicle silhouette.
  * `3.5s – 6.5s`: Materialization of 3D chrome surface with light sweep and optical flare.
  * `6.5s – 8.5s`: Wordmark "CAR CHOICE BD" bevel reveal.
  * `8.5s – 10.0s`: Final lockup holding state.
* **UX & Performance Recommendation:**
  * **Never run as a continuous loop** on the live website (causes high GPU/battery drain and distracts from car browsing).
  * **Never force a mandatory 10-second blocking splash screen** on mobile users seeking vehicle specs.
  * **Recommended Strategy:**
    1. Provide an optional "Brand Experience" modal or subtle hero-card video embed.
    2. If used as an intro animation, restrict it to the first visit per session via `sessionStorage['hasSeenIntro']`, provide an immediate `[Skip Intro]` button, and auto-dismiss after 4 seconds or on any click/keypress.
    3. Respect `prefers-reduced-motion` media queries: users with reduced-motion enabled must never see auto-playing video intros.

---

## 4. Missing Assets & Client Supply Requirements

To ensure complete production readiness without placeholders, the following assets must be requested or prepared:

| Priority | Asset Description | Format Needed | Purpose in Website | Action / Workaround |
| :--- | :--- | :--- | :--- | :--- |
| **P0 (Critical)** | **Transparent Vector Logo (Emblem + Wordmark)** | SVG or Transparent PNG (`24-bit`, min `1024px` wide) | Navbar logo, sticky header, invoice generator, and mobile drawer. | The existing `Profile_Pic_Logo.jpeg` has a dark textured background. We need a clean transparent version or we must cleanly extract the alpha channel using modern mask techniques. |
| **P0 (Critical)** | **Real Vehicle Photography (Initial Stock)** | High-res JPG / WebP (exterior, interior, odometer, auction sheet) | Minimum 6 to 12 real vehicles for initial ready-stock database. | Client must supply 5–10 photos per vehicle in showroom or port stock. |
| **P1 (High)** | **Japanese Auction Sheet Samples** | High-res JPG / PDF | Sample verification reports for the Auction Sheet verification service and vehicle detail pages. | Client to provide 2–3 authentic auction sheets with chassis numbers. |
| **P1 (High)** | **Delivered Car Customer Photos** | JPG / WebP | Social proof gallery (similar to reference site's successful delivery handovers). | Real photos of Rajshahi showroom deliveries with customer consent. |
| **P2 (Medium)** | **Showroom Facility Photographs** | JPG / WebP (`1920 × 1080`) | About Us page and Rajshahi location showcase. | Photos of Amchattar showroom, BRTA office vicinity, customer lounge. |
| **P2 (Medium)** | **Branded Favicon & PWA Icons** | SVG + PNG (`32×32`, `180×180`, `512×512`) | Browser tab icon, mobile home screen bookmark. | Derive cleanly from the interlocking "CC" emblem. |

---

## 5. Storage and Optimization Architecture

For the production web application:
1. **Formats:** All static image assets must be converted and served as **modern WebP or AVIF** formats with responsive `srcset` (`400w`, `800w`, `1200w`, `1600w`).
2. **CDN Delivery:** Vehicle gallery images uploaded by administrators in Phase 3 must be stored in Cloud Object Storage (e.g. Supabase Storage / AWS S3) with automatic thumbnail generation and lazy loading.
3. **No Hotlinking:** No third-party assets should be hotlinked from the reference website. All images must be client-owned or generated original assets.
