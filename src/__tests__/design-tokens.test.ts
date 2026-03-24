import tailwindConfig from '../../tailwind.config';

test('brand color is defined', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, unknown>;
  expect(colors['brand']).toBeDefined();
});

test('brand-dark color is defined', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, unknown>;
  expect(colors['brand-dark']).toBeDefined();
});
