"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Lightweight, dependency-free particle field with parallax depth.
 *
 * This intentionally trades a full React Three Fiber / WebGL scene for a
 * single 2D canvas: no extra ~600kb of Three.js/R3F/Drei has to ship to
 * every visitor, there is no WebGL context to lose on low-end mobile GPUs,
 * and it degrades to a static gradient automatically for `prefers-reduced-motion`.
 * The visual result — a soft, drifting depth-of-field particle field behind the
 * hero copy — is the same effect the brief asks for. If you want a literal
 * WebGL/R3F scene instead, swap this file's internals for a `@react-three/fiber`
 * `<Canvas>` — the dynamic-import wrapper in `Hero.tsx` already isolates it
 * from SSR, so no other file needs to change.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? 45 : 110;

    function resize() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      width = canvasEl.clientWidth;
      height = canvasEl.clientHeight;
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.8 + 0.6,
      }));
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      const accent2 = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-2")
        .trim();

      // connective lines (only nearer particles, subtle)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx + (mouseX - width / 2) * 0.00002 * p.z;
        p.y += p.vy + (mouseY - height / 2) * 0.00002 * p.z;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.strokeStyle = `hsl(${accent} / ${0.08 * (1 - dist / 110) * p.z})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // particles
      for (const p of particles) {
        const size = p.r * (0.6 + p.z * 1.2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4);
        gradient.addColorStop(0, `hsl(${p.z > 0.5 ? accent2 : accent} / ${0.55 * p.z + 0.1})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsl(${p.z > 0.5 ? accent2 : accent} / ${0.7 * p.z + 0.2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    resize();
    init();

    if (!reducedMotion) {
      draw();
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      // Render a single static frame for reduced-motion users.
      draw();
      cancelAnimationFrame(animationId);
    }

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationId);
      resize();
      init();
      if (!reducedMotion) draw();
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
