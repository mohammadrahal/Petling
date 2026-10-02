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
        "primary": "#99462b",
        "primary-container": "#f28b6b",
        "primary-fixed": "#ffdbd0",
        "primary-fixed-dim": "#ffb59e",
        "on-primary": "#ffffff",
        "on-primary-container": "#6c250c",
        "on-primary-fixed": "#3a0a00",
        "on-primary-fixed-variant": "#7a2f16",

        "secondary": "#00658f",
        "secondary-container": "#86cfff",
        "secondary-fixed": "#c7e7ff",
        "secondary-fixed-dim": "#86cfff",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#00587d",
        "on-secondary-fixed": "#001e2e",
        "on-secondary-fixed-variant": "#004c6d",

        "tertiary": "#725c00",
        "tertiary-container": "#ffd95a",
        "tertiary-fixed": "#ffe081",
        "tertiary-fixed-dim": "#e8c346",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#493a00",
        "on-tertiary-fixed": "#231b00",
        "on-tertiary-fixed-variant": "#564500",

        "mint": "#7BC67B",
        "mint-dark": "#2e7d32",
        "mint-fixed": "#d6f5d6",
        "teal-petling": "#64DFDF",
        "lavender": "#B79CFF",
        "lavender-fixed": "#EDE7FF",

        "surface": "#fcf9f8",
        "background": "#fcf9f8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae7e7",
        "surface-container-highest": "#e4e2e1",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#55433d",
        "outline": "#88726c",
        "outline-variant": "#dbc1ba",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
      },
      fontFamily: {
        headline: ["Rubik", "sans-serif"],
        body: ["Quicksand", "sans-serif"],
      },
      spacing: {
        "space-xs": "0.5rem",
        "space-sm": "0.75rem",
        "space-md": "1.25rem",
        "space-lg": "2rem",
        "space-xl": "3rem",
        "gutter": "1.5rem",
        "gutter-sm": "1rem",
      },
      boxShadow: {
        "tactile-primary": "0 6px 0 #99462b",
        "tactile-primary-hover": "0 4px 0 #99462b",
        "tactile-secondary": "0 5px 0 #004c6d",
        "tactile-secondary-hover": "0 3px 0 #004c6d",
        "tactile-surface": "0 6px 0 #dbc1ba",
        "tactile-surface-hover": "0 4px 0 #dbc1ba",
      },
    },
  },
  plugins: [],
};

export default config;
