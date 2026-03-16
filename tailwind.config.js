/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'cinzel-decorative': ['Cinzel Decorative', 'serif'],
        'eb-garamond': ['EB Garamond', 'serif'],
      },
      colors: {
        'got-gold': '#C9A84C',
        'got-dark': '#0A0A0A',
        'got-ember': '#FF6B35',
        'got-steel': '#8B9BB4',
        'got-crimson': '#8B0000',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'ember': 'ember 4s ease-in-out infinite',
        'flicker': 'flicker 2s ease-in-out infinite',
        'sword-glow': 'swordGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ember: {
          '0%': { opacity: '0', transform: 'translateY(0) translateX(0) scale(0.5)' },
          '50%': { opacity: '1', transform: 'translateY(-60px) translateX(10px) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-120px) translateX(-5px) scale(0.3)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        swordGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px #C9A84C)' },
          '50%': { filter: 'drop-shadow(0 0 20px #C9A84C) drop-shadow(0 0 40px #FF6B35)' },
        }
      }
    },
  },
  plugins: [],
}
