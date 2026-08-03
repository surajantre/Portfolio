"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { certificateGallery, certifications } from "@/lib/content";
import { SectionHeading, GlowCard } from "@/components/ui/primitives";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

export function Certificates() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function next() {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % certificateGallery.length));
  }
  function prev() {
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + certificateGallery.length) % certificateGallery.length
    );
  }

  return (
    <section id="certificates" className="relative py-28">
      <div className="section-container">
        <SectionHeading
          eyebrow="Certifications"
          title="39+ courses and counting."
          description="A selection of certifications from AWS, Infosys, Coursera, LinkedIn Learning, and more — plus the full visual archive below."
        />

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {certifications.map((cert) => (
            <motion.div key={cert.id} variants={revealItem}>
              <GlowCard className="flex h-full items-start gap-3 p-5">
                <div className="mt-0.5 shrink-0 rounded-lg bg-accent/10 p-2 text-accent">
                  <Award size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-snug text-foreground">
                    {cert.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                  <p className="mt-1 text-[11px] text-muted">
                    {cert.period} · {cert.mode}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-16">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Full certificate gallery
          </h3>
          <p className="mt-1 text-sm text-muted">
            Tap any certificate to view it larger. Personal HR documents are kept out of this
            public gallery.
          </p>
        </Reveal>

        <div className="mt-6 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
          {certificateGallery.map((img, i) => (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
              onClick={() => setLightboxIndex(i)}
              className="card-hover group relative block w-full overflow-hidden rounded-xl border border-border"
            >
              <Image
                src={img.src}
                alt={img.title}
                width={400}
                height={300}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="line-clamp-2 text-left text-xs font-medium text-white">
                  {img.title}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X size={20} />
            </button>
            <button
              onClick={prev}
              aria-label="Previous certificate"
              className="absolute left-3 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label="Next certificate"
              className="absolute right-3 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative z-[5] max-h-[85vh] max-w-3xl"
            >
              <Image
                src={certificateGallery[lightboxIndex].src}
                alt={certificateGallery[lightboxIndex].title}
                width={1000}
                height={750}
                className="max-h-[75vh] w-auto rounded-xl object-contain"
              />
              <p className="mt-3 text-center text-sm text-white/80">
                {certificateGallery[lightboxIndex].title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
