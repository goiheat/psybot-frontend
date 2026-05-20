"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

const phases = [
  { label: "вдох", scale: 1.18 },
  { label: "пауза", scale: 1.18 },
  { label: "выдох", scale: 0.78 },
  { label: "пауза", scale: 0.78 },
] as const;

interface BreathCircleProps {
  running?: boolean;
  className?: string;
}

export function BreathCircle({
  running = true,
  className,
}: BreathCircleProps) {
  const [phaseIndex, setPhaseIndex] = React.useState(0);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setPhaseIndex((p) => (p + 1) % phases.length);
    }, 4000);
    return () => clearInterval(id);
  }, [running]);

  const phase = phases[phaseIndex];

  return (
    <div
      className={cn(
        "relative w-[320px] h-[320px] grid place-items-center",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-full border border-rule" />
      <div className="absolute inset-6 rounded-full border border-rule opacity-70" />
      <div className="absolute inset-12 rounded-full border border-rule opacity-45" />

      <div
        className="w-[160px] h-[160px] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, #DEE5DD 0%, #C8D2C7 55%, #B5C2B5 100%)",
          boxShadow:
            "0 30px 80px -30px rgba(94,111,97,0.45), inset 0 1px 0 rgba(255,255,255,0.4)",
          transform: `scale(${phase.scale})`,
          transition: running
            ? "transform 4s cubic-bezier(0.45, 0, 0.55, 1)"
            : "transform 800ms ease-out",
        }}
      />

      <div
        aria-live="polite"
        className={cn(
          "absolute -bottom-11 left-0 right-0 text-center",
          "font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3",
        )}
      >
        {phase.label}
      </div>
    </div>
  );
}
