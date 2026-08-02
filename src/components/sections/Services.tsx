"use client";

import { motion } from "framer-motion";
import { Server, Layout, Cloud, Shield, Workflow, Database, type LucideIcon } from "lucide-react";
import { services } from "@/lib/content";
import { SectionHeading, GlowCard } from "@/components/ui/primitives";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  server: Server,
  layout: Layout,
  cloud: Cloud,
  shield: Shield,
  workflow: Workflow,
  database: Database,
};

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="section-container">
        <SectionHeading
          eyebrow="What I Do"
          title="End-to-end engineering, backend-first."
          description="From API design to cloud infrastructure — the full lifecycle of a production system."
        />

        <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <motion.div key={service.id} variants={revealItem}>
                <GlowCard className="h-full">
                  <div className="inline-flex rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/15 p-3 text-accent">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </GlowCard>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
