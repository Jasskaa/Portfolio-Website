import { useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

const STATS = [
  { value: "4+", key: "experience" },
  { value: "5", key: "sectors" },
  { value: "4", key: "languages" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef, ".about-stat", { y: 20, stagger: 0.1 });
  useScrollReveal(sectionRef, ".skill-group", { y: 24, stagger: 0.12 });

  const skillGroups = t("about.skillGroups");

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-20">
          {/* Left: kicker + title, sticky on desktop */}
          <div className="md:sticky md:top-28 md:self-start">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              className="mono-label mb-4"
            >
              {t("about.kicker")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.1}
              className="font-display text-clamp2 font-semibold uppercase leading-[0.95] tracking-tight"
            >
              {t("about.title")}
            </motion.h2>
          </div>

          {/* Right: copy, stats, skills, CV */}
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.15}
              className="max-w-2xl text-lg leading-relaxed text-ink md:text-xl"
            >
              {t("about.paragraph1")}
            </motion.p>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.25}
              className="mt-5 max-w-2xl text-base leading-relaxed text-graphite md:text-lg"
            >
              {t("about.paragraph2")}
            </motion.p>

            <motion.a
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.35}
              href="/cv/CV-Jaskaran-Singh.pdf"
              download
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-ink px-6 py-3 font-display text-sm font-medium transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-ink hover:text-paper hover:shadow-[0_12px_24px_-12px_rgba(10,10,10,0.4)] active:translate-y-0 active:scale-95"
            >
              {t("about.cvButton")}
              <span aria-hidden className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </motion.a>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-3 gap-6 border-y border-ink/10 py-8">
              {STATS.map((stat) => (
                <div key={stat.key} className="about-stat group cursor-default">
                  <div className="font-display text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-blueprint md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mono-label mt-2 !normal-case !tracking-normal text-graphite">
                    {t(`stats.${stat.key}`)}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mt-16">
              <p className="mono-label mb-6">{t("about.skillsTitle")}</p>
              <div className="flex flex-col gap-6">
                {skillGroups.map((group) => (
                  <div key={group.label} className="skill-group">
                    <p className="mb-3 text-sm font-medium text-ink/70">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag) => (
                        <span
                          key={tag}
                          className="cursor-default rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/80 transition-all duration-200 ease-smooth hover:-translate-y-0.5 hover:border-blueprint/50 hover:bg-blueprint/5 hover:text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
