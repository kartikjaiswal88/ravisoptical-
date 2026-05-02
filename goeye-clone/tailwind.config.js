/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'bg-gradient-to-r',
    'from-orange-900', 'to-orange-700',
    'from-purple-900', 'to-purple-700',
    'from-blue-900', 'to-blue-800',
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#0a0a2e',
        accent: '#f97316',
        gold: '#d4a017',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
