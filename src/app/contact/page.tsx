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
