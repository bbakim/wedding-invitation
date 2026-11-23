/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Mavi mürekkep & Boğaz paleti
        ink: '#0B1F3A',      // derin lacivert mürekkep (zemin)
        deep: '#0F2C52',     // koyu mavi
        bosphorus: '#15467E',// Boğaz mavisi
        azure: '#2E6BB0',    // orta mavi
        corn: '#7FA8D8',     // peygamber çiçeği mavisi
        mist: '#B9D0EC',     // açık sis mavisi
        porcelain: '#F2F6FB',// porselen / metin
        bloom: '#5B8FD6',    // küçük çiçek aksanı
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
