# Brand Colors & Logo Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace steel teal brand colors with official Midnight Blue palette, self-host Config Condensed as the site font, and integrate the GYMHUR SVG logo as inline React components in the Navbar and Footer.

**Architecture:** Update Tailwind color tokens and font family, register Config Condensed via @font-face, create two SVG React components (GymhurLogo, GymhurIcon) with variant props, then wire them into Navbar (dark bg) and Footer.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS, TypeScript, React, @testing-library/react

---

### Task 1: Copy Font Files

**Files:**
- Create: `src/app/fonts/config-condensed/` (directory with .otf files)

**Step 1: Copy the required weights**

Run from project root:
```bash
mkdir -p src/app/fonts/config-condensed
cp "Design Files/config-condensed/ConfigCondensedRegular.otf" src/app/fonts/config-condensed/
cp "Design Files/config-condensed/ConfigCondensedMedium.otf" src/app/fonts/config-condensed/
cp "Design Files/config-condensed/ConfigCondensedSemiBold.otf" src/app/fonts/config-condensed/
cp "Design Files/config-condensed/ConfigCondensedBold.otf" src/app/fonts/config-condensed/
cp "Design Files/config-condensed/ConfigCondensedExtraBold.otf" src/app/fonts/config-condensed/
```

**Step 2: Verify**

Run: `ls src/app/fonts/config-condensed/`
Expected: 5 .otf files listed

**Step 3: Commit**

```bash
git add src/app/fonts/config-condensed/
git commit -m "chore: add Config Condensed font files"
```

---

### Task 2: Update globals.css — Font Registration

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Write failing test**

In `src/__tests__/design-tokens.test.ts`, add:
```typescript
test('Config Condensed font faces are declared in globals.css', () => {
  const fs = require('fs');
  const css = fs.readFileSync('src/app/globals.css', 'utf8');
  expect(css).toContain("font-family: 'Config Condensed'");
  expect(css).toContain('ConfigCondensedRegular.otf');
  expect(css).toContain('ConfigCondensedBold.otf');
});
```

**Step 2: Run test to verify it fails**

Run: `npx jest src/__tests__/design-tokens.test.ts -t "Config Condensed" --no-coverage`
Expected: FAIL — "expect(received).toContain()"

**Step 3: Replace `src/app/globals.css` with**

```css
@font-face {
  font-family: 'Config Condensed';
  src: url('/fonts/config-condensed/ConfigCondensedRegular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Config Condensed';
  src: url('/fonts/config-condensed/ConfigCondensedMedium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Config Condensed';
  src: url('/fonts/config-condensed/ConfigCondensedSemiBold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Config Condensed';
  src: url('/fonts/config-condensed/ConfigCondensedBold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Config Condensed';
  src: url('/fonts/config-condensed/ConfigCondensedExtraBold.otf') format('opentype');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Config Condensed', sans-serif;
    color: #213541;
  }
}
```

> **Note:** Next.js serves files from `public/` at the root path. Font files need to be in `public/fonts/config-condensed/` — not `src/app/fonts/`. See Task 2a below.

**Step 4: Run test to verify it passes**

Run: `npx jest src/__tests__/design-tokens.test.ts -t "Config Condensed" --no-coverage`
Expected: PASS

**Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: register Config Condensed font via @font-face"
```

---

### Task 2a: Move Font Files to public/

**Files:**
- Create: `public/fonts/config-condensed/`

**Step 1: Move fonts to public directory**

```bash
mkdir -p public/fonts/config-condensed
cp src/app/fonts/config-condensed/*.otf public/fonts/config-condensed/
```

**Step 2: Verify**

Run: `ls public/fonts/config-condensed/`
Expected: 5 .otf files

**Step 3: Commit**

```bash
git add public/fonts/config-condensed/
git commit -m "chore: move Config Condensed fonts to public/ for static serving"
```

---

### Task 3: Update Tailwind Config — Colors + Font

**Files:**
- Modify: `tailwind.config.ts`

**Step 1: Update design token tests**

In `src/__tests__/design-tokens.test.ts`, update/add:
```typescript
test('brand color is official Midnight Blue', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  expect(colors['brand']).toBe('#213541');
});

test('brand-dark color is defined', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  expect(colors['brand-dark']).toBeDefined();
});

test('brand-light color is Light Steel Blue', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  expect(colors['brand-light']).toBe('#ACC0DA');
});

test('surface color is Tranquil', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  expect(colors['surface']).toBe('#E3F1EC');
});

test('font family is Config Condensed', () => {
  const fonts = tailwindConfig.theme?.extend?.fontFamily as Record<string, unknown>;
  expect(fonts['sans']).toContain('Config Condensed');
});
```

**Step 2: Run tests to verify they fail**

Run: `npx jest src/__tests__/design-tokens.test.ts --no-coverage`
Expected: several FAILs on color values and font

**Step 3: Replace `tailwind.config.ts` with**

```typescript
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
        brand: '#213541',
        'brand-dark': '#1a2c36',
        'brand-light': '#ACC0DA',
        surface: '#E3F1EC',
        'text-primary': '#213541',
        'text-secondary': '#6B7280',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Config Condensed', 'sans-serif'],
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

**Step 4: Run tests to verify they pass**

Run: `npx jest src/__tests__/design-tokens.test.ts --no-coverage`
Expected: all PASS

**Step 5: Commit**

```bash
git add tailwind.config.ts src/__tests__/design-tokens.test.ts
git commit -m "feat: update brand color tokens to official palette and set Config Condensed font"
```

---

### Task 4: Create GymhurIcon Component

**Files:**
- Create: `src/components/ui/GymhurIcon.tsx`

**Step 1: Write failing test**

Create `src/__tests__/components/GymhurIcon.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import GymhurIcon from '../../components/ui/GymhurIcon';

test('renders svg with aria-label', () => {
  render(<GymhurIcon variant="light" />);
  expect(screen.getByRole('img', { name: /gymhur/i })).toBeInTheDocument();
});

test('light variant renders white fill', () => {
  const { container } = render(<GymhurIcon variant="light" />);
  const svg = container.querySelector('svg');
  expect(svg?.getAttribute('data-variant')).toBe('light');
});

test('dark variant renders dark fill', () => {
  const { container } = render(<GymhurIcon variant="dark" />);
  const svg = container.querySelector('svg');
  expect(svg?.getAttribute('data-variant')).toBe('dark');
});
```

**Step 2: Run test to verify it fails**

Run: `npx jest src/__tests__/components/GymhurIcon.test.tsx --no-coverage`
Expected: FAIL — "Cannot find module"

**Step 3: Create `src/components/ui/GymhurIcon.tsx`**

```tsx
interface GymhurIconProps {
  variant?: 'light' | 'dark';
  className?: string;
  size?: number;
}

export default function GymhurIcon({
  variant = 'light',
  className,
  size = 40,
}: GymhurIconProps) {
  const fill = variant === 'light' ? '#FFFFFF' : '#213541';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="430 480 370 340"
      width={size}
      height={size}
      aria-label="Gymhur"
      role="img"
      data-variant={variant}
      className={className}
    >
      <path
        fill={fill}
        d="M590.3,591.9c0.8-18.3,13.6-33.6,31.1-37.3l21.7-5.4l35.7-65.2l21.4-39l-215.6,38.2l58.2,105.4
          l-78.7,143.7l99.3-24.1c13.6-3.3,22.8-15.5,23.3-29.5c0-0.1,0-0.2,0-0.3L590.3,591.9z"
      />
      <path
        fill={fill}
        d="M689.7,688.1c-0.8,18.3-13.6,33.6-31.1,37.3l-21.7,5.4l-35.7,65.2l-21.4,39l215.6-38.2l-58.2-105.4
          l78.7-143.7l-99.3,24.1c-13.6,3.3-22.8,15.5-23.3,29.5c0,0.1,0,0.2,0,0.3L689.7,688.1z"
      />
    </svg>
  );
}
```

> **Note on viewBox:** The paths are from the 1280x1280 canvas of `GYMHUR Logo Icon.svg`. The viewBox "430 480 370 340" crops to just the icon content. Adjust these values if the icon appears clipped or has too much whitespace after visual inspection.

**Step 4: Run tests to verify they pass**

Run: `npx jest src/__tests__/components/GymhurIcon.test.tsx --no-coverage`
Expected: all PASS

**Step 5: Commit**

```bash
git add src/components/ui/GymhurIcon.tsx src/__tests__/components/GymhurIcon.test.tsx
git commit -m "feat: add GymhurIcon SVG React component"
```

---

### Task 5: Create GymhurLogo Component

**Files:**
- Create: `src/components/ui/GymhurLogo.tsx`

**Step 1: Write failing test**

Create `src/__tests__/components/GymhurLogo.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import GymhurLogo from '../../components/ui/GymhurLogo';

test('renders svg with aria-label', () => {
  render(<GymhurLogo variant="light" />);
  expect(screen.getByRole('img', { name: /gymhur/i })).toBeInTheDocument();
});

test('light variant sets data-variant attribute', () => {
  const { container } = render(<GymhurLogo variant="light" />);
  expect(container.querySelector('svg')?.getAttribute('data-variant')).toBe('light');
});

test('dark variant sets data-variant attribute', () => {
  const { container } = render(<GymhurLogo variant="dark" />);
  expect(container.querySelector('svg')?.getAttribute('data-variant')).toBe('dark');
});
```

**Step 2: Run test to verify it fails**

Run: `npx jest src/__tests__/components/GymhurLogo.test.tsx --no-coverage`
Expected: FAIL — "Cannot find module"

**Step 3: Create `src/components/ui/GymhurLogo.tsx`**

The paths below come from `GYMHUR Logo 1.svg` (1280x1280 canvas). The viewBox crops to the content area containing the icon (left) and wordmark (right).

```tsx
interface GymhurLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  height?: number;
}

export default function GymhurLogo({
  variant = 'light',
  className,
  height = 32,
}: GymhurLogoProps) {
  const fill = variant === 'light' ? '#FFFFFF' : '#213541';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="228 555 825 175"
      height={height}
      aria-label="Gymhur"
      role="img"
      data-variant={variant}
      className={className}
    >
      {/* H-motif icon */}
      <path
        fill={fill}
        d="M303.2,614.1c0.4-9.8,7.3-18.1,16.7-20.1l11.7-2.9l19.2-35.1l11.5-21l-116.1,20.6l31.4,56.8l-42.4,77.4
          l53.5-13c7.3-1.8,12.3-8.3,12.5-15.9c0,0,0-0.1,0-0.1L303.2,614.1z"
      />
      <path
        fill={fill}
        d="M356.8,665.9c-0.4,9.8-7.3,18.1-16.7,20.1l-11.7,2.9L309.2,724l-11.5,21l116.1-20.6l-31.4-56.8l42.4-77.4
          l-53.5,13c-7.3,1.8-12.3,8.3-12.5,15.9c0,0,0,0.1,0,0.1L356.8,665.9z"
      />
      {/* G */}
      <path
        fill={fill}
        d="M548.6,618v-4.7c0-10-6.7-16.6-16.9-16.6c-10.4,0-17.1,6.4-17.1,16.6v54.7c0,9.8,6.7,16.6,17.1,16.6
          c10,0,16.9-6.6,16.9-16.6v-20.8l-15.5,12.6v-24.2h37v31.9c0,21.9-15.3,35.9-38.4,35.9c-23.3,0-38.8-14.2-38.8-35.9v-54.7
          c0-21.7,15.5-35.9,38.8-35.9c23.1,0,38.4,14,38.4,35.9v5.3H548.6z"
      />
      {/* Y */}
      <path
        fill={fill}
        d="M609.3,651.8L577.6,579h24.8l17.5,49.4h1.3l17.3-49.4h24L631,651.8V701h-21.7V651.8z"
      />
      {/* M */}
      <path
        fill={fill}
        d="M752.5,701v-88.4h-1.8l-18.9,62.1h-16l-19-62.1h-1.6l0.2,88.4h-20.7V579h29.9l19.1,66.1h1.3l18.9-66.1
          h29.2V701H752.5z"
      />
      {/* H */}
      <path
        fill={fill}
        d="M861.6,579V701H847v-54.8h-40.3V701h-14.6V579h14.6v53.7H847V579H861.6z"
      />
      {/* U */}
      <path
        fill={fill}
        d="M880.9,669.9V579h14.6v90.4c0,12.4,8.6,20.4,21.5,20.4c12.9,0,21.5-8,21.5-20.4V579H953v90.9
          c0,20-14.2,33.3-36.1,33.3C895.5,703.2,880.9,690.1,880.9,669.9z"
      />
      {/* R */}
      <path
        fill={fill}
        d="M1027.7,701l-20-47.9h-0.4h-20.4V701h-14.6V579h35c23,0,36.3,13.5,36.3,37c0,18-7.7,30.2-21.5,35
          l22.8,50.1H1027.7z M1005.8,639.8c14.8,0,23.1-8.6,23.1-23.7c0-14.9-8.4-23.7-23.1-23.7h-18.9v47.4H1005.8z"
      />
    </svg>
  );
}
```

> **Note on viewBox:** "228 555 825 175" crops the 1280x1280 canvas to just the horizontal lockup content. If the wordmark or icon appears clipped after visual inspection, widen the viewBox (e.g. "220 550 840 185").

**Step 4: Run tests to verify they pass**

Run: `npx jest src/__tests__/components/GymhurLogo.test.tsx --no-coverage`
Expected: all PASS

**Step 5: Commit**

```bash
git add src/components/ui/GymhurLogo.tsx src/__tests__/components/GymhurLogo.test.tsx
git commit -m "feat: add GymhurLogo horizontal SVG React component"
```

---

### Task 6: Update Navbar

**Files:**
- Modify: `src/components/layout/Navbar.tsx`
- Modify: `src/__tests__/components/Navbar.test.tsx`

**Step 1: Update Navbar test**

Replace `src/__tests__/components/Navbar.test.tsx` with:
```typescript
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/layout/Navbar';

