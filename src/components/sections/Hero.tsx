"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin, Sparkles } from "lucide-react";
import { identity, heroKeywords, summary } from "@/lib/content";
import { MagneticButton } from "@/components/ui/primitives";
import { scrollToSection } from "@/lib/utils";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

function TypingKeyword() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = heroKeywords[index];
    if (!deleting && subIndex === current.length) {
      const pause = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(pause);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % heroKeywords.length);
      return;
    }
    const timeout = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? 40 : 85
    );
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <span className="text-gradient font-semibold">
      {heroKeywords[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <div className="absolute inset-0 -z-20 bg-aurora" />
      <HeroScene className="absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="section-container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            {identity.openToWork && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Open to work · {identity.availability}
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground balance sm:text-5xl md:text-6xl lg:text-[3.75rem]"
            >
              {identity.fullName}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-lg text-muted sm:text-xl"
            >
              {identity.title} — building with <TypingKeyword />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted"
            >
              {summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                as="a"
                href={identity.resumeUrl}
                variant="primary"
                ariaLabel="Download resume PDF"
              >
                <Download size={16} /> Download Resume
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection("contact")}
                variant="secondary"
                ariaLabel="Go to contact section"
              >
                <Mail size={16} /> Get in Touch
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-10 flex items-center gap-4"
            >
              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="rounded-full border border-border p-2.5 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
              >
                <Github size={18} />
              </a>
              <a
                href={identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="rounded-full border border-border p-2.5 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent"
              >
                <Linkedin size={18} />
              </a>
              <span className="text-sm text-muted">{identity.location}</span>
            </motion.div>
          </div>

          {/* 3D Scene is in the background, visible in this right column */}
          <div className="hidden lg:block pointer-events-none" />
        </div>
      </div>

      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-accent"
        aria-label="Scroll to About section"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown size={16} />
        </motion.span>
      </motion.button>
    </section>
  );
}
