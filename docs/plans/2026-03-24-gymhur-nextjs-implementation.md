# Gymhur Next.js Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a clean, modern B2B Next.js website for Gymhur (custom sportswear manufacturer) with Sanity CMS, Vercel hosting, and Resend for contact form emails — all on free tiers.

**Architecture:** Next.js App Router with static generation for performance. Sanity is the headless CMS for all editable content. Contact form POSTs to a Next.js API route that calls Resend to deliver leads to the owner's inbox.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Sanity v3, next-sanity, Resend, TypeScript, React Testing Library, Jest

---

## Prerequisites (do these manually before starting)

1. Create a free Sanity account at sanity.io
2. Create a free Resend account at resend.com — grab your API key
3. Create a free Vercel account at vercel.com (deploy at the end)
4. Have Node.js 18+ installed (`node -v` to check)

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs` (auto-generated)

**Step 1: Run the Next.js scaffolder**

```bash
cd /Users/salmanmirza/Desktop/Gymhur
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

When prompted, accept all defaults.

**Step 2: Verify it works**

```bash
npm run dev
```

Open `http://localhost:3000` — you should see the default Next.js page.

**Step 3: Clear boilerplate**

Delete the contents of `src/app/page.tsx` and replace with:

```tsx
export default function Home() {
  return <main><h1>Gymhur</h1></main>;
}
```

Delete `src/app/globals.css` content except the Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with Tailwind and TypeScript"
```

---

## Task 2: Install Dependencies

**Step 1: Install all required packages**

```bash
npm install next-sanity @sanity/image-url resend
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom ts-jest
```

**Step 2: Configure Jest**

Create `jest.config.ts`:

```ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
```

Create `jest.setup.ts`:

```ts
import '@testing-library/jest-dom';
```

**Step 3: Add test script to `package.json`**

In `package.json`, add to `"scripts"`:
```json
"test": "jest",
"test:watch": "jest --watch"
```

**Step 4: Verify Jest works**

Create `src/__tests__/smoke.test.ts`:

```ts
test('true is true', () => {
  expect(true).toBe(true);
});
```

Run: `npm test`
Expected: PASS

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add Sanity, Resend, and Jest testing setup"
```

---

## Task 3: Tailwind Design Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Step 1: Write failing test**

Create `src/__tests__/design-tokens.test.ts`:

```ts
import tailwindConfig from '../../tailwind.config';

test('brand color is defined', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, unknown>;
  expect(colors['brand']).toBeDefined();
});

test('brand-dark color is defined', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, unknown>;
  expect(colors['brand-dark']).toBeDefined();
});
```

Run: `npm test design-tokens`
Expected: FAIL

**Step 2: Update Tailwind config**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
  plugins: [],
};

export default config;
```

**Step 3: Update globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

@layer base {
  html {
    font-family: 'Inter', sans-serif;
    color: #0F0F0F;
  }
}
```

**Step 4: Run tests**

Run: `npm test design-tokens`
Expected: PASS

**Step 5: Commit**

```bash
git add .
git commit -m "feat: configure Tailwind design tokens for Gymhur brand"
```

---

## Task 4: Sanity CMS Setup

**Files:**
- Create: `sanity.config.ts`
- Create: `src/lib/sanity/client.ts`
- Create: `src/lib/sanity/schemas/productCategory.ts`
- Create: `src/lib/sanity/schemas/product.ts`
- Create: `src/lib/sanity/schemas/siteSettings.ts`
- Create: `src/lib/sanity/schemas/homePage.ts`
- Create: `src/lib/sanity/schemas/aboutPage.ts`
- Create: `src/lib/sanity/index.ts`
- Create: `.env.local`

**Step 1: Create a Sanity project**

```bash
npx sanity@latest init --env .env.local
```

When prompted:
- Create new project → name it "Gymhur"
- Use default dataset: `production`
- Project output path: `./sanity` (or accept default)

This writes `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`.

**Step 2: Add `.env.local` to `.gitignore`**

Create/update `.gitignore` to include:
```
.env.local
.env*.local
```

**Step 3: Create Sanity client**

Create `src/lib/sanity/client.ts`:

```ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
});
```

**Step 4: Write failing test for client**

Create `src/__tests__/sanity-client.test.ts`:

