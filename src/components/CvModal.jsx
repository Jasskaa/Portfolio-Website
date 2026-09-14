import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const CV_OPTIONS = [
  { code: "es", name: "Español", file: "/cv/CV-Jaskaran-Singh-ES.pdf" },
  { code: "en", name: "English", file: "/cv/CV-Jaskaran-Singh-EN.pdf" },
  { code: "de", name: "Deutsch", file: "/cv/CV-Jaskaran-Singh-DE.pdf" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.97,
    transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] },
  },
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

export default function CvModal({ open, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/50 px-6 backdrop-blur-[2px]"
        >
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="grid-backdrop relative w-full max-w-sm overflow-hidden rounded-2xl border border-ink/10 bg-paper p-7 shadow-[0_30px_60px_-20px_rgba(10,10,10,0.45)]"
          >
            <button
              onClick={onClose}
              aria-label={t("cvModal.close")}
              className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-mist/60 hover:text-ink"
            >
              ✕
            </button>

            <p className="mono-label mb-2">CV</p>
            <h3 className="font-display text-2xl font-semibold tracking-tight">{t("cvModal.title")}</h3>
            <p className="mt-2 text-sm text-graphite">{t("cvModal.subtitle")}</p>

            <motion.div variants={listVariants} initial="hidden" animate="visible" className="mt-6 flex flex-col gap-3">
              {CV_OPTIONS.map((opt) => (
                <motion.a
                  key={opt.code}
                  variants={itemVariants}
                  href={opt.file}
                  download
                  onClick={onClose}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-ink/12 bg-paper px-4 py-3.5 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-blueprint/40 hover:shadow-[0_12px_24px_-16px_rgba(10,10,10,0.35)] active:scale-[0.98]"
                >
                  <span>
                    <span className="block font-display text-base font-medium tracking-tight">{opt.name}</span>
                    {opt.code === "de" && (
                      <span className="mt-1 block max-w-[15rem] text-xs leading-snug text-graphite">{t("cvModal.deNote")}</span>
                    )}
                  </span>
                  <span className="flex items-center gap-2 shrink-0">
                    <span className="mono-label !text-ink/40">{opt.code.toUpperCase()}</span>
                    <span
                      aria-hidden
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/15 text-xs transition-all duration-300 ease-smooth group-hover:border-blueprint/50 group-hover:bg-blueprint group-hover:text-paper"
                    >
                      ↓
                    </span>
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
