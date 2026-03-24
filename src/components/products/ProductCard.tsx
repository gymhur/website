import Link from 'next/link';

interface Product {
  name: string;
  slug: string;
  categorySlug: string;
  description?: string;
  moq?: string;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
      <div className="bg-surface aspect-square w-full" />
      <div className="p-6">
        <h3 className="font-semibold text-text-primary text-lg mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-text-secondary mb-3 leading-relaxed">{product.description}</p>
        )}
        {product.moq && (
          <p className="text-xs text-brand font-semibold mb-4">MOQ: {product.moq}</p>
        )}
        <Link
          href={`/contact?product=${encodeURIComponent(product.name)}`}
          className="block text-center bg-brand hover:bg-brand-dark text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
