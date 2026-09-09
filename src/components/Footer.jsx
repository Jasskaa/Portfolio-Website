import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <a href="#home" className="group block">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-clamp1 font-semibold uppercase leading-[0.9] tracking-tight transition-transform duration-500 ease-smooth group-hover:-translate-y-1"
          >
            Jaskaran
            <br />
            Singh<span className="text-blueprint">.</span>
          </motion.h2>
        </a>

        <div className="mt-12 flex flex-col gap-6 border-t border-paper/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50">{t("footer.tagline")}</p>

          <a
            href="#home"
            className="group flex w-fit items-center gap-2 rounded-full border border-paper/20 py-2 pl-4 pr-2 text-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-paper/50 active:translate-y-0 active:scale-95"
          >
            {t("footer.back")}
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-paper/30 text-xs transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>

        <p className="mt-10 font-mono text-[0.7rem] text-paper/40">
          © {year} Jaskaran Singh — {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
