import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const RING_SIZE = 30;
const RING_HOVER_SIZE = 40;
const DOT_SIZE = 8;

// Elements the cursor treats as "interactive" — hovering them switches the
// ring into its color-inverting state.
const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input[type="submit"]';
const TEXT_SELECTOR = "input, textarea, select, [contenteditable='true']";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isCoarsePointer || prefersReducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, []);

  if (!enabled) return null;
  return <CursorRig />;
}

function CursorRig() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring: a soft spring trailing the raw pointer, centered on it.
  const followX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.5 });
  const followY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.5 });

  // Dot: tighter spring, near-instant follow.
  const dotSpringX = useSpring(mouseX, { stiffness: 900, damping: 40, mass: 0.25 });
  const dotSpringY = useSpring(mouseY, { stiffness: 900, damping: 40, mass: 0.25 });
  const dotX = useTransform(dotSpringX, (v) => v - DOT_SIZE / 2);
  const dotY = useTransform(dotSpringY, (v) => v - DOT_SIZE / 2);

  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const ringSize = hovering ? RING_HOVER_SIZE : RING_SIZE;
  const ringX = useTransform(followX, (v) => v - ringSize / 2);
  const ringY = useTransform(followY, (v) => v - ringSize / 2);

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE_SELECTOR)) {
        setHovering(true);
      } else if (e.target.closest(TEXT_SELECTOR)) {
        setHovering(false);
      }
    };

    const onOut = (e) => {
      const leavingTarget = e.target.closest(INTERACTIVE_SELECTOR);
      if (!leavingTarget) return;
      const relatedStillInside = e.relatedTarget && leavingTarget.contains(e.relatedTarget);
      if (relatedStillInside) return;
      setHovering(false);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden>
      {/* Dot — hidden while hovering an interactive element */}
      <motion.div
        style={{ x: dotX, y: dotY, width: DOT_SIZE, height: DOT_SIZE }}
        animate={{ opacity: hovering ? 0 : 1, scale: pressed && !hovering ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute rounded-full bg-blueprint"
      />

      {/* Ring — always hollow (no fill), so it never covers what's behind
          it. Over interactive elements it grows a little and its outline
          inverts the colors it overlaps via mix-blend-mode: difference —
          the "different mouse" effect without ever blocking text. Stays
          centered on the cursor at all times — it never snaps to the
          element's shape. */}
      <motion.div
        style={{ x: ringX, y: ringY, mixBlendMode: "difference" }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: pressed ? 0.9 : 1,
          borderWidth: hovering ? 2 : 1.5,
          borderColor: hovering ? "rgba(255,255,255,0.9)" : "rgba(120,120,120,0.6)",
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute rounded-full border bg-transparent"
      />
    </div>
  );
}
