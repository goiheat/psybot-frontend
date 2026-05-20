import type { ScreeningResult } from "@/entities/screening";

export interface ClinicianSlot {
  fullName: string;
  initials: string;
  credentials: string;
  yearsPractice: number;
  clinic: string;
  nextSlot: string;
}

export interface HandoffSummary {
  period: string;
  sessionsCount: number;
  totalMinutes: number;
  request: string;
  requestSource: string;
  screenings: ScreeningResult[];
  topics: { label: string; variant?: "default" | "sage" | "amber" | "clay" }[];
  interventions: { label: string; done: boolean }[];
  id: string;
}

import { recentScreenings } from "@/entities/screening";

export const clinicianSlot: ClinicianSlot = {
  fullName: "Марина Колесникова",
  initials: "МК",
  credentials: "КПТ · 11 лет практики",
  yearsPractice: 11,
  clinic: "клиника «Эмпатия»",
  nextSlot: "пт, 17 мая · 11:30",
};

export const handoffSummary: HandoffSummary = {
  period: "29 апр — 14 мая 2026",
  sessionsCount: 3,
  totalMinutes: 47,
  request: "Тревога, нарушения сна",
  requestSource: "сформулировано пользователем",
  screenings: recentScreenings,
  topics: [
    { label: "бессонница · 3 эпизода" },
    { label: "руминация перед сном" },
    { label: "работа · конфликт с руководителем" },
    { label: "катастрофизация будущего", variant: "amber" },
    { label: "ипотека · финансовая тревога" },
    { label: "избегание", variant: "clay" },
  ],
  interventions: [
    {
      label:
        "Заземление 5-4-3-2-1 — два раза, помогло снять острый эпизод",
      done: true,
    },
    {
      label:
        "Дневник автоматических мыслей — начат 12 мая, четыре записи",
      done: true,
    },
    {
      label: "Гигиена сна — обсудили, к практике пока не приступили",
      done: false,
    },
  ],
  id: "7842-А",
};
