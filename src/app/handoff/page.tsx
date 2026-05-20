import { HandoffView } from "@/views/handoff";
import { AppShell } from "@/widgets/app-shell";

export const metadata = { title: "Передача специалисту · PsyBoy" };

export default function Page() {
  return (
    <AppShell>
      <HandoffView />
    </AppShell>
  );
}
