import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

const FILTER_KEYS = ["all", "design3d", "web"];

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);

  const items = t("projects.items");
  const filters = t("projects.filters");

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((item) => item.category === filter)),
    [items, filter],
  );

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            className="mono-label mb-4"
          >
            {t("projects.kicker")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            className="font-display text-clamp2 font-semibold uppercase leading-[0.95] tracking-tight"
          >
            {t("projects.title")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.2}
            className="mt-4 max-w-xl text-sm text-graphite"
          >
            {t("projects.subtitle")}
          </motion.p>
        </div>

        {/* Filter pills */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.3}
          className="mb-12 mt-10 flex flex-wrap gap-3"
        >
          {FILTER_KEYS.map((key) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`rounded-full border px-5 py-2 font-display text-sm font-medium transition-all duration-300 ease-smooth active:scale-95 ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 text-ink/70 hover:-translate-y-0.5 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {filters[key]}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((item, i) => (
              <ProjectCard key={item.title} item={item} wipLabel={t("projects.wip")} viewLabel={t("projects.viewLabel")} index={i} />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mono-label rounded-2xl border border-dashed border-ink/15 py-16 text-center"
          >
            {t("projects.empty")}
          </motion.p>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ item, wipLabel, viewLabel, index }) {
  const card = (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-paper transition-shadow duration-300 hover:shadow-[0_20px_40px_-20px_rgba(10,10,10,0.25)]"
    >
      {item.wip && (
        <span className="absolute right-4 top-4 z-10 rounded-full border border-ink/15 bg-paper/90 px-2.5 py-1 font-mono text-[0.65rem] tracking-[0.15em] text-ink/50">
          {wipLabel}
        </span>
      )}

      <div className="grid-backdrop relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-ink/10 bg-mist/30">
        <div className="transition-transform duration-500 ease-smooth group-hover:scale-110">
          <ProjectGlyph item={item} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold tracking-tight md:text-xl">{item.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-graphite">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink/60 transition-colors group-hover:border-blueprint/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {item.url && (
          <span className="link-underline mt-5 inline-flex w-fit items-center gap-2 font-display text-sm font-medium text-ink">
            {viewLabel}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </span>
        )}
      </div>
    </motion.article>
  );

  if (!item.url) return card;

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
      {card}
    </a>
  );
}

function ProjectGlyph({ item }) {
  switch (item.icon) {
    case "vitalis":
      return <VitalisGlyph />;
    case "gmailswipe":
      return <GmailSwipeGlyph />;
    case "virus":
      return <VirusGlyph />;
    default:
      return item.category === "web" ? <WebGlyph /> : <Design3DGlyph />;
  }
}

const glyphClass = "text-ink/25 transition-colors group-hover:text-blueprint/60";

function VitalisGlyph() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className={glyphClass}>
      <circle cx="36" cy="36" r="26" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14 36h9l4-11 6 20 5-15 3 6h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GmailSwipeGlyph() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className={glyphClass}>
      <rect x="14" y="16" width="34" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" transform="rotate(-6 14 16)" />
      <rect x="22" y="28" width="34" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M52 34l7 6-7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VirusGlyph() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className={glyphClass}>
      <circle cx="36" cy="36" r="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={36 + 14 * Math.cos((deg * Math.PI) / 180)}
          y1={36 + 14 * Math.sin((deg * Math.PI) / 180)}
          x2={36 + 22 * Math.cos((deg * Math.PI) / 180)}
          y2={36 + 22 * Math.sin((deg * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function WebGlyph() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className={glyphClass}>
      <rect x="10" y="14" width="52" height="44" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="10" y1="24" x2="62" y2="24" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
      <circle cx="23" cy="19" r="1.5" fill="currentColor" />
      <path d="M28 40l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 40l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="39" y1="38" x2="33" y2="54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Design3DGlyph() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" className={glyphClass}>
      <path d="M36 8l26 15v26L36 64 10 49V23z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M36 8v28M36 36L10 23M36 36l26-13M36 36v28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
