/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sensei: {
          green: '#1B4D3E',
          'green-dark': '#0f2e25',
          'green-light': '#2d6b57',
          gold: '#C9A96E',
          'gold-light': '#e2c898',
          'gold-dark': '#a8854a',
          cream: '#F5F0E8',
          'cream-dark': '#e8e0d0',
          dark: '#0a1a14',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Cormorant Garamond', 'serif'],
        accent: ['Cinzel', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'scroll-left': 'scrollLeft 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
