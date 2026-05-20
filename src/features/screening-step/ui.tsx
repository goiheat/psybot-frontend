"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import {
  Button,
  Eyebrow,
  ScreeningRadio,
  ScreeningRadioGroup,
  Surface,
} from "@/shared/ui";
import { gad7Questions } from "@/entities/screening";

const TOTAL = gad7Questions.length;

export function ScreeningStep({
  onDone,
  onSkip,
  startIndex = 0,
}: {
  onDone?: (totalScore: number) => void;
  onSkip?: () => void;
  startIndex?: number;
}) {
  const [index, setIndex] = React.useState(startIndex);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const q = gad7Questions[index];
  const value = answers[q.id];

  function next() {
    if (index < TOTAL - 1) {
      setIndex(index + 1);
    } else {
      const score = Object.entries(answers).reduce((acc, [qid, val]) => {
        const opt = gad7Questions
          .find((x) => x.id === qid)
          ?.options.find((o) => o.value === val);
        return acc + (opt?.score ?? 0);
      }, 0);
      onDone?.(score);
    }
  }

  function prev() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <Surface className="p-7 shadow-soft">
      <div className="flex items-start justify-between mb-5">
        <div>
          <Eyebrow>GAD-7 · опросник тревоги</Eyebrow>
          <div className="font-mono text-[12px] text-ink-3 mt-1.5">
            вопрос {index + 1} из {TOTAL}
          </div>
        </div>
        <button
          type="button"
          onClick={onSkip}
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink transition"
        >
          <X className="size-3.5" /> отложить
        </button>
      </div>

      <div className="h-[3px] bg-rule rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-sage-deep transition-[width] duration-[600ms] ease-psyboy"
          style={{ width: `${((index + 1) / TOTAL) * 100}%` }}
        />
      </div>

      <h3 className="font-serif-display text-[24px] leading-snug text-ink mb-2">
        {q.text}?
      </h3>
      <p className="text-[14px] text-ink-3 mb-5">
        Выбери один ответ — без правильных и неправильных.
      </p>

      <ScreeningRadioGroup
        value={value}
        onValueChange={(v) =>
          setAnswers((prev) => ({ ...prev, [q.id]: v }))
        }
        className="mb-7"
      >
        {q.options.map((opt) => (
          <ScreeningRadio key={opt.value} value={opt.value} score={opt.score}>
            {opt.label}
          </ScreeningRadio>
        ))}
      </ScreeningRadioGroup>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="tertiary"
          onClick={prev}
          disabled={index === 0}
        >
          <ArrowLeft /> Назад
        </Button>
        <div className="hidden md:block font-mono text-[11px] text-ink-3">
          <kbd className="px-1.5 py-0.5 rounded border border-rule bg-card mr-1.5">
            Enter
          </kbd>
          следующий
        </div>
        <Button
          type="button"
          variant="sage"
          onClick={next}
          disabled={!value}
        >
          {index === TOTAL - 1 ? "Завершить" : "Дальше"}
          <ArrowRight />
        </Button>
      </div>
    </Surface>
  );
}
