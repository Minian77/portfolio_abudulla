import { ArrowDownRight, Briefcase, CircleCheck, Mail, MapPin } from "lucide-react";
import { EXPERIENCE, METRICS, PROFILE } from "@/data/resume";
import { formatYearMonth } from "@/lib/utils";
import { CopyButton, Reveal } from "../client";
import { LiveDot, Panel, PanelHeader, Section, SectionHeading, Tag } from "../ui";

const current = EXPERIENCE.find((r) => r.end === null) ?? EXPERIENCE[0];

export function Overview() {
  return (
    <Section id="overview" className="pt-6 sm:pt-10">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <Reveal>
          <Panel className="relative h-full overflow-hidden">
            <div
              className="bg-dots pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_70%_60%_at_100%_0%,black,transparent)]"
              aria-hidden
            />
            <div className="relative flex h-full flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden />
                  {PROFILE.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5" aria-hidden />
                  {PROFILE.yearsExperience} years in production
                </span>
              </div>

              <h1 id="overview-title" className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
                {PROFILE.name}
              </h1>
              <p className="mt-2 text-base font-medium text-fg-2 sm:text-lg">{PROFILE.role}</p>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg-2 text-pretty">{PROFILE.headline}</p>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
                >
                  <Mail className="size-4" aria-hidden />
                  Get in touch
                </a>
                <a
                  href="#projects"
                  className="inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-fg transition-colors hover:bg-surface-2"
                >
                  View projects
                  <ArrowDownRight className="size-4 text-muted" aria-hidden />
                </a>
                <CopyButton value={PROFILE.email} label="Copy email" />
              </div>
            </div>
          </Panel>
        </Reveal>

        <Reveal delay={0.06}>
          <Panel className="flex h-full flex-col">
            <PanelHeader
              title="Current engagement"
              meta={
                <span className="inline-flex items-center gap-1.5">
                  <LiveDot /> Active
                </span>
              }
            />
            <div className="p-5">
              <p className="text-base font-semibold leading-snug">{current.title}</p>
              <p className="mt-1 text-sm text-muted">
                {current.company} · {current.location}
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted">Since {formatYearMonth(current.start)}</p>

              <p className="label-mono mt-6 mb-2.5">Focus</p>
              <ul className="space-y-2">
                {PROFILE.focus.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-fg-2">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto border-t border-line p-5">
              <p className="label-mono mb-2.5">Core stack</p>
              <div className="flex flex-wrap gap-1.5">
                {PROFILE.coreStack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}

export function Impact() {
  return (
    <Section id="impact">
      <SectionHeading id="impact" title="Impact" description="Measured outcomes from systems running in production." />
      <Reveal>
        <Panel className="overflow-hidden">
          <dl className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="flex flex-col bg-surface p-5 sm:p-6">
                <dt className="order-2 mt-1.5 text-sm leading-snug text-fg-2">{m.label}</dt>
                <dd className="order-1 text-3xl font-semibold tracking-tight tabular-nums sm:text-[2rem]">{m.value}</dd>
                <dd className="order-3 mt-3 font-mono text-[11px] text-muted">{m.context}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </Reveal>
    </Section>
  );
}
