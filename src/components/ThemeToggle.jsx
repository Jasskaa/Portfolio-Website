import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../theme/ThemeContext.jsx";

export default function ThemeToggle({ dark = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border transition-colors ${
        dark ? "border-snow/25 hover:border-snow/50" : "border-ink/15 hover:border-ink/40"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {isDark ? <MoonIcon dark={dark} /> : <SunIcon dark={dark} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function SunIcon({ dark }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={dark ? "text-snow" : "text-ink"}>
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="4.5" />
        <line x1="12" y1="19.5" x2="12" y2="22" />
        <line x1="2" y1="12" x2="4.5" y2="12" />
        <line x1="19.5" y1="12" x2="22" y2="12" />
        <line x1="4.9" y1="4.9" x2="6.6" y2="6.6" />
        <line x1="17.4" y1="17.4" x2="19.1" y2="19.1" />
        <line x1="4.9" y1="19.1" x2="6.6" y2="17.4" />
        <line x1="17.4" y1="6.6" x2="19.1" y2="4.9" />
      </g>
    </svg>
  );
}

function MoonIcon({ dark }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={dark ? "text-snow" : "text-ink"}>
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
