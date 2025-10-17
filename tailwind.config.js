export default {
  content: ['./src/**/*.{vue,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zen: {
          50: '#faf8f3',
          100: '#f3ede3',
          200: '#e8dcc8',
          300: '#dcc8ad',
          400: '#c9a876',
          500: '#b8945f',
          600: '#9d7d47',
          700: '#7a6239',
          800: '#5a492d',
          900: '#3d3221',
          950: '#2a2419',
        },
        accent: {
          orange: '#e8a87c',
          green: '#4a7c59',
          brown: '#6b5344',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        subtle: 'subtle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        subtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
      },
    },
  },
  plugins: [],
   safelist: ['app-container', 'mobile-container', 'desktop-container', 'mobile-home'],
}