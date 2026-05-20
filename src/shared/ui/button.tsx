import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2.5 whitespace-nowrap",
    "font-medium select-none",
    "transition-all duration-[240ms] ease-psyboy",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-[1.05em] [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        ink: "bg-ink text-background hover:opacity-90 rounded-md",
        sage: "bg-sage-deep text-background hover:opacity-90 rounded-md",
        ghost:
          "bg-transparent text-ink border border-rule hover:border-ink-3 hover:bg-card rounded-md",
        tertiary: "bg-transparent text-ink-2 hover:text-ink rounded-md",
        link: "text-ink underline underline-offset-4 decoration-rule hover:decoration-ink-3 rounded-none p-0 h-auto",
        destructive:
          "bg-destructive text-destructive-foreground hover:opacity-90 rounded-md",
        critical:
          "bg-critical text-critical-foreground hover:opacity-90 rounded-md",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-9 px-3.5 text-[14px] rounded-sm",
        lg: "h-12 px-6 text-[16px]",
        icon: "h-10 w-10 [&_svg]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "sage",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
