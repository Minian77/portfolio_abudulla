"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "motion/react";
import { Check, Copy, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg border border-line bg-surface text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg",
        className,
      )}
    >
      {mounted ? dark ? <Sun className="size-4" /> : <Moon className="size-4" /> : <span className="size-4" />}
    </button>
  );
}

export function useCopy(timeout = 1600) {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch {
      setCopied(false);
    }
  };
  return { copied, copy };
}

export function CopyButton({ value, label = "Copy", className }: { value: string; label?: string; className?: string }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg",
        className,
      )}
    >
      {copied ? <Check className="size-4 text-good" /> : <Copy className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}

export function LocalTime({ timeZone, className }: { timeZone: string; className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  const text = now
    ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone, hour12: false }).format(now)
    : "--:--";
  return (
    <time className={cn("tabular-nums", className)} suppressHydrationWarning>
      {text}
    </time>
  );
}

export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        // Bottom of page: the last section wins even if it is short.
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
          setActive(ids[ids.length - 1]);
          return;
        }
        const first = ids.find((id) => (visible.get(id) ?? 0) > 0);
        if (first) setActive(first);
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: [0, 0.01, 0.25] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function openCommandMenu() {
  window.dispatchEvent(new Event("open-command-menu"));
}
