/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          DEFAULT: '#9C4A2F', // Deep terracotta / burnt orange
          mid:     '#833B23', // Terracotta hover state
          light:   '#D98A6C', // Warm apricot / soft rust
          pale:    '#F9EFEA', // Pale peach/mist white
        },
        gold: {
          DEFAULT: '#C29B53', // Warm grain gold
          light:   '#D1AC6D', // Soft wheat gold
          pale:    '#EBE0CD', // Pale sand
        },
        charcoal: '#261C18', // Dark chocolate charcoal
        ivory: '#FAF8F5', // Warm linen off-white
        cream: {
          DEFAULT: '#F6EFEA', // Light peach-cream
          dark: '#EADCD0', // Muted sand-cream
        },
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5cc',
          300: '#8dd1a8',
          400: '#56b47d',
          500: '#4A6A5A',
          600: '#3a5a4a',
          700: '#2f4a3a',
          800: '#283b2f',
          900: '#233128',
        },
        accent: {
          50: '#fdf8f3',
          100: '#faf0e8',
          200: '#f5e0d1',
          300: '#eec8a8',
          400: '#e4a873',
          500: '#F5F0E8',
          600: '#d18c4a',
          700: '#b8753a',
          800: '#945e31',
          900: '#784d2a',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}