```ts
import { client } from '../lib/sanity/client';

test('sanity client has projectId configured', () => {
  expect(client.config().projectId).toBeDefined();
});

test('sanity client has dataset configured', () => {
  expect(client.config().dataset).toBeDefined();
});
```

Run: `npm test sanity-client`
Expected: FAIL (env vars not set in test environment)

**Step 5: Create test env file**

Create `.env.test`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=test-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

Run: `npm test sanity-client`
Expected: PASS

**Step 6: Create schemas**

Create `src/lib/sanity/schemas/productCategory.ts`:

```ts
import { defineField, defineType } from 'sanity';

export const productCategory = defineType({
  name: 'productCategory',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
});
```

Create `src/lib/sanity/schemas/product.ts`:

```ts
import { defineField, defineType } from 'sanity';

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'productCategory' }] }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'moq', title: 'Minimum Order Quantity', type: 'string' }),
    defineField({ name: 'images', title: 'Images', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
  ],
});
```

Create `src/lib/sanity/schemas/siteSettings.ts`:

```ts
import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'companyName', title: 'Company Name', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'whatsappNumber', title: 'WhatsApp Number (with country code, no +)', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
  ],
});
```

Create `src/lib/sanity/schemas/homePage.ts`:

```ts
import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text' }),
    defineField({ name: 'heroCtaText', title: 'Hero CTA Button Text', type: 'string' }),
    defineField({
      name: 'whyPoints',
      title: 'Why Gymhur Points',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', title: 'Description' },
        ],
      }],
    }),
  ],
});
```

Create `src/lib/sanity/schemas/aboutPage.ts`:

```ts
import { defineField, defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'story', title: 'Our Story', type: 'text' }),
    defineField({ name: 'teamInfo', title: 'Team Info', type: 'text' }),
  ],
});
```

Create `src/lib/sanity/index.ts`:

```ts
export { client } from './client';
export { productCategory } from './schemas/productCategory';
export { product } from './schemas/product';
export { siteSettings } from './schemas/siteSettings';
export { homePage } from './schemas/homePage';
export { aboutPage } from './schemas/aboutPage';
```

**Step 7: Create Sanity config**

Create `sanity.config.ts` at project root:

```ts
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { productCategory, product, siteSettings, homePage, aboutPage } from './src/lib/sanity';

export default defineConfig({
  name: 'gymhur',
  title: 'Gymhur CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [productCategory, product, siteSettings, homePage, aboutPage],
  },
});
```

**Step 8: Add Sanity Studio route**

Create `src/app/studio/[[...tool]]/page.tsx`:

```tsx
'use client';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../sanity.config';

export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

**Step 9: Commit**

```bash
git add .
git commit -m "feat: set up Sanity CMS with schemas and Studio route"
```

---

## Task 5: Layout Components

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/WhatsAppButton.tsx`
- Create: `src/components/layout/Layout.tsx`
- Modify: `src/app/layout.tsx`
- Create: `src/__tests__/components/Navbar.test.tsx`
- Create: `src/__tests__/components/Footer.test.tsx`
- Create: `src/__tests__/components/WhatsAppButton.test.tsx`

**Step 1: Write failing tests**

Create `src/__tests__/components/Navbar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/layout/Navbar';

test('renders logo text', () => {
  render(<Navbar />);
  expect(screen.getByText(/gymhur/i)).toBeInTheDocument();
});

test('renders Get a Quote link', () => {
  render(<Navbar />);
  expect(screen.getByRole('link', { name: /get a quote/i })).toBeInTheDocument();
});

test('Get a Quote link points to /contact', () => {
  render(<Navbar />);
  expect(screen.getByRole('link', { name: /get a quote/i })).toHaveAttribute('href', '/contact');
});
```

Create `src/__tests__/components/WhatsAppButton.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import WhatsAppButton from '../../components/layout/WhatsAppButton';

test('renders WhatsApp link', () => {
  render(<WhatsAppButton phoneNumber="923001496487" />);
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/923001496487'));
});

test('opens in new tab', () => {
  render(<WhatsAppButton phoneNumber="923001496487" />);
  expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
});
```

Run: `npm test Navbar WhatsAppButton`
Expected: FAIL

