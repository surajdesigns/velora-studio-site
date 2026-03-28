# Velora Studio V2 — Premium Digital Agency Website

> A completely rebuilt, premium-grade digital agency website with high-conversion focus,
> futuristic dark design, 3D hero, GSAP animations, and a smart pricing calculator.

---

## 📁 Project Structure

```
/velora-studio-v2
│
├── index.html                    # Homepage — hero, services, portfolio, about, stats, testimonials, CTA, contact
├── services.html                 # Detailed services breakdown with process section
├── work.html                     # Portfolio with category filters and case studies
├── about.html                    # Team, values, story, tech stack
├── contact.html                  # Lead capture form + contact info + WhatsApp
├── start-project.html            # Multi-step project funnel with real-time pricing
│
├── /assets
│   ├── /css
│   │   ├── main.css              # Design system — variables, typography, all component styles
│   │   ├── animations.css        # GSAP keyframes, animation utilities, hover effects
│   │   ├── responsive.css        # Mobile-first breakpoints + start-project page styles
│   │
│   ├── /js
│   │   ├── main.js               # Navigation, mobile menu, sticky CTA, filters, Three.js 3D hero
│   │   ├── animations.js         # GSAP ScrollTrigger — scroll reveals, staggers, counters, parallax
│   │   ├── pricing-calculator.js # Smart pricing engine — multi-step form, real-time calculator
│   │   ├── form-handler.js       # Contact form validation, submission, error states
│   │
│   ├── /images                   # Image assets (placeholder directory)
│   ├── /models                   # 3D GLTF models (placeholder directory)
│
├── /components
│   ├── navbar.html               # Reusable navigation component template
│   ├── footer.html               # Reusable footer component template
│
├── README.md                     # This file
```

---

## 📄 File Documentation

### HTML Pages

#### `index.html`
→ Controls the **homepage layout** — the main entry point and conversion page
→ Contains: Hero (3D canvas + orbs), Services grid, Portfolio (3 featured), About section, Stats counters, Testimonials, CTA banner, Contact form, Footer
→ Includes: Sticky CTA button, Free Plan popup modal
→ Editing hero section affects the first screen visitors see
→ Editing CTA/testimonials affects conversion rates

#### `services.html`
→ **Detailed services breakdown** with alternating 2-column layouts
→ Contains: Page hero, 4 detailed service sections (Web Dev, SEO, Social Media, Branding), 3 quick service cards (E-commerce, Maintenance, Redesign), Process section (Discovery → Launch)
→ Editing service descriptions affects how offerings are communicated
→ Editing process steps affects client expectations

#### `work.html`
→ **Portfolio with case studies** — showcases completed projects
→ Contains: Page hero, category filter buttons, 6 project cards with results
→ Editing filter buttons affects which categories appear
→ Adding `.project-card[data-category="x"]` cards adds new portfolio items

#### `about.html`
→ **Trust & authority page** — builds credibility
→ Contains: Company story, Core values grid (4 cards), Team section (3 members), Technology stack display
→ Editing team cards affects the "who" perception
→ Editing values affects brand positioning

#### `contact.html`
→ **Simple lead capture** — contact form + direct communication channels
→ Contains: Contact info (email, phone, location, hours), WhatsApp link, Enhanced contact form
→ Editing contact details changes how leads reach you
→ Form uses `form-handler.js` for validation

#### `start-project.html`
→ **Advanced conversion funnel** — the most critical lead-gen page
→ Contains: 4-step wizard (Services → Details → Summary → Send)
→ Business type selector (Small/Growing/High Value)
→ Service multi-select, Website config (type + pages)
→ Real-time pricing calculator, Price breakdown summary
→ Auto-generated WhatsApp/Email message
→ Editing pricing in `pricing-calculator.js` affects all estimates

---

### CSS Files

#### `assets/css/main.css`
→ Controls **global styling** and the design system
→ CSS variables (colors, fonts, spacing, radii) defined in `:root`
→ **Changing `:root` variables affects the entire site's appearance**
→ Contains all component styles: nav, buttons, hero, services, portfolio, about, stats, testimonials, CTA, contact, footer, sticky CTA, free plan modal, page headers, process, team, values

