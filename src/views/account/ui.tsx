import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Archive,
  Trash,
} from "lucide-react";

import {
  Avatar,
  Badge,
  Button,
  Eyebrow,
  Logo,
  Surface,
} from "@/shared/ui";
import { WellbeingCards } from "@/widgets/wellbeing-cards";
import { PreferencesPanel } from "@/widgets/preferences-panel";
import { currentUser } from "@/entities/user";
import { formatDateLong, formatPhone } from "@/shared/lib/format";

export function AccountView() {
  const user = currentUser;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 px-6 lg:px-12 py-4 border-b border-rule bg-background/85 backdrop-blur">
        <div className="max-w-[860px] mx-auto flex items-center gap-4">
          <Logo size="sm" showName={false} />
          <div className="leading-tight">
            <div className="font-serif-display text-[16px] text-ink">
              Аккаунт
            </div>
            <div className="font-mono text-[10px] tracking-[0.06em] text-ink-3">
              личный кабинет и настройки
            </div>
          </div>
          <Link
            href="/chats"
            className="ml-auto inline-flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink transition"
          >
            <ArrowLeft className="size-3.5" /> к сессиям
          </Link>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-12 py-10">
        <div className="max-w-[860px] mx-auto space-y-14">
          {/* profile */}
          <section className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <Avatar
              initial={user.firstName[0]}
              size={80}
              className="text-[34px]"
            />
            <div className="flex-1 min-w-0">
              <Eyebrow>Привет</Eyebrow>
              <h1 className="font-serif-display text-[36px] md:text-[42px] tracking-[-0.012em] text-ink leading-tight mt-1">
                {user.firstName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-[13px] text-ink-3">
                <span className="font-mono">{formatPhone(user.phoneRaw)}</span>
                <span className="w-px h-3 bg-rule" />
                <span>с нами с {formatDateLong(user.joinedAt)}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="self-start sm:self-auto">
              Изменить
            </Button>
          </section>

          {/* wellbeing dashboard */}
          <WellbeingCards />

          {/* preferences */}
          <PreferencesPanel user={user} />

          {/* clinic + data */}
          <section className="grid md:grid-cols-2 gap-6">
            <Surface
              className="p-5 flex flex-col gap-3 bg-sage-soft border-sage-border"
            >
              <Eyebrow className="text-sage-deep">Клиника-партнёр</Eyebrow>
              <div className="flex items-center gap-3">
                <Avatar
                  initial={user.clinic.name[0]}
                  size={40}
                  variant="sage"
                />
                <div className="leading-tight">
                  <div className="font-serif-display text-[18px] text-ink">
                    «{user.clinic.name}»
                  </div>
                  <div className="text-[13px] text-ink-2">
                    {user.clinic.city} · {user.clinic.methodology}
                  </div>
                </div>
              </div>
              <p className="text-[13.5px] text-ink-2 leading-relaxed">
                Если сессии покажут серьёзные сигналы — направим к
                специалисту клиники с твоего согласия.
              </p>
              <Link
                href="/handoff"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-sage-deep hover:opacity-90 mt-1"
              >
                посмотреть терапевтов <ArrowRight className="size-3.5" />
              </Link>
            </Surface>

            <Surface className="p-5 flex flex-col gap-1">
              <Eyebrow className="mb-2">Данные</Eyebrow>
              <DataAction icon={Download} label="Скачать историю в PDF" />
              <DataAction icon={Archive} label="Архивировать старые сессии" />
              <DataAction
                icon={Trash}
                label="Удалить всю историю"
                tone="clay"
              />
            </Surface>
          </section>

          <footer className="pt-8 border-t border-rule-soft flex items-center justify-between text-[12.5px]">
            <Badge variant="outline">
              build · 26.05.14 · 152-ФЗ · серверы РФ
            </Badge>
            <button className="text-ink-3 hover:text-ink transition text-[14px]">
              Выйти из аккаунта
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

function DataAction({
  icon: Icon,
  label,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  tone?: "default" | "clay";
}) {
  return (
    <button
      type="button"
      className="flex items-center gap-3 py-3 text-[14px] text-ink hover:bg-card-2/50 transition rounded-md px-1 -mx-1 border-t border-rule-soft first-of-type:border-t-0"
    >
      <Icon
        className={
          tone === "clay"
            ? "size-4 text-clay"
            : "size-4 text-ink-3 group-hover:text-ink"
        }
      />
      <span className={tone === "clay" ? "text-clay" : ""}>{label}</span>
      <ArrowRight className="size-3.5 text-ink-3 ml-auto" />
    </button>
  );
}