**Step 2: Create Navbar**

Create `src/components/layout/Navbar.tsx`:

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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-text-primary tracking-tight">
          GYMHUR
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
```

**Step 3: Create Footer**

Create `src/components/layout/Footer.tsx`:

```tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white mt-24">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="text-xl font-bold mb-3">GYMHUR</div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premier custom sportswear and activewear manufacturer. Low MOQs. OEM/ODM solutions.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-gray-400">
            {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/contact', 'Get a Quote']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-gray-400">
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
      <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Gymhur. All rights reserved.
      </div>
    </footer>
  );
}
```

**Step 4: Create WhatsApp button**

Create `src/components/layout/WhatsAppButton.tsx`:

```tsx
interface Props {
  phoneNumber: string;
}

export default function WhatsAppButton({ phoneNumber }: Props) {
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:scale-110 transition-transform text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.127 1.528 5.868L.057 23.486a.5.5 0 0 0 .612.612l5.765-1.44A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.688-.504-5.222-1.385l-.374-.219-3.873.968.986-3.796-.241-.392A9.955 9.955 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </a>
  );
}
```

**Step 5: Update root layout**

Replace `src/app/layout.tsx`:

```tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Gymhur — Custom Sportswear Manufacturer',
  description: 'Premier custom sportswear and activewear manufacturer. Low MOQs. OEM/ODM solutions. Based in Sialkot, Pakistan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <WhatsAppButton phoneNumber="923001496487" />
        <Footer />
      </body>
    </html>
  );
}
```

**Step 6: Run tests**

```bash
npm test Navbar WhatsAppButton
```

Expected: PASS

**Step 7: Commit**

```bash
git add .
git commit -m "feat: add Navbar, Footer, and WhatsApp floating button layout components"
```

---

## Task 6: Home Page

**Files:**
- Create: `src/components/home/Hero.tsx`
- Create: `src/components/home/TrustBar.tsx`
- Create: `src/components/home/CategoryGrid.tsx`
- Create: `src/components/home/WhyGymhur.tsx`
- Create: `src/components/home/HowItWorks.tsx`
- Create: `src/components/home/CtaBanner.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/__tests__/components/Hero.test.tsx`

**Step 1: Write failing test**

Create `src/__tests__/components/Hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import Hero from '../../components/home/Hero';

