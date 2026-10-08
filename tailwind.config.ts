import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Palette pulled from the Homage to Nihon series: indigo (ai), vermilion (shu),
      // washi paper, with golden brown (kincha) and celadon (seiji) as small notes.
      colors: {
        canvas: {
          DEFAULT: "#0c0e14",
          soft: "#141823",
          muted: "#1c2130",
        },
        // Washi-toned text on the indigo-black canvas. All pass AA (4.5:1+).
        ink: {
          DEFAULT: "#efe8db",
          soft: "#d9d2c4",
          muted: "#c6bfb1",
          faint: "#c6bfb1",
        },
        // Vermilion, softened.
        accent: {
          DEFAULT: "#ec8064",
          soft: "#f3a088",
        },
        // Indigo, lifted for use on dark.
        cool: {
          DEFAULT: "#93a9de",
          soft: "#b1c1e8",
        },
        kincha: "#d4b46a",
        seiji: "#8fbfae",
        // Solid "paper" colors for the folders. Text on them is `onpaper`.
        paper: {
          washi: "#ebe3d3",
          ai: "#b8c4de",
          shu: "#e9a991",
        },
        onpaper: {
          DEFAULT: "#10131c",
          soft: "#2c2a33",
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
