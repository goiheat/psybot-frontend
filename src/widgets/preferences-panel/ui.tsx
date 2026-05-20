"use client";

import * as React from "react";

import { ChoiceGroup, Eyebrow, Surface, Switch } from "@/shared/ui";
import type { AddressForm, ReplyTempo, User } from "@/entities/user";

const tempoOptions = [
  { value: "fast", label: "быстрее" },
  { value: "calm", label: "спокойно" },
  { value: "slow", label: "медленнее" },
] as const;

const addressOptions = [
  { value: "informal", label: "на ты" },
  { value: "formal", label: "на вы" },
] as const;

function Row({
  label,
  description,
  control,
}: {
  label: string;
  description?: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-5 py-4 border-b border-rule-soft last:border-b-0 px-5">
      <div className="flex-1 min-w-0">
        <div className="text-[15px] text-ink">{label}</div>
        {description && (
          <div className="text-[13px] text-ink-3 mt-0.5">{description}</div>
        )}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

export function PreferencesPanel({ user }: { user: User }) {
  const [tempo, setTempo] = React.useState<ReplyTempo>(user.preferences.tempo);
  const [address, setAddress] = React.useState<AddressForm>(
    user.preferences.addressForm,
  );
  const [quiet, setQuiet] = React.useState(user.preferences.quietReminders);
  const [night, setNight] = React.useState(user.preferences.nightMode);

  return (
    <section>
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-serif-display text-[22px] text-ink">Предпочтения</h2>
        <span className="font-mono text-[11px] tracking-[0.06em] text-ink-3">
          подстраиваю под тебя
        </span>
      </div>
      <Surface className="py-0">
        <Row
          label="Темп ответов"
          description="как быстро PsyBoy отвечает в чате"
          control={
            <ChoiceGroup
              value={tempo}
              onValueChange={setTempo}
              options={tempoOptions}
              ariaLabel="Темп ответов"
            />
          }
        />
        <Row
          label="Обращение"
          description="как обращаться к тебе в диалоге"
          control={
            <ChoiceGroup
              value={address}
              onValueChange={setAddress}
              options={addressOptions}
              ariaLabel="Форма обращения"
            />
          }
        />
        <Row
          label="Тихие напоминания"
          description="мягкий чек-ин раз в день, без push-уведомлений"
          control={
            <Switch
              checked={quiet}
              onCheckedChange={setQuiet}
              aria-label="Тихие напоминания"
            />
          }
        />
        <Row
          label="Ночной режим"
          description="приглушённые тона после 22:00"
          control={
            <Switch
              checked={night}
              onCheckedChange={setNight}
              aria-label="Ночной режим"
            />
          }
        />
      </Surface>
      <Eyebrow className="mt-3 px-1">
        изменения сохраняются автоматически
      </Eyebrow>
    </section>
  );
}
