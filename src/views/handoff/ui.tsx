import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  FileText,
  Minus,
  UserRoundCheck,
  Users,
} from "lucide-react";

import {
  Avatar,
  Badge,
  Button,
  Eyebrow,
  Logo,
  Meter,
  Surface,
} from "@/shared/ui";
import {
  handoffSummary,
  clinicianSlot,
} from "@/shared/mock/handoff";
import {
  severityLabel,
  severityVariant,
} from "@/entities/screening";

export function HandoffView() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 px-6 lg:px-12 py-4 border-b border-rule bg-background/85 backdrop-blur">
        <div className="max-w-[780px] mx-auto flex items-center gap-4">
          <Logo size="sm" showName={false} />
          <div className="leading-tight">
            <div className="font-serif-display text-[16px] text-ink">
              Передача специалисту
            </div>
            <div className="font-mono text-[10px] tracking-[0.06em] text-ink-3">
              мост между диалогом с PsyBoy и живым терапевтом
            </div>
          </div>
          <Badge variant="amber" className="ml-auto">
            <UserRoundCheck className="size-3" /> предложение, не решение
          </Badge>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-12 py-12">
        <div className="max-w-[780px] mx-auto">
          <Eyebrow className="mb-3">Шаг 09 · итог сессий</Eyebrow>
          <h1 className="font-serif-display text-[40px] md:text-[52px] leading-[1.05] tracking-[-0.012em] text-ink mb-5 font-normal text-balance">
            Стоит обсудить со специалистом.
          </h1>
          <p className="text-[18px] text-ink-2 leading-[1.55] max-w-[620px] mb-10">
            По нашему разговору я вижу паттерны, с которыми лучше работать с
            живым терапевтом. Это не значит, что ты «не справляешься» — наоборот, это
            точная заявка на правильный уровень помощи.
          </p>

          <Surface className="overflow-hidden mb-8 shadow-soft">
            <div className="px-6 py-3.5 bg-bg-soft border-b border-rule flex items-center justify-between">
              <div className="inline-flex items-center gap-2 font-mono text-[12px] text-ink-3">
                <FileText className="size-3.5" /> сводка, которая уйдёт врачу
              </div>
              <button className="inline-flex items-center gap-1.5 text-[12px] text-ink-3 hover:text-ink transition">
                <Eye className="size-3.5" /> посмотреть полностью
              </button>
            </div>

            <div className="p-6 grid sm:grid-cols-2 gap-6">
              <div>
                <Eyebrow className="mb-1.5">Период</Eyebrow>
                <div className="text-[15px] text-ink">
                  {handoffSummary.period}
                </div>
                <div className="text-[12.5px] text-ink-3 mt-0.5">
                  {handoffSummary.sessionsCount} сессии ·{" "}
                  {handoffSummary.totalMinutes} минут суммарно
                </div>
              </div>
              <div>
                <Eyebrow className="mb-1.5">Основной запрос</Eyebrow>
                <div className="text-[15px] text-ink">
                  {handoffSummary.request}
                </div>
                <div className="text-[12.5px] text-ink-3 mt-0.5">
                  {handoffSummary.requestSource}
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <Eyebrow className="mb-3">Опросники</Eyebrow>
              <div className="grid sm:grid-cols-2 gap-4">
                {handoffSummary.screenings.map((s) => {
                  const variant = severityVariant[s.severity];
                  return (
                    <div
                      key={s.kind}
                      className="border border-rule rounded-md p-4 bg-bg-soft"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif-display text-[17px] text-ink">
                          {s.kind}
                        </h3>
                        <Badge variant={variant === "critical" ? "amber" : variant}>
                          {severityLabel[s.severity]}
                        </Badge>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-serif-display text-[26px] text-ink">
                          {s.score}
                        </span>
                        <span className="font-mono text-[12px] text-ink-3">
                          / {s.max} · {s.takenAt.getDate()} мая
                        </span>
                      </div>
                      <Meter
                        value={(s.score / s.max) * 100}
                        variant={variant === "critical" ? "critical" : variant}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-6 pb-6">
              <Eyebrow className="mb-3">Отмеченные темы</Eyebrow>
              <div className="flex flex-wrap gap-1.5">
                {handoffSummary.topics.map((t, i) => (
                  <Badge key={i} variant={t.variant ?? "default"}>
                    {t.label}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="px-6 pb-6">
              <Eyebrow className="mb-3">Что уже пробовали</Eyebrow>
              <ul className="space-y-2">
                {handoffSummary.interventions.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px] text-ink-2"
                  >
                    {it.done ? (
                      <Check className="size-4 text-sage-deep mt-0.5 shrink-0" />
                    ) : (
                      <Minus className="size-4 text-ink-3 mt-0.5 shrink-0" />
                    )}
                    <span>{it.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-6 py-3 bg-bg-soft border-t border-rule flex items-center justify-between text-[12px] text-ink-3 font-mono">
              <span>передача с твоего согласия · можно отредактировать</span>
              <span>id {handoffSummary.id}</span>
            </div>
          </Surface>

          {/* clinician */}
          <div className="border border-sage-border bg-sage-soft rounded-[12px] p-5 flex items-center gap-5 mb-8">
            <Avatar
              initial={clinicianSlot.initials}
              size={48}
              variant="sage"
            />
            <div className="flex-1 min-w-0">
              <div className="font-serif-display text-[18px] text-ink">
                {clinicianSlot.fullName}
              </div>
              <div className="text-[13px] text-ink-2">
                {clinicianSlot.credentials} · {clinicianSlot.clinic}
              </div>
              <div className="font-mono text-[11px] text-ink-3 mt-1">
                ближайший слот: {clinicianSlot.nextSlot}
              </div>
            </div>
            <Button variant="sage" size="sm">
              Записаться <ArrowRight />
            </Button>
          </div>

          {/* secondary actions */}
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="ghost" size="sm">
              <Users /> Посмотреть других специалистов
            </Button>
            <Button variant="tertiary" size="sm" asChild>
              <Link href="/chats">
                Не сейчас, продолжим вместе{" "}
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          <p className="text-[13px] text-ink-3 mt-8 max-w-[540px] leading-relaxed">
            Если откажешься — продолжим обычные сессии. Я буду пересматривать
            картину каждые две недели, и если что-то изменится — снова предложу.
          </p>

          <div className="mt-12 pt-6 border-t border-rule-soft">
            <Link
              href="/chats"
              className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink transition"
            >
              <ArrowLeft className="size-3.5" /> вернуться к сессиям
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
