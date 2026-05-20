import { cn } from "@/shared/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showName?: boolean;
  sublabel?: string;
  className?: string;
}

const sizeMap = {
  sm: { wrap: "w-6 h-6", dot: "w-2 h-2", name: "text-[15px]" },
  md: { wrap: "w-7 h-7", dot: "w-2.5 h-2.5", name: "text-[17px]" },
  lg: { wrap: "w-8 h-8", dot: "w-3 h-3", name: "text-[20px]" },
} as const;

export function Logo({
  size = "md",
  showName = true,
  sublabel,
  className,
}: LogoProps) {
  const s = sizeMap[size];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "rounded-md grid place-items-center bg-ink shrink-0",
          s.wrap,
        )}
      >
        <span className={cn("rounded-full bg-background", s.dot)} />
      </div>
      {showName && (
        <div className="leading-tight">
          <div className={cn("font-serif-display", s.name)}>PsyBoy</div>
          {sublabel && (
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-3">
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
