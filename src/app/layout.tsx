import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PageTransition } from "@/components/layout/PageTransition";
import { Preloader } from "@/components/layout/Preloader";
import { identity, siteMeta } from "@/lib/content";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: "%s | Suraj Antre",
  },
  description: siteMeta.description,
  keywords: [
    "Suraj Antre",
    "Full Stack Python Developer",
    "FastAPI Developer",
    "Django Developer",
    "React Developer",
    "Next.js Developer",
    "AWS Developer Pune",
    "Senior Full Stack Developer India",
  ],
  authors: [{ name: identity.fullName, url: siteMeta.url }],
  creator: identity.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteMeta.url,
    title: siteMeta.title,
    description: siteMeta.description,
    siteName: `${identity.fullName} — Portfolio`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: identity.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.fullName,
    jobTitle: identity.title,
    url: siteMeta.url,
    email: identity.emailPrimary,
    telephone: identity.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    sameAs: [identity.linkedin, identity.github],
    knowsAbout: [
      "Python",
      "FastAPI",
      "Django",
      "React.js",
      "Next.js",
      "AWS",
      "Docker",
      "CI/CD",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased noise-overlay`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Preloader />
          <SmoothScroll>
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
