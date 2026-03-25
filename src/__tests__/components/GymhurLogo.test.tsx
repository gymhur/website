import { render, screen } from '@testing-library/react';
import GymhurLogo from '../../components/ui/GymhurLogo';

test('renders svg with aria-label', () => {
  render(<GymhurLogo variant="light" />);
  expect(screen.getByRole('img', { name: /gymhur/i })).toBeInTheDocument();
});

test('light variant sets data-variant attribute', () => {
  const { container } = render(<GymhurLogo variant="light" />);
  expect(container.querySelector('svg')?.getAttribute('data-variant')).toBe('light');
});

test('dark variant sets data-variant attribute', () => {
  const { container } = render(<GymhurLogo variant="dark" />);
  expect(container.querySelector('svg')?.getAttribute('data-variant')).toBe('dark');
});