test('renders headline', () => {
  render(<Hero headline="Custom Sportswear" subheadline="Built for your brand" ctaText="Get a Quote" />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Custom Sportswear');
});

test('renders CTA link to /contact', () => {
  render(<Hero headline="Custom Sportswear" subheadline="Built for your brand" ctaText="Get a Quote" />);
  expect(screen.getByRole('link', { name: /get a quote/i })).toHaveAttribute('href', '/contact');
});
```

Run: `npm test Hero`
Expected: FAIL

**Step 2: Create Hero component**

Create `src/components/home/Hero.tsx`:

```tsx
import Link from 'next/link';

interface Props {
  headline: string;
  subheadline: string;
  ctaText: string;
}

export default function Hero({ headline, subheadline, ctaText }: Props) {
  return (
    <section className="bg-surface">
      <div className="max-w-content mx-auto px-6 py-28 md:py-40 text-center">
        <div className="inline-block bg-brand/10 text-brand text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          OEM &amp; ODM Manufacturing
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-text-primary leading-tight mb-6 max-w-3xl mx-auto">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            {ctaText}
          </Link>
          <Link
            href="/products"
            className="border border-gray-300 hover:border-gray-400 text-text-primary font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create TrustBar**

Create `src/components/home/TrustBar.tsx`:

```tsx
const items = ['Founded 2021', 'Sialkot, Pakistan', 'Low MOQs', 'OEM / ODM Options', 'Custom Branding'];

export default function TrustBar() {
  return (
    <div className="border-y border-gray-100 bg-white py-4 overflow-hidden">
      <div className="max-w-content mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-text-secondary font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 4: Create CategoryGrid**

Create `src/components/home/CategoryGrid.tsx`:

```tsx
import Link from 'next/link';

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
    <section className="py-20 px-6">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">Our Products</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          Full-service custom manufacturing for brands and retailers worldwide.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(cat => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              className="group bg-surface rounded-xl p-8 border border-gray-100 hover:border-brand/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-brand/10 mb-5" />
              <h3 className="font-semibold text-lg text-text-primary mb-2 group-hover:text-brand transition-colors">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-sm text-text-secondary leading-relaxed">{cat.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 5: Create WhyGymhur**

Create `src/components/home/WhyGymhur.tsx`:

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
    <section className="py-20 px-6 bg-surface">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">Why Gymhur</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          We make custom sportswear manufacturing straightforward for brands worldwide.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((point, i) => (
            <div key={i} className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="w-10 h-10 rounded-lg bg-brand text-white flex items-center justify-center font-bold mb-5">
                {i + 1}
              </div>
              <h3 className="font-semibold text-lg text-text-primary mb-2">{point.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 6: Create HowItWorks**

Create `src/components/home/HowItWorks.tsx`:

```tsx
const steps = [
  { step: '01', title: 'Request a Quote', description: 'Fill out our form or message us on WhatsApp with your requirements.' },
  { step: '02', title: 'Receive a Sample', description: 'We produce a sample for your approval before full production.' },
  { step: '03', title: 'Approve & Confirm', description: 'Review the sample, request any changes, then confirm your order.' },
  { step: '04', title: 'Production & Delivery', description: 'We produce your order and ship directly to your door.' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">How It Works</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          From first contact to delivery — a simple, transparent process.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s => (
            <div key={s.step} className="text-center">
              <div className="text-4xl font-extrabold text-brand/20 mb-3">{s.step}</div>
              <h3 className="font-semibold text-text-primary mb-2">{s.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 7: Create CtaBanner**

Create `src/components/home/CtaBanner.tsx`:

```tsx
import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="bg-text-primary py-20 px-6 my-20">
      <div className="max-w-content mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Order?
        </h2>
        <p className="text-gray-400 mb-8 text-lg max-w-xl mx-auto">
          Tell us what you need. We&apos;ll get back to you within 24 hours.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-10 py-4 rounded-lg transition-colors text-base"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
```

**Step 8: Assemble Home page**

Replace `src/app/page.tsx`:

```tsx
import { client } from '@/lib/sanity/client';
import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import CategoryGrid from '@/components/home/CategoryGrid';
import WhyGymhur from '@/components/home/WhyGymhur';
import HowItWorks from '@/components/home/HowItWorks';
import CtaBanner from '@/components/home/CtaBanner';

async function getHomeData() {
  const [homePage, categories] = await Promise.all([
    client.fetch(`*[_type == "homePage"][0]`).catch(() => null),
    client.fetch(`*[_type == "productCategory"] | order(_createdAt asc)`).catch(() => []),
  ]);
  return { homePage, categories };
}

export default async function Home() {
  const { homePage, categories } = await getHomeData();

  return (
    <main>
      <Hero
        headline={homePage?.heroHeadline ?? 'Custom Sportswear, Built for Your Brand'}
        subheadline={homePage?.heroSubheadline ?? 'Complete custom manufacturing for brands and retailers. Low MOQs. OEM & ODM solutions from Sialkot, Pakistan.'}
        ctaText={homePage?.heroCtaText ?? 'Get a Quote'}
      />
      <TrustBar />
      <CategoryGrid categories={categories ?? []} />
      <WhyGymhur points={homePage?.whyPoints ?? []} />
      <HowItWorks />
      <CtaBanner />
    </main>
  );
}
```

**Step 9: Run tests and dev server**

```bash
npm test Hero
npm run dev
```

Visit `http://localhost:3000` — home page should render fully.

**Step 10: Commit**

```bash
git add .
git commit -m "feat: build Home page with Hero, TrustBar, CategoryGrid, WhyGymhur, HowItWorks, and CtaBanner"
```

---

## Task 7: Products Pages

**Files:**
- Create: `src/app/products/page.tsx`
- Create: `src/app/products/[category]/page.tsx`
- Create: `src/app/products/[category]/[slug]/page.tsx`
- Create: `src/components/products/ProductCard.tsx`
- Create: `src/__tests__/components/ProductCard.test.tsx`

**Step 1: Write failing test**

Create `src/__tests__/components/ProductCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import ProductCard from '../../components/products/ProductCard';

const mockProduct = {
  name: 'Custom Leggings',
  slug: 'custom-leggings',
  categorySlug: 'leggings',
  description: 'High-performance leggings',
  moq: '50 pieces',
};

test('renders product name', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText('Custom Leggings')).toBeInTheDocument();
});

test('renders MOQ', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText(/50 pieces/i)).toBeInTheDocument();
});

test('renders quote request link', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByRole('link', { name: /request a quote/i })).toBeInTheDocument();
});
```

Run: `npm test ProductCard`
Expected: FAIL

**Step 2: Create ProductCard**

Create `src/components/products/ProductCard.tsx`:

```tsx
import Link from 'next/link';

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
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
      <div className="bg-surface aspect-square w-full" />
      <div className="p-6">
        <h3 className="font-semibold text-text-primary text-lg mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-text-secondary mb-3 leading-relaxed">{product.description}</p>
        )}
        {product.moq && (
          <p className="text-xs text-brand font-semibold mb-4">MOQ: {product.moq}</p>
        )}
        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          className="block text-center bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
```

**Step 3: Create Products index page**

Create `src/app/products/page.tsx`:

```tsx
import Link from 'next/link';
import { client } from '@/lib/sanity/client';

const placeholderCategories = [
  { name: 'Gym Wear', slug: { current: 'gym-wear' }, description: 'Custom gym wear' },
  { name: 'Leggings', slug: { current: 'leggings' }, description: 'High-performance leggings' },
  { name: 'Team Uniforms', slug: { current: 'team-uniforms' }, description: 'Bespoke team uniforms' },
  { name: 'Hurling Balls', slug: { current: 'hurling-balls' }, description: 'Premium hurling balls' },
  { name: 'Weightlifting Accessories', slug: { current: 'weightlifting-accessories' }, description: 'Custom accessories' },
];

export default async function ProductsPage() {
  const categories = await client
    .fetch(`*[_type == "productCategory"] | order(_createdAt asc)`)
    .catch(() => []);

  const items = categories.length > 0 ? categories : placeholderCategories;

  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4">Products</h1>
      <p className="text-text-secondary mb-12 max-w-xl">
        Browse our product categories. All items are fully customizable with your branding.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((cat: { name: string; slug: { current: string }; description?: string }) => (
          <Link
            key={cat.slug.current}
            href={`/products/${cat.slug.current}`}
            className="group bg-surface rounded-xl p-8 border border-gray-100 hover:border-brand/30 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-brand/10 mb-5" />
            <h2 className="font-semibold text-lg text-text-primary mb-2 group-hover:text-brand transition-colors">
              {cat.name}
            </h2>
            {cat.description && (
              <p className="text-sm text-text-secondary leading-relaxed">{cat.description}</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
```

**Step 4: Create Category page**

Create `src/app/products/[category]/page.tsx`:

```tsx
import { client } from '@/lib/sanity/client';
import ProductCard from '@/components/products/ProductCard';

interface PageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: PageProps) {
  const [category, products] = await Promise.all([
    client.fetch(
      `*[_type == "productCategory" && slug.current == $slug][0]`,
      { slug: params.category }
    ).catch(() => null),
    client.fetch(
      `*[_type == "product" && category->slug.current == $slug] | order(_createdAt asc)`,
      { slug: params.category }
    ).catch(() => []),
  ]);

  const categoryName = category?.name ?? params.category.replace(/-/g, ' ');

  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4 capitalize">{categoryName}</h1>
      <p className="text-text-secondary mb-12">
        {category?.description ?? 'Custom manufacturing available for all products in this category.'}
      </p>
      {products.length === 0 ? (
        <div className="text-center py-20 text-text-secondary">
          <p className="text-lg mb-2">Products coming soon.</p>
          <p>In the meantime, <a href="/contact" className="text-brand hover:underline">contact us</a> with your requirements.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: { name: string; slug: { current: string }; description?: string; moq?: string }) => (
            <ProductCard
              key={product.slug.current}
              product={{
                name: product.name,
                slug: product.slug.current,
                categorySlug: params.category,
                description: product.description,
                moq: product.moq,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
```

**Step 5: Create Product detail page**

Create `src/app/products/[category]/[slug]/page.tsx`:

```tsx
import Link from 'next/link';
import { client } from '@/lib/sanity/client';

interface PageProps {
  params: { category: string; slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug: params.slug }
  ).catch(() => null);

  if (!product) {
    return (
      <main className="max-w-content mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-brand hover:underline">Back to Products</Link>
      </main>
    );
  }

  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <Link href={`/products/${params.category}`} className="text-sm text-text-secondary hover:text-brand mb-8 inline-block">
        ← Back to category
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="bg-surface rounded-xl aspect-square" />
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">{product.name}</h1>
          {product.description && (
            <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>
          )}
          {product.moq && (
            <p className="text-sm font-semibold text-brand mb-8">Minimum Order: {product.moq}</p>
          )}
          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
```

**Step 6: Run tests**

```bash
npm test ProductCard
npm run dev
```

Visit `http://localhost:3000/products` — should render category grid.

**Step 7: Commit**

```bash
git add .
git commit -m "feat: add Products pages — category list, category detail, and product detail"
```

---

## Task 8: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Create About page**

Create `src/app/about/page.tsx`:

```tsx
import { client } from '@/lib/sanity/client';
import Link from 'next/link';

export default async function AboutPage() {
  const about = await client.fetch(`*[_type == "aboutPage"][0]`).catch(() => null);

  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-text-primary mb-6">About Gymhur</h1>
        <p className="text-text-secondary leading-relaxed mb-6 text-lg">
          {about?.story ?? 'Founded in 2021 and based in Sialkot, Pakistan — one of the world\'s leading centres for sportswear manufacturing — Gymhur provides complete custom manufacturing services for brands and retailers globally.'}
        </p>
        <p className="text-text-secondary leading-relaxed mb-10">
          {about?.teamInfo ?? 'We specialize in gym wear, leggings, team uniforms, hurling balls, and weightlifting accessories. With low minimum order quantities and full OEM/ODM capabilities, we make it easy for brands at every stage to create high-quality custom sportswear.'}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Founded', value: '2021' },
            { label: 'Location', value: 'Sialkot, PK' },
            { label: 'Specialty', value: 'OEM/ODM' },
            { label: 'MOQ', value: 'Low' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-brand mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
        <Link
          href="/contact"
          className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </main>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add About page"
```

---

## Task 9: Contact Page + Email API Route

**Files:**
- Create: `src/app/contact/page.tsx`
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/app/api/contact/route.ts`
- Create: `src/__tests__/api/contact.test.ts`
- Modify: `.env.local` (add Resend key)

**Step 1: Add Resend API key to `.env.local`**

Add to `.env.local`:
```
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=info@gymhur.com
```

Add to `.env.test`:
```
RESEND_API_KEY=test_api_key
CONTACT_EMAIL=test@example.com
```

**Step 2: Write failing test for API route**

Create `src/__tests__/api/contact.test.ts`:

```ts
import { POST } from '../../app/api/contact/route';

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ id: 'test-id' }),
    },
  })),
}));

