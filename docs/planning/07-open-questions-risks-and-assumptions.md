# CAR CHOICE BD — Open Questions, Strategic Risks & Architectural Assumptions

> **Document ID:** `CCBD-DOC-07`  
> **Location:** `d:/CarChoice/docs/planning/07-open-questions-risks-and-assumptions.md`  
> **Target Audience:** Client, Lead Architect & Project Manager  
> **Purpose:** Resolve business ambiguities, mitigate technical risks, and document safe operational defaults before code implementation.

---

## 1. Prioritized Client Questions & Clarification Policy

In accordance with Phase 0 discovery guidelines, questions are grouped strictly by their impact on system architecture, launch timeline, and security.

### 1.1 Category A: Pre-Implementation Blockers (Must Confirm Before Coding)

These 3 items directly dictate database fields, domain settings, and authentication:

1. **Production Domain & Hosting Credentials:**
   * *Question:* Does Car Choice BD already own and control `carchoicebd.com` (as displayed on `Cover_Photo.png`), and do we have access to DNS management (Cloudflare / Namecheap / GoDaddy) to point records to Vercel?
   * *Recommended Default:* If DNS access is delayed, develop and preview on a secure Vercel staging domain (`carchoicebd.vercel.app`) without blocking development.
2. **Initial Vehicle Inventory Data:**
   * *Question:* Can the client supply vehicle spec sheets and photographs for 6 to 10 vehicles currently in the Rajshahi showroom or at port to seed the initial database?
   * *Recommended Default:* For Week 1 database staging, utilize authentic specifications of popular Japanese models (Toyota Harrier, Corolla Cross, Prado, Vezel) as staging data, to be replaced by showroom staff during Week 3 admin training.
3. **Primary WhatsApp & Telephone Hotlines:**
   * *Question:* Is `+880 1838-581250` the sole official WhatsApp sales hotline, or will multiple sales managers require separate contact numbers (similar to the reference site's 6 numbers)?
   * *Recommended Default:* Designate `+880 1838-581250` as the master WhatsApp hotline for all automated button deep-links, and provide secondary manager numbers in the contact directory.

---

### 1.2 Category B: Important Decisions (Can Be Confirmed During Week 2 UI Phase)

These decisions influence component presentation but do not block foundational database or auth development:

1. **Pricing Display Strategy on Public Stock:**
   * *Question:* Should all vehicles display public cash prices in BDT (e.g. `৳ 84,50,000`), or should recent/high-demand models display `Call for Price / Negotiable`?
   * *Recommended Default:* The data model already supports a flexible per-vehicle toggle (`EXACT`, `CALL_FOR_PRICE`, `UPON_REQUEST`), giving showroom staff total control per car.
2. **Auction Sheet Verification Fee & Workflow:**
   * *Question:* Does Car Choice BD intend to charge a fee for verifying external auction sheets (reference site charges ৳850 via online payment), or offer it as a free lead-generation consultation via WhatsApp?
   * *Recommended Default for MVP:* Offer it as a **Free Trust Service & Lead Magnet** where customers submit their chassis number and receive the verified sheet report via WhatsApp. This maximizes customer phone number capture without the complexity of merchant payment gateways.
3. **Language Presentation:**
   * *Question:* Should the website feature a complete dual-language switch (English / বাংলা), or a primary English luxury interface with strategic Bengali assistance captions on verification and contact forms?
   * *Recommended Default:* Primary English luxury interface with clear Bengali micro-copy for auction verification guides and BRTA instructions. Full automated i18n switching deferred to Phase 2.

---

### 1.3 Category C: Optional Enhancements (Deferred to Phase 2)

* **Integrated Automated bKash Payment Gateway:** (Online checkout for ৳850 verification fees).
* **Automated SMS Notification Service:** (Instant SMS alert to customers upon submitting pre-orders).
* **Live Japanese USS Auction API Direct Bidding:** (Enterprise dealer feature requiring Japanese broker credentials).

---

## 2. Technical Risk Matrix & Mitigation Strategies

| Risk Description | Severity | Probability | Impact on Project | Proactive Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **High Resolution Vehicle Photos Slowing Down Mobile Site** | **High** | **High** | High bounce rates for mobile users on 4G cellular data. | • Enforce Next.js `<Image />` optimization with automatic WebP conversion.<br>• Implement client-side canvas compression in Admin uploader.<br>• Lazy-load images below the fold. |
| **Spam Spiders Flooding Inquiry Forms** | **Medium** | **High** | Staff overwhelmed with fake leads and database pollution. | • Implement invisible honeypot field (`website_url_hp`).<br>• Add IP-based rate limiting on server actions (max 5 submissions/hour/IP).<br>• Enforce strict Zod schema validation. |
| **Client Delay in Supplying Real Vehicle Images** | **High** | **Medium** | Launch stalled without ready stock to display. | • Pre-build the entire database schema with 8 authentic staging cars.<br>• Provide a simple bulk-import script so client stock can be loaded in 1 hour once received. |
| **Unauthenticated Access to Admin Dashboard** | **Critical** | **Low** | Malicious alteration of vehicle pricing or theft of customer phone numbers. | • Database-enforced Row Level Security (RLS) on all tables.<br>• Next.js Edge Middleware route guards protecting `/admin/*`.<br>• Private customer leads never exposed in public API responses. |
| **Mobile Browsers Sluggish Due to Heavy Glassmorphism** | **Medium** | **Medium** | Choppy scrolling and high battery drain on budget Android phones. | • Limit CSS `backdrop-filter: blur()` to navigation headers and floating cards.<br>• Use solid dark navy backgrounds (`#0B111E`) for large page sections.<br>• Respect `prefers-reduced-motion`. |

---

## 3. Explicit Architectural Assumptions & Documented Defaults

Where client documentation does not provide definitive answers, the following sensible defaults have been established:

1. **Business Location Anchor:**  
   *Assumption:* The primary physical showroom and customer vehicle delivery center is located at:  
   **Near BRTA Office, Amchattar, Rajshahi, Bangladesh, 6203** (as verified on client `Cover_Photo.png`).  
   *Consequence:* All local SEO, Google Maps embeds, and structured contact schema will anchor to Rajshahi.
2. **Currency Standards:**  
   *Assumption:* All transactions and price listings are in **Bangladeshi Taka (BDT / ৳)** formatted in South Asian numbering (e.g. `৳ 84,50,000` / 84.5 Lakh).
3. **Stock Status Categories:**  
   *Assumption:* Inventory consists of 3 real-world statuses: `Ready Stock` (physically in Rajshahi showroom), `Port Stock / In Transit` (clearing Mongla/Chattogram port or on vessel from Japan), and `Pre-Order` (to be sourced from Japanese auctions upon order).
4. **WhatsApp Communication Boundary:**  
   *Assumption:* WhatsApp interactions occur inside the showroom staff's official WhatsApp Business mobile/desktop application; WhatsApp chat threads do not sync automatically into the custom admin dashboard in the MVP.
5. **Brand Integrity:**  
   *Assumption:* The official 3D chrome and gold emblem (`Profile_Pic_Logo.jpeg`) and brand banner (`Cover_Photo.png`) are permanent, final client assets. They will not be redesigned, redrawn, or altered.
