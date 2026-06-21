"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, MoreHorizontal, RefreshCcw, ShieldCheck } from "lucide-react";

import {
  Button,
  ChatBubble,
  Eyebrow,
  LiveDot,
  Logo,
  SessionRule,
  StreamCursor,
  ThinkingDots,
} from "@/shared/ui";
import { ChatComposer } from "@/widgets/chat-composer";
import { useChatThread } from "@/features/send-message";

interface ChatViewProps {
  threadId: string;
}

export function ChatView({ threadId }: ChatViewProps) {
  const { messages, send, isLoading, isThinking, error } =
    useChatThread(threadId);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const hasStreamingMessage = messages.some((message) => message.streaming);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el)
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
  }, [messages.length, isThinking]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 px-6 lg:px-12 py-4 border-b border-rule bg-background/85 backdrop-blur">
        <div className="max-w-[720px] mx-auto flex items-center gap-4">
          <Link
            href="/chats"
            className="hidden md:inline-flex items-center gap-1.5 text-[13px] text-ink-3 hover:text-ink transition"
          >
            <ArrowLeft className="size-3.5" /> сессии
          </Link>
          <Logo size="sm" showName={false} />
          <div className="leading-tight">
            <div className="font-serif-display text-[16px] text-ink truncate max-w-[280px]">
              Сессия {threadId.slice(0, 8)}
            </div>
            <div className="font-mono text-[10px] tracking-[0.06em] text-ink-3 flex items-center gap-2">
              <LiveDot />
              <span>активна</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Перепроиграть">
              <RefreshCcw />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Меню">
              <MoreHorizontal />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-12 pt-8 pb-4">
        <div
          ref={scrollRef}
          className="max-w-[720px] mx-auto flex flex-col gap-8 overflow-y-auto"
        >
          <SessionRule>история сессии</SessionRule>

          <div className="space-y-6">
            {isLoading && (
              <div className="py-12 text-center text-[14px] text-ink-3">
                Загружаем историю…
              </div>
            )}

            {!isLoading && messages.length === 0 && !error && (
              <div className="py-12 text-center text-[14px] text-ink-3">
                Сессия пока пустая. Напиши первое сообщение.
              </div>
            )}

            {messages.map((m) => (
              <ChatBubble key={m.id} role={m.role} streaming={m.streaming}>
                {m.role === "agent" && (
                  <Eyebrow className="mb-2 text-sage-deep">PsyBoy</Eyebrow>
                )}
                {m.paragraphs ? (
                  m.paragraphs.map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-3" : undefined}>
                      {p}
                      {m.streaming && i === m.paragraphs!.length - 1 && (
                        <StreamCursor />
                      )}
                    </p>
                  ))
                ) : (
                  <p>
                    {m.text}
                    {m.streaming && <StreamCursor />}
                  </p>
                )}
                {m.suggestions && !m.streaming && m.role === "agent" && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {m.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="px-3 h-8 rounded-md border border-rule bg-card text-[13px] text-ink-2 hover:border-ink-3 hover:text-ink transition-colors duration-[240ms]"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </ChatBubble>
            ))}

            {isThinking && !hasStreamingMessage && (
              <ChatBubble role="agent">
                <ThinkingDots />
              </ChatBubble>
            )}

            {error && (
              <div
                role="alert"
                className="rounded-md border border-clay/40 bg-clay-soft/30 px-4 py-3 text-[13px] text-ink-2"
              >
                {error}
              </div>
            )}

            <div className="flex items-center gap-2 text-[12.5px] text-ink-3 pt-2">
              <ShieldCheck className="size-3.5 text-sage-deep" />
              <span>
                Сообщения проходят PII-фильтр и не уходят на тренировку модели.
              </span>
            </div>
          </div>
        </div>
      </main>

      <div className="px-6 lg:px-12">
        <div className="max-w-[720px] mx-auto">
          <ChatComposer onSend={send} disabled={isLoading || isThinking} />
        </div>
      </div>
    </div>
  );
}
