"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Users } from "lucide-react";
import { experience } from "@/lib/content";
import { SectionHeading, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="section-container">
        <SectionHeading
          eyebrow="Experience"
          title="Where the work has happened."
          description="Three-plus years across ERP platforms, AI-enabled tooling, and cloud infrastructure — most recent first."
        />

        <div className="relative">
          <div
            className="absolute left-[18px] top-2 hidden h-[calc(100%-16px)] w-px bg-gradient-to-b from-accent via-border to-transparent sm:block"
            aria-hidden
          />

          <div className="space-y-8">
            {experience.map((job, i) => (
              <Reveal key={job.id} delay={i * 0.04} y={20}>
                <div className="relative flex gap-6 sm:pl-0">
                  <div className="relative hidden shrink-0 sm:block">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`z-10 mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 ${
                        job.current
                          ? "border-accent bg-gradient-to-br from-accent to-accent-2"
                          : "border-border bg-surface"
                      }`}
                    >
                      <Briefcase size={14} className={job.current ? "text-white" : "text-muted"} />
                    </motion.div>
                  </div>

                  <div className="glass card-hover flex-1 rounded-2xl p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {job.role}
                        </h3>
                        <p className="text-sm font-medium text-accent">{job.company}</p>
                      </div>
                      {job.current && (
                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                      <span>{job.period}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} /> {job.location}
                      </span>
                      {job.teamSize && (
                        <span className="inline-flex items-center gap-1">
                          <Users size={12} /> Team of {job.teamSize}
                        </span>
                      )}
                    </div>

                    {job.points.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm text-muted">
                        {job.points.map((p, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {job.tech.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {job.tech.map((t) => (
                          <Badge key={t}>{t}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
