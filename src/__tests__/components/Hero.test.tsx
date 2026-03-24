import { render, screen } from '@testing-library/react';
import Hero from '../../components/home/Hero';

test('renders headline', () => {
  render(<Hero headline="Custom Sportswear" subheadline="Built for your brand" ctaText="Get a Quote" />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Custom Sportswear');
});

test('renders CTA link to /contact', () => {
  render(<Hero headline="Custom Sportswear" subheadline="Built for your brand" ctaText="Get a Quote" />);
  expect(screen.getByRole('link', { name: /get a quote/i })).toHaveAttribute('href', '/contact');
});
