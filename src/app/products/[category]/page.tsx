import { client } from '@/lib/sanity/client';
import ProductCard from '@/components/products/ProductCard';

interface PageProps {
  params: { category: string };
}

export default async function CategoryPage({ params }: PageProps) {
  const [category, products] = await Promise.all([
    client.fetch(
      `*[_type == "productCategory" && slug.current == $slug][0]`,
      { slug: params.category }
    ).catch(() => null),
    client.fetch(
      `*[_type == "product" && category->slug.current == $slug] | order(_createdAt asc)`,
      { slug: params.category }
    ).catch(() => []),
  ]);

  const categoryName = category?.name ?? params.category.replace(/-/g, ' ');

  return (
    <main className="max-w-content mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-text-primary mb-4 capitalize">{categoryName}</h1>
      <p className="text-text-secondary mb-12">
        {category?.description ?? 'Custom manufacturing available for all products in this category.'}
      </p>
      {products.length === 0 ? (
        <div className="text-center py-20 text-text-secondary">
          <p className="text-lg mb-2">Products coming soon.</p>
          <p>In the meantime, <a href="/contact" className="text-brand hover:underline">contact us</a> with your requirements.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: { name: string; slug: { current: string }; description?: string; moq?: string }) => (
            <ProductCard
              key={product.slug.current}
              product={{
                name: product.name,
                slug: product.slug.current,
                categorySlug: params.category,
                description: product.description,
                moq: product.moq,
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
}
