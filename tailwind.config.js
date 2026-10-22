/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bricolage Grotesque', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#171717',
        cream: '#FFF9F4',
        sand: '#FFDCC8',
        sage: '#FF6846',
        moss: '#0F6B67',
        clay: '#E94F2D',
        cocoa: '#123B3A',
        sun: '#FFC857',
        blush: '#FFF0EA'
      },
      boxShadow: {
        soft: '0 24px 70px rgba(23, 23, 23, 0.12)',
        card: '0 18px 50px rgba(23, 23, 23, 0.10)'
      }
    },
  },
  plugins: [],
};
