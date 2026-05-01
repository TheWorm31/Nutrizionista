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
          DEFAULT: '#4A2E5A',
          mid:     '#5D3A71',
          light:   '#8A6D9E',
          pale:    '#E9E3ED',
        },
        gold: {
          DEFAULT: '#C5A059',
          light:   '#D4AF72',
          pale:    '#EEE0C4',
        },
        charcoal: '#1A121F',
        ivory: '#FAF7F2',
        cream: {
          DEFAULT: '#F2EDE4',
          dark: '#E8E0D4',
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
