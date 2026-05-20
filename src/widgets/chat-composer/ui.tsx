"use client";

import * as React from "react";
import { Paperclip, ArrowUp } from "lucide-react";

import { Textarea } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

interface ChatComposerProps {
  onSend?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hint?: React.ReactNode;
}

export function ChatComposer({
  onSend,
  placeholder = "Напиши, как ты сейчас…",
  disabled,
  hint,
}: ChatComposerProps) {
  const [value, setValue] = React.useState("");
  const ref = React.useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend?.(trimmed);
    setValue("");
  }

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [value]);

  return (
    <div
      className={cn(
        "sticky bottom-0 z-10 pt-4 pb-6",
        "bg-gradient-to-t from-background via-background to-background/0",
      )}
    >
      <div
        className={cn(
          "border border-rule rounded-[14px] bg-card shadow-soft",
          "flex items-end gap-3 px-3 py-3",
          disabled && "opacity-60",
        )}
      >
        <button
          type="button"
          aria-label="Прикрепить"
          disabled={disabled}
          className="size-10 grid place-items-center rounded-md text-ink-3 hover:bg-bg-soft hover:text-ink transition-colors duration-[240ms]"
        >
          <Paperclip className="size-4" />
        </button>
        <Textarea
          ref={ref}
          rows={1}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={placeholder}
          className="flex-1 px-1 py-2.5 max-h-40"
        />
        <button
          type="button"
          aria-label="Отправить"
          disabled={disabled || !value.trim()}
          onClick={handleSubmit}
          className={cn(
            "size-10 grid place-items-center rounded-md bg-ink text-background",
            "transition-opacity duration-[240ms]",
            "disabled:opacity-30 disabled:cursor-not-allowed",
          )}
        >
          <ArrowUp className="size-4" />
        </button>
      </div>
      <div className="flex items-center justify-between mt-2 px-1 text-[12px] text-ink-3">
        <div className="flex items-center gap-3">
          {hint ?? (
            <>
              <span>
                <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-rule bg-card text-ink-2">
                  Enter
                </kbd>{" "}
                отправить
              </span>
              <span>
                <kbd className="font-mono text-[11px] px-1.5 py-0.5 rounded border border-rule bg-card text-ink-2">
                  Shift+Enter
                </kbd>{" "}
                перенос
              </span>
            </>
          )}
        </div>
        <span className="font-mono text-[11px]">сохраняется автоматически</span>
      </div>
    </div>
  );
}
