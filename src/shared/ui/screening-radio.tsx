"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/shared/lib/utils";

const ScreeningRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
));
ScreeningRadioGroup.displayName = "ScreeningRadioGroup";

const ScreeningRadio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    children: React.ReactNode;
    score?: number | string;
  }
>(({ className, children, score, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "group",
      "flex items-center gap-3 w-full text-left",
      "px-3.5 py-3",
      "rounded-md border border-rule",
      "bg-bg-soft",
      "transition-[border-color,background-color,transform] duration-[240ms] ease-psyboy",
      "hover:border-sage hover:bg-card",
      "data-[state=checked]:border-sage-deep data-[state=checked]:bg-sage-soft",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  >
    <span
      className={cn(
        "w-4 h-4 rounded-full flex-none",
        "border-[1.5px] border-ink-3",
        "grid place-items-center",
        "transition-colors duration-[240ms]",
        "group-data-[state=checked]:border-sage-deep",
      )}
    >
      <RadioGroupPrimitive.Indicator className="block w-2 h-2 rounded-full bg-sage-deep" />
    </span>
    <span className="text-[15px] text-ink flex-1">{children}</span>
    {score !== undefined && (
      <span className="font-mono text-[11px] text-ink-3">{score}</span>
    )}
  </RadioGroupPrimitive.Item>
));
ScreeningRadio.displayName = "ScreeningRadio";

export { ScreeningRadioGroup, ScreeningRadio };
