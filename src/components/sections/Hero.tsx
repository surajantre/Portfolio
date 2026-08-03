"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin, Sparkles } from "lucide-react";
import { identity, heroKeywords, summary } from "@/lib/content";
import { MagneticButton } from "@/components/ui/primitives";
import { TiltCard } from "@/components/ui/TiltCard";
import { scrollToSection } from "@/lib/utils";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 -z-10 h-full w-full bg-transparent" />
  }
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
      className="relative flex min-h-[100svh] flex-col overflow-x-hidden pt-28 pb-12"
    >
      <div className="absolute inset-0 -z-20 bg-aurora" />
      <HeroScene className="absolute inset-0 -z-10 h-full w-full opacity-90" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="section-container my-auto">
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
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
              className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <div className="w-full sm:w-auto flex justify-center">
                <MagneticButton
                  as="a"
                  href={identity.resumeUrl}
                  variant="primary"
                  ariaLabel="Download resume PDF"
                >
                  <Download size={16} /> Download Resume
                </MagneticButton>
              </div>
              <div className="w-full sm:w-auto flex justify-center">
                <MagneticButton
                  onClick={() => scrollToSection("contact")}
                  variant="secondary"
                  ariaLabel="Go to contact section"
                >
                  <Mail size={16} /> Get in Touch
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-4"
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-12 block aspect-[4/5] w-[90%] max-w-[340px] sm:max-w-md lg:mt-0 lg:w-full"
          >
            <div className="absolute inset-6 animate-float rounded-[2.5rem] bg-gradient-to-br from-accent/40 to-accent-2/40 blur-3xl opacity-60" />
            
            <TiltCard className="h-full w-full">
              <div className="glass relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[2.5rem] p-6 sm:p-8 group border border-accent/20 hover:border-accent/50 shadow-2xl transition-all duration-500 hover:shadow-accent/20">
                
                {/* 3D Cutout Image Background */}
                <motion.img 
                  src="/Suraj_Photo-removebg-preview.png"
                  alt="Suraj Antre"
                  className="absolute -right-4 bottom-12 sm:bottom-20 z-0 h-[85%] sm:h-[95%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:-translate-x-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
                
                {/* Gradients for text readability over the image */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-background/95 via-transparent to-transparent" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <Sparkles className="text-accent animate-pulse" size={20} />
                  <span className="font-mono text-xs font-medium text-accent/80">~/suraj-antre</span>
                </div>
                
                <div className="relative z-10 mt-auto mb-6 sm:mb-8 space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                  <p className="text-muted">$ whoami</p>
                  <p className="text-foreground font-semibold">senior_fullstack_python_dev</p>
                  <p className="text-muted">$ stack --core</p>
                  <p className="text-accent font-medium">FastAPI · Django · React · Next.js</p>
                </div>
                
                <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 text-center">
                  {[
                    ["3+", "Years exp."],
                    ["9+", "Projects"],
                    ["39+", "Repos"],
                  ].map(([n, l]) => (
                    <div key={l} className="rounded-xl bg-surface-2/90 backdrop-blur-md py-2 sm:py-3 border border-border/50 shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover:border-accent/40 transition-colors">
                      <div className="font-display text-base sm:text-lg font-bold text-foreground">{n}</div>
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
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