test('returns 400 if required fields missing', async () => {
  const req = new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name: 'John' }),
    headers: { 'Content-Type': 'application/json' },
  });
  const res = await POST(req);
  expect(res.status).toBe(400);
});

test('returns 200 on valid submission', async () => {
  const req = new Request('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify({
      name: 'John',
      email: 'john@example.com',
      message: 'I want custom leggings',
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  const res = await POST(req);
  expect(res.status).toBe(200);
});
```

Run: `npm test contact`
Expected: FAIL

**Step 3: Create API route**

Create `src/app/api/contact/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, message, phone, company, product } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'Gymhur Contact Form <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${product ? `<p><strong>Product Interest:</strong> ${product}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
```

**Step 4: Run tests**

```bash
npm test contact
```

Expected: PASS

**Step 5: Create ContactForm component**

Create `src/components/contact/ContactForm.tsx`:

```tsx
'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const productOptions = [
  'Gym Wear', 'Leggings', 'Team Uniforms', 'Hurling Balls', 'Weightlifting Accessories', 'Other',
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product: searchParams.get('product') ?? '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-2xl font-bold text-green-800 mb-2">Message Sent!</div>
        <p className="text-green-700">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors";
  const labelClass = "block text-sm font-medium text-text-primary mb-1.5";

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
        <p className="text-red-600 text-sm">Something went wrong. Please try again or contact us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold py-4 rounded-lg transition-colors"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

