import * as React from "react";

import { AppSidebar } from "@/widgets/sidebar";
import { cn } from "@/shared/lib/utils";
import { Logo } from "@/shared/ui";
import { ThemeToggle } from "@/features/theme-toggle";

interface AppShellProps {
  children: React.ReactNode;
  noSidebar?: boolean;
  className?: string;
}

export function AppShell({ children, noSidebar, className }: AppShellProps) {
  if (noSidebar) {
    return <div className={cn("min-h-screen w-full", className)}>{children}</div>;
  }

  return (
    <div className={cn("min-h-screen w-full flex", className)}>
      <AppSidebar />
      {/* mobile topbar — visible only when sidebar is hidden */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 px-4 py-3 flex items-center justify-between border-b border-rule bg-background/90 backdrop-blur">
        <Logo size="sm" />
        <ThemeToggle />
      </div>
      <main className="flex-1 min-w-0 pt-14 md:pt-0">{children}</main>
    </div>
  );
}
