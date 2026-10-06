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
          DEFAULT: "#0b0b0e",
          soft: "#131318",
          muted: "#1b1b21",
        },
        // Text colors, all AA (4.5:1+) on canvas and canvas-soft.
        ink: {
          DEFAULT: "#f2ece4",
          soft: "#d2cac0",
          muted: "#a9a198",
          faint: "#a9a198",
        },
        accent: {
          DEFAULT: "#ff4d86",
          soft: "#ff7aa5",
        },
        cool: {
          DEFAULT: "#8b9cff",
          soft: "#a8b4ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.8125rem", { lineHeight: "1.4" }],
      },
      letterSpacing: {
        micro: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;
