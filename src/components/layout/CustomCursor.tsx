"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Subtle cursor-follow glow for pointer (desktop) devices.
 * Automatically no-ops on touch devices and for reduced-motion users.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const isHovering3D = useAppStore((state) => state.isHovering3D);
  
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  
  // Make cursor a bit more snappy when over 3D
  const damping = isHovering3D ? 15 : 25;
  const stiffness = isHovering3D ? 400 : 300;
  
  const springX = useSpring(x, { damping, stiffness, mass: 0.5 });
  const springY = useSpring(y, { damping, stiffness, mass: 0.5 });

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
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[60] -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-all duration-300",
        isHovering3D ? "h-16 w-16 rounded-full border border-accent/70" : "h-8 w-8 rounded-full"
      )}
      style={{
        x: springX,
        y: springY,
        background: isHovering3D 
          ? "transparent" 
          : "radial-gradient(circle, hsl(var(--accent) / 0.5) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
