"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Trophy, ArrowUpRight } from "lucide-react";
import { codingProfiles } from "@/lib/content";
import { GlowCard } from "@/components/ui/primitives";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";

const ICONS = {
  github: Github,
  hackerrank: Trophy,
  linkedin: Linkedin,
} as const;

export function CodingProfiles() {
  return (
    <section className="relative py-20">
      <div className="section-container">
        <RevealGroup className="grid gap-5 sm:grid-cols-3" stagger={0.08}>
          {codingProfiles.map((profile) => {
            const Icon = ICONS[profile.id as keyof typeof ICONS];
            return (
              <motion.div key={profile.id} variants={revealItem}>
                <a
                  href={profile.url}
                  target={profile.url === "#" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <GlowCard className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex rounded-xl bg-surface-2 p-2.5 text-accent">
                        <Icon size={18} />
                      </div>
                      <ArrowUpRight size={16} className="text-muted" />
                    </div>
                    <p className="mt-4 font-display text-base font-semibold text-foreground">
                      {profile.label}
                    </p>
                    <p className="text-sm text-muted">{profile.handle}</p>
                    <p className="mt-3 text-xs font-medium text-accent">{profile.stat}</p>
                  </GlowCard>
                </a>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