**Step 6: Create Contact page**

Create `src/app/contact/page.tsx`:

```tsx
import { Suspense } from 'react';
import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact & Get a Quote — Gymhur',
  description: 'Request a custom sportswear quote. We respond within 24 hours.',
};

export default function ContactPage() {
  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold text-text-primary mb-4">Get a Quote</h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Fill out the form and we&apos;ll get back to you within 24 hours. Prefer a faster response? Message us on WhatsApp.
          </p>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold text-text-primary mb-1">Address</div>
              <div className="text-text-secondary text-sm">137-C Small Industrial Estate<br />Shahabpura, Sialkot, Pakistan 51310</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary mb-1">Phone</div>
              <a href="tel:+923001496487" className="text-brand hover:underline text-sm">+92-300-1496487</a>
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary mb-1">Email</div>
              <a href="mailto:info@gymhur.com" className="text-brand hover:underline text-sm">info@gymhur.com</a>
            </div>
            <div>
              <div className="text-sm font-semibold text-text-primary mb-1">WhatsApp</div>
              <a href="https://wa.me/923001496487" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline text-sm">
                Message us on WhatsApp →
              </a>
            </div>
          </div>
        </div>
        <div>
          <Suspense fallback={<div>Loading form...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
```

**Step 7: Verify dev server**

