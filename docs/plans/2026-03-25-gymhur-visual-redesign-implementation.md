# Gymhur Visual Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the generic AI aesthetic (Inter, purple, rounded cards) with a Stark Contrast design system: Barlow Condensed + DM Serif Display + Outfit fonts, slate teal-green `#263C40` accent, sharp edges, black navbar, left-aligned hero.

**Architecture:** All changes are purely visual — CSS tokens, Tailwind config, and component className updates. No logic, routing, or API changes. Start with the design tokens (globals.css + tailwind.config.ts) first so all subsequent component changes can reference the correct tokens.

**Tech Stack:** Next.js App Router, Tailwind CSS, Google Fonts

---

## Task 1: Replace fonts and base tokens in globals.css

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Open and read the current file**

Current content:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', sans-serif;
    color: #0F0F0F;
  }
}
```

**Step 2: Replace the entire file with**

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Serif+Display:ital@0;1&family=Outfit:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Outfit', sans-serif;
    color: #0D0D0D;
    background-color: #EDF2EF;
  }
}
```

**Step 3: Start the dev server and verify no console errors**

```bash
npm run dev
```

Visit `http://localhost:3000` — the page background should shift to the sage green-white `#EDF2EF`. Fonts will still look similar until Tailwind config is updated.

**Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "style: replace Inter with Barlow Condensed + DM Serif Display + Outfit"
```

---

## Task 2: Replace color tokens and font families in tailwind.config.ts

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Replace the theme.extend section**

Current:
```ts
theme: {
  extend: {
    colors: {
      brand: '#6528F7',
      'brand-dark': '#4F1FBF',
      surface: '#F8F8F8',
      'text-primary': '#0F0F0F',
      'text-secondary': '#6B7280',
      whatsapp: '#25D366',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    maxWidth: {
      content: '1200px',
    },
  },
},
```

Replace with:
```ts
theme: {
  extend: {
    colors: {
      brand: '#263C40',
      'brand-dark': '#1A2D30',
      bg: '#EDF2EF',
      surface: '#FFFFFF',
      'surface-dark': '#0D0D0D',
      'text-primary': '#0D0D0D',
      'text-secondary': '#5A5A54',
      border: '#D8D4CC',
      whatsapp: '#25D366',
    },
    fontFamily: {
      display: ['Barlow Condensed', 'sans-serif'],
      serif: ['DM Serif Display', 'serif'],
      sans: ['Outfit', 'sans-serif'],
    },
    maxWidth: {
      content: '1200px',
    },
  },
},
```

**Step 2: Verify build compiles**

```bash
npm run build
```

Expected: Build succeeds. Some components will have broken styles because they reference `bg-brand` which now maps to `#263C40` instead of purple — that's expected and intentional.

**Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "style: replace brand color tokens and font families in Tailwind config"
```

---

## Task 3: Redesign the Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

**Step 1: Replace the entire component**

```tsx
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-surface-dark">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-xl tracking-widest text-white uppercase">
          GYMHUR
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="bg-brand hover:bg-brand-dark text-white text-sm font-medium font-sans px-5 py-2.5 transition-colors"
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
```

**Step 2: Check in browser**

Visit `http://localhost:3000` — navbar should be solid black with wide-tracked `GYMHUR` wordmark on the left, muted white nav links, and a dark green CTA button with sharp edges.

**Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "style: redesign Navbar — black bg, sharp CTA, Barlow Condensed wordmark"
```

---

## Task 4: Redesign the Hero

**Files:**
- Modify: `src/components/home/Hero.tsx`

**Step 1: Replace the entire component**

```tsx
'use client';
import Link from 'next/link';
import posthog from 'posthog-js';

interface Props {
  headline: string;
  subheadline: string;
  ctaText: string;
}

export default function Hero({ headline, subheadline, ctaText }: Props) {
  return (
    <section className="bg-bg relative overflow-hidden">
      {/* Decorative diagonal rule */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{
            background: 'repeating-linear-gradient(-55deg, #263C40 0px, #263C40 1px, transparent 1px, transparent 40px)',
          }}
        />
      </div>

      <div className="max-w-content mx-auto px-6 py-28 md:py-40 relative">
        <div className="inline-flex items-center gap-2 border border-border text-text-secondary text-xs font-sans font-medium px-3 py-1.5 mb-8 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-brand inline-block" />
          OEM &amp; ODM Manufacturing
        </div>

        <h1 className="font-display font-extrabold text-text-primary uppercase leading-none tracking-tight mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
          {headline}
        </h1>

        <p className="font-serif italic text-text-secondary text-xl md:text-2xl max-w-xl mb-10 leading-relaxed">
          {subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/contact"
            onClick={() => posthog.capture('hero_cta_clicked', { cta_text: ctaText })}
            className="bg-brand hover:bg-brand-dark text-white font-sans font-medium px-8 py-4 transition-colors text-sm uppercase tracking-wide"
          >
            {ctaText}
          </Link>
          <Link
            href="/products"
            onClick={() => posthog.capture('hero_products_clicked')}
            className="border border-text-primary hover:bg-text-primary hover:text-white text-text-primary font-sans font-medium px-8 py-4 transition-colors text-sm uppercase tracking-wide"
          >
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Check in browser**

Hero should show: left-aligned text, large condensed uppercase headline, italic serif subheadline, sharp buttons, diagonal stripe pattern on the right side.

**Step 3: Commit**

```bash
git add src/components/home/Hero.tsx
git commit -m "style: redesign Hero — left-aligned, Barlow Condensed headline, diagonal rule bg"
```

---

## Task 5: Redesign the TrustBar

**Files:**
- Modify: `src/components/home/TrustBar.tsx`

**Step 1: Replace the entire component**

```tsx
const items = ['Founded 2021', 'Sialkot, Pakistan', 'Low MOQs', 'OEM / ODM Options', 'Custom Branding'];

export default function TrustBar() {
  return (
    <div className="bg-surface-dark py-4 overflow-hidden">
      <div className="max-w-content mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-xs font-sans font-medium text-white/60 uppercase tracking-widest">
            <span className="w-1 h-1 bg-brand inline-block" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Check in browser**

TrustBar should be a solid black band with small white/muted uppercase text.

**Step 3: Commit**

```bash
git add src/components/home/TrustBar.tsx
git commit -m "style: redesign TrustBar — black bg, uppercase tracking, sharp dots"
```

---

## Task 6: Redesign the CategoryGrid

**Files:**
- Modify: `src/components/home/CategoryGrid.tsx`

**Step 1: Replace the entire component**

```tsx
'use client';
import Link from 'next/link';
import posthog from 'posthog-js';

interface Category {
  name: string;
  slug: string;
  description?: string;
}

interface Props {
  categories: Category[];
}

const placeholderCategories: Category[] = [
  { name: 'Gym Wear', slug: 'gym-wear', description: 'Custom gym wear for brands and retailers' },
  { name: 'Leggings', slug: 'leggings', description: 'High-performance custom leggings' },
  { name: 'Team Uniforms', slug: 'team-uniforms', description: 'Bespoke team uniforms for clubs and organizations' },
  { name: 'Hurling Balls', slug: 'hurling-balls', description: 'Premium hurling balls manufactured to spec' },
  { name: 'Weightlifting Accessories', slug: 'weightlifting-accessories', description: 'Custom weightlifting belts and accessories' },
];

export default function CategoryGrid({ categories }: Props) {
  const items = categories.length > 0 ? categories : placeholderCategories;

  return (
    <section className="py-20 px-6 bg-bg">
      <div className="max-w-content mx-auto">
        <div className="mb-12">
          <h2 className="font-display font-extrabold text-text-primary uppercase text-5xl md:text-6xl leading-none tracking-tight mb-3">
            Our Products
          </h2>
          <p className="font-serif italic text-text-secondary text-lg">
            Full-service custom manufacturing for brands and retailers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {items.map(cat => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              onClick={() => posthog.capture('category_selected', { category_name: cat.name, category_slug: cat.slug })}
              className="group bg-surface p-8 hover:bg-brand transition-colors"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-display font-bold text-xs uppercase tracking-widest text-text-secondary group-hover:text-white/60 transition-colors">
                  Category
                </span>
                <span className="text-text-secondary group-hover:text-white transition-colors text-lg leading-none">→</span>
              </div>
              <h3 className="font-display font-bold text-2xl uppercase text-text-primary group-hover:text-white transition-colors mb-2 leading-tight">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="font-sans text-sm text-text-secondary group-hover:text-white/70 transition-colors leading-relaxed">
                  {cat.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Check in browser**

Cards should have: no individual borders (gap creates the grid lines), white background, hover fills solid dark green with white text. Section header left-aligned with condensed display type.

**Step 3: Commit**

```bash
git add src/components/home/CategoryGrid.tsx
git commit -m "style: redesign CategoryGrid — gap-grid borders, hover fill, display type"
```

---

## Task 7: Redesign WhyGymhur

**Files:**
- Modify: `src/components/home/WhyGymhur.tsx`

**Step 1: Replace the entire component**

```tsx
interface Point {
  title: string;
  description: string;
}

interface Props {
  points: Point[];
}

const defaultPoints: Point[] = [
  { title: 'Low Minimum Orders', description: 'Start small and scale. We work with brands at every stage.' },
  { title: 'Custom Branding', description: 'Your logo, your labels, your packaging. Full OEM/ODM support.' },
  { title: 'Fast Turnaround', description: 'Efficient production without compromising on quality.' },
];

export default function WhyGymhur({ points }: Props) {
  const items = points.length > 0 ? points : defaultPoints;

  return (
    <section className="py-20 px-6 bg-bg">
      <div className="max-w-content mx-auto">
        <div className="mb-12">
          <h2 className="font-display font-extrabold text-text-primary uppercase text-5xl md:text-6xl leading-none tracking-tight mb-3">
            Why Gymhur
          </h2>
          <p className="font-serif italic text-text-secondary text-lg">
            We make custom sportswear manufacturing straightforward for brands worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {items.map((point, i) => (
            <div key={i} className="bg-surface p-8">
              <div className="font-display font-extrabold text-7xl text-border leading-none mb-6 select-none">
                0{i + 1}
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-text-primary mb-3 leading-tight tracking-tight">
                {point.title}
              </h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Check in browser**

Cards show large faded number in top-left, no colored icon box. Gap-line border system consistent with CategoryGrid.

**Step 3: Commit**

```bash
git add src/components/home/WhyGymhur.tsx
git commit -m "style: redesign WhyGymhur — large number treatment, gap-grid, display type"
```

---

## Task 8: Redesign HowItWorks

**Files:**
- Modify: `src/components/home/HowItWorks.tsx`

**Step 1: Replace the entire component**

```tsx
const steps = [
  { step: '01', title: 'Request a Quote', description: 'Fill out our form or message us on WhatsApp with your requirements.' },
  { step: '02', title: 'Receive a Sample', description: 'We produce a sample for your approval before full production.' },
  { step: '03', title: 'Approve & Confirm', description: 'Review the sample, request any changes, then confirm your order.' },
  { step: '04', title: 'Production & Delivery', description: 'We produce your order and ship directly to your door.' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-surface-dark">
      <div className="max-w-content mx-auto">
        <div className="mb-12">
          <h2 className="font-display font-extrabold text-white uppercase text-5xl md:text-6xl leading-none tracking-tight mb-3">
            How It Works
          </h2>
          <p className="font-serif italic text-white/50 text-lg">
            From first contact to delivery — a simple, transparent process.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {steps.map(s => (
            <div key={s.step} className="bg-surface-dark p-8">
              <div className="font-display font-extrabold text-7xl text-white/10 leading-none mb-6 select-none">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-xl uppercase text-white mb-3 leading-tight tracking-tight">
                {s.title}
              </h3>
              <p className="font-sans text-sm text-white/50 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Check in browser**

Section is now full black background, white condensed type, consistent number treatment with WhyGymhur. Alternates with the light sections above and below for strong visual rhythm.

**Step 3: Commit**

```bash
git add src/components/home/HowItWorks.tsx
git commit -m "style: redesign HowItWorks — dark bg, number treatment, display type"
```

---

## Task 9: Redesign CtaBanner

**Files:**
- Modify: `src/components/home/CtaBanner.tsx`

**Step 1: Replace the entire component**

```tsx
'use client';
import Link from 'next/link';
import posthog from 'posthog-js';

export default function CtaBanner() {
  return (
    <section className="bg-brand px-6 py-24">
      <div className="max-w-content mx-auto">
        <h2
          className="font-display font-extrabold text-white uppercase leading-none tracking-tight mb-8"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Ready to Start Your Order?
        </h2>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <Link
            href="/contact"
            onClick={() => posthog.capture('cta_banner_clicked')}
            className="inline-block bg-white hover:bg-bg text-brand font-sans font-medium px-10 py-4 transition-colors text-sm uppercase tracking-wide"
          >
            Get a Quote
          </Link>
          <p className="font-serif italic text-white/70 text-lg self-center">
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Check in browser**

CTA banner is now a solid dark green fill (not black), with a white button. Very bold and unexpected — the green accent doing full-bleed work.

**Step 3: Commit**

```bash
git add src/components/home/CtaBanner.tsx
git commit -m "style: redesign CtaBanner — full-bleed brand green, white button, display type"
```

---

## Task 10: Redesign Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Replace the entire component**

```tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="font-display font-bold text-2xl uppercase tracking-widest mb-4">GYMHUR</div>
          <p className="font-sans text-sm text-white/40 leading-relaxed">
            Premier custom sportswear and activewear manufacturer. Low MOQs. OEM/ODM solutions.
          </p>
        </div>
        <div>
          <div className="font-sans font-medium text-xs uppercase tracking-widest text-white/40 mb-4">Quick Links</div>
          <ul className="space-y-2">
            {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/contact', 'Get a Quote']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="font-sans text-sm text-white/60 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-sans font-medium text-xs uppercase tracking-widest text-white/40 mb-4">Contact</div>
          <ul className="space-y-2 font-sans text-sm text-white/60">
            <li>137-C Small Industrial Estate</li>
            <li>Shahabpura, Sialkot, Pakistan</li>
            <li>
              <a href="tel:+923001496487" className="hover:text-white transition-colors">
                +92-300-1496487
              </a>
            </li>
            <li>
              <a href="mailto:info@gymhur.com" className="hover:text-white transition-colors">
                info@gymhur.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center py-6 font-sans text-xs text-white/30 uppercase tracking-widest">
        © {new Date().getFullYear()} Gymhur. All rights reserved.
      </div>
    </footer>
  );
}
```

**Step 2: Check in browser**

Footer: black bg, wide-tracked GYMHUR wordmark, muted links, consistent type hierarchy.

**Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "style: redesign Footer — black bg, display wordmark, muted link hierarchy"
```

---

## Task 11: Redesign WhatsAppButton

**Files:**
- Modify: `src/components/layout/WhatsAppButton.tsx`

**Step 1: Replace className on the `<a>` tag only**

Change:
```tsx
className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:scale-110 transition-transform text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
```

To:
```tsx
className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:opacity-90 transition-opacity text-white w-14 h-14 flex items-center justify-center"
```

(Removes `rounded-full`, `shadow-lg`, and `hover:scale-110` — keeps it square and consistent with the no-rounded-corners system.)

**Step 2: Check in browser**

WhatsApp button should be a flat square, no shadow, no scale animation on hover.

**Step 3: Commit**

```bash
git add src/components/layout/WhatsAppButton.tsx
git commit -m "style: make WhatsApp button square — remove rounded-full and shadow"
```

---

## Task 12: Redesign ProductCard

**Files:**
- Modify: `src/components/products/ProductCard.tsx`

**Step 1: Replace the entire component**

```tsx
'use client';
import Link from 'next/link';
import posthog from 'posthog-js';

interface Product {
  name: string;
  slug: string;
  categorySlug: string;
  description?: string;
  moq?: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-surface border border-border hover:border-brand transition-colors overflow-hidden">
      <div className="bg-bg aspect-square w-full" />
      <div className="p-6">
        <h3 className="font-display font-bold text-xl uppercase text-text-primary mb-2 leading-tight tracking-tight">
          {product.name}
        </h3>
        {product.description && (
          <p className="font-sans text-sm text-text-secondary mb-3 leading-relaxed">{product.description}</p>
        )}
        {product.moq && (
          <p className="font-sans text-xs text-brand font-medium mb-4 uppercase tracking-wide">
            MOQ: {product.moq}
          </p>
        )}
        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          onClick={() => posthog.capture('product_quote_requested', { product_name: product.name, category_slug: product.categorySlug })}
          className="block text-center bg-brand hover:bg-brand-dark text-white font-sans font-medium text-sm px-4 py-2.5 transition-colors uppercase tracking-wide"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Check in browser on `/products`**

Cards should be sharp-cornered white boxes with a thin border that turns dark green on hover. No shadow. Condensed uppercase product name.

**Step 3: Commit**

```bash
git add src/components/products/ProductCard.tsx
git commit -m "style: redesign ProductCard — sharp corners, border hover, display type"
```

---

## Task 13: Redesign ContactForm

**Files:**
- Modify: `src/components/contact/ContactForm.tsx`

**Step 1: Update the inputClass, labelClass, submit button, and success state**

Replace lines 55-108 with:

```tsx
  if (status === 'success') {
    return (
      <div className="border border-brand p-8">
        <div className="font-display font-bold text-2xl uppercase text-brand mb-2 tracking-tight">
          Message Sent
        </div>
        <p className="font-sans text-text-secondary text-sm">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  const inputClass = "w-full border border-border bg-surface px-4 py-3 font-sans text-sm text-text-primary focus:outline-none focus:border-brand transition-colors";
  const labelClass = "block font-sans text-xs font-medium text-text-primary mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Name *</label>
          <input id="name" name="name" required value={form.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email *</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} placeholder="you@company.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+1 234 567 890" />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input id="company" name="company" value={form.company} onChange={handleChange} className={inputClass} placeholder="Your company" />
        </div>
      </div>
      <div>
        <label htmlFor="product" className={labelClass}>Product Interest</label>
        <select id="product" name="product" value={form.product} onChange={handleChange} className={inputClass}>
          <option value="">Select a category...</option>
          {productOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>Message *</label>
        <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} className={inputClass} placeholder="Tell us about your requirements..." />
      </div>
      {status === 'error' && (
        <p className="font-sans text-red-600 text-sm">Something went wrong. Please try again or contact us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-sans font-medium py-4 transition-colors uppercase tracking-wide text-sm"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
```

**Step 2: Check in browser on `/contact`**

Form inputs: sharp borders, sage background, focus shifts border to dark green. No rounded corners. Labels in small uppercase. Submit button matches global button style.

**Step 3: Commit**

```bash
git add src/components/contact/ContactForm.tsx
git commit -m "style: redesign ContactForm — sharp inputs, uppercase labels, brand focus border"
```

---

## Task 14: Final pass — run build and fix any issues

**Step 1: Run build**

```bash
npm run build
```

**Step 2: If build fails, identify the error**

Common issues:
- If `font-display` is not resolved → check that `tailwind.config.ts` has `fontFamily.display` set correctly
- If `bg-bg` or `text-border` etc. are not recognized → verify the `colors` object in `tailwind.config.ts`
- If there are TypeScript errors → they will be unrelated to this task (pre-existing)

**Step 3: Run tests**

```bash
npm test
```

Tests should all pass — no logic was changed.

**Step 4: Final commit if any fixups were needed**

```bash
git add -A
git commit -m "style: fixup — resolve any build issues from visual redesign"
```

**Step 5: Final visual check**

Visit each page and verify:
- `/` — Black navbar, sage bg hero, left-aligned text, black trust bar, gap-grid category cards, consistent sections
- `/products` — Sharp cards, border hover to dark green
- `/contact` — Sharp form inputs, no rounded corners
- WhatsApp button is square
- Footer is black with muted type hierarchy
