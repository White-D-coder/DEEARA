/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory': '#FFFFF0',
        'gold': '#D4AF37',
        'beige': '#F5F5DC',
        'royal-blue': '#4169E1',
        'deep-mauve': '#8B4513',
        'soft-gold': '#F4E4BC',
        'cream': '#FDF5E6',
        'champagne': '#F7E7CE',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37' },
          '100%': { boxShadow: '0 0 20px #D4AF37, 0 0 30px #D4AF37' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 