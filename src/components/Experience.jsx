import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { gsap, ScrollTrigger, useScrollReveal } from "../hooks/useScrollReveal.js";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Experience() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  const items = t("experience.items");
  const present = t("experience.present");

  useScrollReveal(sectionRef, ".exp-item", { y: 30, stagger: 0.12, start: "top 88%" });

  // The vertical line fills in as the timeline scrolls through view —
  // a small nod to a dimension line being drawn on a technical plan.
  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, timelineRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section id="experience" ref={sectionRef} className="grid-backdrop relative py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 md:mb-24">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            className="mono-label mb-4"
          >
            {t("experience.kicker")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.1}
            className="font-display text-clamp2 font-semibold uppercase leading-[0.95] tracking-tight"
          >
            {t("experience.title")}
          </motion.h2>
        </div>

        <div ref={timelineRef} className="relative pl-8 md:pl-12">
          {/* Track (static, faint) + fill line (animated) */}
          <span className="absolute left-0 top-1 bottom-1 w-px bg-ink/10" aria-hidden />
          <span
            ref={lineRef}
            style={{ transformOrigin: "top" }}
            className="absolute left-0 top-1 bottom-1 w-px origin-top bg-blueprint"
            aria-hidden
          />

          <ul className="flex flex-col gap-14 md:gap-16">
            {items.map((item) => (
              <li
                key={`${item.company}-${item.start}`}
                className="exp-item group relative -mx-4 rounded-xl px-4 py-2 transition-colors duration-300 ease-smooth hover:bg-mist/40 md:-mx-6 md:px-6"
              >
                <span className="absolute -left-8 top-3.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-paper bg-ink transition-transform duration-300 ease-smooth group-hover:scale-150 group-hover:bg-blueprint md:-left-12" />

                <div className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-8">
                  <div className="mono-label !text-ink/50">
                    {item.start} — {item.end ?? present}
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight transition-transform duration-300 ease-smooth group-hover:translate-x-1 md:text-2xl">
                      {item.company}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-blueprint">{item.role}</p>
                    <p className="mt-3 max-w-xl text-base leading-relaxed text-graphite">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
