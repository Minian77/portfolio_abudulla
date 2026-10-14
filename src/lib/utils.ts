import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { YearMonth } from "@/data/resume";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Months since year 0 — a linear scale for timeline maths. */
export function toMonthIndex(ym: YearMonth | null, now = new Date()) {
  if (!ym) return now.getFullYear() * 12 + now.getMonth();
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

export function formatYearMonth(ym: YearMonth | null) {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatRange(start: YearMonth, end: YearMonth | null) {
  return `${formatYearMonth(start)} — ${formatYearMonth(end)}`;
}

export function formatDuration(start: YearMonth, end: YearMonth | null) {
  const months = Math.max(1, toMonthIndex(end) - toMonthIndex(start));
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ");
}
