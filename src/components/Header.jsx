import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const NAV_ITEMS = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
];

const panelVariants = {
  hidden: { x: "-100%" },
  visible: {
    x: "0%",
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: -16, transition: { duration: 0.25, ease: [0.7, 0, 0.84, 0] } },
};

export default function Header() {
  const { t, lang, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ease-smooth ${
        menuOpen ? "text-snow" : "text-ink"
      } ${scrolled && !menuOpen ? "bg-paper/95 border-b border-ink/10" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight" onClick={() => setMenuOpen(false)}>
          JS<span className="text-blueprint">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="link-underline mono-label !text-[0.72rem] !text-ink/70 hover:!text-ink transition-colors"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle dark={menuOpen} />

          <button
            onClick={toggleLanguage}
            className={`mono-label flex items-center gap-1 rounded-full border px-3 py-1.5 transition-colors ${
              menuOpen ? "border-snow/25 hover:border-snow/50" : "border-ink/15 hover:border-ink/40"
            }`}
            aria-label="Toggle language"
          >
            <span className={lang === "es" ? "" : "opacity-40"}>ES</span>
            <span className="opacity-20">/</span>
            <span className={lang === "en" ? "" : "opacity-40"}>EN</span>
          </button>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-[120] flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`block h-px w-6 ${menuOpen ? "bg-snow" : "bg-ink"}`}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className={`block h-px w-6 ${menuOpen ? "bg-snow" : "bg-ink"}`}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`block h-px w-6 ${menuOpen ? "bg-snow" : "bg-ink"}`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-void px-6 pb-10 pt-24 text-snow md:hidden"
          >
            {/* faint blueprint grid, consistent with the rest of the site */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              aria-hidden
            />

            <motion.nav variants={listVariants} initial="hidden" animate="visible" exit="exit" className="relative flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.key}
                  variants={itemVariants}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-snow/10 py-4 first:pt-0"
                >
                  <span className="font-mono text-xs text-snow/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-4xl font-semibold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-2 group-active:translate-x-2">
                    {t(`nav.${item.key}`)}
                  </span>
                </motion.a>
              ))}
            </motion.nav>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative flex items-end justify-between border-t border-snow/10 pt-6"
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-snow/40">
                Sant Joan les Fonts
                <br />
                Girona, ES
              </div>
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mono-label !text-snow/70 hover:!text-snow">
                {t("hero.cta")} →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
