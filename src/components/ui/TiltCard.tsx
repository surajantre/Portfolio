"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  layoutId?: string;
}

export function TiltCard({ children, className, onClick, layoutId }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Map 0-1 (mouse pos) to -10 to 10 degrees for rotation
  const rotateX = useTransform(springY, [0, 1], [10, -10]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);
  
  // Add a subtle glare effect based on cursor position
  const glareX = useTransform(springX, [0, 1], [-100, 200]);
  const glareY = useTransform(springY, [0, 1], [-100, 200]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={cn(
        "relative cursor-pointer transition-colors hover:border-accent/50",
        className
      )}
    >
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 overflow-hidden rounded-inherit"
        style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease" }}
      >
        <motion.div
          className="absolute h-[250%] w-[250%] rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent blur-2xl mix-blend-overlay"
          style={{
            x: glareX,
            y: glareY,
            translateX: "-50%",
            translateY: "-50%",
          }}
        />
      </motion.div>
      
      {children}
    </motion.div>
  );
}
