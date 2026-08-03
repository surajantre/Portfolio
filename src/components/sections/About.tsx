"use client";

import { MapPin, Languages, Heart, Zap } from "lucide-react";
import { identity, summary, spokenLanguages, personal, education } from "@/lib/content";
import { SectionHeading, GlowCard } from "@/components/ui/primitives";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="section-container">
        <SectionHeading
          eyebrow="About"
          title="Engineering systems that scale, quietly and reliably."
          description="A closer look at how I work, what I value, and where I've come from."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3" delay={0.05}>
            <GlowCard className="h-full">
              <p className="text-base leading-relaxed text-muted sm:text-lg">{summary}</p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <InfoItem icon={<MapPin size={16} />} label="Based in" value={identity.location} />
                <InfoItem
                  icon={<Languages size={16} />}
                  label="Languages"
                  value={spokenLanguages.map((l) => l.language).join(", ")}
                />
                <InfoItem
                  icon={<Zap size={16} />}
                  label="Availability"
                  value={identity.availability}
                />
              </div>

              <div className="mt-8 border-t border-border/60 pt-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Heart size={14} className="text-accent" /> Strengths
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {personal.strengths.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-foreground">Hobbies</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {personal.hobbies.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </Reveal>

          <div className="mt-12 lg:col-span-2 lg:mt-0">
            <Reveal delay={0.15}>
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
                Education
              </h3>
            </Reveal>
            <RevealGroup className="space-y-4" stagger={0.08}>
              {education.map((e) => (
                <motion.div key={e.id} variants={revealItem}>
                  <GlowCard className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{e.degree}</p>
                        <p className="mt-1 text-sm text-muted">{e.institute}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted">
                      <span>{e.period}</span>
                      <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-accent">
                        {e.detail}
                      </span>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-surface-2 p-3">
      <div className="flex items-center gap-1.5 text-accent">{icon}</div>
      <div className="mt-2 text-[11px] uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}
