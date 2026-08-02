"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Subtle cursor-follow glow for pointer (desktop) devices.
 * Automatically no-ops on touch devices and for reduced-motion users.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(y, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduced) return;
    setEnabled(true);

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[60] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle, hsl(var(--accent) / 0.5) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
