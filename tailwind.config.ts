import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Game Boy Color Palette
        gb: {
          darkest: '#0f380f',
          dark: '#306230',
          light: '#8bac0f',
          lightest: '#9bbc0f',
        },
        // Pokemon Red theme
        poke: {
          red: '#FF1C1C',
          darkred: '#CC0000',
          blue: '#3B4CCA',
          yellow: '#FFDE00',
          gold: '#B3A125',
        }
      },
      fontFamily: {
        pokemon: ['Pokemon GB', 'monospace'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'retro': '4px 4px 0px 0px rgba(0,0,0,0.8)',
        'retro-sm': '2px 2px 0px 0px rgba(0,0,0,0.8)',
        'inset-retro': 'inset 2px 2px 0px 0px rgba(0,0,0,0.3)',
      }
    },
  },
  plugins: [],
}
export default config
