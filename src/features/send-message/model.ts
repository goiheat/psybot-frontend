"use client";

import * as React from "react";

import type { ChatMessage } from "@/entities/message";
import {
  getThreadHistory,
  sendThreadMessage,
  threadEventsUrl,
  type PsyboyMessage,
} from "@/shared/api/psyboy";

function mapMessage(message: PsyboyMessage): ChatMessage {
  return {
    id: message.message_id,
    role: message.role === "user" ? "user" : "agent",
    text: message.content,
    at: new Date(message.created_at),
    streaming: message.status === "STREAM",
  };
}

function waitForEventSource(eventSource: EventSource): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("Psyboy не открыл поток ответа вовремя."));
    }, 10_000);

    function cleanup() {
      window.clearTimeout(timeoutId);
      eventSource.removeEventListener("open", handleOpen);
      eventSource.removeEventListener("error", handleError);
    }

    function handleOpen() {
      cleanup();
      resolve();
    }

    function handleError() {
      cleanup();
      reject(new Error("Не удалось подключиться к потоку ответа."));
    }

    eventSource.addEventListener("open", handleOpen, { once: true });
    eventSource.addEventListener("error", handleError, { once: true });
  });
}

export function useChatThread(threadId: string) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isThinking, setIsThinking] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const activeEventSource = React.useRef<EventSource | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    getThreadHistory(threadId)
      .then((history) => {
        if (!cancelled) {
          setMessages(history.messages.map(mapMessage));
          setError(null);
        }
      })
      .catch((requestError: unknown) => {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Не удалось загрузить историю.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
      activeEventSource.current?.close();
    };
  }, [threadId]);

  const send = React.useCallback(
    async (text: string) => {
      if (isThinking) return;

      const optimisticId = `pending-${crypto.randomUUID()}`;
      const optimisticMessage: ChatMessage = {
        id: optimisticId,
        role: "user",
        text,
        at: new Date(),
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        optimisticMessage,
      ]);
      setError(null);
      setIsThinking(true);

      const eventSource = new EventSource(threadEventsUrl(threadId));
      activeEventSource.current = eventSource;
      let responseMessageId = "";
      let responseTimeoutId: number | undefined;
      let streamFinished = false;

      function updateAssistantMessage(
        event: MessageEvent<string>,
        complete: boolean,
      ) {
        responseMessageId =
          event.lastEventId || responseMessageId || `response-${crypto.randomUUID()}`;

        setMessages((currentMessages) => {
          const existingMessage = currentMessages.find(
            (message) => message.id === responseMessageId,
          );

          if (!existingMessage) {
            return [
              ...currentMessages,
              {
                id: responseMessageId,
                role: "agent",
                text: event.data,
                at: new Date(),
                streaming: !complete,
              },
            ];
          }

          return currentMessages.map((message) =>
            message.id === responseMessageId
              ? {
                  ...message,
                  text: complete ? event.data : `${message.text}${event.data}`,
                  streaming: !complete,
                }
              : message,
          );
        });
      }

      function finishStream() {
        streamFinished = true;
        if (responseTimeoutId !== undefined) {
          window.clearTimeout(responseTimeoutId);
        }
        eventSource.close();
        if (activeEventSource.current === eventSource) {
          activeEventSource.current = null;
        }
        setIsThinking(false);
      }

      try {
        await waitForEventSource(eventSource);

        eventSource.addEventListener("token", (rawEvent) => {
          updateAssistantMessage(rawEvent as MessageEvent<string>, false);
        });
        eventSource.addEventListener("done", (rawEvent) => {
          updateAssistantMessage(rawEvent as MessageEvent<string>, true);
          finishStream();
        });
        eventSource.addEventListener("system_message", (rawEvent) => {
          updateAssistantMessage(rawEvent as MessageEvent<string>, true);
          finishStream();
        });
        eventSource.addEventListener("error", () => {
          setError("Ответ прерван. Попробуй отправить сообщение ещё раз.");
          finishStream();
        });

        const sentMessage = await sendThreadMessage(threadId, text);
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === optimisticId
              ? { ...message, id: sentMessage.user_message_id }
              : message,
          ),
        );
        if (!streamFinished) {
          responseTimeoutId = window.setTimeout(() => {
            setError("Psyboy не ответил вовремя. Сообщение сохранено в истории.");
            finishStream();
          }, 120_000);
        }
      } catch (requestError) {
        eventSource.close();
        if (activeEventSource.current === eventSource) {
          activeEventSource.current = null;
        }
        setIsThinking(false);
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Не удалось отправить сообщение.",
        );
      }
    },
    [isThinking, threadId],
  );

  return { messages, send, isLoading, isThinking, error };
}
