import { ChatView } from "@/views/chat";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return { title: `Сессия ${id.slice(0, 8)} · PsyBoy` };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ChatView threadId={id} />;
}
