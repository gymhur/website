# Brand Colors & Logo Integration — Design Document
Date: 2026-03-25

## Overview

Update the Gymhur website to use the official brand identity: correct color palette (Midnight Blue, Light Steel Blue, Tranquil), Config Condensed typeface, and SVG logo components replacing plain text wordmarks.

## Decisions

- **Logo approach:** Inline SVG React components (not static image files) for full color control per context
- **Navbar background:** Midnight Blue (#213541) — brand-matching dark header
- **Font scope:** Config Condensed replaces Inter everywhere (all text)

## Section 1 — Color Tokens

Update `tailwind.config.ts`:

| Token | Old | New | Purpose |
|-------|-----|-----|---------|
| `brand` | `#3D7F8A` | `#213541` | Midnight Blue — primary bg, CTA buttons |
| `brand-dark` | `#2B5F6B` | `#1a2c36` | Hover state for brand |
| `brand-light` | — | `#ACC0DA` | Light Steel Blue — accents, borders |
| `surface` | `#F8F8F8` | `#E3F1EC` | Tranquil — section backgrounds |
| `text-primary` | `#232323` | `#213541` | Body text (Midnight Blue) |
| `text-secondary` | `#6B7280` | `#6B7280` | Unchanged |

## Section 2 — Font (Config Condensed)

- Copy `.otf` files to `src/app/fonts/config-condensed/` (Regular, Medium, SemiBold, Bold, ExtraBold)
- Register via `@font-face` in `globals.css`
- Replace `Inter` with `'Config Condensed'` as default `sans` in `tailwind.config.ts`
- Remove Google Fonts `@import` for Inter

Weight usage:
- **Bold/ExtraBold** — headings, wordmark
- **SemiBold/Medium** — UI elements, nav links, buttons
- **Regular** — body copy

## Section 3 — Logo Components

### `src/components/ui/GymhurLogo.tsx`
- Horizontal lockup: H-motif icon + GYMHUR wordmark
- Paths extracted from `GYMHUR Logo 1.svg`
- Props: `variant: 'light' | 'dark'` — controls fill color (white vs Midnight Blue)
- Used in: Navbar (light), Footer (light)

### `src/components/ui/GymhurIcon.tsx`
- Standalone H-motif icon only
- Paths extracted from `GYMHUR Logo Icon.svg`
- Props: `variant: 'light' | 'dark'`
- Used in: small/icon contexts

### Navbar changes
- Background: white → Midnight Blue (`bg-brand`)
- Logo: text "GYMHUR" → `<GymhurLogo variant="light" />`
- Nav links: `text-text-secondary` → `text-white/70 hover:text-white`
- CTA button: restyled for dark background (white text, transparent or accent border)

### Footer changes
- Logo: text "GYMHUR" → `<GymhurLogo variant="light" />`
- Background unchanged (`bg-text-primary` will now resolve to Midnight Blue)

## Files Affected

- `tailwind.config.ts` — color tokens + font family
- `src/app/globals.css` — @font-face declarations, remove Inter import
- `src/app/fonts/config-condensed/` — font files (new directory)
- `src/components/ui/GymhurLogo.tsx` — new component
- `src/components/ui/GymhurIcon.tsx` — new component
- `src/components/layout/Navbar.tsx` — dark bg + logo component
- `src/components/layout/Footer.tsx` — logo component
- `src/app/layout.tsx` — verify font class propagation
