/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { sm: '412px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    },
    extend: {
      colors: {
        transparent: 'transparent',
        black: '#1D1C1F',
        grey: '#667085',
        darkGrey: '#344054',
        white: '#ffffff',
        primary: 'rgb(62, 135, 245)',
        'primary-text': '#525154',
        'primary-bg': '#e6effe',
        'grey-bg': '#F9FAFB',
        'border-color': '#dadada',
        'border-danger': '#FDA29B',
        danger: '#B42318',
        info: '#c0c0c0',
        success: '#039855',
        royalblue: '#124cb1',
        red: { 300: '#A7372A', 50: '#fde8e8', 800: '#9b1c1c' },
        aliceblue: { 100: '#f3f7ff', 200: '#e8effd' },
        whitesmoke: { 100: '#f7f8f8', 200: '#f5f7fa', 300: '#f2f4f6', 400: '#f8f8ff' },
        snowwhite: '#FFFAFA',
        green: { 100: '#def7ec', 800: '#03543f' },
        indigo: { 100: '#e5edff', 800: '#42389d' },
        gray: { 100: '#1e1e1e', 200: '#1c1d1f' },
        darkslategray: '#474e5c',
        dodgerblue: '#4e88ed',
        silver: '#c3c3c3',
        lightslategray: '#8a8f98',
        dimgray: '#525154',
        limegreen: '#2fdc40',
        cornflowerblue: '#80adfb',
        'demo-barner-bg': '#d8e6ff',
      },
      keyframes: {
        'accordion-down': { from: { height: 0 }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: 0 } },
      },
      animation: { 'accordion-down': 'accordion-down 0.2s ease-out', 'accordion-up': 'accordion-up 0.2s ease-out' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};