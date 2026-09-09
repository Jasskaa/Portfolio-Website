/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Theme-reactive tokens — driven by CSS variables so they flip with
        // the `.dark` class (see src/index.css). The <alpha-value> placeholder
        // is filled in by Tailwind when you use e.g. bg-ink/10.
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        graphite: "rgb(var(--color-graphite) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        blueprint: "rgb(var(--color-blueprint) / <alpha-value>)",
        // Fixed, theme-independent tokens for the deliberately-always-dark
        // surfaces (footer band, full-screen mobile menu).
        void: "#0a0a0a",
        snow: "#fafaf8",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        clamp1: "clamp(2.75rem, 8vw, 7rem)",
        clamp2: "clamp(2rem, 5vw, 4rem)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
