"use client";

import * as React from "react";

import type { ChatMessage } from "@/entities/message";
import {
  getThreadHistory,
  sendThreadMessage,
  threadEventsUrl,
  type PsyboyMessage,
} from "@/shared/api/psyboy";
import { createClientId } from "@/shared/lib/utils";

function mapMessage(message: PsyboyMessage): ChatMessage {
  const isFailedAssistant =
    message.role === "assistant" &&
    message.status === "ERROR" &&
    !message.content.trim();

  return {
    id: message.message_id,
    role: message.role === "user" ? "user" : "agent",
    text: isFailedAssistant
      ? "Не удалось получить ответ. Попробуй отправить сообщение ещё раз."
      : message.content,
    at: new Date(message.created_at),
    streaming: message.status === "STREAM",
  };
}

function isSseNamedEvent(event: Event): event is MessageEvent<string> {
  return event instanceof MessageEvent;
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

      const optimisticId = createClientId("pending");
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

      let eventSource: EventSource | null = null;
      let responseMessageId = "";
      let responseTimeoutId: number | undefined;
      let pollTimeoutId: number | undefined;
      let streamFinished = false;
      let receivedStreamEvent = false;

      function finishStream() {
        if (streamFinished) return;
        streamFinished = true;
        if (responseTimeoutId !== undefined) {
          window.clearTimeout(responseTimeoutId);
        }
        if (pollTimeoutId !== undefined) {
          window.clearTimeout(pollTimeoutId);
        }
        eventSource?.close();
        if (activeEventSource.current === eventSource) {
          activeEventSource.current = null;
        }
        setIsThinking(false);
      }

      async function syncHistoryFromServer() {
        try {
          const history = await getThreadHistory(threadId);
          setMessages(history.messages.map(mapMessage));
          setError(null);
        } catch (requestError) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Не удалось получить ответ.",
          );
        } finally {
          finishStream();
        }
      }

      function updateAssistantMessage(
        event: MessageEvent<string>,
        complete: boolean,
      ) {
        receivedStreamEvent = true;
        responseMessageId =
          event.lastEventId ||
          responseMessageId ||
          createClientId("response");

        const responseText = event.data.trim();
        if (!responseText && complete) {
          void syncHistoryFromServer();
          return;
        }

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

        if (complete) {
          finishStream();
        }
      }

      function attachStreamListeners(stream: EventSource) {
        stream.addEventListener("token", (rawEvent) => {
          updateAssistantMessage(rawEvent as MessageEvent<string>, false);
        });
        stream.addEventListener("done", (rawEvent) => {
          updateAssistantMessage(rawEvent as MessageEvent<string>, true);
        });
        stream.addEventListener("system_message", (rawEvent) => {
          updateAssistantMessage(rawEvent as MessageEvent<string>, true);
        });
        stream.addEventListener("error", (rawEvent) => {
          if (!isSseNamedEvent(rawEvent)) {
            if (!streamFinished && !receivedStreamEvent) {
              void syncHistoryFromServer();
            } else if (!streamFinished) {
              setError("Ответ прерван. Попробуй отправить сообщение ещё раз.");
              finishStream();
            }
            return;
          }

          updateAssistantMessage(rawEvent, true);
        });
      }

      try {
        const sentMessage = await sendThreadMessage(threadId, text);
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === optimisticId
              ? { ...message, id: sentMessage.user_message_id }
              : message,
          ),
        );

        eventSource = new EventSource(threadEventsUrl(threadId));
        activeEventSource.current = eventSource;
        attachStreamListeners(eventSource);

        pollTimeoutId = window.setTimeout(() => {
          if (!streamFinished && !receivedStreamEvent) {
            void syncHistoryFromServer();
          }
        }, 3_000);

        responseTimeoutId = window.setTimeout(() => {
          if (!streamFinished) {
            if (!receivedStreamEvent) {
              void syncHistoryFromServer();
              return;
            }
            setError("Psyboy не ответил вовремя. Сообщение сохранено в истории.");
            finishStream();
          }
        }, 120_000);
      } catch (requestError) {
        eventSource?.close();
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
