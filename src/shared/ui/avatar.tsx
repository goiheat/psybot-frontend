import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initial?: string;
  size?: number;
  variant?: "default" | "sage" | "clay" | "amber";
}

const variantStyle: Record<NonNullable<AvatarProps["variant"]>, string> = {
  default: "bg-card-2 border-rule text-ink",
  sage: "bg-sage-soft border-sage-border text-sage-deep",
  clay: "bg-clay-soft border-clay-border text-clay-text",
  amber: "bg-amber-soft border-amber-border text-amber-text",
};

export function Avatar({
  initial,
  size = 40,
  variant = "default",
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "rounded-full border grid place-items-center font-serif-display",
        variantStyle[variant],
        className,
      )}
      {...props}
    >
      <span style={{ fontSize: size * 0.42 }}>{initial}</span>
    </div>
  );
}
