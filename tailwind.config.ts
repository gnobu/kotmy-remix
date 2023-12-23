import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'satoshi': ["Satoshi-Regular", "sans-serif"],
        'satoshi-medium': ["Satoshi-Medium", "sans-serif"],
        'satoshi-bold': ["Satoshi-Bold", "sans-serif"],
        'satoshi-black': ["Satoshi-Black", "sans-serif"],
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
        secondary: '#F5F6FD',
        accent: '#6246EA',
        ongoing: '#87A3BF95',
        completed: '#D1BF0095',
        registering: '#FF99F695',
      },
      borderColor: {
        primary: '#C0BFF3',
        secondary: '#EAEBF0',
      },
      outlineColor: {
        primary: '#C0BFF3',
        secondary: '#EAEBF0',
      }
    },
  },
} satisfies Config