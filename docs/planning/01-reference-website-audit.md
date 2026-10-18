# CAR CHOICE BD — Reference Website Audit & Empirical Investigation

> **Document ID:** `CCBD-DOC-01`  
> **Reference Domain:** `https://gari-import.com.bd`  
> **Audit Date:** October 16, 2026  
> **Auditor:** Antigravity Discovery & Browser Agent  
> **Artifacts Recorded:**  
> • Full Browser Video: `gari_import_audit_1792172130748.webp`  
> • Screen Captures: `homepage_top_1792172629128.png`, `homepage_brands_stock_1792172640936.png`, `homepage_cars_section_1792172649638.png`, `homepage_footer_1792172658878.png`, `stock_list_page_1792172672258.png`, `stock_list_filters_1792172682087.png`, `vehicle_detail_top_1792172702899.png`, `vehicle_detail_specs_1792172714269.png`, `vehicle_detail_footer_1792172727002.png`, `about_us_page_1792172743820.png`, `verify_auction_sheet_page_1792172757588.png`, `delivered_cars_page_1792172790777.png`, `contact_page_1792172805901.png`, `mobile_homepage_1792172831247.png`.

---

## 1. Audit Overview & Objectives

The purpose of this empirical audit is to reverse-engineer the information architecture, inventory presentation, customer conversion touchpoints, and business workflows of Bangladesh’s leading reconditioned Japanese vehicle import portal (`gari-import.com.bd`). 

Through automated browser navigation, viewport stress-testing, and DOM inspection across desktop (`1440px`), tablet (`1024px`), and mobile (`390px`) widths, we identified what makes the reference business successful, as well as critical UX, visual, and architectural shortcomings that **Car Choice BD** will surpass.

---

## 2. Discovered Page-by-Page Inventory Matrix