test('renders Gymhur logo', () => {
  render(<Navbar />);
  expect(screen.getByRole('img', { name: /gymhur/i })).toBeInTheDocument();
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

**Step 2: Run tests to verify existing ones still pass**

Run: `npx jest src/__tests__/components/Navbar.test.tsx --no-coverage`
Expected: "renders logo text" PASS (still has text fallback), others PASS

**Step 3: Replace `src/components/layout/Navbar.tsx` with**

```tsx
import Link from 'next/link';
import GymhurLogo from '@/components/ui/GymhurLogo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-brand border-b border-brand-dark shadow-sm">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Gymhur home">
          <GymhurLogo variant="light" height={28} />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="bg-white hover:bg-surface text-brand text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
```

**Step 4: Run tests to verify they pass**

Run: `npx jest src/__tests__/components/Navbar.test.tsx --no-coverage`
Expected: all PASS

**Step 5: Commit**

```bash
git add src/components/layout/Navbar.tsx src/__tests__/components/Navbar.test.tsx
git commit -m "feat: update navbar to Midnight Blue background with SVG logo"
```

---

### Task 7: Update Footer

**Files:**
- Modify: `src/components/layout/Footer.tsx`

**Step 1: Replace `src/components/layout/Footer.tsx` with**

```tsx
import Link from 'next/link';
import GymhurLogo from '@/components/ui/GymhurLogo';

export default function Footer() {
  return (
    <footer className="bg-brand text-white mt-24">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="mb-4">
            <GymhurLogo variant="light" height={24} />
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            Premier custom sportswear and activewear manufacturer. Low MOQs. OEM/ODM solutions.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-white/60">
            {[['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/contact', 'Get a Quote']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-white/60">
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
      <div className="border-t border-white/10 text-center py-6 text-sm text-white/40">
        © {new Date().getFullYear()} Gymhur. All rights reserved.
      </div>
    </footer>
  );
}
```

**Step 2: Run all tests**

Run: `npx jest --no-coverage`
Expected: all PASS

**Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: update footer to use SVG logo and brand colors"
```

---

### Task 8: Run Full Test Suite & Visual Check

**Step 1: Run all tests**

Run: `npx jest --no-coverage`
Expected: all PASS, no failures

**Step 2: Start dev server and visually inspect**

Run: `npm run dev`

Check:
- [ ] Navbar is Midnight Blue with white GYMHUR logo
- [ ] Logo renders correctly (not clipped, correct proportions)
- [ ] Nav links are white/70 opacity
- [ ] "Get a Quote" button is white with dark text
- [ ] Footer has Midnight Blue bg with white logo
- [ ] Body text uses Config Condensed throughout
- [ ] Section backgrounds using `surface` token show Tranquil green

If logo appears clipped or has too much whitespace, adjust the `viewBox` in `GymhurLogo.tsx` and `GymhurIcon.tsx`.

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete brand color and logo integration"
```
