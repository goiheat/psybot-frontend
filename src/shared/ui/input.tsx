import * as React from "react";
import { cn } from "@/shared/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md border border-rule bg-bg-soft px-4 py-2",
        "text-[15px] text-ink placeholder:text-mute",
        "transition-colors duration-[240ms] ease-psyboy",
        "focus-visible:outline-none focus-visible:border-ink focus-visible:bg-card",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
