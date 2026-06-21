export interface PsyboyThread {
  id: string;
  status: string;
  created_at: string;
  last_message_at: string;
}

export interface PsyboyThreadPage {
  items: PsyboyThread[];
  next_cursor: string | null;
}

export interface PsyboyCreatedThread {
  id: string;
  created_at: string;
}

export interface PsyboyMessage {
  message_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  status: string;
  created_at: string;
}

export interface PsyboyThreadHistory {
  thread_id: string;
  messages: PsyboyMessage[];
  next_cursor: string | null;
}

export interface PsyboySentMessage {
  user_message_id: string;
}

interface PsyboyErrorBody {
  detail?: string;
}

async function requestJson<ResponseBody>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<ResponseBody> {
  const response = await fetch(input, init);

  if (!response.ok) {
    let detail = `Request failed with status ${response.status}.`;
    try {
      const body = (await response.json()) as PsyboyErrorBody;
      if (body.detail) detail = body.detail;
    } catch {
      // The status code remains useful when the upstream body is not JSON.
    }
    throw new Error(detail);
  }

  return (await response.json()) as ResponseBody;
}

export function listThreads(): Promise<PsyboyThreadPage> {
  return requestJson<PsyboyThreadPage>("/backend/psyboy/threads");
}

export function createThread(): Promise<PsyboyCreatedThread> {
  return requestJson<PsyboyCreatedThread>("/backend/psyboy/threads", {
    method: "POST",
  });
}

export function getThreadHistory(
  threadId: string,
): Promise<PsyboyThreadHistory> {
  return requestJson<PsyboyThreadHistory>(
    `/backend/psyboy/threads/${encodeURIComponent(threadId)}/messages`,
  );
}

export function sendThreadMessage(
  threadId: string,
  message: string,
): Promise<PsyboySentMessage> {
  return requestJson<PsyboySentMessage>(
    `/backend/psyboy/threads/${encodeURIComponent(threadId)}/messages`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    },
  );
}

export function threadEventsUrl(threadId: string): string {
  return `/backend/psyboy/threads/${encodeURIComponent(threadId)}/events`;
}
