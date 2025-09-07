/** @type {import('tailwindcss').Config} */
import tailwindCSSAnimate from "tailwindcss-animate";
import containerQueries from "@tailwindcss/container-queries";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "300px",
      },
      fontFamily: {
        satoshi: ["Satoshi-Regular", "sans-serif"],
        "satoshi-medium": ["Satoshi-Medium", "sans-serif"],
        "satoshi-bold": ["Satoshi-Bold", "sans-serif"],
        "satoshi-black": ["Satoshi-Black", "sans-serif"],
      },
      aspectRatio: {
        "2/1": "2 / 1",
        "3/7": "3 / 7",
        "3/4": "3 / 4",
      },
      colors: {
        primary: "#262626",
        secondary: "#E6E6FA",
        "admin-pry": "#5F6D7E",
        accent: "#6246EA",
        "success-700": "#2D8A39",
        "success-500": "#EBFAEB",
        facebook: "#437EF7",
        twitter: "#262626",
        instagram: "#E2341D",
        givaah: "#FFCA08",
        tally: "#0AAE8B",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundColor: {
        primary: "#DFE3FF",
        secondary: "#F5F6FD",
        tertiary: "#FAFBFC",
        accent: "#6246EA",
        facebookBG: "#F5FAFF",
        twitterBG: "#F6F6F6",
        instagramBG: "#FFF2F0",
        givaahBG: "#FEFCE8",
        tallyBG: "#EBFEF7",
        "grade-F": "#E2341D",
        "grade-E": "#FD7D6C",
        "grade-Ea": "#FD7D6C35",
        "grade-D": "#FCB004",
        "grade-Da": "#FCB00435",
        "grade-C": "#FFD11E",
        "grade-Ca": "#FFD11E35",
        "grade-B": "#A8DD9D",
        "grade-Ba": "#A8DD9D35",
        "grade-A": "#5DC264",
        "grade-Aa": "#5DC26435",
      },
      borderColor: {
        primary: "#C0BFF3",
        secondary: "#EAEBF0",
        disabled: "#DAE0E6",
      },
      outlineColor: {
        primary: "#C0BFF3",
        secondary: "#EAEBF0",
        disabled: "#DAE0E6",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-left": {
          from: { left: "100%" },
          to: { left: "0" },
        },
        "slide-out-left": {
          from: { left: "var(--left)" },
          to: { left: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-left": "slide-in-left 0.2s ease-out",
        "slide-out-left": "slide-out-left 0.2s ease-out",
      },
    },
  },
  plugins: [
    // require("tailwindcss-animate"),
    // require('@tailwindcss/container-queries'),
    tailwindCSSAnimate,
    containerQueries,
  ],
};
