"use client";

import { cn } from "@/shared/lib/utils";

interface CodeCellProps {
  value?: string;
  active?: boolean;
  className?: string;
}

export function CodeCell({ value, active, className }: CodeCellProps) {
  const filled = !!value;
  return (
    <div
      className={cn(
        "w-16 h-[72px] rounded-[10px] border bg-bg-soft grid place-items-center",
        "font-serif-display text-[32px] text-ink",
        "transition-colors duration-[240ms] ease-psyboy",
        filled && "bg-card border-rule",
        active && "bg-card border-ink ring-2 ring-ink/5",
        !filled && !active && "border-rule",
        className,
      )}
    >
      {value ? (
        <span>{value}</span>
      ) : active ? (
        <span className="block w-[2px] h-8 bg-ink animate-cursor-pulse" />
      ) : null}
    </div>
  );
}
