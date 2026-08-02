import { Github, Linkedin, Mail, Download, ArrowUpRight } from "lucide-react";
import { identity } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-surface/40">
      <div className="section-container py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="font-display text-xl font-bold text-foreground">
              Suraj<span className="text-gradient">.</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">
              {identity.title} building scalable, production-grade systems from Pune, India.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Reach me
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${identity.emailPrimary}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Mail size={14} /> {identity.emailPrimary}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${identity.emailSecondary}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Mail size={14} /> {identity.emailSecondary}
                </a>
              </li>
              <li>
                <a
                  href={identity.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  {identity.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Elsewhere
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <a
                  href={identity.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Github size={14} /> GitHub <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a
                  href={identity.resumeUrl}
                  download
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <Download size={14} /> Download Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} {identity.fullName}. All rights reserved.
          </p>
          <p>Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
