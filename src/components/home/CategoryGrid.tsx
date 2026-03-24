'use client';
import Link from 'next/link';
import posthog from 'posthog-js';

interface Category {
  name: string;
  slug: string;
  description?: string;
}

interface Props {
  categories: Category[];
}

const placeholderCategories: Category[] = [
  { name: 'Gym Wear', slug: 'gym-wear', description: 'Custom gym wear for brands and retailers' },
  { name: 'Leggings', slug: 'leggings', description: 'High-performance custom leggings' },
  { name: 'Team Uniforms', slug: 'team-uniforms', description: 'Bespoke team uniforms for clubs and organizations' },
  { name: 'Hurling Balls', slug: 'hurling-balls', description: 'Premium hurling balls manufactured to spec' },
  { name: 'Weightlifting Accessories', slug: 'weightlifting-accessories', description: 'Custom weightlifting belts and accessories' },
];

export default function CategoryGrid({ categories }: Props) {
  const items = categories.length > 0 ? categories : placeholderCategories;

  return (
    <section className="py-20 px-6">
      <div className="max-w-content mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 text-center">Our Products</h2>
        <p className="text-text-secondary text-center mb-12 max-w-xl mx-auto">
          Full-service custom manufacturing for brands and retailers worldwide.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(cat => (
            <Link
              key={cat.slug}
              href={`/products/${cat.slug}`}
              onClick={() => posthog.capture('category_selected', { category_name: cat.name, category_slug: cat.slug })}
              className="group bg-surface rounded-xl p-8 border border-gray-100 hover:border-brand/30 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-brand/10 mb-5" />
              <h3 className="font-semibold text-lg text-text-primary mb-2 group-hover:text-brand transition-colors">
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-sm text-text-secondary leading-relaxed">{cat.description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
