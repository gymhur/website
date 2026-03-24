# PostHog Integration Report

## Overview

PostHog analytics has been integrated into the Gymhur Next.js App Router project. The integration uses `posthog-js` for client-side tracking and `posthog-node` for server-side tracking.

**PostHog Project:** Gymhur
**Dashboard:** [Analytics basics](https://us.posthog.com/project/354667/dashboard/1392665)

---

## Environment Variables

Add the following to `.env.local` (already configured):

```
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

---

## Files Changed

| File | Change |
|------|--------|
| `instrumentation-client.ts` | Created — initializes PostHog on the client (Next.js 15.3+ pattern) |
| `src/components/PostHogProvider.tsx` | Updated — thin `PHProvider` context wrapper, no longer calls `posthog.init` |
| `src/lib/posthog-server.ts` | Created — server-side PostHog singleton using `posthog-node` |
| `src/components/home/Hero.tsx` | Added `hero_cta_clicked` and `hero_products_clicked` events |
| `src/components/home/CategoryGrid.tsx` | Added `category_selected` event |
| `src/components/home/CtaBanner.tsx` | Added `cta_banner_clicked` event |
| `src/components/products/ProductCard.tsx` | Added `product_quote_requested` event |
| `src/components/contact/ContactForm.tsx` | Added `quote_requested` and `contact_form_error` events |
| `src/components/layout/WhatsAppButton.tsx` | Added `whatsapp_clicked` event |
| `src/app/api/contact/route.ts` | Added server-side `contact_submitted` event via `posthog-node` |

---

## Tracked Events

| Event | Location | Properties | Description |
|-------|----------|------------|-------------|
| `hero_cta_clicked` | `Hero.tsx` | `cta_text` | User clicks the primary CTA in the hero section |
| `hero_products_clicked` | `Hero.tsx` | — | User clicks "View Products" in the hero |
| `category_selected` | `CategoryGrid.tsx` | `category_name`, `category_slug` | User selects a product category |
| `cta_banner_clicked` | `CtaBanner.tsx` | — | User clicks "Get a Quote" in the mid-page CTA banner |
| `product_quote_requested` | `ProductCard.tsx` | `product_name`, `category_slug` | User clicks "Request a Quote" on a product card |
| `quote_requested` | `ContactForm.tsx` | `product_interest`, `has_phone` (bool), `has_company` (bool) | Contact form submitted successfully |
| `contact_form_error` | `ContactForm.tsx` | `reason` (`server_error` \| `network_error`) | Contact form submission failed |
| `whatsapp_clicked` | `WhatsAppButton.tsx` | — | User clicks the floating WhatsApp button |
| `contact_submitted` | `api/contact/route.ts` | — | Server-side confirmation that the email was sent |

---

## Dashboard & Insights

**Dashboard:** [Analytics basics](https://us.posthog.com/project/354667/dashboard/1392665)

| Insight | URL | Type | Description |
|---------|-----|------|-------------|
| Quote Conversion Funnel | [WgVBAfrV](https://us.posthog.com/project/354667/insights/WgVBAfrV) | Funnel | CTA Banner Clicked → Quote Submitted |
| Hero to Quote Conversion Funnel | [biFeYwi0](https://us.posthog.com/project/354667/insights/biFeYwi0) | Funnel | Hero CTA → Product Quote → Quote Submitted |
| Quote Requests Over Time | [UMI1WhEA](https://us.posthog.com/project/354667/insights/UMI1WhEA) | Trend | Daily count of `quote_requested` |
| Product Quote Requests by Category | [80BCt2HZ](https://us.posthog.com/project/354667/insights/80BCt2HZ) | Trend (bar) | `product_quote_requested` broken down by `category_slug` |
| Key Engagement Events | [wPloM5SD](https://us.posthog.com/project/354667/insights/wPloM5SD) | Trend | WhatsApp, category, product quote, and CTA clicks over time |
