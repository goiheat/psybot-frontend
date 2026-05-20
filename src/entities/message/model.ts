export type MessageRole = "user" | "agent";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  paragraphs?: string[];
  at: Date;
  streaming?: boolean;
  suggestions?: string[];
}
