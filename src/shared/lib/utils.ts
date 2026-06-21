import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createClientId(prefix: string): string {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    try {
      return `${prefix}-${globalThis.crypto.randomUUID()}`;
    } catch {
      // randomUUID requires a secure context (HTTPS); fall back on HTTP deploys.
    }
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
