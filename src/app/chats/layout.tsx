import { AppShell } from "@/widgets/app-shell";

export default function ChatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
