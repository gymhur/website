import { client } from '@/lib/sanity/client';
import Link from 'next/link';

export default async function AboutPage() {
  const about = await client.fetch(`*[_type == "aboutPage"][0]`).catch(() => null);

  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold text-text-primary mb-6">About Gymhur</h1>
        <p className="text-text-secondary leading-relaxed mb-6 text-lg">
          {about?.story ?? 'Founded in 2021 and based in Sialkot, Pakistan — one of the world\'s leading centres for sportswear manufacturing — Gymhur provides complete custom manufacturing services for brands and retailers globally.'}
        </p>
        <p className="text-text-secondary leading-relaxed mb-10">
          {about?.teamInfo ?? 'We specialize in gym wear, leggings, team uniforms, hurling balls, and weightlifting accessories. With low minimum order quantities and full OEM/ODM capabilities, we make it easy for brands at every stage to create high-quality custom sportswear.'}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Founded', value: '2021' },
            { label: 'Location', value: 'Sialkot, PK' },
            { label: 'Specialty', value: 'OEM/ODM' },
            { label: 'MOQ', value: 'Low' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface rounded-xl p-5 text-center">
              <div className="text-2xl font-bold text-brand mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
        <Link
          href="/contact"
          className="inline-block bg-brand hover:bg-brand-dark text-white font-semibold px-8 py-4 rounded-lg transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </main>
  );
}
