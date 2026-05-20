import * as React from "react";
import { cn } from "@/shared/lib/utils";

type EyebrowProps<T extends React.ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Eyebrow<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: EyebrowProps<T>) {
  const Component = (as || "div") as React.ElementType;
  return (
    <Component
      className={cn(
        "font-mono text-[11px] tracking-[0.14em] uppercase text-ink-3",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
