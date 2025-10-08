module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './app/(components)/**/*.{ts,tsx,js,jsx}',
    './data/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './tests/**/*.{ts,tsx,js,jsx}',
    './**/*.{html}', // if you have any static html
  ],
  theme: {
    extend: {
      colors: {
        malibu: {
          50: 'var(--color-malibu-50)',
          100: 'var(--color-malibu-100)',
          200: 'var(--color-malibu-200)',
          300: 'var(--color-malibu-300)',
          400: 'var(--color-malibu-400)',
          500: 'var(--color-malibu-500)',
          600: 'var(--color-malibu-600)',
          700: 'var(--color-malibu-700)',
          800: 'var(--color-malibu-800)',
          900: 'var(--color-malibu-900)',
          950: 'var(--color-malibu-950)',
        },
      },
    },
  },
};
