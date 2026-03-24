'use client';
import Link from 'next/link';
import posthog from 'posthog-js';

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
          onClick={() => posthog.capture('cta_banner_clicked')}
          className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-10 py-4 rounded-lg transition-colors text-base"
        >
          Get a Quote
        </Link>
      </div>
    </section>
  );
}
