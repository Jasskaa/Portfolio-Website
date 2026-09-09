import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + slides in every element matching `selector` inside `containerRef`
 * as it scrolls into view. Each match gets a small stagger delay based on
 * its order, so lists/timelines reveal item by item rather than all at once.
 */
export function useScrollReveal(containerRef, selector, options = {}) {
  const { y = 40, duration = 0.8, stagger = 0.08, start = "top 85%" } = options;

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray(selector);
      targets.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay: stagger * i,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, selector]);
}

export { gsap, ScrollTrigger };
