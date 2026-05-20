import * as React from "react";
import { cn } from "@/shared/lib/utils";

type SurfaceProps = React.HTMLAttributes<HTMLDivElement>;

export function Surface({ className, ...props }: SurfaceProps) {
  return (
    <div
      className={cn(
        "bg-card border border-rule rounded-[12px]",
        className,
      )}
      {...props}
    />
  );
}
