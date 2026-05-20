"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/shared/ui";
import { Eyebrow } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export function PhoneAuthForm({ className }: { className?: string }) {
  const router = useRouter();
  const [phone, setPhone] = React.useState("903 ___ 42 08");
  const [submitting, setSubmitting] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => router.push("/login/code"), 350);
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="flex items-center gap-3 mb-6">
        <Eyebrow>Шаг 1 из 2 · телефон</Eyebrow>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="w-6 h-[3px] rounded-full bg-ink" />
          <span className="w-6 h-[3px] rounded-full bg-rule" />
        </div>
      </div>

      <h1 className="font-serif-display text-[40px] md:text-[48px] leading-[1.05] tracking-[-0.012em] mb-4 text-ink font-normal">
        С возвращением.
      </h1>
      <p className="text-[16px] text-ink-2 mb-10 leading-[1.55]">
        Введи номер — пришлём короткий код. Если ты здесь впервые, аккаунт
        создастся автоматически.
      </p>

      <label className="block mb-3">
        <Eyebrow className="block mb-2">Номер телефона</Eyebrow>
        <div
          className={cn(
            "flex items-stretch border border-rule rounded-md bg-card overflow-hidden",
            "transition-colors duration-[240ms] ease-psyboy",
            "focus-within:border-ink focus-within:ring-2 focus-within:ring-ink/5",
          )}
        >
          <button
            type="button"
            className="flex items-center gap-2 px-4 bg-bg-soft border-r border-rule"
          >
            <span className="font-mono text-[11px] tracking-[0.08em] text-ink-3">
              RU
            </span>
            <span className="font-serif-display text-[17px] text-ink">+7</span>
            <ChevronDown className="size-3.5 text-ink-3" />
          </button>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 px-4 bg-transparent font-serif-display text-[20px] text-ink focus:outline-none"
            placeholder="903 123 42 08"
          />
        </div>
      </label>

      <div className="flex items-center justify-between text-[12.5px] mb-10">
        <span className="text-ink-3">Можем позвонить, если SMS не дойдёт.</span>
        <button
          type="button"
          className="text-ink-3 hover:text-ink transition"
        >
          другой способ
        </button>
      </div>

      <Button
        type="submit"
        variant="ink"
        className="w-full"
        disabled={submitting}
      >
        Получить код
        <ArrowRight />
      </Button>

      <p className="mt-8 pt-6 border-t border-rule-soft text-[12.5px] text-ink-3 leading-relaxed">
        Продолжая, ты соглашаешься с{" "}
        <a className="underline underline-offset-4 decoration-rule hover:decoration-ink-3" href="#">
          политикой обработки данных
        </a>{" "}
        и{" "}
        <a className="underline underline-offset-4 decoration-rule hover:decoration-ink-3" href="#">
          согласием на обработку
        </a>
        . Можно отозвать в любой момент.
      </p>
    </form>
  );
}
