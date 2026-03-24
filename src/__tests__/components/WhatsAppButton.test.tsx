import { render, screen } from '@testing-library/react';
import WhatsAppButton from '../../components/layout/WhatsAppButton';

test('renders WhatsApp link', () => {
  render(<WhatsAppButton phoneNumber="923001496487" />);
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/923001496487'));
});

test('opens in new tab', () => {
  render(<WhatsAppButton phoneNumber="923001496487" />);
  expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
});
