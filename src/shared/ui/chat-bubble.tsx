import * as React from "react";
import { cn } from "@/shared/lib/utils";

interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: "user" | "agent";
  streaming?: boolean;
}

export function ChatBubble({
  role,
  streaming,
  className,
  children,
  ...props
}: ChatBubbleProps) {
  if (role === "user") {
    return (
      <div className={cn("flex justify-end", className)} {...props}>
        <div
          className={cn(
            "bg-card-2 text-ink",
            "border border-rule",
            "rounded-[12px] rounded-br-[4px]",
            "px-4 py-3.5 max-w-[88%]",
            "text-[16px] leading-[1.5]",
          )}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "text-ink py-1 max-w-full",
        "[&+&]:mt-1.5",
        "text-[17px] leading-[1.6]",
        className,
      )}
      data-streaming={streaming || undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export function StreamCursor({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block align-[-2px] ml-0.5",
        "w-2 h-[1.05em] rounded-[1px]",
        "bg-sage-deep animate-cursor-pulse",
        className,
      )}
    />
  );
}
