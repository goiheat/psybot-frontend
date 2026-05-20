import { cn } from "@/shared/lib/utils";

interface SparklineProps {
  values: number[];
  variant?: "sage" | "amber" | "clay";
  width?: number;
  height?: number;
  className?: string;
}

const stroke: Record<NonNullable<SparklineProps["variant"]>, string> = {
  sage: "var(--sage-deep)",
  amber: "var(--amber)",
  clay: "var(--clay)",
};

export function Sparkline({
  values,
  variant = "sage",
  width = 120,
  height = 24,
  className,
}: SparklineProps) {
  if (values.length === 0) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = width / (values.length - 1 || 1);

  const points = values.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / span) * (height - 4) - 2;
    return `${x},${y}`;
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
      className={cn("overflow-visible", className)}
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={stroke[variant]}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface MiniBarsProps {
  values: number[];
  variant?: "sage" | "amber" | "clay";
  className?: string;
}

const barFill: Record<NonNullable<MiniBarsProps["variant"]>, string> = {
  sage: "bg-sage-deep",
  amber: "bg-amber",
  clay: "bg-clay",
};

export function MiniBars({
  values,
  variant = "sage",
  className,
}: MiniBarsProps) {
  const max = Math.max(...values, 1);
  return (
    <div
      className={cn(
        "flex items-end gap-1 h-7 w-full max-w-[140px]",
        className,
      )}
      aria-hidden
    >
      {values.map((v, i) => (
        <div
          key={i}
          className={cn("flex-1 rounded-[2px] opacity-80", barFill[variant])}
          style={{ height: `${Math.max(8, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}
