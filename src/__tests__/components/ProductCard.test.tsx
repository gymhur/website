import { render, screen } from '@testing-library/react';
import ProductCard from '../../components/products/ProductCard';

const mockProduct = {
  name: 'Custom Leggings',
  slug: 'custom-leggings',
  categorySlug: 'leggings',
  description: 'High-performance leggings',
  moq: '50 pieces',
};

test('renders product name', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText('Custom Leggings')).toBeInTheDocument();
});

test('renders MOQ', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText(/50 pieces/i)).toBeInTheDocument();
});

test('renders quote request link', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByRole('link', { name: /request a quote/i })).toBeInTheDocument();
});
