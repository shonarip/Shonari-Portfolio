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
          DEFAULT: "#f4f1ea",
          soft: "#f8f5ef",
          muted: "#ebe6dc",
        },
        ink: {
          DEFAULT: "#1a1a1a",
          soft: "#3a3a3a",
          muted: "#6b6b6b",
          faint: "#9a958c",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
        blackletter: ["var(--font-blackletter)", "serif"],
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
