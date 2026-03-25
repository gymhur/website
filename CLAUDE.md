# Gymhur Website — Claude Guidelines

## Tech Stack

- **Framework:** Next.js 14+ App Router (TypeScript)
- **Styling:** Tailwind CSS
- **CMS:** Sanity
- **Analytics:** PostHog
- **Deployment:** Vercel
- **Tests:** Jest + @testing-library/react

---

## Brand Design System

> These are locked decisions. Do not change colors, fonts, or logo components without explicit instruction from the user.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `brand` | `#213541` | Primary brand color — Midnight Blue. Navbar bg, Footer bg, primary text. |
| `brand-dark` | `#1a2c36` | Navbar bottom border, hover states on brand bg. |
| `brand-light` | `#ACC0DA` | Light Steel Blue. Accents, highlights. |
| `surface` | `#E3F1EC` | Tranquil green. Page section backgrounds, CTA button hover. |
| `text-primary` | `#213541` | Same as brand. Body text, headings. |
| `text-secondary` | `#6B7280` | Muted text, captions. |
| `whatsapp` | `#25D366` | WhatsApp button only. |

**Rule:** Never use raw hex values in components. Always use the Tailwind token (e.g. `bg-brand`, `text-brand`, `bg-surface`). Never reintroduce `gray-*` or hardcoded colors for brand elements.

### Typography

- **Font:** Config Condensed (self-hosted, not Google Fonts)
- **Weights available:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold)
- **Font files location:** `public/fonts/config-condensed/` (served as static assets)
- **@font-face declarations:** `src/app/globals.css`
- **Tailwind token:** `font-sans` → `['Config Condensed', 'sans-serif']`
- **Base color:** `#213541` set on `html` in `globals.css`

**Rule:** Do not introduce other fonts. Do not use Google Fonts imports. All text uses Config Condensed via the `font-sans` Tailwind class (applied by default).

### Logo Components

Two SVG React components live in `src/components/ui/`:

#### `GymhurLogo` — Horizontal lockup (icon + wordmark)
```tsx
import GymhurLogo from '@/components/ui/GymhurLogo';

<GymhurLogo variant="light" height={28} />  // white — use on dark bg
<GymhurLogo variant="dark" height={28} />   // #213541 — use on light bg
```
- `variant="light"` → white fill (Navbar, Footer, dark backgrounds)
- `variant="dark"` → `#213541` fill (light page backgrounds)
- Default height: `32px`

#### `GymhurIcon` — H-motif icon only (square, no wordmark)
```tsx
import GymhurIcon from '@/components/ui/GymhurIcon';

<GymhurIcon variant="light" size={40} />
<GymhurIcon variant="dark" size={40} />
```
- Same variant logic as GymhurLogo
- Default size: `40px`

**Rule:** Never render the logo as plain text (e.g. `<span>GYMHUR</span>`). Always use `GymhurLogo` or `GymhurIcon`. Never hardcode fill colors — always use the `variant` prop.

### Favicon

- File: `src/app/icon.svg`
- Design: Midnight Blue (`#213541`) rounded square background, white H-motif icon
- Next.js App Router serves this automatically as the browser tab icon

---

## Layout

### Max Width
- `max-w-content` → `1200px` (defined in `tailwind.config.ts`)
- All page sections use `max-w-content mx-auto px-6`

### Navbar (`src/components/layout/Navbar.tsx`)
- Sticky, `z-50`, `bg-brand`, `h-16`
- Left: `GymhurLogo variant="light" height={28}` wrapped in `<Link href="/">`
- Center: nav links — `text-white/70 hover:text-white`
- Right: "Get a Quote" CTA — `bg-white text-brand hover:bg-surface`

### Footer (`src/components/layout/Footer.tsx`)
- `bg-brand text-white mt-24`
- 3-column grid: Brand + tagline | Quick Links | Contact
- Logo: `GymhurLogo variant="light" height={24}`
- Link/text opacity: `text-white/60`, hover `text-white`
- Bottom bar: `border-white/10`, `text-white/40`

---

## Business Info

- **Company:** Gymhur
- **Product:** Custom sportswear and activewear manufacturer
- **Location:** 137-C Small Industrial Estate, Shahabpura, Sialkot, Pakistan
- **Phone:** +92-300-1496487
- **Email:** info@gymhur.com
- **WhatsApp:** 923001496487

---

## Development Rules

### Tests
- Write failing tests before implementing features (TDD)
- Test files live in `src/__tests__/` mirroring the `src/` structure
- Run tests from the project root: `npx jest --no-coverage`
- Two pre-existing failures are expected and unrelated to feature work:
  - `src/__tests__/sanity-client.test.ts` — ESM/CJS issue with next-sanity
  - `src/__tests__/api/contact.test.ts` — API test failure

### Worktrees
- Feature work is done in isolated git worktrees at `.worktrees/<branch-name>`
- `.worktrees/` is git-ignored
- Copy `.env.local` from project root into any new worktree before starting the dev server

### Commits
- Commit after each logical task with a descriptive message
- Prefix: `feat:`, `chore:`, `fix:`, `docs:`

### Components
- UI primitives: `src/components/ui/`
- Layout components: `src/components/layout/`
- Use `@/` path alias for all internal imports
