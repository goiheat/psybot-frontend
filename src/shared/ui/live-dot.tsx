import { cn } from "@/shared/lib/utils";

export function LiveDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block w-1.5 h-1.5 rounded-full bg-sage-deep animate-live-dot",
        className,
      )}
    />
  );
}

export function BreathMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block w-3.5 h-3.5 rounded-full bg-sage-deep animate-breath-mark",
        className,
      )}
    />
  );
}
