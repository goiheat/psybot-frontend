"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";

import {
  Badge,
  Button,
  Eyebrow,
  Logo,
  Sparkline,
  Surface,
} from "@/shared/ui";
import { SessionRule } from "@/shared/ui";
import { ChatRow } from "@/widgets/chat-row";
import { recentScreenings, severityLabel } from "@/entities/screening";
import { mapPsyboyThread, type ChatSummary } from "@/entities/chat";
import { currentUser } from "@/entities/user";
import { createThread, listThreads } from "@/shared/api/psyboy";

const filters = [
  { id: "all", label: "Все" },
  { id: "open", label: "Открытые" },
  { id: "screening", label: "Со скринингом" },
  { id: "archived", label: "Архив" },
] as const;

type FilterId = (typeof filters)[number]["id"];

function StatCell({
  label,
  value,
  caption,
  extra,
}: {
  label: string;
  value: React.ReactNode;
  caption?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-card flex flex-col gap-2 min-h-[112px]">
      <Eyebrow>{label}</Eyebrow>
      <div className="flex items-baseline gap-2">
        <span className="font-serif-display text-[32px] leading-none text-ink">
          {value}
        </span>
        {caption && (
          <span className="text-[12px] text-ink-3">{caption}</span>
        )}
      </div>
      {extra && <div className="mt-auto">{extra}</div>}
    </div>
  );
}

export function ChatsView() {
  const router = useRouter();
  const [filter, setFilter] = React.useState<FilterId>("all");
  const [chatSummaries, setChatSummaries] = React.useState<ChatSummary[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isCreating, setIsCreating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    listThreads()
      .then((threadPage) => {
        if (!cancelled) {
          setChatSummaries(threadPage.items.map(mapPsyboyThread));
        }
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Не удалось загрузить сессии.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCreateThread() {
    if (isCreating) return;
    setIsCreating(true);
    setError(null);

    try {
      const thread = await createThread();
      router.push(`/chats/${thread.id}`);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Не удалось создать сессию.",
      );
      setIsCreating(false);
    }
  }

  const visible = React.useMemo(() => {
    if (filter === "all") return chatSummaries;
    if (filter === "open")
      return chatSummaries.filter((c) => c.status === "open");
    if (filter === "archived")
      return chatSummaries.filter((c) => c.status === "archived");
    return chatSummaries.filter((c) =>
      c.topics.some((t) => /GAD|PHQ|опросник/i.test(t.label)),
    );
  }, [chatSummaries, filter]);

  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  const today = visible.filter(
    (c) => c.startedAt.toDateString() === now.toDateString(),
  );
  const thisWeek = visible.filter(
    (c) =>
      c.startedAt >= weekAgo &&
      c.startedAt.toDateString() !== now.toDateString(),
  );
  const earlier = visible.filter(
    (c) =>
      !today.includes(c) && !thisWeek.includes(c),
  );

  const gad = recentScreenings.find((s) => s.kind === "GAD-7");
  const phq = recentScreenings.find((s) => s.kind === "PHQ-9");

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 px-6 lg:px-12 py-4 border-b border-rule bg-background/85 backdrop-blur">
        <div className="max-w-[860px] mx-auto flex items-center gap-4">
          <Logo size="sm" showName={false} />
          <div className="leading-tight">
            <div className="font-serif-display text-[16px] text-ink">
              Сессии
            </div>
            <div className="font-mono text-[10px] tracking-[0.06em] text-ink-3">
              всего {chatSummaries.length}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Search /> Поиск
            </Button>
            <Button
              variant="ink"
              size="sm"
              disabled={isCreating}
              onClick={handleCreateThread}
            >
              <Plus /> Новая сессия
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-12 py-10">
        <div className="max-w-[860px] mx-auto">
          <div className="flex items-baseline justify-between mb-7">
            <h1 className="font-serif-display text-[34px] md:text-[40px] tracking-[-0.012em] text-ink leading-tight">
              Что обсуждали
            </h1>
            <div className="text-[13px] text-ink-3">
              приветствую, {currentUser.firstName.toLowerCase()}
            </div>
          </div>

          {/* stats */}
          <Surface className="overflow-hidden mb-10 p-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule">
              <StatCell
                label="загружено"
                value={chatSummaries.length}
                caption="сессий"
              />
              <StatCell label="время" value="2ч 18м" caption="в разговоре" />
              {gad && (
                <StatCell
                  label="GAD-7"
                  value={gad.score}
                  extra={
                    <div className="flex items-center justify-between">
                      <Badge variant="amber">{severityLabel[gad.severity]}</Badge>
                      <Sparkline values={gad.trend} variant="amber" />
                    </div>
                  }
                />
              )}
              {phq && (
                <StatCell
                  label="PHQ-9"
                  value={phq.score}
                  extra={
                    <div className="flex items-center justify-between">
                      <Badge variant="sage">{severityLabel[phq.severity]}</Badge>
                      <Sparkline values={phq.trend} variant="sage" />
                    </div>
                  }
                />
              )}
            </div>
          </Surface>

          {/* filters */}
          <div className="flex items-center gap-2 mb-8">
            <div className="inline-flex items-center gap-1 rounded-md border border-rule bg-bg-soft p-1">
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={
                      active
                        ? "px-3 h-8 rounded-sm bg-ink text-background text-[13px] font-medium shadow-soft"
                        : "px-3 h-8 rounded-sm text-ink-2 hover:text-ink hover:bg-card text-[13px]"
                    }
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
            <div className="ml-auto hidden md:block font-mono text-[12px] text-ink-3">
              {visible.length} сессий
            </div>
          </div>

          {/* groups */}
          <div className="space-y-10">
            {isLoading && (
              <div className="text-center py-16 text-[14px] text-ink-3">
                Загружаем сессии…
              </div>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-md border border-clay/40 bg-clay-soft/30 px-4 py-3 text-[13px] text-ink-2"
              >
                {error}
              </div>
            )}

            {today.length > 0 && (
              <section>
                <SessionRule className="mb-5">сегодня</SessionRule>
                <div className="space-y-3">
                  {today.map((c) => (
                    <ChatRow key={c.id} chat={c} />
                  ))}
                </div>
              </section>
            )}
            {thisWeek.length > 0 && (
              <section>
                <SessionRule className="mb-5">эта неделя</SessionRule>
                <div className="space-y-3">
                  {thisWeek.map((c) => (
                    <ChatRow key={c.id} chat={c} />
                  ))}
                </div>
              </section>
            )}
            {earlier.length > 0 && (
              <section>
                <SessionRule className="mb-5">ранее</SessionRule>
                <div className="space-y-3">
                  {earlier.map((c) => (
                    <ChatRow key={c.id} chat={c} />
                  ))}
                </div>
              </section>
            )}
            {!isLoading && !error && visible.length === 0 && (
              <div className="text-center py-16 text-[14px] text-ink-3">
                В этой выборке сессий пока нет.
              </div>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-rule-soft flex items-center justify-between text-[12.5px] text-ink-3">
            <span>
              Показано {visible.length} из {chatSummaries.length} сессий
            </span>
            <button className="hover:text-ink transition">смотреть всё</button>
          </div>
        </div>
      </main>
    </div>
  );
}
