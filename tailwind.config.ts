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
        canvas: {
          DEFAULT: "#0a0a0a",
          soft: "#141414",
          muted: "#1d1d1d",
        },
        // Text on the black canvas. All pass AA (4.5:1+).
        ink: {
          DEFAULT: "#f4f0ea",
          soft: "#d6d1c9",
          muted: "#a9a49c",
          faint: "#a9a49c",
        },
        accent: {
          DEFAULT: "#ff4d86",
          soft: "#ff7aa5",
        },
        cool: {
          DEFAULT: "#8b9cff",
          soft: "#a8b4ff",
        },
        // Solid "paper" colors for cards. Text on them is `onpaper`.
        paper: {
          pink: "#ff4d86",
          gray: "#dcdcdc",
          blue: "#9aa8ff",
        },
        onpaper: {
          DEFAULT: "#0a0a0a",
          soft: "#2a1118",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-monospace", "monospace"],
        mono: ["var(--font-sans)", "ui-monospace", "monospace"],
        serif: ["var(--font-display)", "Georgia", "serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["0.8125rem", { lineHeight: "1.4" }],
      },
      letterSpacing: {
        micro: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
