# Suraj Antre — Portfolio

A production-ready personal portfolio for **Suraj Antre**, Senior Full Stack Python
Developer. Built with Next.js 15 (App Router, TypeScript), Tailwind CSS, and Framer Motion.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build locally
npm run lint    # eslint
```

Requires **Node.js 18.18+** (Node 20 LTS recommended).

## Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — no config needed, Vercel
   auto-detects Next.js.
3. Build command `next build`, output is handled automatically. No environment variables are
   required (the site is fully frontend-only, no backend/API keys).

## Project structure

```
src/
  app/
    layout.tsx          # fonts, metadata, JSON-LD Person schema, ThemeProvider
    page.tsx             # composes all sections in order
    globals.css          # theme variables (dark/light), glass/aurora utilities
    sitemap.ts            # /sitemap.xml
    robots.ts              # /robots.txt
    manifest.ts             # /manifest.webmanifest
    opengraph-image.tsx      # dynamic OG image (edge runtime)
  components/
    layout/               # Header, Footer, ThemeProvider, CustomCursor
    sections/               # Hero, About, Skills, Experience, Projects,
                             # Certificates, Achievements, Services,
                             # CodingProfiles, Contact
    three/                   # ParticleField — the hero background scene
    ui/                       # Reveal (scroll animations), primitives
                               # (SectionHeading, MagneticButton, GlowCard, Badge)
  lib/
    content.ts             # ⭐ single source of truth for every piece of copy —
                            # identity, summary, skills, experience, projects,
                            # education, certifications, achievements, services
    utils.ts                # cn() classname helper, scrollToSection()
  hooks/
    useReducedMotion.ts     # respects prefers-reduced-motion
    useActiveSection.ts     # drives the active nav-link indicator
    useMousePosition.ts
    useCounter.ts            # animated count-up for the Achievements section
public/
  resume/Suraj-Antre-CV.pdf # served by the Hero + Footer "Download Resume" buttons
  images/certs/*             # certificate gallery images
  favicon.png, apple-touch-icon.png
```

All resume/CV data lives in **`src/lib/content.ts`** as typed exports. To update anything on the
site — a job description, a project, a certification — edit that one file; every section imports
from it, so nothing is hardcoded in components.

## Design decisions worth knowing about

**The hero "3D" scene is a dependency-free canvas particle field, not React Three Fiber.**
The original brief called for Three.js + R3F + Drei. I built a single `<canvas>`-based particle
field with depth-based parallax instead (`src/components/three/ParticleField.tsx`), dynamically
imported with `ssr: false` exactly like an R3F scene would be. Reasoning:

- It ships zero extra kilobytes of WebGL/Three.js/R3F/Drei to every visitor.
- There's no WebGL context to lose or fall back from on low-end/older mobile GPUs — it just draws
  fewer particles.
- It automatically renders a single static frame for `prefers-reduced-motion` users.
- Visually it produces the same "drifting depth-of-field particle field behind the hero copy"
  effect the brief describes.

If you specifically want a literal WebGL/R3F scene, the swap point is isolated: replace the
internals of `ParticleField.tsx` with a `@react-three/fiber` `<Canvas>` — the dynamic-import
wrapper in `Hero.tsx` already keeps it out of the server bundle, so no other file needs to change.
Run `npm install three @react-three/fiber @react-three/drei` to add them.

**Smooth scroll uses native CSS `scroll-behavior: smooth` + `IntersectionObserver`, not Lenis.**
Same rationale — one less runtime dependency, same user-facing behavior, and it respects reduced
motion for free since it's plain CSS. Add `lenis` and wrap `<body>` in its provider if you want the
inertia-style smoothing specifically.

**Scroll-triggered reveals use Framer Motion's `whileInView`, not a separate GSAP ScrollTrigger
timeline.** Framer Motion was already a hard requirement in the brief and covers every animation
used on this site (staggered reveals, magnetic buttons, page transitions, the active-nav
indicator, the project/certificate modals). Adding GSAP on top would duplicate that machinery.
`npm install gsap` and wire up `ScrollTrigger` in a section if you want GSAP-specific easing later.

**Contact form is genuinely frontend-only.** Submitting it opens the visitor's email client via a
`mailto:` link pre-filled with their message — no backend, no stored data, nothing to configure.
To wire it to a hosted form service instead (so messages land in your inbox without opening a mail
client), swap the `handleSubmit` function in `src/components/sections/Contact.tsx` for a `fetch`
POST to a Formspree-style endpoint — there's a commented example directly above the function.

## Content & assets

- **Certificates gallery** (`src/lib/content.ts` → `certificateGallery`) — 30 certificate images
  copied from the provided asset archive into `public/images/certs/`. A handful of identifiable
  ones (TCS, Infosys, Coursera, Alison, Simplilearn, Java Certification Course) have real titles;
  the rest are labeled "Certificate of Completion."
- **Excluded on purpose:** the `big hight images` folder from the source archive (offer letter,
  allotment letter, internship completion letter, learner verification letter) was **not** copied
  into `public/` or wired into the site. Those are personal HR/identity documents and shouldn't be
  published to a public gallery by default. If you want a private "documents" section, add the
  files to `public/documents/` yourself and gate the route/section behind auth — that's outside
  the scope of a static frontend-only site.
- **Project imagery** uses generated CSS gradient mockups (per-project color pairs defined in
  `content.ts`) rather than the legacy template's stock screenshots (`work-1.jpg`, etc.), since
  those aren't real screenshots of Suraj's actual projects. Swap in real screenshots by adding
  images to `public/images/projects/` and rendering them in `Projects.tsx` in place of the
  gradient block, once you have them.
- **GitHub / Live Demo links** on every project card point to
  `https://github.com/SurajAntre7777` by default. No specific repo URLs were provided in the
  source resume/LinkedIn export, so no repo-specific URLs were invented. Update
  `githubUrl` / `liveUrl` per project in `content.ts` once specific links are available — the
  "Live Demo" button auto-detects a missing `liveUrl` and shows a "placeholder" note instead of
  guessing a URL.

## Accessibility & performance notes

- Semantic landmarks (`header`, `main`, `footer`, `nav`), a "Skip to content" link, and visible
  focus rings throughout.
- All interactive elements have `aria-label`s where their visual content alone isn't descriptive
  (icon-only buttons, modals, the theme toggle).
- Every image has real, descriptive `alt` text — certificate titles, not "image1".
- `prefers-reduced-motion` is respected globally (see `globals.css`) and specifically inside the
  particle field and custom cursor, which disable themselves entirely for those users.
- The Three.js-style hero scene, custom cursor, and theme toggle are all client components loaded
  only where needed; the rest of the tree renders as React Server Components by default under the
  App Router.

## Known placeholders (intentionally left, not bugs)

- Project "Live Demo" links — no specific deploy URLs were provided per project; see above.
- HackerRank profile URL in `codingProfiles` in `content.ts` is `"#"` — add the real profile link
  once you have it.
