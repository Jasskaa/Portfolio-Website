import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { splitChars } from "../hooks/useSplitReveal.js";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

function TitleLine({ word, className = "", baseDelay = 0 }) {
  const chars = splitChars(word);
  return (
    <span className="block overflow-hidden">
      <span className={`flex ${className}`}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: baseDelay + i * 0.028,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="grid-backdrop relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Corner crosshair marks — a small nod to technical drawing callouts */}
      <CrosshairMark className="left-4 top-20 md:left-8 md:top-24" />
      <CrosshairMark className="right-4 bottom-8 md:right-8" />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mono-label mb-6"
        >
          {t("hero.kicker")}
        </motion.p>

        <h1 className="font-display font-semibold uppercase leading-[0.9] tracking-tight text-clamp1">
          <TitleLine word={t("hero.title1")} baseDelay={0.15} />
          <TitleLine word={t("hero.title2")} className="text-ink/25" baseDelay={0.35} />
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,26rem)_1fr] md:items-end">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
            className="max-w-md text-base text-graphite md:text-lg"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.65}
            className="flex flex-wrap items-center gap-6 md:justify-end"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 font-display text-sm font-medium transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-ink hover:text-paper hover:shadow-[0_12px_24px_-12px_rgba(10,10,10,0.4)] active:translate-y-0 active:scale-95"
            >
              {t("hero.cta")}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <div className="hidden h-10 w-px bg-ink/15 md:block" />
            <AvailabilityBadge />
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.9}
        className="mx-auto mt-16 flex w-full max-w-6xl items-center justify-between px-6"
      >
        <span className="mono-label">{t("hero.location")}</span>

        <a
          href="#about"
          className="flex items-center gap-2 rounded-full border border-ink/20 py-2 pl-4 pr-2 transition-colors hover:border-ink/50"
        >
          <span className="mono-label !text-ink">{t("hero.scroll")}</span>
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/30 text-xs"
            aria-hidden
          >
            ↓
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}

function AvailabilityBadge() {
  const { t } = useLanguage();
  return (
    <div className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blueprint/60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-blueprint" />
      </span>
      <span className="mono-label !text-ink/70">{t("hero.available")}</span>
    </div>
  );
}

function CrosshairMark({ className = "" }) {
  return (
    <span className={`pointer-events-none absolute hidden h-4 w-4 md:block ${className}`} aria-hidden>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink/20" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-ink/20" />
    </span>
  );
}
