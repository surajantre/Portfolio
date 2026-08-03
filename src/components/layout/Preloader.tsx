"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

export function Preloader() {
  const isLoaded = useAppStore((state) => state.isLoaded);
  // Add a minimum display time so the animation doesn't just flash if 3D loads instantly
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1500); // 1.5 seconds minimum show time
    return () => clearTimeout(timer);
  }, []);

  const shouldHide = isLoaded && minTimeElapsed;

  // For users who prefer reduced motion, bypass the preloader minimum time if loaded
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMinTimeElapsed(true);
    }
  }, []);

  return (
    <AnimatePresence>
      {!shouldHide && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.5 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatType: "mirror", ease: "easeInOut" }}
              className="absolute h-24 w-24 rounded-full border border-accent"
            />
            
            {/* Initials Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="z-10 font-display text-4xl font-bold tracking-tighter text-foreground"
            >
              SA<span className="text-accent">.</span>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            Loading Assets
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
