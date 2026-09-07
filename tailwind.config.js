/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#6C28D9', // Signature 1Fi purple
          700: '#5B21B6',
          800: '#5300D9',
          900: '#3B0764',
          accent: '#A203D5',
          lightBg: '#EFDAFF',
          cardBorder: '#B3A3BF',
          darkBg: '#0D0915',
          darkCard: '#181224',
          darkBorder: '#2E2244',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 8px 30px rgba(108, 40, 217, 0.15)',
        'brand-lg': '0 14px 40px rgba(108, 40, 217, 0.22)',
        '3d-btn': '0 4px 0 #5300D9',
        '3d-btn-pressed': '0 1px 0 #5300D9',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'scale-up': 'scaleUp 0.2s ease-out forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.92' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
