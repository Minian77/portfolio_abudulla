import { ChevronRight, Workflow } from "lucide-react";
import { PROJECTS, type Project } from "@/data/resume";
import { Reveal } from "../client";
import { LiveDot, Panel, Rich, Section, SectionHeading, Tag } from "../ui";

function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="rounded-lg border border-line bg-surface-2/60 p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <Workflow className="size-3.5 text-muted" aria-hidden />
        <span className="label-mono">Data flow</span>
      </div>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1.5" aria-label="System data flow">
        {steps.map((s, i) => (
          // The arrow travels with its step so wrapped lines never end on a dangling arrow.
          <li key={s} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5 text-muted" aria-hidden />}
            <span
              className={
                i === steps.length - 1
                  ? "rounded-md border border-accent/30 bg-accent-soft px-2 py-1 text-xs font-medium text-accent"
                  : "rounded-md border border-line bg-surface px-2 py-1 text-xs text-fg-2"
              }
            >
              {s}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Panel className="flex h-full flex-col transition-colors hover:border-line-strong">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="label-mono">{project.kind}</p>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight">{project.name}</h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
            {project.live && <LiveDot />}
            {project.period}
          </span>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col bg-surface px-4 py-3">
              <dt className="order-2 text-xs text-muted">{m.label}</dt>
              <dd className="order-1 text-xl font-semibold tracking-tight tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-5 space-y-2.5">
          {project.bullets.map((b) => (
            <li key={b} className="relative pl-5 text-sm leading-relaxed text-fg-2">
              <span className="absolute top-[0.6rem] left-0.5 size-1.5 rounded-full bg-line-strong" aria-hidden />
              <Rich text={b} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto space-y-4 border-t border-line p-5 sm:px-6">
        <Flow steps={project.flow} />
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </div>
    </Panel>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        title="Selected projects"
        description="Production systems, each with how the data moves through it."
        aside={<span className="font-mono text-xs text-muted">{PROJECTS.length} systems</span>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
