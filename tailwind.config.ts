import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#213541',
        'brand-dark': '#1a2c36',
        'brand-light': '#ACC0DA',
        surface: '#E3F1EC',
        'text-primary': '#213541',
        'text-secondary': '#6B7280',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['Config Condensed', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
