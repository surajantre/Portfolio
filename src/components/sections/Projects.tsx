"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, ExternalLink, X, TrendingUp } from "lucide-react";
import { projects, projectCategories, type Project } from "@/lib/content";
import { SectionHeading, Badge } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="relative py-28">
      <div className="section-container">
        <SectionHeading
          eyebrow="Projects"
          title="Selected, production-shipped work."
          description="Backend-heavy platforms, AI-enabled tooling, and full-stack products — filter by category or open a card for details."
        />

        <div className="flex flex-wrap gap-2">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                filter === cat
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border text-muted hover:border-accent/40 hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.button
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(project)}
                className="glass card-hover group flex flex-col overflow-hidden rounded-2xl text-left"
              >
                <div
                  className="relative flex h-36 items-end p-5"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradient[0]}30, ${project.gradient[1]}30)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${project.gradient[0]}55, transparent 60%), radial-gradient(circle at 80% 80%, ${project.gradient[1]}55, transparent 60%)`,
                    }}
                  />
                  {project.metric && (
                    <span className="glass relative z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold text-foreground">
                      <TrendingUp size={12} className="text-accent" />
                      {project.metric}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">
                    {project.category}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{project.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                    {project.stack.length > 3 && <Badge>+{project.stack.length - 3}</Badge>}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl p-7"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-5 top-5 rounded-full bg-surface-2 p-2 text-muted transition-colors hover:text-foreground"
            >
              <X size={16} />
            </button>

            <span className="text-xs font-medium uppercase tracking-wider text-accent">
              {project.category}
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.blurb}</p>

            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Highlights
              </h4>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Tech Stack
              </h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>

            <div className="mt-7 flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href={project.liveUrl ?? "#"}
                target={project.liveUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-foreground"
                title={project.liveUrl ? undefined : "Live demo link — TODO: add when available"}
              >
                <ExternalLink size={14} /> Live Demo
              </a>
            </div>
            {!project.liveUrl && (
              <p className="mt-2 text-center text-[11px] text-muted">
                * Live demo link to be added — placeholder for now.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
