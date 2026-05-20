import type { ChatMessage } from "@/entities/message";

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
