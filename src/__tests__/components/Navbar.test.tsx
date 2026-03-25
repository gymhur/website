import { render, screen } from '@testing-library/react';
import Navbar from '../../components/layout/Navbar';

test('renders Gymhur logo', () => {
  render(<Navbar />);
  expect(screen.getByRole('img', { name: /gymhur/i })).toBeInTheDocument();
});

test('renders Get a Quote link', () => {
  render(<Navbar />);
  expect(screen.getByRole('link', { name: /get a quote/i })).toBeInTheDocument();
});

test('Get a Quote link points to /contact', () => {
  render(<Navbar />);
  expect(screen.getByRole('link', { name: /get a quote/i })).toHaveAttribute('href', '/contact');
});
