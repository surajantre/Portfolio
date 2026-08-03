"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { identity } from "@/lib/content";
import { SectionHeading, MagneticButton, GlowCard } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus("sent");
        setValues({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-96 bg-aurora opacity-40" />
      <div className="section-container">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something reliable together."
          description="Immediately available for new opportunities — reach out directly or send a message below."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2" delay={0.05}>
            <div className="space-y-4">
              <ContactCard
                icon={<Mail size={18} />}
                label="Email"
                value={identity.emailPrimary}
                href={`mailto:${identity.emailPrimary}`}
              />
              <ContactCard
                icon={<Phone size={18} />}
                label="Phone"
                value={identity.phone}
                href={identity.phoneHref}
              />
              <ContactCard
                icon={<MapPin size={18} />}
                label="Location"
                value={identity.location}
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.15}>
            <GlowCard>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Name"
                    id="name"
                    required
                    value={values.name}
                    onChange={(v) => setValues((s) => ({ ...s, name: v }))}
                  />
                  <Field
                    label="Email"
                    id="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={(v) => setValues((s) => ({ ...s, email: v }))}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={values.message}
                    onChange={(e) => setValues((s) => ({ ...s, message: e.target.value }))}
                    className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                    placeholder="Tell me a bit about what you're building…"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <MagneticButton as="button" type="submit" variant="primary">
                    <Send size={15} /> {status === "sending" ? "Sending..." : "Send Message"}
                  </MagneticButton>
                  {status === "sent" && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-flex items-center gap-1.5 text-sm text-emerald-400"
                    >
                      <CheckCircle2 size={16} /> Message sent successfully!
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="inline-flex items-center gap-1.5 text-sm text-red-400"
                    >
                      Failed to send message. Please try again.
                    </motion.span>
                  )}
                </div>
              </form>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <GlowCard className="flex items-center gap-4 p-5">
      <div className="rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/15 p-3 text-accent">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
      </div>
    </GlowCard>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
        placeholder={label}
      />
    </div>
  );
}
