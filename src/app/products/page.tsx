import Link from 'next/link';
import { client } from '@/lib/sanity/client';

const placeholderCategories = [
  { name: 'Gym Wear', slug: { current: 'gym-wear' }, description: 'Custom gym wear' },
  { name: 'Leggings', slug: { current: 'leggings' }, description: 'High-performance leggings' },
  { name: 'Team Uniforms', slug: { current: 'team-uniforms' }, description: 'Bespoke team uniforms' },
  { name: 'Hurling Balls', slug: { current: 'hurling-balls' }, description: 'Premium hurling balls' },
  { name: 'Weightlifting Accessories', slug: { current: 'weightlifting-accessories' }, description: 'Custom accessories' },
];

export default async function ProductsPage() {
  const categories = await client
    .fetch(`*[_type == "productCategory"] | order(_createdAt asc)`)
    .catch(() => []);

  const items = categories.length > 0 ? categories : placeholderCategories;

  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4">Products</h1>
      <p className="text-text-secondary mb-12 max-w-xl">
        Browse our product categories. All items are fully customizable with your branding.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((cat: { name: string; slug: { current: string }; description?: string }) => (
          <Link
            key={cat.slug.current}
            href={`/products/${cat.slug.current}`}
            className="group bg-surface rounded-xl p-8 border border-gray-100 hover:border-brand/30 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-lg bg-brand/10 mb-5" />
            <h2 className="font-semibold text-lg text-text-primary mb-2 group-hover:text-brand transition-colors">
              {cat.name}
            </h2>
            {cat.description && (
              <p className="text-sm text-text-secondary leading-relaxed">{cat.description}</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
