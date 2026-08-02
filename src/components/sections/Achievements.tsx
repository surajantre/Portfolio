"use client";

import { achievements } from "@/lib/content";
import { useCounter } from "@/hooks/useCounter";
import { SectionHeading } from "@/components/ui/primitives";

function Counter({ value, suffix, prefix, label }: { value: number; suffix: string; prefix?: string; label: string }) {
  const { ref, value: animated } = useCounter(value);

  return (
    <div ref={ref} className="glass card-hover rounded-2xl p-6 text-center sm:p-8">
      <div className="font-display text-3xl font-bold text-gradient sm:text-4xl">
        {prefix}
        {animated.toLocaleString()}
        {suffix}
      </div>
      <p className="mt-2 text-xs uppercase tracking-wider text-muted sm:text-sm">{label}</p>
    </div>
  );
}

export function Achievements() {
  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-aurora opacity-30" />
      <div className="section-container">
        <SectionHeading
          eyebrow="Achievements"
          title="Numbers that tell part of the story."
          align="center"
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {achievements.map((a) => (
            <Counter
              key={a.id}
              value={a.value}
              suffix={a.suffix}
              prefix={a.prefix}
              label={a.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
