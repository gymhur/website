'use client';
import Link from 'next/link';
import posthog from 'posthog-js';

interface Props {
  productName: string;
  categorySlug: string;
}

export default function ProductQuoteCta({ productName, categorySlug }: Props) {
  return (
    <Link
      href={`/contact?product=${encodeURIComponent(productName)}`}
      onClick={() => posthog.capture('product_viewed_quote_clicked', { product_name: productName, category_slug: categorySlug })}
      className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors"
    >
      Request a Quote
    </Link>
  );
}
