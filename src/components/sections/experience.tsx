"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarRange, GraduationCap, MapPin } from "lucide-react";
import { EDUCATION, EXPERIENCE, type Role, type YearMonth } from "@/data/resume";
import { cn, formatDuration, formatRange, toMonthIndex } from "@/lib/utils";
import { Reveal } from "../client";
import { Panel, PanelHeader, Rich, Section, SectionHeading, Tag } from "../ui";

type Row = {
  id: string;
  label: string;
  sub: string;
  start: YearMonth;
  end: YearMonth | null;
  kind: "work" | "education";
  period: string;
};

const ROWS: Row[] = [
  {
    id: "education",
    label: "Curtin University",
    sub: EDUCATION.degree,
    start: EDUCATION.start,
    end: EDUCATION.end,
    kind: "education",
    period: EDUCATION.period,
  },
  ...[...EXPERIENCE].reverse().map<Row>((r) => ({
    id: r.id,
    label: r.company,
    sub: r.title,
    start: r.start,
    end: r.end,
    kind: "work",
    period: formatRange(r.start, r.end),
  })),
];

function CareerTimeline({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const firstYear = Number(EDUCATION.start.slice(0, 4));
  const lastYear = new Date().getFullYear() + 1;
  const d0 = firstYear * 12;
  const span = lastYear * 12 - d0;
  const pct = (m: number) => ((m - d0) / span) * 100;
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);

  return (
    <figure aria-labelledby="timeline-caption">
      <figcaption id="timeline-caption" className="sr-only">
        Career timeline from {firstYear} to present. Select a bar to view role details.
      </figcaption>
      <div className="flex">
        <div className="w-28 shrink-0 sm:w-44" />
        <div className="relative h-6 flex-1">
          {years.map((y, i) => (
            <span
              key={y}
              className={cn(
                "absolute top-0 -translate-x-1/2 font-mono text-[10px] text-muted tabular-nums",
                i % 2 === 1 && "max-sm:hidden",
                i === years.length - 1 && "hidden",
              )}
              style={{ left: `${pct(y * 12)}%` }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Year gridlines sit behind every row. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 left-28 sm:left-44" aria-hidden>
          {years.map((y) => (
            <span key={y} className="absolute inset-y-0 w-px bg-line" style={{ left: `${pct(y * 12)}%` }} />
          ))}
        </div>

        <ul className="relative">
          {ROWS.map((row) => {
            const left = pct(toMonthIndex(row.start));
            const width = Math.max(pct(toMonthIndex(row.end)) - left, 0.8);
            const isWork = row.kind === "work";
            const isSelected = selected === row.id;
            const alignRight = left + width > 62;
            return (
              <li key={row.id} className="flex h-10 items-center">
                <div className="w-28 shrink-0 pr-3 sm:w-44">
                  <p className={cn("truncate text-xs font-medium", isSelected ? "text-fg" : "text-fg-2")}>{row.label}</p>
                  <p className="truncate text-[11px] text-muted max-sm:hidden">{row.sub}</p>
                </div>
                <div className="relative h-full flex-1">
                  <button
                    type="button"
                    disabled={!isWork}
                    onClick={() => onSelect(row.id)}
                    aria-pressed={isWork ? isSelected : undefined}
                    aria-label={`${row.label}, ${row.sub}, ${row.period}`}
                    className="group absolute inset-y-0 flex items-center disabled:cursor-default"
                    style={{ left: `${left}%`, width: `${width}%` }}
                  >
                    <span
                      className={cn(
                        "relative block h-3 w-full rounded-[4px] transition-all duration-200",
                        !isWork && "stripes border border-line-strong",
                        isWork && (isSelected ? "bg-accent" : "bg-accent/35 group-hover:bg-accent/60"),
                      )}
                    >
                      {isWork && row.end === null && (
                        <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-accent ring-2 ring-surface" />
                      )}
                    </span>
                    <span
                      role="tooltip"
                      className={cn(
                        "pointer-events-none absolute bottom-full z-10 mb-1.5 w-max max-w-[15rem] rounded-lg border border-line bg-surface px-3 py-2 text-left opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100",
                        alignRight ? "right-0" : "left-0",
                      )}
                    >
                      <span className="block text-xs font-medium text-fg">{row.sub}</span>
                      <span className="block text-[11px] text-fg-2">{row.label}</span>
                      <span className="mt-1 block font-mono text-[10px] text-muted">
                        {row.period} · {formatDuration(row.start, row.end)}
                      </span>
                    </span>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-muted sm:pl-44">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-4 rounded-[3px] bg-accent" aria-hidden /> Industry role
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="stripes h-2 w-4 rounded-[3px] border border-line-strong" aria-hidden /> Education
        </span>
      </div>
    </figure>
  );
}

function RoleDetail({ role }: { role: Role }) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{role.title}</h3>
          <p className="mt-0.5 text-sm text-fg-2">{role.company}</p>
        </div>
        {role.end === null && (
          <span className="rounded-full border border-line bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent">Current</span>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <CalendarRange className="size-3.5" aria-hidden />
          {formatRange(role.start, role.end)} · {formatDuration(role.start, role.end)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5" aria-hidden />
          {role.location}
        </span>
      </div>
      <ul className="mt-5 space-y-3">
        {role.bullets.map((b) => (
          <li key={b} className="relative pl-5 text-sm leading-relaxed text-fg-2">
            <span className="absolute top-[0.6rem] left-0.5 size-1.5 rounded-full bg-line-strong" aria-hidden />
            <Rich text={b} />
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {role.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const [selected, setSelected] = useState(EXPERIENCE[0].id);
  const reduce = useReducedMotion();
  const role = EXPERIENCE.find((r) => r.id === selected) ?? EXPERIENCE[0];
  const total = formatDuration(EXPERIENCE[EXPERIENCE.length - 1].start, null);

  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        title="Experience"
        description="From Super App infrastructure to enterprise agentic AI."
        aside={<span className="font-mono text-xs text-muted">{EXPERIENCE.length} roles · {total}</span>}
      />
      <div className="space-y-4">
        <Reveal>
          <Panel>
            <PanelHeader icon={CalendarRange} title="Career timeline" meta="Select a role" />
            <div className="px-4 pt-4 pb-5 sm:px-5">
              <CareerTimeline selected={selected} onSelect={setSelected} />
            </div>
          </Panel>
        </Reveal>

        <Reveal>
          <Panel className="grid overflow-hidden md:grid-cols-[260px_minmax(0,1fr)]">
            <div className="flex flex-col border-b border-line md:border-r md:border-b-0">
            <div
              role="tablist"
              aria-label="Roles"
              aria-orientation="vertical"
              className="flex gap-1 overflow-x-auto p-2 md:flex-col"
            >
              {EXPERIENCE.map((r) => {
                const active = r.id === selected;
                return (
                  <button
                    key={r.id}
                    type="button"
                    role="tab"
                    id={`tab-${r.id}`}
                    aria-selected={active}
                    aria-controls="role-panel"
                    onClick={() => setSelected(r.id)}
                    onKeyDown={(e) => {
                      const i = EXPERIENCE.findIndex((x) => x.id === r.id);
                      const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                      if (!step) return;
                      e.preventDefault();
                      const next = EXPERIENCE[(i + step + EXPERIENCE.length) % EXPERIENCE.length];
                      setSelected(next.id);
                      document.getElementById(`tab-${next.id}`)?.focus();
                    }}
                    tabIndex={active ? 0 : -1}
                    className={cn(
                      "relative shrink-0 rounded-lg px-3 py-2.5 text-left transition-colors md:w-full",
                      active ? "bg-surface-2" : "hover:bg-surface-2/60",
                    )}
                  >
                    {active && <span className="absolute inset-y-2.5 left-0 hidden w-0.5 rounded-full bg-accent md:block" aria-hidden />}
                    <span className={cn("block text-sm font-medium", active ? "text-fg" : "text-fg-2")}>{r.company}</span>
                    <span className="block font-mono text-[11px] text-muted whitespace-nowrap">
                      {r.start.slice(0, 4)} — {r.end ? r.end.slice(0, 4) : "Now"}
                    </span>
                  </button>
                );
              })}
            </div>
              <div className="mt-auto hidden border-t border-line px-5 py-4 md:block">
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-4 text-muted" aria-hidden />
                  <span className="label-mono">Education</span>
                </div>
                <p className="mt-2 text-sm font-medium">{EDUCATION.degree}</p>
                <p className="text-xs text-muted">{EDUCATION.school}</p>
                <p className="mt-0.5 font-mono text-[11px] text-muted">{EDUCATION.period} · {EDUCATION.location}</p>
              </div>
            </div>

            <div id="role-panel" role="tabpanel" aria-labelledby={`tab-${role.id}`} className="min-h-[22rem] p-5 sm:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={role.id}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.18 }}
                >
                  <RoleDetail role={role} />
                </motion.div>
              </AnimatePresence>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
