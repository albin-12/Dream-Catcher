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
        forest: {
          DEFAULT: "#1F4A3A",
          light: "#265d49",
          dark: "#17382c",
        },
        "deep-green": {
          DEFAULT: "#12302A",
          dark: "#0b1f1b",
        },
        navy: {
          DEFAULT: "#14234B",
          dark: "#0d1733",
          light: "#1c326b",
        },
        cream: {
          DEFAULT: "#F5EEDC",
          soft: "#FAF6ED",
          dark: "#E8DEC6",
        },
        gold: {
          DEFAULT: "#C9A24B",
          light: "#DFC27A",
          dark: "#9E7B2B",
          muted: "rgba(201, 162, 75, 0.35)",
        },
        "gold-text-on-cream": "#8A6A1F",
        wood: {
          DEFAULT: "#8A5A3B",
          dark: "#68432a",
          light: "#a8724f",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          light: "#2D2D2D",
          soft: "#4A4A4A",
        },
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        brand: "14px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(201, 162, 75, 0.15)",
        "card-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
