import type { Config } from "tailwindcss";

/**
 * Six colour families, each with the variants it actually needs.
 *
 * Roles, not decoration:
 *   coral — "act on this". Buttons, the mic, the one thing to press. Text on a
 *           coral fill is `ink`, not white: 4.99:1 rather than 3.05:1, and it
 *           lets the coral stay bright instead of darkening to carry white.
 *   sun   — "alive". The light the companion sits in; rewards.
 *   leaf  — "progress". Completed, correct, growing.
 *   berry — "careful". Treats the child spends, and parent-facing warnings.
 *   ink   — all type. One colour, two weights of it.
 *   shell / clay — the two grounds. shell reads (parents), clay plays (children).
 */
const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shell: "#fbf6ef",
        "shell-edge": "#eadcca",
        clay: "#f3e6d7",
        "clay-edge": "#e4d0b8",

        ink: "#2e1b12",
        "ink-soft": "#6b5347",

        coral: "#e8663c",
        "coral-ink": "#b23e18",
        "coral-deep": "#a8391a",
        "coral-wash": "#fbe0d4",

        leaf: "#376e45",
        "leaf-deep": "#26502f",
        "leaf-wash": "#dfebe0",
        // Chart marks only. A fill and a text colour answer to different
        // checks: this step clears the chroma floor a bar needs, while `leaf`
        // above clears the contrast ratio text needs.
        "leaf-mark": "#2f8a4f",

        sun: "#f0b429",
        "sun-deep": "#b8840d",
        "sun-wash": "#fbe9be",

        berry: "#c8384f",
        "berry-wash": "#fadde2",
      },

      fontFamily: {
        // Baloo Bhaijaan 2 carries Latin and Arabic, so bilingual strings
        // never fall back mid-sentence.
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "var(--font-display)", "system-ui", "sans-serif"],
      },

      // Minor third (1.2) through the text sizes, wider jumps at display
      // sizes so a headline is unmistakably a headline.
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.4" }],
        sm: ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.375rem", { lineHeight: "1.45" }],
        "2xl": ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        "3xl": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "4xl": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "5xl": ["4rem", { lineHeight: "1", letterSpacing: "-0.025em" }],
      },

      maxWidth: {
        // Reading measure. Body copy never runs wider than this.
        measure: "68ch",
        shelf: "72rem",
      },

      borderRadius: {
        // One radius for content regions. Pressable things use rounded-full.
        region: "1rem",
      },

      boxShadow: {
        // The only shadow in the system. It means "you can press this".
        press: "0 5px 0 var(--press-shade)",
        "press-sm": "0 3px 0 var(--press-shade)",
        "press-held": "0 2px 0 var(--press-shade)",
      },
    },
  },
  plugins: [],
};

export default config;
