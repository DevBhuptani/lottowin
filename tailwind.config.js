/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e6edff',
          200: '#bfd4ff',
          300: '#99baff',
          400: '#4d87ff',
          500: '#0054ff',
          600: '#004ce6',
          700: '#003fbf',
          800: '#003299',
          900: '#00297d',
        },
        secondary: {
          50: '#f7f1ff',
          100: '#efe4ff',
          200: '#d7bdff',
          300: '#bf95ff',
          400: '#8f46ff',
          500: '#5f00ff',
          600: '#5600e6',
          700: '#4700bf',
          800: '#390099',
          900: '#2e007d',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.95',
            transform: 'scale(1.05)',
          },
        },
      },
      boxShadow: {
        'glow': '0 0 15px 2px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 25px 5px rgba(99, 102, 241, 0.4)',
      },
    },
  },
  plugins: [],
};