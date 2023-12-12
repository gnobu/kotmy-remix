import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi-Regular", "sans-serif"],
      },
      aspectRatio: {
        '3/7': '3 / 7',
        '3/4': '3 / 4',
      },
      colors: {
        primary: '#262626',
        secondary: '#E6E6FA',
        accent: '#6246EA',
      },
      backgroundColor: {
        primary: '#DFE3FF',
        secondary: '#87A3BF',
        accent: '#6246EA',
      },
      borderColor: {
        primary: '#C0BFF3',
      }
    },
  },
} satisfies Config