# Gymhur Visual Redesign — Design Document
**Date:** 2026-03-25
**Status:** Approved

---

## Problem

The current design uses Inter (generic), purple `#6528F7` on white/light gray, rounded cards, centered layouts, and subtle box shadows — textbook AI-generated SaaS aesthetics. It does not reflect Gymhur's identity as a serious B2B sportswear manufacturer in Sialkot, Pakistan. The site needs to feel distinctive, confident, and purpose-built.

---

## Chosen Direction: Stark Contrast (Option A)

Bold & Minimal. Off-white/sage background, black dominant, slate teal-green accent used sparingly. Sharp edges everywhere. Condensed display type for headlines, editorial serif for subheadings, clean grotesque for body. Left-aligned composition with typographic energy.

---

## Color Palette

| Role | Token | Value |
|------|-------|-------|
| Background | `--color-bg` | `#EDF2EF` |
| Text Primary | `--color-text` | `#0D0D0D` |
| Text Secondary | `--color-text-muted` | `#5A5A54` |
| Accent | `--color-accent` | `#263C40` |
| Accent Hover | `--color-accent-hover` | `#1A2D30` |
| Border | `--color-border` | `#D8D4CC` |
| Surface Dark | `--color-surface-dark` | `#0D0D0D` |
| White | `--color-white` | `#FFFFFF` |
| WhatsApp | `--color-whatsapp` | `#25D366` |

**Rules:**
- No gradients
- No box shadows
- Color contrast through solid fills only

---

## Typography

| Role | Font | Weight | Style |
|------|------|--------|-------|
| Display / Hero | Barlow Condensed | 800 | Uppercase |
| Section headings | DM Serif Display | 400 | Italic |
| Body / UI labels | Outfit | 400, 500 | Normal |

All from Google Fonts. The condensed display + italic serif contrast is the visual signature of the site.

**Replace:** Inter (removed entirely from globals.css and tailwind.config.ts)

---

## Layout Principles

- **No rounded corners** — `border-radius: 0` on all cards, buttons, inputs, tags
- **Hard borders** — `1px solid var(--color-border)` replaces shadows
- **Left-aligned** hero and section headers (not centered)
- **Full-bleed section backgrounds** for dark sections (CTA banner, footer)
- **Asymmetric hero** — text left, large typographic treatment right (oversized diagonal rule or large letterform)

---

## Component Specs

### Navbar
- Background: `#0D0D0D` (black)
- Logo: actual Gymhur SVG/PNG mark + wordmark, white version
- Nav links: Outfit 500, `rgba(255,255,255,0.6)` → white on hover
- CTA button: `#263C40` fill, white text, sharp edges
- No backdrop blur, no shadow

### Hero Section
- Background: `#EDF2EF`
- Decorative element: large diagonal rule or oversized faded wordmark in `#D8D4CC`
- Headline: Barlow Condensed 800 uppercase, ~80px desktop
- Suggested copy: `BUILT FOR BRANDS. MADE IN SIALKOT.`
- Subheadline: DM Serif Display italic, 22px, `#5A5A54`
- Primary CTA: `#263C40` fill, white text, sharp
- Secondary CTA: `1px solid #0D0D0D`, transparent fill, black text

### Product Category Cards
- Background: `#FFFFFF` (white on sage bg for contrast)
- Border: `1px solid #D8D4CC`
- Hover: border → `#263C40`, no scale, no shadow
- Category label: Barlow Condensed uppercase, small
- No colored icon placeholder — replaced with a simple arrow `→` or `+` glyph in accent color
- Sharp corners

### Trust Bar
- Background: `#0D0D0D`
- Text: white, Outfit 500
- Dividers: `rgba(255,255,255,0.15)`

### Why Gymhur / How It Works
- Background: `#EDF2EF`
- Section heading: DM Serif Display italic
- No icon boxes with colored backgrounds — use large numerals or simple line icons

### CTA Banner
- Background: `#0D0D0D` full-bleed
- Headline: Barlow Condensed 800 uppercase, white, very large
- Button: `#263C40` fill, white text

### Footer
- Background: `#0D0D0D`
- Logo: white version
- Text: `rgba(255,255,255,0.6)`
- Links: white on hover
- Clean column layout

### Buttons (global)
- Primary: `background: #263C40`, `color: #FFFFFF`, `border-radius: 0`, `border: none`
- Secondary: `background: transparent`, `color: #0D0D0D`, `border: 1px solid #0D0D0D`, `border-radius: 0`
- Hover transitions: background color shift only, no scale/shadow

### Form Inputs (Contact page)
- Border: `1px solid #D8D4CC`, `border-radius: 0`
- Focus: border → `#263C40`, no glow/ring
- Background: `#FFFFFF`

### WhatsApp Floating Button
- Color: `#25D366`
- Shape: **square** (not circle) — consistent with no-rounded-corners system
- Sharp edges

---

## Tailwind Config Changes

```ts
colors: {
  brand: '#263C40',
  'brand-dark': '#1A2D30',
  bg: '#EDF2EF',
  surface: '#FFFFFF',
  'text-primary': '#0D0D0D',
  'text-secondary': '#5A5A54',
  border: '#D8D4CC',
  'surface-dark': '#0D0D0D',
  whatsapp: '#25D366',
}

fontFamily: {
  display: ['Barlow Condensed', 'sans-serif'],
  serif: ['DM Serif Display', 'serif'],
  sans: ['Outfit', 'sans-serif'],
}
```

---

## globals.css Changes

Replace:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
```

With:
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Serif+Display:ital@1&family=Outfit:wght@400;500&display=swap');
```

Base html font: `Outfit` (not Inter)
Background: `#EDF2EF`

---

## Files to Change

| File | Change |
|------|--------|
| `src/app/globals.css` | Replace font import, update base color |
| `tailwind.config.ts` | Replace color tokens and font families |
| `src/components/layout/Navbar.tsx` | Black bg, updated token usage |
| `src/components/layout/Footer.tsx` | Black bg, updated tokens |
| `src/components/layout/WhatsAppButton.tsx` | Square shape |
| `src/components/home/Hero.tsx` | Left-aligned, new type, diagonal rule element |
| `src/components/home/TrustBar.tsx` | Dark bg treatment |
| `src/components/home/CategoryGrid.tsx` | Sharp cards, remove colored placeholder |
| `src/components/home/WhyGymhur.tsx` | Updated type and layout |
| `src/components/home/HowItWorks.tsx` | Updated type and layout |
| `src/components/home/CtaBanner.tsx` | Full-bleed dark, large type |
| `src/components/products/ProductCard.tsx` | Sharp cards |
| `src/components/contact/ContactForm.tsx` | Sharp inputs |

---

## What Does NOT Change

- Page structure and routes
- Sanity CMS schemas
- PostHog analytics
- API routes
- All functional logic
