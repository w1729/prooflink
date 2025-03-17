const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      // 🌈 Extended Color Palette for a More Vibrant UI
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        success: {
          DEFAULT: '#4CAF50', // Green success messages
          foreground: '#ffffff'
        },
        warning: {
          DEFAULT: '#FF9800', // Orange warning alerts
          foreground: '#ffffff'
        },
        error: {
          DEFAULT: '#F44336', // Red error indicators
          foreground: '#ffffff'
        },
        gradient: {
          start: '#6EE7B7',
          middle: '#3B82F6',
          end: '#9333EA'
        }
      },

      // 🎨 Enhanced Border Radius for Smoother UI
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        full: '9999px' // For pill-shaped buttons
      },

      // ✨ Custom Font Styling for Better Readability
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        display: ['Poppins', ...fontFamily.sans] // Stylish headings
      },

      // 🎞️ Animation Effects for Dynamic UI
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        rotate360: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        gradientShift: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' }
        }
      },

      // 🎬 Smooth Animations for User Interaction
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        pulse: 'pulse 1.5s infinite ease-in-out',
        rotate360: 'rotate360 1s linear infinite',
        gradientShift: 'gradientShift 3s ease infinite'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
