"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Plus, UserRound, LogOut } from "lucide-react";

import { Logo, Eyebrow, LiveDot } from "@/shared/ui";
import { ThemeToggle } from "@/features/theme-toggle";
import { cn } from "@/shared/lib/utils";
import { chatSummaries } from "@/shared/mock/chats";
import { formatTime } from "@/shared/lib/format";

const primaryNav = [
  { href: "/chats", label: "Сессии", icon: MessageCircle },
  { href: "/account", label: "Личный кабинет", icon: UserRound },
] as const;

interface NavItemProps {
  href: string;
  label: string;
  num?: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
  status?: "open" | "draft" | "ready";
  meta?: string;
}

function NavItem({
  href,
  label,
  num,
  icon: Icon,
  active,
  status,
  meta,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2.5",
        "text-[14px] text-ink-2",
        "transition-colors duration-[240ms] ease-psyboy",
        "hover:bg-sage-soft/40 hover:text-ink",
        active &&
          "bg-card text-ink border border-rule shadow-soft",
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "size-4 shrink-0 text-ink-3 group-hover:text-ink-2",
            active && "text-sage-deep",
          )}
        />
      )}
      {num && (
        <span className="font-mono text-[11px] tracking-[0.04em] text-mute w-5 shrink-0">
          {num}
        </span>
      )}
      <span className="flex-1 truncate">{label}</span>
      {status === "open" && <LiveDot />}
      {meta && (
        <span className="font-mono text-[10px] tracking-[0.06em] text-ink-3">
          {meta}
        </span>
      )}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] flex-none border-r border-rule px-5 py-7 hidden md:flex flex-col bg-bg-soft">
      <Link href="/chats" className="px-1 mb-10">
        <Logo size="md" sublabel="v0.4 · preview" />
      </Link>

      <Link
        href="/chats?new=1"
        className={cn(
          "flex items-center gap-2 rounded-md border border-rule",
          "px-3.5 h-10 text-[14px] text-ink bg-card",
          "hover:border-ink-3 hover:bg-card-2 transition-colors duration-[240ms]",
          "mb-7",
        )}
      >
        <Plus className="size-4 text-sage-deep" />
        <span>Новая сессия</span>
      </Link>

      <Eyebrow className="px-2 mb-3">Навигация</Eyebrow>
      <nav className="flex flex-col gap-1 mb-7">
        {primaryNav.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={
              pathname === item.href ||
              (item.href === "/chats" && pathname.startsWith("/chats"))
            }
          />
        ))}
      </nav>

      <Eyebrow className="px-2 mb-3">Последние</Eyebrow>
      <nav className="flex flex-col gap-1 mb-6">
        {chatSummaries.slice(0, 4).map((c) => (
          <NavItem
            key={c.id}
            href={`/chats/${c.id}`}
            label={c.title}
            num={c.id.replace(/[^0-9]/g, "").padStart(2, "0").slice(-2)}
            status={c.status === "open" ? "open" : undefined}
            meta={formatTime(c.startedAt)}
            active={pathname === `/chats/${c.id}`}
          />
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-rule-soft flex items-center justify-between">
        <ThemeToggle />
        <button
          type="button"
          className="flex items-center gap-2 text-[13px] text-ink-3 hover:text-ink transition"
        >
          <LogOut className="size-4" />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
}
