/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: '#F5F5F0',
          surface: '#FFFFFF',
          sidebar: '#ECEFE8',
          subtle: '#FAF9F5',
        },
        tx: {
          primary: '#222923',
          secondary: '#747B73',
          muted: '#9CA39B',
        },
        forest: {
          DEFAULT: '#315C46',
          dark: '#254736',
          light: '#3C6F55',
          soft: '#E4ECE4',
        },
        sage: {
          DEFAULT: '#E4ECE4',
          dark: '#C8D8C8',
          border: '#D0DDD0',
        },
        terracotta: {
          DEFAULT: '#BD7458',
          dark: '#A55F45',
          soft: '#F8ECE7',
        },
        amber: {
          DEFAULT: '#D99B26',
          soft: '#FDF6E2',
        },
        softYellow: {
          DEFAULT: '#F0E9D4',
          accent: '#E5DCBE',
        },
        border: {
          DEFAULT: '#E4E5DE',
          dark: '#D0D2C8',
          light: '#EEEEEA',
        },
        infoBlue: {
          DEFAULT: '#6689A5',
          soft: '#EBF1F6',
          dark: '#4B6B85',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(34, 41, 35, 0.04)',
        'elevated': '0 4px 12px -2px rgba(34, 41, 35, 0.08)',
        'modal': '0 20px 25px -5px rgba(34, 41, 35, 0.1), 0 8px 10px -6px rgba(34, 41, 35, 0.05)',
      }
    },
  },
  plugins: [],
}
