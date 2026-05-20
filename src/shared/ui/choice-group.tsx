"use client";

import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface ChoiceOption<T extends string> {
  value: T;
  label: string;
}

interface ChoiceGroupProps<T extends string> {
  value: T;
  onValueChange?: (value: T) => void;
  options: readonly ChoiceOption<T>[];
  className?: string;
  ariaLabel?: string;
}

export function ChoiceGroup<T extends string>({
  value,
  onValueChange,
  options,
  className,
  ariaLabel,
}: ChoiceGroupProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-rule bg-bg-soft p-1",
        className,
      )}
    >
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onValueChange?.(opt.value)}
            className={cn(
              "px-3 h-8 rounded-sm text-[13px] font-medium",
              "transition-all duration-[240ms] ease-psyboy",
              selected
                ? "bg-ink text-background shadow-soft"
                : "text-ink-2 hover:text-ink hover:bg-card",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
