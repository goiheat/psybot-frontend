import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface SessionRuleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SessionRule({
  className,
  children,
  ...props
}: SessionRuleProps) {
  return (
    <div
      role="separator"
      className={cn(
        "flex items-center gap-3.5",
        "text-ink-3",
        "font-mono text-[11px] tracking-[0.16em] uppercase",
        "before:content-[''] before:flex-1 before:h-px before:bg-rule",
        "after:content-[''] after:flex-1 after:h-px after:bg-rule",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
    </div>
  );
}
