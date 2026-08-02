"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { cn, scrollToSection } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { identity } from "@/lib/content";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function go(id: string) {
    setMobileOpen(false);
    scrollToSection(id);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "section-container flex items-center justify-between rounded-2xl px-5 py-2.5 transition-all duration-500",
          scrolled ? "glass shadow-lg shadow-black/10" : "bg-transparent"
        )}
      >
        <button
          onClick={() => go("hero")}
          className="font-display text-lg font-bold tracking-tight text-foreground"
          aria-label="Go to top"
        >
          Suraj<span className="text-gradient">.</span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === item.id ? "text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-surface-2"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <a
            href={identity.resumeUrl}
            download
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-2 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-accent/20 transition-transform hover:scale-105 sm:flex"
          >
            <Download size={14} /> Resume
          </a>
          <button
            className="rounded-full p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="section-container mt-2 lg:hidden"
            aria-label="Mobile"
          >
            <div className="glass flex flex-col gap-1 rounded-2xl p-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors",
                    active === item.id
                      ? "bg-surface-2 text-foreground"
                      : "text-muted hover:bg-surface-2 hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={identity.resumeUrl}
                download
                className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-2 px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Download size={14} /> Download Resume
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
