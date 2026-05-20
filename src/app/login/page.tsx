import { AuthView } from "@/views/auth";

export const metadata = { title: "Вход · PsyBoy" };

export default function Page() {
  return <AuthView step="phone" />;
}
