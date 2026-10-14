"use client";

import { useMemo, useState } from "react";
import { BrainCircuit, Cpu, Database, LayoutTemplate, Search, Server, Waypoints, X, type LucideIcon } from "lucide-react";
import { SKILLS } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Reveal } from "../client";
import { Panel, PanelHeader, Section, SectionHeading, Tag } from "../ui";

const ICONS: Record<string, LucideIcon> = {
  "Generative AI & Agentic": BrainCircuit,
  "Machine Learning & LLMOps": Cpu,
  "Data Engineering": Waypoints,
  "Vector Search & Databases": Database,
  "Backend & Cloud": Server,
  "Frontend & Mobile": LayoutTemplate,
};

const TOTAL = SKILLS.reduce((n, g) => n + g.items.length, 0);

export function Stack() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const matches = useMemo(
    () => (q ? SKILLS.reduce((n, g) => n + g.items.filter((i) => i.toLowerCase().includes(q)).length, 0) : TOTAL),
    [q],
  );

  return (
    <Section id="stack">
      <SectionHeading
        id="stack"
        title="Technical stack"
        description={`${TOTAL} tools across the full AI product lifecycle.`}
        aside={
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter technologies…"
              aria-label="Filter technologies"
              className="h-9 w-full rounded-lg border border-line bg-surface pr-8 pl-8 text-sm text-fg outline-none placeholder:text-muted focus:border-accent [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear filter"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-0.5 text-muted hover:text-fg"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>
        }
      />
      <p className="sr-only" aria-live="polite">
        {q ? `${matches} matching technologies` : ""}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group, i) => {
          const hits = q ? group.items.filter((s) => s.toLowerCase().includes(q)).length : group.items.length;
          return (
            <Reveal key={group.category} delay={(i % 3) * 0.04} className="h-full">
              <Panel className={cn("h-full transition-opacity", q && hits === 0 && "opacity-50")}>
                <PanelHeader
                  icon={ICONS[group.category]}
                  title={group.category}
                  meta={q ? `${hits}/${group.items.length}` : group.items.length}
                />
                <div className="flex flex-wrap gap-1.5 p-4">
                  {group.items.map((s) => {
                    const hit = q && s.toLowerCase().includes(q);
                    return (
                      <Tag
                        key={s}
                        dim={!!q && !hit}
                        className={cn(hit && "border-accent/40 bg-accent-soft text-accent")}
                      >
                        {s}
                      </Tag>
                    );
                  })}
                </div>
              </Panel>
            </Reveal>
          );
        })}
      </div>
      {q && matches === 0 && (
        <p className="mt-4 text-center text-sm text-muted">Nothing matches “{query}”.</p>
      )}
    </Section>
  );
}