#### `assets/css/animations.css`
→ **Animation utilities** and keyframes for GSAP
→ `.reveal`, `.reveal-left`, `.reveal-right` — scroll reveal hidden states
→ Keyframes: `glow-pulse`, `gentle-float`, `shimmer`, `gradient-shift`, `orb-drift`
→ Utility classes: `.hover-lift`, `.float-animate`, `.glow-animate`, `.shimmer`
→ Editing keyframes changes animation behavior sitewide

#### `assets/css/responsive.css`
→ **Responsive breakpoints** and start-project page styles
→ Breakpoints: 1024px, 768px, 480px (+ 640px for step labels)
→ Contains ALL start-project styles: progress bar, step panels, service options, biz cards, config options, price pills, summary cards, price estimate card, auto message
→ Editing breakpoints affects mobile/tablet layouts

---

### JavaScript Files

#### `assets/js/main.js`
→ **Core functionality** — runs on every page
→ Nav scroll effect (glassmorphism on scroll)
→ Mobile hamburger menu
→ Sticky CTA button (shows after 600px scroll)
→ Free plan popup (open/close/submit)
→ Portfolio filter buttons (show/hide by category)
→ Smooth scroll for anchor links
→ **Three.js 3D Hero** — procedural "V" logo (extruded shape), orbital ring, particle system, mouse parallax
→ Editing Three.js section changes the hero 3D experience

#### `assets/js/animations.js`
→ **GSAP + ScrollTrigger animations** — runs on pages with GSAP loaded
→ Hero entrance animation (badge → h1 → subtitle → buttons)
→ Page hero animation for inner pages
→ Scroll reveals for section labels, headings, text
→ Staggered reveals: service cards, project cards, testimonials
→ Stats counter animation (animated number counting)
→ Parallax on hero grid
→ CTA banner reveal
→ Hover scale effects on cards and buttons
→ Editing stagger/duration values changes animation timing

#### `assets/js/pricing-calculator.js`
→ **Smart pricing engine** — only runs on `start-project.html`
→ Pricing formula: `Base (biz type) + Services + Website Type + Pages`
→ Service prices defined in `SERVICE_PRICES` object
→ Page price: ₹1,000 per page
→ Multi-step form navigation with smooth transitions
→ Real-time price pill updates
→ Summary page with line-item breakdown
→ Auto-generated WhatsApp/Email message
→ **Editing `SERVICE_PRICES` or `PAGE_PRICE` changes all estimates**

#### `assets/js/form-handler.js`
→ **Form validation & submission** — runs on pages with contact forms
→ Required field validation with visual error states
→ Email format validation
→ Simulated submission with loading state
→ Success animation with GSAP (if available)
→ Editing validation logic affects form behavior

---

### Component Templates

#### `components/navbar.html`
→ Reference template for the navigation bar
→ Links to all 6 pages
→ Includes mobile menu markup
→ Note: Components are inlined in each page (no build step required)

#### `components/footer.html`
→ Reference template for the footer
→ 4-column layout: Brand, Services, Company, Legal
→ Social media icons + copyright

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-deep` | `#07070d` | Page background |
| `--bg-base` | `#0c0c14` | Section alternating bg |
| `--bg-card` | `#111120` | Card surfaces |
| `--accent-blue` | `#6366f1` | Primary accent |
| `--accent-purple` | `#a855f7` | Secondary accent |
| `--font-display` | Syne | Headings |
| `--font-body` | DM Sans | Body text |

---

## 🚀 Deployment

This is a **static site** — no build step required.

1. Upload the entire `velora-studio-v2` folder to any web host
2. Point your domain to `index.html`
3. All assets are referenced with relative paths

**CDN Dependencies** (loaded from cdnjs):
- Three.js r128 (homepage only)
- GSAP 3.12.2
- ScrollTrigger 3.12.2

---

## 📊 Pricing Logic

```
Final Price = Base (business type) + Σ Services + Website Type + (Pages × ₹1,000)

Business Types:
  Small Business  → ₹7,000
  Growing Business → ₹12,000
  High Value       → ₹25,000

Services: ₹2,000 – ₹8,000 each
Website Type: ₹2,000 – ₹8,000
Pages: ₹1,000 per page
```
