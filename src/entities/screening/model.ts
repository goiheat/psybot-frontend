export type ScreeningKind = "GAD-7" | "PHQ-9";

export type Severity = "minimal" | "mild" | "moderate" | "severe";

export interface ScreeningResult {
  kind: ScreeningKind;
  score: number;
  max: number;
  severity: Severity;
  takenAt: Date;
  trend: number[];
}

export interface ScreeningQuestion {
  id: string;
  text: string;
  options: { label: string; value: string; score: number }[];
}

export const severityLabel: Record<Severity, string> = {
  minimal: "минимальная",
  mild: "лёгкая",
  moderate: "умеренная",
  severe: "тяжёлая",
};

export const severityVariant: Record<
  Severity,
  "sage" | "amber" | "clay" | "critical"
> = {
  minimal: "sage",
  mild: "sage",
  moderate: "amber",
  severe: "critical",
};

export const recentScreenings: ScreeningResult[] = [
  {
    kind: "GAD-7",
    score: 12,
    max: 21,
    severity: "moderate",
    takenAt: new Date(2026, 4, 14),
    trend: [9, 11, 14, 13, 12, 14, 12],
  },
  {
    kind: "PHQ-9",
    score: 7,
    max: 27,
    severity: "mild",
    takenAt: new Date(2026, 4, 14),
    trend: [8, 9, 10, 8, 7, 8, 7],
  },
];

// GAD-7 sample (first 7 items)
export const gad7Questions: ScreeningQuestion[] = [
  {
    id: "gad-1",
    text: "Чувствуешь нервозность, тревогу или сильное беспокойство",
    options: gad7Options(),
  },
  {
    id: "gad-2",
    text: "Не можешь остановить или контролировать беспокойство",
    options: gad7Options(),
  },
  {
    id: "gad-3",
    text: "Как часто за последние 2 недели ты беспокоился из-за разных вещей?",
    options: gad7Options(),
  },
  {
    id: "gad-4",
    text: "Тебе сложно расслабиться",
    options: gad7Options(),
  },
  {
    id: "gad-5",
    text: "Ты настолько беспокоен, что трудно усидеть на месте",
    options: gad7Options(),
  },
  {
    id: "gad-6",
    text: "Легко раздражаешься или становишься нетерпеливым",
    options: gad7Options(),
  },
  {
    id: "gad-7",
    text: "Боишься, словно что-то ужасное может случиться",
    options: gad7Options(),
  },
];

function gad7Options() {
  return [
    { label: "Совсем нет", value: "0", score: 0 },
    { label: "Несколько дней", value: "1", score: 1 },
    { label: "Более половины дней", value: "2", score: 2 },
    { label: "Почти каждый день", value: "3", score: 3 },
  ];
}
