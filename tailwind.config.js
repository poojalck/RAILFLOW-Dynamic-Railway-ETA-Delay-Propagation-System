/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#080B10',
          900: '#0B0F16',
          850: '#0E131C',
          800: '#121826',
          700: '#182131',
          600: '#212C40',
        },
        line: {
          DEFAULT: '#1E2635',
          soft: '#161D29',
          bright: '#2A3548',
        },
        ink: {
          DEFAULT: '#E7ECF3',
          muted: '#8996A8',
          faint: '#5A6577',
        },
        signal: {
          normal: '#2FD584',
          normalDim: '#173C2C',
          warning: '#F0C043',
          warningDim: '#3B3319',
          delay: '#FF9A4D',
          delayDim: '#3D2A15',
          danger: '#F1454F',
          dangerDim: '#3B1A1D',
          active: '#4C8CFF',
          activeDim: '#182740',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.02) inset, 0 20px 40px -20px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(76,140,255,0.25), 0 0 24px -4px rgba(76,140,255,0.35)',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.9' },
          '70%': { transform: 'scale(1.9)', opacity: '0' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        dashFlow: {
          to: { strokeDashoffset: -40 },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 1.8s cubic-bezier(0,0,0.2,1) infinite',
        dashFlow: 'dashFlow 1.2s linear infinite',
        fadeUp: 'fadeUp 0.35s ease-out',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
