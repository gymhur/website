# Gymhur Next.js Redesign — Design Document
**Date:** 2026-03-24
**Status:** Approved

---

## Overview

Recreate gymhur.com as a clean, modern B2B website in Next.js, hosted on a separate domain while the existing WordPress/Elementor site remains live and untouched. The new site must preserve and improve lead generation (email form submissions, WhatsApp, email link).

---

## Tech Stack

| Layer | Technology | Hosting/Tier |
|-------|-----------|--------------|
| Frontend | Next.js (App Router) + Tailwind CSS | — |
| CMS | Sanity (headless) | Free tier |
| Hosting | Vercel | Free tier |
| Email delivery | Resend | Free tier (3,000 emails/month) |

---

## Site Structure

| Page | Purpose |
|------|---------|
| Home (`/`) | Hero, trust bar, product categories, why us, how it works, CTA banner |
| Products (`/products`) | Category grid |
| Product Category (`/products/[category]`) | Product listing within a category |
| Product Detail (`/products/[category]/[slug]`) | Individual product with quote CTA |
| About (`/about`) | Company story, location, values |
| Contact (`/contact`) | Primary lead gen page — form + WhatsApp |
| Blog (`/blog`) | CMS schema ready, page deferred |

---

## Lead Generation Touchpoints

- "Get a Quote" button in sticky navigation (always visible)
- Hero section primary CTA → Contact page
- Product pages → "Request a Quote" button per product
- Full-width CTA banner section on Home page
- Footer → contact info + quick links
- Floating WhatsApp button (bottom right, every page)
- Contact form → email delivered to inbox via Resend

---

## Design System

### Colors

| Role | Value |
|------|-------|
| Background | `#FFFFFF` |
| Surface / cards | `#F8F8F8` |
| Text primary | `#0F0F0F` |
| Text secondary | `#6B7280` |
| Accent / CTAs | `#6528F7` |
| Accent hover | `#4F1FBF` |
| WhatsApp button | `#25D366` |

### Typography
- **Font family:** Inter (Google Fonts)
- Headings and body both use Inter at different weights
- Replaces previous Montserrat/Libre Baskerville combination

### Layout
- Max content width: `1200px`, centered
- Mobile-first, fully responsive
- Generous whitespace
- Cards with subtle shadows for product listings

---

## Page-by-Page Layout

### Home (`/`)
1. **Hero** — Full-width, bold headline, subheadline, two CTAs: "Get a Quote" (primary) + "View Products" (secondary)
2. **Trust bar** — Founded 2021 · Sialkot, Pakistan · Low MOQs · OEM/ODM
3. **Product Categories** — Grid of category cards (Gym Wear, Leggings, Team Uniforms, Hurling Balls, Weightlifting Accessories)
4. **Why Gymhur** — 3-column: Low MOQ / Custom Branding / Fast Turnaround
5. **How It Works** — 4-step process: Request → Sample → Approve → Produce
6. **CTA Banner** — Full-width dark section with "Get a Quote" button
7. **Footer** — Logo, nav links, contact info, WhatsApp, social icons

### Products (`/products`, `/products/[category]`, `/products/[category]/[slug]`)
- Category listing → category page → individual product
- Product: image placeholder, name, description, MOQ, "Request a Quote" button

### About (`/about`)
- Company story, founding year (2021), location (Sialkot, Pakistan), differentiators

### Contact (`/contact`)
- Form fields: Name, Email, Phone, Company, Product Interest (dropdown), Message
- On submit → Resend API → email to owner's inbox
- WhatsApp link as alternative contact method
- Address + phone displayed

---

## CMS Content Model (Sanity)

| Schema Type | Editable Fields |
|---|---|
| `productCategory` | name, slug, image, description |
| `product` | name, slug, category (ref), images, description, moq, tags |
| `siteSettings` | companyName, phone, email, whatsappNumber, socialLinks |
| `homePage` | heroHeadline, heroSubheadline, heroCtaText, whyPoints[] |
| `aboutPage` | story, teamInfo |
| `blogPost` | title, slug, body (block content), image, publishedAt |

---

## Constraints

- Existing gymhur.com WordPress site must not be touched
- New site deployed to a separate domain
- All services must use free tiers
- Content uses placeholders — owner fills in via Sanity Studio post-launch
- Blog page schema is CMS-ready but the page is not built in this phase
