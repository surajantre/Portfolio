"use client";

import { ReactNode, useRef, useState, MouseEvent as ReactMouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

// ---------------------------------------------------------------------------
// Section heading
// ---------------------------------------------------------------------------

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={cn("mb-14", align === "center" && "text-center")}>
      <div
        className={cn(
          "mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.25em] text-accent",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-8 bg-accent/60" aria-hidden />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl font-semibold leading-tight text-foreground balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-base text-muted sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}

// ---------------------------------------------------------------------------
// Magnetic button — cursor-follow micro-interaction
// ---------------------------------------------------------------------------

export function MagneticButton({
  children,
  className,
  as = "button",
  href,
  onClick,
  variant = "primary",
  type,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Reduce magnetic pull slightly for a heavier, more premium feel
    setPos({ x: x * 0.15, y: y * 0.15 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const styles = {
    primary:
      "bg-gradient-to-r from-accent to-accent-2 text-white shadow-lg shadow-accent/25 hover:shadow-accent/40",
    secondary: "glass text-foreground hover:border-accent/60",
    ghost: "text-foreground hover:bg-surface-2",
  } as const;

  const sharedProps = {
    onClick,
    "aria-label": ariaLabel,
    whileTap: { scale: 0.96 },
    className: cn(
      "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
      styles[variant],
      className
    ),
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      // Use a stiffer spring for quicker, more decisive magnetic snap
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      className="inline-block"
    >
      {as === "a" ? (
        <motion.a href={href} {...sharedProps}>
          {children}
        </motion.a>
      ) : (
        <motion.button type={type ?? "button"} {...sharedProps}>
          {children}
        </motion.button>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Glow card — glassmorphism card with cursor-tracked glow
// ---------------------------------------------------------------------------

export function GlowCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  function handleMouseMove(e: ReactMouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, active: false }))}
      className={cn(
        "card-hover glass relative overflow-hidden rounded-3xl p-8",
        className
      )}
      style={{
        backgroundImage: glow.active
          ? `radial-gradient(320px circle at ${glow.x}% ${glow.y}%, hsl(var(--accent) / 0.12), transparent 65%)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Badge / pill
// ---------------------------------------------------------------------------

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted transition-colors",
        className
      )}
    >
      {children}
    </span>
  );
}
