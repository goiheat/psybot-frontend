"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/shared/ui";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Светлая тема" : "Тёмная тема";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={className}
    >
      {mounted ? isDark ? <Sun /> : <Moon /> : <span className="size-[18px]" />}
    </Button>
  );
}
