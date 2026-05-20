import Link from "next/link";

import type { ChatSummary } from "@/entities/chat";
import { Badge, LiveDot } from "@/shared/ui";
import { formatTime } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";

const monthShort = [
  "янв",
  "фев",
  "мар",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

const statusLabel: Record<ChatSummary["status"], string> = {
  open: "открыта",
  completed: "завершена",
  archived: "в архиве",
};

interface ChatRowProps {
  chat: ChatSummary;
  className?: string;
}

export function ChatRow({ chat, className }: ChatRowProps) {
  return (
    <Link
      href={`/chats/${chat.id}`}
      className={cn(
        "w-full flex items-start gap-5 px-5 py-4",
        "border border-rule rounded-[12px] bg-card",
        "transition-[border-color,background-color] duration-[240ms] ease-psyboy",
        "hover:border-ink-3 hover:bg-card-2/40",
        className,
      )}
    >
      <div className="w-12 shrink-0 pr-3 border-r border-rule-soft flex flex-col items-center">
        <div className="font-serif-display text-[20px] leading-none text-ink">
          {String(chat.startedAt.getDate()).padStart(2, "0")}
        </div>
        <div className="font-mono text-[10px] tracking-[0.06em] uppercase text-ink-3 mt-1">
          {monthShort[chat.startedAt.getMonth()]}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1">
          <h3 className="font-serif-display text-[17px] leading-tight text-ink truncate">
            {chat.title}
          </h3>
          {chat.status === "open" && <LiveDot />}
        </div>
        <p className="text-[13.5px] text-ink-3 line-clamp-2 mb-2.5">
          {chat.preview}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {chat.topics.slice(0, 4).map((t, i) => (
            <Badge key={i} variant={t.variant ?? "default"}>
              {t.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="shrink-0 text-right ml-auto pl-3">
        <div className="font-mono text-[11px] text-ink-3">
          {formatTime(chat.startedAt)}
        </div>
        <div className="text-[12px] text-ink-3 mt-1.5 inline-flex items-center gap-1.5">
          {chat.status === "open" && <LiveDot />}
          <span>{statusLabel[chat.status]}</span>
        </div>
      </div>
    </Link>
  );
}
