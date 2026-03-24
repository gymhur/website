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
            onClick={() => posthog.capture('hero_cta_clicked', { cta_text: ctaText })}
            className="bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            {ctaText}
          </Link>
          <Link
            href="/products"
            onClick={() => posthog.capture('hero_products_clicked')}
            className="border border-gray-300 hover:border-gray-400 text-text-primary font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
}
