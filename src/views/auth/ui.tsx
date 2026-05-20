import Link from "next/link";
import { ShieldCheck, Server, Trash2 } from "lucide-react";

import { BreathMark, Eyebrow, Logo } from "@/shared/ui";
import { ThemeToggle } from "@/features/theme-toggle";
import { PhoneAuthForm } from "@/features/phone-auth";
import { OtpForm } from "@/features/otp-verify";

interface AuthViewProps {
  step: "phone" | "code";
}

const trustItems = [
  {
    title: "Возвращаться к разговору",
    text: "Без номера мы не сможем дать тебе доступ к прошлым сессиям и заметкам.",
  },
  {
    title: "Эскалация в острых ситуациях",
    text: "В критической ситуации специалист клиники-партнёра может связаться с тобой быстрее, чем ты найдёшь нужный канал.",
  },
  {
    title: "Никакой рекламы",
    text: "Номер используется только для входа и эскалации. Маркетинговых рассылок не будет.",
  },
];

export function AuthView({ step }: AuthViewProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 lg:px-12 pt-6 flex items-center justify-between">
        <Link href="/">
          <Logo size="md" sublabel="вход" />
        </Link>
        <div className="flex items-center gap-5 text-[13px] text-ink-3">
          <Link href="/" className="hover:text-ink transition">
            На главную
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 grid lg:grid-cols-2">
        <div className="px-6 sm:px-10 lg:px-16 py-12 lg:py-20 flex items-center justify-center border-r border-rule-soft">
          <div className="w-full max-w-[440px]">
            {step === "phone" ? <PhoneAuthForm /> : <OtpForm />}
          </div>
        </div>

        <div
          className="px-6 sm:px-10 lg:px-16 py-12 lg:py-20 hidden lg:flex items-center"
          style={{ background: "var(--bg-soft)" }}
        >
          <div className="w-full max-w-[460px]">
            <div className="flex items-center gap-3 mb-8">
              <BreathMark className="w-2.5 h-2.5" />
              <Eyebrow>Зачем телефон</Eyebrow>
            </div>

            <div className="space-y-7">
              {trustItems.map((t) => (
                <div key={t.title}>
                  <h3 className="font-serif-display text-[18px] text-ink mb-1.5">
                    {t.title}
                  </h3>
                  <p className="text-[14.5px] text-ink-2 leading-relaxed">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-6 border-t border-rule-soft flex flex-wrap gap-5 text-[12.5px] text-ink-3">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-sage-deep" />
                152-ФЗ
              </span>
              <span className="inline-flex items-center gap-2">
                <Server className="size-4 text-sage-deep" />
                серверы РФ
              </span>
              <span className="inline-flex items-center gap-2">
                <Trash2 className="size-4 text-sage-deep" />
                можно удалить всё
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
