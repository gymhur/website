'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';

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
      if (res.ok) {
        setStatus('success');
        posthog.capture('quote_requested', {
          product_interest: form.product,
          has_phone: !!form.phone,
          has_company: !!form.company,
        });
      } else {
        setStatus('error');
        posthog.capture('contact_form_error', { reason: 'server_error' });
      }
    } catch {
      setStatus('error');
      posthog.capture('contact_form_error', { reason: 'network_error' });
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
