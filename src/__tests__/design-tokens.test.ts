import tailwindConfig from '../../tailwind.config';

test('brand color is defined', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, unknown>;
  expect(colors['brand']).toBeDefined();
});

test('brand-dark color is defined', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, unknown>;
  expect(colors['brand-dark']).toBeDefined();
});

test('Config Condensed font faces are declared in globals.css', () => {
  const fs = require('fs');
  const css = fs.readFileSync('src/app/globals.css', 'utf8');
  expect(css).toContain("font-family: 'Config Condensed'");
  expect(css).toContain('ConfigCondensedRegular.otf');
  expect(css).toContain('ConfigCondensedBold.otf');
});

test('brand color is official Midnight Blue', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  expect(colors['brand']).toBe('#213541');
});

test('brand-dark color is defined', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  expect(colors['brand-dark']).toBeDefined();
});

test('brand-light color is Light Steel Blue', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  expect(colors['brand-light']).toBe('#ACC0DA');
});

test('surface color is Tranquil', () => {
  const colors = tailwindConfig.theme?.extend?.colors as Record<string, string>;
  expect(colors['surface']).toBe('#E3F1EC');
});

test('font family is Config Condensed', () => {
  const fonts = tailwindConfig.theme?.extend?.fontFamily as Record<string, unknown>;
  expect(fonts['sans']).toContain('Config Condensed');
});
