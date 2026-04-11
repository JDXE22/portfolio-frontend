module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './data/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './tests/**/*.{ts,tsx,js,jsx}',
    './**/*.{html}', // if you have any static html
  ],
  theme: {
    extend: {
      colors: {
        deep: {
          50: 'var(--color-deep-50)',
          100: 'var(--color-deep-100)',
          200: 'var(--color-deep-200)',
          300: 'var(--color-deep-300)',
          400: 'var(--color-deep-400)',
          500: 'var(--color-deep-500)',
          600: 'var(--color-deep-600)',
          700: 'var(--color-deep-700)',
          800: 'var(--color-deep-800)',
          900: 'var(--color-deep-900)',
          950: 'var(--color-deep-950)',
        },
        accent: {
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
        },
      },
    },
  },
};
