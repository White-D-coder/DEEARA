/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earthy, Elegant Palette
        sugar: '#FCF8F0',      // Main background
        bisque: '#E2D9CD',     // Section backgrounds
        pistachio: '#B5BDAC',  // Accents, buttons
        wheat: '#B6A593',      // Text highlights, borders
        mocha: '#6B5B4D',      // Headlines, strong text
        espresso: '#392E26',   // CTAs, footer, strong contrast
        // ULTRA ROYAL Theme
        'charcoal': '#1A1A1A',
        'midnight': '#0F0F0F',
        'obsidian': '#000000',
        'navy': '#1B2A3A',
        'burgundy': '#8B1A3A',
        'emerald': '#0F4C3A',
        'gold': '#D4AF37',
        'bronze': '#CD7F32',
        'platinum': '#E5E4E2',
        'pearl': '#F8F8FF',
        'ivory': '#FFFFF0',
        'champagne': '#F7E7CE',
        'soft-gold': '#F4E4BC',
        'deep-gold': '#B8860B',
        'royal-purple': '#4B0082',
        'velvet': '#2D1B3D',
        // Mint green for modern luxury
        'mint': '#A8FFEB',
        'mint-dark': '#5FE1C7',
        'mint-glass': 'rgba(168,255,235,0.25)',
        'mint-glass-strong': 'rgba(168,255,235,0.45)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        'cinzel': ['Cinzel', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'libre': ['Libre Baskerville', 'serif'],
        'eb-garamond': ['EB Garamond', 'serif'],
        'marcellus': ['Marcellus', 'serif'],
        'great-vibes': ['Great Vibes', 'cursive'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '2', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '2.2', letterSpacing: '0.025em' }],
        'base': ['1.1rem', { lineHeight: '2.2', letterSpacing: '0.03em' }],
        'lg': ['1.25rem', { lineHeight: '2.2', letterSpacing: '0.035em' }],
        'xl': ['1.5rem', { lineHeight: '2', letterSpacing: '0.04em' }],
        '2xl': ['2rem', { lineHeight: '1.8', letterSpacing: '0.05em' }],
        '3xl': ['2.8rem', { lineHeight: '1.3', letterSpacing: '0.1em' }],
        '4xl': ['3.5rem', { lineHeight: '1.2', letterSpacing: '0.12em' }],
        '5xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.15em' }],
        '6xl': ['5.5rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        '7xl': ['6.5rem', { lineHeight: '0.9', letterSpacing: '0.2em' }],
        '8xl': ['7.5rem', { lineHeight: '0.8', letterSpacing: '0.25em' }],
        '9xl': ['8.5rem', { lineHeight: '0.7', letterSpacing: '0.3em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '28': '7rem',
        '36': '9rem',
        '44': '11rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '200': '50rem',
      },
      animation: {
        'fade-in': 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
        'float': 'float 5s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'royal-float': 'royalFloat 6s ease-in-out infinite',
        'gold-shimmer': 'goldShimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(60px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        royalFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-15px) rotate(1deg)' },
          '50%': { transform: 'translateY(-25px) rotate(0deg)' },
          '75%': { transform: 'translateY(-15px) rotate(-1deg)' },
        },
        glow: {
          '0%': { 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4), 0 0 40px rgba(212, 175, 55, 0.2)' 
          },
          '100%': { 
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.8), 0 0 80px rgba(212, 175, 55, 0.4)' 
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        goldShimmer: {
          '0%': { 
            backgroundPosition: '-200% center',
            filter: 'brightness(1)'
          },
          '50%': { 
            filter: 'brightness(1.2)'
          },
          '100%': { 
            backgroundPosition: '200% center',
            filter: 'brightness(1)'
          },
        },
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'elegant': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'royal': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ultra': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      boxShadow: {
        'mint-glass': '0 8px 32px 0 rgba(168,255,235,0.25)',
        'mint-glass-strong': '0 8px 32px 0 rgba(168,255,235,0.45)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        'premium': '0 35px 70px -15px rgba(0, 0, 0, 0.9)',
        'ultra': '0 50px 100px -20px rgba(0, 0, 0, 0.95)',
        'gold-glow': '0 0 40px rgba(212, 175, 55, 0.6)',
        'gold-glow-strong': '0 0 60px rgba(212, 175, 55, 0.8)',
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'elegant': '0 8px 30px rgba(0, 0, 0, 0.15)',
        'mint': '0 4px 32px 0 rgba(168,255,235,0.25)',
        soft: '0 4px 32px 0 rgba(107, 91, 77, 0.08)',
      },
      backdropBlur: {
        '2xl': '40px',
        '3xl': '60px',
        '4xl': '80px',
      },
      scale: {
        '110': '1.1',
        '125': '1.25',
        '150': '1.5',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
        '5': '5px',
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        glass: '2.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 