import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#f3faf4",
          100: "#e3f3e6",
          200: "#c8e6ce",
          300: "#9ed2a9",
          400: "#6db67d",
          500: "#4a9a5c",
          600: "#387d48",
          700: "#2f643c",
          800: "#285032",
          900: "#22422b",
        },
        gold: {
          50: "#fbf8ef",
          100: "#f5edd4",
          200: "#ead9a8",
          300: "#ddc074",
          400: "#d0a84a",
          500: "#c49235",
          600: "#a8752b",
          700: "#875a26",
          800: "#6f4825",
          900: "#5c3c22",
        },
        wood: {
          600: "#6b4f3a",
          700: "#5a4232",
          800: "#4a3729",
        },
        sky: {
          400: "#5eb8e8",
          500: "#3aa3dc",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
