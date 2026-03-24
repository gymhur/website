# PostHog post-wizard report

The wizard has completed a deep integration of your project. The root cause of the "waiting" state was a missing `defaults: '2026-01-30'` option and an incorrect `ui_host` in `instrumentation-client.ts` — both required for the PostHog SDK to initialize correctly in Next.js 15.3+. These have been fixed. Additionally, a `ProductQuoteCta` client component was added to the product detail page to track quote clicks from that surface, and `captureException` error tracking was added to the contact form's network error handler.

| Event | Description | File |
|---|---|---|
| `hero_cta_clicked` | User clicks the primary hero CTA | `src/components/home/Hero.tsx` |
| `hero_products_clicked` | User clicks "View Products" in hero | `src/components/home/Hero.tsx` |
| `category_selected` | User clicks a product category | `src/components/home/CategoryGrid.tsx` |
| `cta_banner_clicked` | User clicks the bottom CTA banner | `src/components/home/CtaBanner.tsx` |
| `whatsapp_clicked` | User clicks the WhatsApp floating button | `src/components/layout/WhatsAppButton.tsx` |
| `product_quote_requested` | User clicks "Request a Quote" on a product card | `src/components/products/ProductCard.tsx` |
| `product_viewed_quote_clicked` | User clicks "Request a Quote" on product detail page | `src/components/products/ProductQuoteCta.tsx` |
| `quote_requested` | Contact form submitted successfully (client-side) | `src/components/contact/ContactForm.tsx` |
| `contact_form_error` | Contact form submission failed + exception captured | `src/components/contact/ContactForm.tsx` |
| `contact_submitted` | Email sent successfully (server-side) | `src/app/api/contact/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/354667/dashboard/1394291
- **Quote Conversion Funnel** (Hero CTA → quote submitted): https://us.posthog.com/project/354667/insights/ovNavLO0
- **Daily Quote Volume** (client vs server parity check): https://us.posthog.com/project/354667/insights/ihznshbS
- **Product Discovery Funnel** (category → card → detail): https://us.posthog.com/project/354667/insights/BLqeADCq
- **Engagement CTAs** (WhatsApp, Hero, Banner): https://us.posthog.com/project/354667/insights/tOsQDSH3
- **Contact Form Errors** (lead loss monitor): https://us.posthog.com/project/354667/insights/EGkw4IYo

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
