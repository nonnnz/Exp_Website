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
        primary: {
          DEFAULT: "#0B3D91",
          dark: "#082d6b",
          light: "#1a5bc4",
        },
        accent: {
          DEFAULT: "#FFA630",
          dark: "#e08a10",
          light: "#ffbe66",
        },
        surface: {
          DEFAULT: "#FEFFFE",
          muted: "#f5f7fa",
        },
        space: {
          bg: "#010828",
          cream: "#EFF4FF",
        },
      },
      fontFamily: {
        anton: ["var(--font-anton)", "sans-serif"],
        cursive: ["var(--font-cursive)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
