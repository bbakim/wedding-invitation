/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Renkler temadan gelir (src/index.css → [data-theme]). Colors come from the active theme.
      colors: {
        night: 'rgb(var(--c-night) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        deep: 'rgb(var(--c-deep) / <alpha-value>)',
        bosphorus: 'rgb(var(--c-bosphorus) / <alpha-value>)',
        azure: 'rgb(var(--c-azure) / <alpha-value>)',
        corn: 'rgb(var(--c-corn) / <alpha-value>)',
        mist: 'rgb(var(--c-mist) / <alpha-value>)',
        porcelain: 'rgb(var(--c-porcelain) / <alpha-value>)',
        bloom: 'rgb(var(--c-bloom) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.32em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw': {
          '0%': { strokeDashoffset: '1' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
