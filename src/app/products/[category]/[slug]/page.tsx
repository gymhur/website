import Link from 'next/link';
import { client } from '@/lib/sanity/client';
import ProductQuoteCta from '@/components/products/ProductQuoteCta';

interface PageProps {
  params: { category: string; slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await client.fetch(
    `*[_type == "product" && slug.current == $slug][0]`,
    { slug: params.slug }
  ).catch(() => null);

  if (!product) {
    return (
      <main className="max-w-content mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-brand hover:underline">Back to Products</Link>
      </main>
    );
  }

  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <Link href={`/products/${params.category}`} className="text-sm text-text-secondary hover:text-brand mb-8 inline-block">
        ← Back to category
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="bg-surface rounded-xl aspect-square" />
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">{product.name}</h1>
          {product.description && (
            <p className="text-text-secondary leading-relaxed mb-6">{product.description}</p>
          )}
          {product.moq && (
            <p className="text-sm font-semibold text-brand mb-8">Minimum Order: {product.moq}</p>
          )}
          <ProductQuoteCta productName={product.name} categorySlug={params.category} />
        </div>
      </div>
    </main>
  );
}
