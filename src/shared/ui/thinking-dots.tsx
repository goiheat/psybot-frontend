import * as React from "react";
import { cn } from "@/shared/lib/utils";

type ThinkingDotsProps = React.HTMLAttributes<HTMLSpanElement>;

export function ThinkingDots({ className, ...props }: ThinkingDotsProps) {
  return (
    <span
      aria-live="polite"
      aria-label="агент пишет"
      className={cn(
        "inline-flex items-center gap-[5px] h-[1.2em] align-middle",
        className,
      )}
      {...props}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-ink-3 animate-think-pulse" />
      <span
        className="w-[5px] h-[5px] rounded-full bg-ink-3 animate-think-pulse"
        style={{ animationDelay: "200ms" }}
      />
      <span
        className="w-[5px] h-[5px] rounded-full bg-ink-3 animate-think-pulse"
        style={{ animationDelay: "400ms" }}
      />
    </span>
  );
}
