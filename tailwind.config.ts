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
        ink: {
          50: "#f7f6f4",
          100: "#ebe8e3",
          200: "#d6d0c6",
          300: "#b8aea0",
          400: "#97897a",
          500: "#7d6f62",
          600: "#66594f",
          700: "#534841",
          800: "#463d38",
          900: "#3c3531",
          950: "#1f1b19",
        },
        accent: {
          50: "#fff5f1",
          100: "#ffe8df",
          200: "#ffd0bf",
          300: "#ffb093",
          400: "#ff835a",
          500: "#f85d2f",
          600: "#e94215",
          700: "#c3320f",
          800: "#a12c12",
          900: "#852a14",
          950: "#481207",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-in": "fadeIn 0.6s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
