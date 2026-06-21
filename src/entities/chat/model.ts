import type { ChatMessage } from "@/entities/message";
import type { PsyboyThread } from "@/shared/api/psyboy";

export type ChatStatus = "open" | "completed" | "archived";

export type TopicVariant = "default" | "sage" | "amber" | "clay";

export interface ChatTopic {
  label: string;
  variant?: TopicVariant;
}

export interface ChatSummary {
  id: string;
  title: string;
  preview: string;
  startedAt: Date;
  durationLabel: string;
  status: ChatStatus;
  topics: ChatTopic[];
  active?: boolean;
  recap?: string;
}

export interface ChatThread extends ChatSummary {
  messages: ChatMessage[];
}

export function mapPsyboyThread(thread: PsyboyThread): ChatSummary {
  const startedAt = new Date(thread.created_at);
  const status: ChatStatus =
    thread.status === "active"
      ? "open"
      : thread.status === "closed"
        ? "completed"
        : "archived";

  return {
    id: thread.id,
    title: `Сессия ${thread.id.slice(0, 8)}`,
    preview: "Открыть историю разговора",
    startedAt,
    durationLabel: "",
    status,
    topics: [],
  };
}

export const chatTopics = {
  insomnia: { label: "бессонница · 3 эпизода", variant: "default" as const },
  rumination: { label: "руминация перед сном", variant: "default" as const },
  workConflict: {
    label: "работа · конфликт с руководителем",
    variant: "default" as const,
  },
  catastrophizing: {
    label: "катастрофизация будущего",
    variant: "amber" as const,
  },
  mortgage: { label: "ипотека · финансовая тревога", variant: "default" as const },
  avoidance: { label: "избегание", variant: "clay" as const },
};
