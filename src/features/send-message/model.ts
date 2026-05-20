"use client";

import * as React from "react";
import type { ChatMessage } from "@/entities/message";

const AGENT_REPLIES = [
  "Слышу. Давай по одной мысли: что прямо сейчас сильнее всего занимает голову?",
  "Это важный сигнал. Хочешь — попробуем разобрать через ABC-схему: ситуация, мысль, реакция?",
  "Спасибо, что говоришь. Где это в теле сейчас — 0–10?",
  "Понимаю. Давай побудем с этим минуту. Сделаем три цикла дыхания — 4 на вдох, 4 на паузу?",
];

let counter = 1000;

function genId(prefix: string) {
  counter += 1;
  return `${prefix}-${counter}`;
}

export function useChatThread(initialMessages: ChatMessage[]) {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initialMessages);
  const [isThinking, setIsThinking] = React.useState(false);

  const send = React.useCallback((text: string) => {
    const userMessage: ChatMessage = {
      id: genId("u"),
      role: "user",
      text,
      at: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    const reply = AGENT_REPLIES[Math.floor(Math.random() * AGENT_REPLIES.length)];
    const totalDelay = 1100;

    window.setTimeout(() => {
      setIsThinking(false);
      const agentMessage: ChatMessage = {
        id: genId("a"),
        role: "agent",
        text: reply,
        at: new Date(),
        streaming: true,
      };
      setMessages((prev) => [...prev, agentMessage]);
      // mark streaming complete after a moment
      window.setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === agentMessage.id ? { ...m, streaming: false } : m,
          ),
        );
      }, 1400);
    }, totalDelay);
  }, []);

  return { messages, send, isThinking };
}
