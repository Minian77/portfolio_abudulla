"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Copy, CornerDownLeft, Mail, Phone, Search, SunMoon, type LucideIcon } from "lucide-react";
import { PROFILE } from "@/data/resume";
import { NAV, scrollToSection } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Kbd } from "./ui";

type Item = { id: string; group: string; label: string; hint?: string; icon: LucideIcon; run: () => void };

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    restoreFocus.current?.focus?.();
  }, []);

  const items = useMemo<Item[]>(
    () => [
      ...NAV.map((n) => ({
        id: `nav-${n.id}`,
        group: "Navigate",
        label: n.label,
        icon: n.icon,
        run: () => scrollToSection(n.id),
      })),
      {
        id: "copy-email",
        group: "Contact",
        label: "Copy email address",
        hint: PROFILE.email,
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(PROFILE.email).then(() => {
            setToast("Email copied to clipboard");
            setTimeout(() => setToast(null), 1800);
          });
        },
      },
      {
        id: "email",
        group: "Contact",
        label: "Send an email",
        icon: Mail,
        run: () => (window.location.href = `mailto:${PROFILE.email}`),
      },
      {
        id: "call",
        group: "Contact",
        label: "Call",
        hint: PROFILE.phone,
        icon: Phone,
        run: () => (window.location.href = PROFILE.phoneHref),
      },
      {
        id: "theme",
        group: "Preferences",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`,
        icon: SunMoon,
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
    ],
    [resolvedTheme, setTheme],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    const onOpen = () => {
      restoreFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) restoreFocus.current = document.activeElement as HTMLElement;
          return !o;
        });
      }
    };
    window.addEventListener("open-command-menu", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("open-command-menu", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setIndex(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const runItem = (item: Item) => {
    close();
    // Let the dialog unmount first so body scrolling is restored.
    requestAnimationFrame(item.run);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter" && filtered[index]) {
      e.preventDefault();
      runItem(filtered[index]);
    } else if (e.key === "Tab") {
      e.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]" onKeyDown={onKeyDown}>
            <motion.div
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={close}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Quick actions"
              className="panel relative w-full max-w-lg overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 text-muted" aria-hidden />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  placeholder="Search sections and actions…"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-list"
                  aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
                  className="h-12 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
                />
                <Kbd>Esc</Kbd>
              </div>
              <ul id="command-list" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <li className="px-3 py-8 text-center text-sm text-muted">No results for “{query}”</li>
                )}
                {filtered.map((item, i) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  const Icon = item.icon;
                  const selected = i === index;
                  return (
                    <li key={item.id} role="presentation">
                      {showGroup && <p className="label-mono px-3 pt-3 pb-1.5">{item.group}</p>}
                      <div
                        id={`cmd-${item.id}`}
                        role="option"
                        aria-selected={selected}
                        onMouseMove={() => setIndex(i)}
                        onClick={() => runItem(item)}
                        className={cn(
                          "flex h-10 cursor-pointer items-center gap-3 rounded-lg px-3 text-sm",
                          selected ? "bg-surface-2 text-fg" : "text-fg-2",
                        )}
                      >
                        <Icon className={cn("size-4 shrink-0", selected ? "text-accent" : "text-muted")} aria-hidden />
                        <span className="shrink-0">{item.label}</span>
                        {item.hint && <span className="truncate font-mono text-xs text-muted">{item.hint}</span>}
                        {selected && <ArrowRight className="ml-auto size-3.5 shrink-0 text-muted" aria-hidden />}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[11px] text-muted">
                <span className="flex items-center gap-1.5">
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd> navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd>
                    <CornerDownLeft className="size-2.5" />
                  </Kbd>
                  select
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
        {toast && <div className="panel px-4 py-2 text-sm shadow-lg">{toast}</div>}
      </div>
    </>
  );
}