| Page Name | Exact Discovered URL | Discovery Method | Core Business Purpose | Key Components & Sections Observed | Observed Conversion CTAs | Confidence & Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Homepage** | `https://gari-import.com.bd/` | Root Entry | First impression, brand authority, category routing, vehicle discovery | • Top Utility Bar (WhatsApp numbers & socials)<br>• Main Navbar<br>• Hero Banner Carousel (Sponsorships/promotions)<br>• Automotive Brand Logo Strip (7 brands)<br>• 6-Portal Service Grid (Stock, Videos, Auction Sheets, USS Auction, Parts, Guide)<br>• About Us teaser with BARVIDA mention<br>• Accessory banner ad<br>• Comprehensive 3-Column Footer | • "Check Live Stock"<br>• "Watch Videos"<br>• "Verify Now"<br>• "Login" (Auction)<br>• "Visit Shop"<br>• WhatsApp header link | **High (100%)**<br>Screen: `homepage_top_...`, `homepage_brands_...` |
| **Live Stock Catalog** | `https://gari-import.com.bd/live-stock` | Nav link "Stock List" & Hero button | High-density vehicle inventory filtering and tabular discovery | • Live inventory count banner ("1008 vehicles found")<br>• Dynamic "Last Updated" timestamp<br>• Left Multi-parameter Filter Sidebar<br>• Master Data Table (Columns: #, Model, Year, Color, Package, Point, Mileage, Features)<br>• Pagination controls | • Click row to view Vehicle Details<br>• "Clear All Filters"<br>• "Apply Search" | **High (100%)**<br>Screen: `stock_list_page_...`, `stock_list_filters_...` |
| **Vehicle Detail Page** | `https://gari-import.com.bd/live-stock/[slug]` (e.g. `toyota-corolla-cross-z-2026`) | Row click on Stock List | Conversion decision hub, transparent inspection proof, and sales lead generation | • Breadcrumb (`< Back to Live Stock`)<br>• Vehicle Title & Trim/Year lockup<br>• Multi-Image Slider with Japanese Auction Sheet scan<br>• Direct Sales Inquiry Card<br>• 2x2 Core Specs Grid (Chassis, Year, Color, Mileage, Fuel, Point)<br>• Features Tag Cloud (pills)<br>• Secondary "Browse More Cars" button<br>• Cross-sell banner | • **Primary:** "Ask on Whatsapp" (High-contrast red button with icon)<br>• "Browse More Cars" | **High (100%)**<br>Screen: `vehicle_detail_top_...`, `vehicle_detail_specs_...` |
| **Auction Sheet Verification** | `https://gari-import.com.bd/auction-sheet-verification` | Header nav link | High-trust monetization service verifying Japanese auction sheets via Chassis/VIN | • Bilingual explanatory guide (Bangla + English)<br>• Fixed pricing badge ("only at BDT 850 Taka")<br>• Chassis Number / VIN Input form with example format (`NZT260-3209892`)<br>• Search & instant payment gateway initiation | • "Search" Chassis button<br>• "BUY" / Online payment action (850 BDT via bKash/Cards) | **High (100%)**<br>Screen: `verify_auction_sheet_page_...` |
| **Delivered Cars Gallery** | `https://gari-import.com.bd/delivered-cars` | Header nav link | Ultimate social proof, trust validation, and local brand credibility | • High-resolution photo gallery of real Bangladeshi customers receiving keys<br>• Branded commemorative frames ("Congratulations! TOYOTA PRIUS 2017 ALPHA G HYBRID")<br>• Contact hotline watermarks | • Passive social proof; customer photo inspection | **High (100%)**<br>Screen: `delivered_cars_page_...` |
| **Payment Information** | `https://gari-import.com.bd/payment` | Header dropdown | Transparent transaction terms and bank/mobile financial service guidelines | • Bank account transfer details (Account Name, Number, Routing, Branch)<br>• bKash Merchant Number payment steps<br>• Step-by-step import booking, duty payment, and balance clearance terms | • "Call for Payment Confirmation" | **High (95%)**<br>Verified via dropdown inspection |
| **About Us** | `https://gari-import.com.bd/about-us` | Header nav & Footer | Company history, leadership profile, and trade credentials | • Company history (Founded 2020 by Mehedi Zaman)<br>• BARVIDA registration credentials<br>• Founder background (Telecom engineering leadership at Huawei/Robi/Ericsson, AIUB graduate)<br>• Mission statement and Japanese sourcing philosophy | • Contact sales CTA<br>• Email inquiry link | **High (100%)**<br>Screen: `about_us_page_...` |
| **Contact Us** | `https://gari-import.com.bd/contact` | Header nav & Footer | Multi-channel communication hub & physical showroom locator | • Physical showroom address: Polwel Carnation Shopping Center, Sector 8, Uttara, Dhaka<br>• Multi-line Sales Manager direct telephone directory (6 numbers)<br>• Spare Parts & Service hotlines<br>• Interactive "Just Say Hello!" contact form (Name, Phone, Email, Subject, Message)<br>• Google Maps embed | • "Send Message" form submit<br>• Direct phone dialing links | **High (100%)**<br>Screen: `contact_page_...` |

---

## 3. Top-to-Bottom Homepage Section Breakdown

Through full-length page scrolling and DOM inspection, the homepage was observed to follow this precise order:

```mermaid
graph TD
    A[Top Utility Bar: WhatsApp Hotlines + Social Profiles] --> B[Header: Brand Logo + Primary Nav Menu]
    B --> C[Hero Section: Sponsored Slide Carousel]
    C --> D[Automotive Brand Marquee: 7 Japanese / Global Makes]
    D --> E[Core Value Header: BUY YOUR DREAM CAR FROM US]
    E --> F[6-Box Service Portal: Stock List | Videos | Auction Verification | Auction Bid | Spare Parts | Guide]
    F --> G[About Us Overview & Founder / BARVIDA Credibility]
    G --> H[Promotional Commercial Banner: Jump Starter Accessory]
    H --> I[Master Footer: 3 Columns - About, 10 Useful Links, Contact Directory + Payment Badges]
```

### Detailed Homepage Component Observations
1. **Top Utility Bar:**
   * Uses a dark navy background (`#1A2B49`).
   * Displays dual phone numbers with WhatsApp icon: `WhatsApp +8801811030303; +8801711030303`.
   * Social links to Facebook, Twitter, Pinterest, Instagram.
2. **Main Navigation:**
   * Clean white header. Logo on the left; navigation items aligned right with an active red indicator line below the current page.
   * Dropdown on "Payment" explaining banking methods.
3. **Hero Carousel:**
   * Focuses on commercial partnerships (e.g. Mobil 1 lubricant partnership) and general brand slogans rather than direct car inventory search.
4. **Brand Logo Strip:**
   * Displays monochrome/color vector badges for Honda, Hyundai, Mercedes-Benz, Mitsubishi, Nissan, Toyota, BMW.
5. **The 6-Portal Service Hub:**
   * This is the functional centerpiece of their homepage. Rather than showing a loose list of cars, it organizes the customer's intent into 6 graphic tiles with clear action buttons.
6. **Footer Architecture:**
   * **Column 1:** Short company narrative and "Read More" link.
   * **Column 2 (Useful Links):** How to Buy, Verify Auction Sheet, Auction Sheet Guide, Shipping Info, Import Regulations, News, Blog, FAQ, Terms & Conditions, Privacy Policy, Refund Policy.
   * **Column 3 (Contact Information):** 6 individual sales manager direct mobile lines, 2 spare parts hotlines, and visual trust logos for payment gateways (American Express, VISA, MasterCard, bKash).

---

## 4. Vehicle Discovery & Stock List Interaction Analysis

### 4.1 Live Stock Catalog Architecture (`/live-stock`)
* **Presentation Format:** Unlike consumer ecommerce sites that use image-heavy card grids, `gari-import.com.bd` utilizes a **high-density data table** for desktop users.
* **Rationale:** In Bangladesh, commercial buyers, reconditioned car enthusiasts, and brokers want to scan chassis numbers, auction grades (points), packages, and mileage rapidly across hundreds of cars.
* **Observed Data Fields in Table:**
  1. `#` (Index row)
  2. `CAR MODEL` (e.g. *Toyota Corolla Cross*, *Toyota Harrier*, *Honda Vezel*)
  3. `YEAR` (e.g. 2023, 2024, 2026)
  4. `COLOR` (e.g. Black, Pearl, Wine, Silver)
  5. `PACKAGE` / Trim (e.g. *Z*, *G*, *Modellista*, *RS*)
  6. `POINT` / Auction Grade (e.g. *S*, *6*, *5*, *4.5*, *4*, *R*)
  7. `MILEAGE` (e.g. *13 km*, *3700 km*, *16000 km*)
  8. `FEATURES` (Visual pill tags like *Panoramic Roof*, *360 Camera*, with overflow indicators like `+6`, `+7`)

### 4.2 Search & Filter Capabilities
The sidebar filter provides 7 specific search axes:
* **Keyword Search:** Free-text input across chassis, model, or package.
* **Car Model:** Single-select dropdown listing popular Japanese imports.
* **Year of Manufacture:** Multi-checkbox selection (`2019` through `2026`).
* **Exterior Color:** Dropdown.
* **Auction Point:** Dropdown (`S` through `3.0`).
* **Mileage Slider:** Minimum to maximum range.
* **Fuel Type:** Dropdown (*Hybrid*, *Octane / Petrol*, *Diesel*, *Electric*).

---

## 5. Vehicle Detail Page & Conversion Funnel Analysis

The vehicle detail page (`/live-stock/[slug]`) is engineered around **direct WhatsApp and phone conversions**:

1. **Title & Pricing Hierarchy:**
   * Title clearly states Make, Model, Trim, and Year.
   * Interestingly, explicit BDT cash prices are frequently omitted on recent high-demand imports to prevent competitor price-undercutting and currency fluctuation issues.
   * Instead, the primary hero card prompts: **"Need pricing or availability confirmation? Talk to the sales team directly"** with a bold red button: **"Ask on Whatsapp"**.
2. **Japanese Auction Sheet Integration:**
   * The first image in the slider is often the **actual Japanese Auction Sheet scan**, displaying the original inspector's exterior/interior damage map (A1 scratches, U1 dents, W1 repaints) and verified odometer reading.
   * This builds immediate trust against the widespread fear of tampered odometers in the local market.
3. **Core Specification Cards:**
   * 2x2 modular cards highlight: Chassis Number (essential for independent auction verification), Year, Color, Mileage, Fuel Type, and Auction Point.
4. **Features Badges:**
   * Clear tag cloud detailing modern driver-assistance and luxury options (*Panoramic Roof*, *Power Back Door*, *Seat Heater*, *360 Camera*, *Blind Spot Monitor*, *Display 10.5 Inch*, *New Shape*).

---

## 6. Responsive Viewport Stress-Testing Observations

| Viewport | Tested Width | Navigation Behavior | Inventory & Table Layout | Floating Controls | UX Bottlenecks Observed |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop** | `1440 px` | Sticky top-bar, full horizontal menu with hover states | 2-column layout: Sticky filter sidebar on left (280px), wide 8-column data table on right | Top-right phone hotlines; no floating bottom bar | Page feels somewhat dated (plain white Bootstrap styling, standard typography, lack of modern micro-interactions). |
| **Tablet** | `1024 px` | Navbar compresses; dropdown remains accessible | Filter sidebar collapses or stacks above table; table develops horizontal scrollbar | Standard top-bar phone links | Horizontal table scroll feels clunky on touchscreens; requires horizontal swipe to see features. |
| **Mobile** | `390 px` | Collapses into hamburger menu drawer with red toggle | Data table switches to stacked cards or compressed vertical rows | Top bar wraps and takes up substantial screen real estate | Fixed header consumes ~18% of mobile viewport; banners are text-heavy and hard to read on small screens; lack of a persistent bottom "Quick Call / WhatsApp" action bar. |

---

## 7. Comparative Analysis: Reference Benchmark vs. Car Choice BD Strategy

| Evaluation Dimension | Reference Website (`gari-import.com.bd`) | Car Choice BD Proposed Strategy | Competitive Advantage for Car Choice BD |
| :--- | :--- | :--- | :--- |
| **Visual Aesthetic & Tone** | Basic white background, plain red/black Bootstrap color scheme, standard web fonts. | **Cinematic Dark Luxury**: Midnight navy, liquid chrome metallic silver, warm gold edge trims, refined glassmorphism. | Elevates Car Choice BD from an ordinary used-car lot to an elite, luxury vehicle concierge. |
| **Local Brand Identity** | Centered in Uttara, Dhaka; founder-centric narrative. | **Rajshahi Regional Anchor**: Explicit focus on Rajshahi showroom directly adjacent to the BRTA office (`Amchattar, Rajshahi, 6203`). | Dominates the Northern/Rajshahi high-net-worth automotive market while maintaining national Bangladesh delivery. |
| **Inventory Presentation** | Table view only on desktop; dense but uninspiring. | **Hybrid Toggle**: Dual-mode inventory browsing (**Rich Card Grid** for visual buyers + **Fast Data Table** for commercial/spec buyers). | Appeals to both luxury emotional car buyers and detail-oriented technical buyers. |
| **Mobile UX** | Bulky header, no persistent thumb-zone navigation, cramped tables. | **Mobile-First App Experience**: Native-feeling bottom action sheet with instant WhatsApp, Direct Call, and Saved Cars. | 85%+ of Bangladeshi automotive traffic originates on mobile phones over 4G/cellular. |
| **Auction Verification** | Standard form requiring manual lookup or payment. | **Seamless Chassis Verification Flow**: Automated chassis lookup with transparent pricing and direct WhatsApp report delivery. | Increases credibility and captures qualified customer phone numbers. |
| **Admin Operations** | Custom proprietary PHP backend. | **Modern Headless Dashboard**: Next.js / Supabase secure portal for real-time inventory updates, multi-photo uploading, and inquiry tracking. | Enables non-technical showroom staff to publish new arrivals within 60 seconds from their phones. |

---

## 8. Verified Technical Limitations of the Reference Site

During the audit, the following operational boundaries were identified:
1. **USS Auction Bidding Portal:** The "BUY From Auction" button links to a private external Japanese auction portal (USS / ASNET) requiring licensed dealer credentials; it is not a publicly accessible self-service web application.
2. **Dynamic Pricing:** Most top-tier stock does not publish static prices; transactions occur through live negotiation on WhatsApp based on daily Yen-to-BDT exchange rates and customs clearance fees.
3. **No Direct Online Checkout for Cars:** Reconditioned cars are high-ticket purchases (typically 25 Lakh to 1.5+ Crore BDT). Full transactions are never completed with online credit cards; websites in Bangladesh collect inquiries and booking deposits (via bKash or Bank Pay Order).
