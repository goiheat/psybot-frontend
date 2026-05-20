import { AccountView } from "@/views/account";
import { AppShell } from "@/widgets/app-shell";

export const metadata = { title: "Личный кабинет · PsyBoy" };

export default function Page() {
  return (
    <AppShell>
      <AccountView />
    </AppShell>
  );
}
