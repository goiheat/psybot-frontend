"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";

import { Button, CodeCell, Eyebrow } from "@/shared/ui";

const CODE_LENGTH = 4;

export function OtpForm({
  phoneHint = "+7 (903) ··· 42-08",
}: {
  phoneHint?: string;
}) {
  const router = useRouter();
  const [digits, setDigits] = React.useState<string[]>(
    Array(CODE_LENGTH).fill(""),
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // synthesize a hidden input to receive keystrokes
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH);
    const next = Array(CODE_LENGTH)
      .fill("")
      .map((_, i) => raw[i] ?? "");
    setDigits(next);
    setActiveIdx(Math.min(raw.length, CODE_LENGTH - 1));
  }

  const code = digits.join("");
  const filled = code.length === CODE_LENGTH;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!filled) return;
    setSubmitting(true);
    window.setTimeout(() => router.push("/chats"), 400);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex items-center gap-3 mb-6">
        <Eyebrow>Шаг 2 из 2 · код</Eyebrow>
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="w-6 h-[3px] rounded-full bg-ink" />
          <span className="w-6 h-[3px] rounded-full bg-ink" />
        </div>
      </div>

      <h1 className="font-serif-display text-[40px] md:text-[48px] leading-[1.05] tracking-[-0.012em] mb-4 text-ink font-normal">
        Введи код из сообщения.
      </h1>
      <p className="text-[16px] text-ink-2 mb-10 leading-[1.55]">
        Отправили на {phoneHint}{" "}
        <button
          type="button"
          className="underline underline-offset-4 decoration-rule hover:decoration-ink-3"
          onClick={() => router.back()}
        >
          изменить
        </button>
      </p>

      <div
        ref={containerRef}
        className="flex gap-2 mb-6 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {digits.map((d, i) => (
          <CodeCell key={i} value={d} active={i === activeIdx && !d} />
        ))}
      </div>

      {/* invisible field captures keystrokes */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={code}
        onChange={onChange}
        className="sr-only"
        aria-label="Код из SMS"
      />

      <div className="flex items-center justify-between text-[12.5px] text-ink-3 mb-10">
        <span>отправить заново через 24 сек</span>
        <button type="button" className="hover:text-ink transition">
          позвонить вместо SMS
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          className="px-4"
        >
          <ArrowLeft /> назад
        </Button>
        <Button
          type="submit"
          variant="ink"
          disabled={!filled || submitting}
          className="flex-1"
        >
          Войти
          <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
