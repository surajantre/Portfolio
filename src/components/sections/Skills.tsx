"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups } from "@/lib/content";
import { SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function Skills() {
  const [active, setActive] = useState(skillGroups[0].id);
  const activeGroup = skillGroups.find((g) => g.id === active)!;

  return (
    <section id="skills" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[600px] -translate-y-1/2 bg-aurora opacity-40" />
      <div className="section-container">
        <SectionHeading
          eyebrow="Skills"
          title="A full-stack toolkit, backend-first."
          description="Grouped by domain — click a category to explore the stack in depth."
        />

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {skillGroups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActive(group.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === group.id
                  ? "text-white"
                  : "border border-border text-muted hover:border-accent/50 hover:text-foreground"
              )}
            >
              {active === group.id && (
                <motion.span
                  layoutId="skill-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-2"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{group.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              {activeGroup.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, duration: 0.35 }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className="glass card-hover flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2" />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
