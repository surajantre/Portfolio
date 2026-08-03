"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float, useProgress } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "@/lib/store";
import { MapPin, Languages, Heart, Zap, TrendingUp, Github, ExternalLink, X } from "lucide-react";

import { identity, summary, spokenLanguages, personal, education, projects, projectCategories, type Project } from "@/lib/content";
import { SectionHeading, GlowCard, Badge } from "@/components/ui/primitives";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

// --- Global state for R3F to read without re-renders ---
export const scrollState = { progress: 0 };

// --- 3D Model Component ---
function ScrollModel({ isModalOpen }: { isModalOpen: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const { active, progress, errors, item, loaded, total } = useProgress();
  const setLoaded = useAppStore((state) => state.setLoaded);
  const { viewport } = useThree();
  
  useEffect(() => {
    if (progress === 100) setLoaded(true);
  }, [progress, setLoaded]);

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current || isModalOpen) return;

    const p = scrollState.progress;

    // Timeline Animations based on scroll progress (p)
    
    // Calculate responsive parameters based on actual 3D viewport width
    const isMobile = viewport.width < 5;
    const targetScale = isMobile ? 1.0 : 1.5;
    const startX = isMobile ? 0 : viewport.width * 0.28;
    const startY = isMobile ? viewport.height * 0.35 : 0; // Push to top on mobile

    // 1. Position X: Starts right (About), moves center (Transition), stays center (Projects)
    let targetX = 0;
    if (p < 0.3) targetX = startX;
    else if (p < 0.5) targetX = THREE.MathUtils.lerp(startX, 0, (p - 0.3) / 0.2);
    else targetX = 0; // Center for Projects
    
    // 2. Position Y (On mobile, push it up during About so it doesn't overlap text)
    let targetY = 0;
    if (isMobile && p < 0.3) targetY = startY;
    else if (isMobile && p < 0.5) targetY = THREE.MathUtils.lerp(startY, 0, (p - 0.3) / 0.2);
    
    // 3. Position Z (Depth / Scale)
    let targetZ = 0;
    if (p < 0.3) targetZ = 0;
    else if (p < 0.5) targetZ = THREE.MathUtils.lerp(0, -3, (p - 0.3) / 0.2);
    else targetZ = -3;

    // 4. Rotation
    const targetRotX = p * Math.PI * 2;
    const targetRotY = p * Math.PI * 4;

    // Smoothly interpolate to targets
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, targetX, 4, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, targetY, 4, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 4, delta);
    
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRotX, 4, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRotY, 4, delta);
    
    // 5. Material property shifts (e.g. gets more distorted/transparent during projects)
    const targetRoughness = p > 0.4 ? 0.4 : 0.1;
    materialRef.current.roughness = THREE.MathUtils.damp(materialRef.current.roughness, targetRoughness, 2, delta);
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={viewport.width < 5 ? 1.0 : 1.5}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          color="#8b5cf6"
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  );
}

// --- Helper Components for About ---
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-2/60 backdrop-blur-md p-3 border border-border/50">
      <div className="flex items-center gap-1.5 text-accent">{icon}</div>
      <div className="mt-2 text-[11px] uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-foreground">{value}</div>
    </div>
  );
}

