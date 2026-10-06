/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#25231F',
        cream: '#F7F3EB',
        sand: '#EDE4D8',
        sage: '#7D8972',
        moss: '#55604F',
        clay: '#A56E50',
        cocoa: '#55483D'
      },
      boxShadow: {
        soft: '0 24px 70px rgba(64, 52, 42, 0.12)'
      }
    },
  },
  plugins: [],
};
