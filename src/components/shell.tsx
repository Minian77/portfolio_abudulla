"use client";

import { Command, Mail, Menu, MapPin, Search } from "lucide-react";
import { EXPERIENCE, PROFILE } from "@/data/resume";
import { NAV, scrollToSection } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { LocalTime, ThemeToggle, openCommandMenu, useActiveSection } from "./client";
import { Kbd, LiveDot } from "./ui";

const SECTION_IDS = NAV.map((n) => n.id);
const current = EXPERIENCE.find((r) => r.end === null);

function Monogram({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg bg-fg text-[13px] font-semibold tracking-tight text-bg",
        className,
      )}
      aria-hidden
    >
      {PROFILE.initials}
    </div>
  );
}

export function Sidebar() {
  const active = useActiveSection(SECTION_IDS);
  return (
    <aside className="sticky top-0 hidden h-dvh flex-col border-r border-line bg-surface/60 lg:flex">
      <div className="flex items-center gap-3 px-5 pt-5 pb-4">
        <Monogram />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{PROFILE.name}</p>
          <p className="truncate text-xs text-muted">AI & Data Systems</p>
        </div>
      </div>

      {current && (
        <div className="mx-4 rounded-lg border border-line bg-surface p-3">
          <div className="flex items-center gap-2">
            <LiveDot />
            <span className="label-mono">Currently</span>
          </div>
          <p className="mt-2 text-sm font-medium leading-snug">{current.title}</p>
          <p className="text-xs text-muted">{current.company}</p>
        </div>
      )}

      <nav aria-label="Sections" className="mt-6 flex-1 px-3">
        <p className="label-mono px-2 pb-2">Navigate</p>
        <ul className="space-y-0.5">
          {NAV.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group relative flex h-9 items-center gap-3 rounded-lg px-2.5 text-sm transition-colors",
                    isActive ? "bg-surface-2 font-medium text-fg" : "text-fg-2 hover:bg-surface-2/70 hover:text-fg",
                  )}
                >
                  {isActive && <span className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-accent" aria-hidden />}
                  <Icon className={cn("size-4", isActive ? "text-accent" : "text-muted group-hover:text-fg-2")} aria-hidden />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="space-y-3 border-t border-line p-4">
        <button
          type="button"
          onClick={openCommandMenu}
          className="flex h-9 w-full items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg-2"
        >
          <Search className="size-4" aria-hidden />
          Quick actions
          <span className="ml-auto flex gap-1">
            <Kbd>
              <Command className="size-2.5" aria-label="Command" />
            </Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="size-3.5" aria-hidden />
            {PROFILE.locationShort}
            <span aria-hidden>·</span>
            <LocalTime timeZone={PROFILE.timezone} className="font-mono" />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

export function Topbar() {
  const active = useActiveSection(SECTION_IDS);
  const label = NAV.find((n) => n.id === active)?.label ?? "Overview";
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-3 px-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 items-center gap-2.5 lg:hidden">
          <Monogram className="size-8 text-xs" />
          <span className="truncate text-sm font-semibold">{PROFILE.name}</span>
        </div>
        <nav aria-label="Breadcrumb" className="hidden items-center gap-2 font-mono text-xs text-muted lg:flex">
          <span>portfolio</span>
          <span aria-hidden>/</span>
          <span className="text-fg" aria-current="page">
            {label.toLowerCase()}
          </span>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandMenu}
            className="hidden h-8 w-56 items-center gap-2 rounded-lg border border-line bg-surface px-2.5 text-xs text-muted transition-colors hover:text-fg-2 sm:flex"
          >
            <Search className="size-3.5" aria-hidden />
            Jump to section…
            <Kbd className="ml-auto">⌘K</Kbd>
          </button>
          <ThemeToggle className="lg:hidden" />
          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden h-8 items-center gap-2 rounded-lg bg-fg px-3 text-xs font-medium text-bg transition-opacity hover:opacity-90 sm:inline-flex"
          >
            <Mail className="size-3.5" aria-hidden />
            Contact
          </a>
          <button
            type="button"
            onClick={openCommandMenu}
            aria-label="Open menu"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-surface text-fg-2 sm:hidden"
          >
            <Menu className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
