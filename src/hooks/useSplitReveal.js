// Shared Framer Motion variants for a staggered "line by line" character reveal,
// used by the hero title. Kept tiny and dependency-free.
export const lineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.028, delayChildren: 0.15 },
  },
};

export const charVariant = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function splitChars(word) {
  return word.split("");
}
