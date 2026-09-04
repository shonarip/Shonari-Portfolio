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
          DEFAULT: "#0c0c0d",
          soft: "#141416",
          muted: "#1c1c1f",
        },
        ink: {
          DEFAULT: "#efe8e0",
          soft: "#c9c0b6",
          muted: "#8f877e",
          faint: "#5e5852",
        },
        accent: {
          DEFAULT: "#ff3b7a",
          soft: "#ff6b9d",
        },
        cool: {
          DEFAULT: "#8b9cff",
          soft: "#a8b4ff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        blackletter: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1.2" }],
      },
      letterSpacing: {
        micro: "0.08em",
      },
    },
  },
  plugins: [],
};

export default config;
