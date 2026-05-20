import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  variant?: "sage" | "amber" | "clay" | "critical";
  thickness?: number;
}

const fillColor: Record<NonNullable<MeterProps["variant"]>, string> = {
  sage: "bg-sage-deep",
  amber: "bg-amber",
  clay: "bg-clay",
  critical: "bg-critical",
};

export function Meter({
  value,
  variant = "sage",
  thickness = 6,
  className,
  ...props
}: MeterProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("bg-rule-soft rounded-full overflow-hidden", className)}
      style={{ height: thickness }}
      {...props}
    >
      <i
        className={cn(
          "block h-full transition-[width] duration-[600ms] ease-psyboy",
          fillColor[variant],
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
