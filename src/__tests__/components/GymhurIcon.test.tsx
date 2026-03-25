import { render, screen } from '@testing-library/react';
import GymhurIcon from '../../components/ui/GymhurIcon';

test('renders svg with aria-label', () => {
  render(<GymhurIcon variant="light" />);
  expect(screen.getByRole('img', { name: /gymhur/i })).toBeInTheDocument();
});

test('light variant renders white fill', () => {
  const { container } = render(<GymhurIcon variant="light" />);
  const svg = container.querySelector('svg');
  expect(svg?.getAttribute('data-variant')).toBe('light');
});

test('dark variant renders dark fill', () => {
  const { container } = render(<GymhurIcon variant="dark" />);
  const svg = container.querySelector('svg');
  expect(svg?.getAttribute('data-variant')).toBe('dark');
});