// --- Main Scroll Sequence Component ---
export function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    scrollState.progress = latest;
  });

  // Apple-style cubic-bezier easing
  const easing = [0.16, 1, 0.3, 1];

  // --- About Section Transforms (0.0 to 0.4) ---
  const aboutOpacity = useTransform(scrollYProgress, [0, 0.05, 0.3, 0.4], [0, 1, 1, 0]);
  const aboutY = useTransform(scrollYProgress, [0, 0.05, 0.3, 0.4], [50, 0, 0, -100]);
  const aboutPointerEvents = useTransform(scrollYProgress, (p) => (p > 0.4 ? "none" : "auto"));

  // --- Projects Header Transforms (0.4 to 0.5) ---
  const projectsHeaderOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.95, 1], [0, 1, 1, 0]);
  const projectsHeaderY = useTransform(scrollYProgress, [0.4, 0.45, 0.95, 1], [50, 0, 0, -50]);

  // --- Projects Modal State ---
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const setHovering3D = useAppStore((state) => state.setHovering3D);
  const numProjects = projects.length;
  const projectScrollStart = 0.5;
  const projectScrollEnd = 0.95;
  const scrollPerProject = (projectScrollEnd - projectScrollStart) / numProjects;

  return (
    <section ref={containerRef} className="relative h-[800vh] bg-background">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        <div 
          className="absolute inset-0 z-0"
          onMouseEnter={() => setHovering3D(true)}
          onMouseLeave={() => setHovering3D(false)}
        >
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4338ca" />
            <ScrollModel isModalOpen={!!selectedProject} />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* --- About Section Overlay --- */}
        <motion.div
          style={{ opacity: aboutOpacity, y: aboutY, pointerEvents: aboutPointerEvents as any }}
          className="absolute inset-0 z-10 flex flex-col pt-24 pb-8"
        >
          <div className="section-container w-full flex-1 overflow-y-auto no-scrollbar flex flex-col justify-center">
            <div className="max-w-xl md:max-w-2xl mt-[35vh] md:mt-0 pb-12">
              <SectionHeading
                eyebrow="About"
                title="Engineering systems that scale, quietly and reliably."
              />
              
              <GlowCard className="mt-8 p-6 bg-background/40 backdrop-blur-xl border-border/50">
                <p className="text-base leading-relaxed text-muted sm:text-lg">{summary}</p>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <InfoItem icon={<MapPin size={16} />} label="Based in" value={identity.location} />
                  <InfoItem icon={<Languages size={16} />} label="Languages" value={spokenLanguages.map((l) => l.language).join(", ")} />
                  <InfoItem icon={<Zap size={16} />} label="Availability" value={identity.availability} />
                </div>
                <div className="mt-8 border-t border-border/40 pt-6">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Heart size={14} className="text-accent" /> Strengths
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {personal.strengths.map((s) => (
                      <span key={s} className="rounded-full border border-border/50 bg-surface-2/50 px-3 py-1 text-xs text-muted backdrop-blur-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </GlowCard>
            </div>
          </div>
        </motion.div>

        {/* --- Projects Section Overlay --- */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="section-container h-full w-full relative">
            
            {/* Projects Header */}
            <motion.div
              style={{ opacity: projectsHeaderOpacity, y: projectsHeaderY }}
              className="absolute top-12 md:top-28 left-0 right-0 pointer-events-auto z-30"
            >
              <SectionHeading
                eyebrow="Projects"
                title="Selected, production-shipped work."
                description="Keep scrolling to explore my recent work."
              />
            </motion.div>

            {/* Project Cards (3D Entering Effect) */}
            <div className="absolute inset-0 flex items-center justify-center">
              {projects.map((project, index) => {
                const start = projectScrollStart + index * scrollPerProject;
                const peak = start + scrollPerProject / 2;
                const end = start + scrollPerProject;

                // Opacity: fades in, stays, fades out
                const opacity = useTransform(
                  scrollYProgress,
                  [start - 0.05, start, end - 0.05, end],
                  [0, 1, 1, 0]
                );

                // Scale: starts tiny (far away), scales up to normal, then huge (passes the camera)
                const scale = useTransform(
                  scrollYProgress,
                  [start - 0.05, start, end],
                  [0.5, 1, 2.5]
                );

                // Y-translation: comes from bottom, centers, goes to top
                const y = useTransform(
                  scrollYProgress,
                  [start - 0.05, start, end],
                  [300, 0, -500]
                );

                const pointerEvents = useTransform(
                  scrollYProgress,
                  (p) => (p >= start && p <= end ? "auto" : "none")
                );

                return (
                  <motion.div
                    key={project.id}
                    style={{ opacity, scale, y, pointerEvents: pointerEvents as any }}
                    className="absolute max-w-xl w-full px-4"
                  >
                    <TiltCard 
                      layoutId={`project-${project.id}`} 
                      onClick={() => setSelectedProject(project)}
                    >
                      <GlowCard 
                        className="group flex flex-col overflow-hidden rounded-3xl text-left bg-background/60 backdrop-blur-2xl border-border/50 shadow-2xl cursor-pointer hover:border-accent/50 transition-colors"
                      >
                        <div
                          className="relative flex h-48 items-end p-6"
                          style={{ background: `linear-gradient(135deg, ${project.gradient[0]}40, ${project.gradient[1]}40)` }}
                        >
                          <div
                            className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-80"
                            style={{
                              background: `radial-gradient(circle at 30% 20%, ${project.gradient[0]}60, transparent 60%), radial-gradient(circle at 80% 80%, ${project.gradient[1]}60, transparent 60%)`,
                            }}
                          />
                          {project.metric && (
                            <span className="glass relative z-10 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-foreground backdrop-blur-md">
                              <TrendingUp size={14} className="text-accent" />
                              {project.metric}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <span className="text-xs font-bold uppercase tracking-widest text-accent">
                            {project.category}
                          </span>
                          <h3 className="mt-3 font-display text-2xl font-bold text-foreground">
                            {project.title}
                          </h3>
                          <p className="mt-3 line-clamp-2 text-sm text-muted/90 leading-relaxed">{project.blurb}</p>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {project.stack.slice(0, 4).map((t) => (
                              <Badge key={t} className="bg-surface-2/50 backdrop-blur-sm border-border/50">{t}</Badge>
                            ))}
                            {project.stack.length > 4 && <Badge className="bg-surface-2/50 border-border/50">+{project.stack.length - 4}</Badge>}
                          </div>
                        </div>
                      </GlowCard>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
      
      {/* Projects Modal rendered via React Portal or Absolute fixed */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} easing={easing} />
    </section>
  );
}

function ProjectModal({ project, onClose, easing }: { project: Project | null; onClose: () => void; easing: number[] }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            layoutId={`project-${project.id}`}
            className="glass relative flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-[2rem] bg-background/95 border border-border/50 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-50 rounded-full bg-surface-2/80 p-2 text-muted transition-colors hover:text-foreground hover:bg-surface-2"
            >
              <X size={18} />
            </button>

            <div
              className="relative shrink-0 flex h-32 items-end p-6 sm:h-40 sm:p-8"
              style={{ background: `linear-gradient(135deg, ${project.gradient[0]}30, ${project.gradient[1]}30)` }}
            >
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${project.gradient[0]}60, transparent 60%), radial-gradient(circle at 80% 80%, ${project.gradient[1]}60, transparent 60%)`,
                }}
              />
              <span className="relative z-10 text-xs font-bold uppercase tracking-widest text-foreground/90 mix-blend-overlay">
                {project.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-10">
              <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted/90 sm:text-base">{project.blurb}</p>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/80">Highlights</h4>
                <ul className="mt-3 space-y-2 text-sm text-muted/90">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/80">Tech Stack</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <Badge key={t} className="bg-surface-2/60 border-border/40 text-xs">{t}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-surface-2 px-5 py-3 text-sm font-bold text-foreground transition-all hover:bg-surface-2/80 hover:scale-[1.02]"
                >
                  <Github size={16} /> Source Code
                </a>
                <a
                  href={project.liveUrl ?? "#"}
                  target={project.liveUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-5 py-3 text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-lg shadow-accent/20",
                    !project.liveUrl && "opacity-50 cursor-not-allowed hover:scale-100 shadow-none"
                  )}
                >
                  <ExternalLink size={16} /> {project.liveUrl ? "Visit Live Site" : "Offline"}
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