```bash
npm run dev
```

Visit `http://localhost:3000/contact` — form should render. Test submission (requires real Resend key in `.env.local`).

**Step 8: Commit**

```bash
git add .
git commit -m "feat: add Contact page with form, API route, and Resend email delivery"
```

---

## Task 10: Deploy to Vercel

**Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/YOUR_USERNAME/gymhur-nextjs.git
git branch -M main
git push -u origin main
```

(Create the repo on github.com first — keep it private.)

**Step 2: Import to Vercel**

1. Go to vercel.com → New Project → Import your GitHub repo
2. Vercel auto-detects Next.js — click Deploy with defaults

**Step 3: Add environment variables in Vercel**

In Vercel project → Settings → Environment Variables, add:
```
NEXT_PUBLIC_SANITY_PROJECT_ID  = (from .env.local)
NEXT_PUBLIC_SANITY_DATASET     = production
RESEND_API_KEY                 = (your Resend API key)
CONTACT_EMAIL                  = info@gymhur.com
```

**Step 4: Add your Vercel domain to Sanity CORS**

1. Go to sanity.io/manage → your project → API → CORS Origins
2. Add your Vercel deployment URL (e.g. `https://gymhur-nextjs.vercel.app`)

**Step 5: Redeploy**

In Vercel dashboard → Deployments → click Redeploy.

**Step 6: Verify**

Visit your Vercel URL — all pages should work, contact form should deliver emails.

---

## Task 11: Seed Placeholder Content in Sanity Studio

**Step 1: Open Sanity Studio**

Visit `https://your-vercel-url.vercel.app/studio` (or `http://localhost:3000/studio` locally).

**Step 2: Create Site Settings document**

- Company Name: Gymhur
- Phone: +92-300-1496487
- Email: info@gymhur.com
- WhatsApp Number: 923001496487
- Address: 137-C Small Industrial Estate, Shahabpura, Sialkot, Pakistan 51310

**Step 3: Create Home Page document**

- Hero Headline: "Custom Sportswear, Built for Your Brand"
- Hero Subheadline: "Complete custom manufacturing for brands and retailers. Low MOQs. OEM & ODM solutions from Sialkot, Pakistan."
- Hero CTA Text: "Get a Quote"
- Why Points: Add 3 points (Low MOQ, Custom Branding, Fast Turnaround)

**Step 4: Create Product Categories**

Create one document per category:
- Gym Wear
- Leggings
- Team Uniforms
- Hurling Balls
- Weightlifting Accessories

**Step 5: Verify**

Reload `https://your-vercel-url.vercel.app` — content from Sanity should now appear on the home page.

---

## Done

The site is live on Vercel, content is editable via Sanity Studio at `/studio`, contact form delivers leads to your inbox, and the original gymhur.com WordPress site is completely untouched.
