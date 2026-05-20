import { notFound } from "next/navigation";

import { ChatView } from "@/views/chat";
import { getChatById, chatThreads } from "@/shared/mock/chats";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return chatThreads.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const chat = getChatById(id);
  return { title: chat ? `${chat.title} · PsyBoy` : "Сессия · PsyBoy" };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const chat = getChatById(id);
  if (!chat) notFound();
  return <ChatView thread={chat} />;
}
