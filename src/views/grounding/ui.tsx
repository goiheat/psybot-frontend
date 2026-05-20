"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  X,
} from "lucide-react";

import {
  BreathCircle,
  Button,
  Eyebrow,
  LiveDot,
  Logo,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

const steps = [
  {
    n: 5,
    title: "5 вещей, которые ты видишь",
    subtitle: "кружка · окно · лампа · книга · рука",
  },
  {
    n: 4,
    title: "4 вещи, которые ты слышишь",
    subtitle: "шум кулера · машина за окном · собственное дыхание",
  },
  {
    n: 3,
    title: "3 вещи, которые ты ощущаешь телом",
    subtitle: "стопа в кроссовке · спина в кресле · кожа кисти",
  },
  {
    n: 2,
    title: "2 запаха",
    subtitle: "чай · бумага",
  },
  {
    n: 1,
    title: "1 вкус",
    subtitle: "то, что во рту прямо сейчас",
  },
];

export function GroundingView() {
  const [activeIndex, setActiveIndex] = React.useState(1);
  const [breathing, setBreathing] = React.useState(true);

  const step = steps[activeIndex];

  function next() {
    if (activeIndex < steps.length - 1) setActiveIndex(activeIndex + 1);
  }

  function prev() {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-soft">
      <header className="sticky top-0 z-30 px-6 lg:px-12 py-4 border-b border-rule bg-bg-soft/85 backdrop-blur">
        <div className="max-w-[1100px] mx-auto flex items-center gap-4">
          <Logo size="sm" showName={false} />
          <div className="leading-tight">
            <div className="font-serif-display text-[16px] text-ink">
              Заземление
            </div>
            <div className="font-mono text-[10px] tracking-[0.06em] text-ink-3">
              упражнение 5-4-3-2-1 · около 4 минут
            </div>
          </div>
          <Link
            href="/chats"
            className="ml-auto inline-flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink transition"
          >
            <X className="size-3.5" /> Закончить
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-12 py-10">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-[1fr_360px] gap-10 items-start">
          <div className="flex flex-col items-start">
            <Eyebrow className="mb-4">
              Шаг {activeIndex + 1} из {steps.length} · слух и тело
            </Eyebrow>
            <h2 className="font-serif-display text-[36px] md:text-[44px] leading-[1.05] tracking-[-0.012em] text-ink mb-4 text-balance font-normal">
              Назови {step.n}{" "}
              {step.n === 1
                ? "вещь"
                : step.n < 5 && step.n > 1
                ? "вещи"
                : "вещей"}
              , которые ты {activeIndex === 0 ? "видишь" : activeIndex === 1 ? "слышишь" : "замечаешь"}.
            </h2>
            <p className="text-[17px] text-ink-2 leading-[1.55] mb-12 max-w-[540px]">
              Не нужно искать что-то особенное. Просто переведи внимание — по
              одному предмету за раз. Если мысль уводит — спокойно возвращайся.
            </p>

            <div className="my-6 grid place-items-center w-full">
              <BreathCircle running={breathing} />
            </div>

            <div className="mt-6 flex items-center gap-4 text-[13px] text-ink-3">
              <span className="font-mono">box breathing · 4–4–4–4</span>
              <button
                type="button"
                onClick={() => setBreathing((b) => !b)}
                className="underline underline-offset-4 decoration-rule hover:decoration-ink-3"
              >
                {breathing ? "отключить дыхание" : "включить дыхание"}
              </button>
            </div>

            <div className="mt-12 flex items-center gap-4 w-full">
              <Button
                variant="tertiary"
                onClick={prev}
                disabled={activeIndex === 0}
              >
                <ArrowLeft /> Назад
              </Button>
              <Button
                variant="sage"
                onClick={next}
                disabled={activeIndex === steps.length - 1}
                className="ml-auto"
              >
                Готово <ArrowRight />
              </Button>
            </div>
          </div>

          <aside className="border border-rule rounded-[12px] bg-card p-5">
            <Eyebrow className="mb-4">5-4-3-2-1</Eyebrow>
            <ol className="space-y-3">
              {steps.map((s, i) => {
                const done = i < activeIndex;
                const current = i === activeIndex;
                return (
                  <li
                    key={s.n}
                    className={cn(
                      "flex gap-3",
                      done && "opacity-60",
                      !done && !current && "opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-[12px] tracking-[0.04em] w-6 shrink-0",
                        done && "text-sage-deep",
                        current && "text-ink",
                        !done && !current && "text-ink-3",
                      )}
                    >
                      {s.n}
                    </span>
                    <div className="flex-1">
                      <div
                        className={cn(
                          "flex items-center gap-2 text-[14px] text-ink",
                          done && "line-through text-ink-3",
                          current && "font-medium",
                        )}
                      >
                        {current && <LiveDot />}
                        <span>{s.title}</span>
                        {done && <Check className="size-3.5 text-sage-deep" />}
                      </div>
                      <div className="text-[12.5px] text-ink-3 mt-0.5">
                        {s.subtitle}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="mt-7 pt-5 border-t border-rule-soft">
              <Eyebrow className="text-amber-text mb-2">
                Если становится хуже
              </Eyebrow>
              <p className="text-[13.5px] text-ink-2 leading-relaxed mb-3">
                Можно прервать упражнение и сразу связаться с дежурным
                специалистом клиники-партнёра.
              </p>
              <Button variant="ghost" size="sm" className="text-[13px]">
                <Phone className="size-3.5" /> Связаться с клиникой
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
