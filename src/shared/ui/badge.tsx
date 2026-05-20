import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "rounded-sm px-2 py-1",
    "font-mono text-[11px] tracking-[0.06em]",
    "border",
    "[&_svg]:size-[12px] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-card-2 text-ink-2 border-rule",
        sage: "bg-sage-soft text-sage-deep border-sage-border",
        amber: "bg-amber-soft text-amber-text border-amber-border",
        clay: "bg-clay-soft text-clay-text border-clay-border",
        outline: "bg-transparent text-ink-3 border-rule",
        critical:
          "bg-critical text-critical-foreground border-critical",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
