import { Bookmark, ArrowUpRight } from "lucide-react";

import { Eyebrow } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface RecapCardProps {
  text: string;
  href?: string;
  className?: string;
}

export function RecapCard({ text, href = "/chats", className }: RecapCardProps) {
  return (
    <div
      className={cn(
        "border border-rule rounded-[12px] bg-bg-soft",
        "px-5 py-4 flex items-start gap-4",
        className,
      )}
    >
      <Bookmark className="size-4 text-ink-3 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <Eyebrow className="mb-1.5">В прошлый раз</Eyebrow>
        <p className="text-[14.5px] leading-relaxed text-ink-2">{text}</p>
      </div>
      <a
        href={href}
        className="font-mono text-[11px] tracking-[0.06em] text-ink-3 hover:text-ink inline-flex items-center gap-1 shrink-0"
      >
        все сессии
        <ArrowUpRight className="size-3" />
      </a>
    </div>
  );
}
