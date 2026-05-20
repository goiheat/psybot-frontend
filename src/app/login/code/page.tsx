import { AuthView } from "@/views/auth";

export const metadata = { title: "Код · PsyBoy" };

export default function Page() {
  return <AuthView step="code" />;
}
