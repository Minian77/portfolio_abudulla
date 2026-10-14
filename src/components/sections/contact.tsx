import { ArrowUpRight, Clock, Globe, Languages, Mail, MapPin, Phone } from "lucide-react";
import { LANGUAGES, PROFILE } from "@/data/resume";
import { CopyButton, LocalTime, Reveal } from "../client";
import { Panel, PanelHeader, Section } from "../ui";

function Meter({ level, label }: { level: number; label: string }) {
  return (
    <span className="flex items-center gap-1" role="img" aria-label={`${label}, ${level} of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < level ? "h-1.5 w-4 rounded-full bg-accent" : "h-1.5 w-4 rounded-full bg-line-strong"} />
      ))}
    </span>
  );
}

export function Contact() {
  const rows = [
    { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: Phone, label: "Phone", value: PROFILE.phone, href: PROFILE.phoneHref },
    { icon: MapPin, label: "Location", value: PROFILE.location },
    ...PROFILE.links.map((l) => ({ icon: Globe, label: l.label, value: l.href.replace(/^https?:\/\//, ""), href: l.href })),
  ];

  return (
    <Section id="contact">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
        <Reveal>
          <Panel className="relative h-full overflow-hidden">
            <div
              className="bg-dots pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_70%_at_100%_100%,black,transparent)]"
              aria-hidden
            />
            <div className="relative p-6 sm:p-8">
              <p className="label-mono">Contact</p>
              <h2 id="contact-title" className="mt-3 max-w-lg text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Building an AI platform that has to work in production?
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-fg-2">
                I&apos;m happy to talk architecture, agentic systems, RAG quality, or data infrastructure. Email is the fastest way to reach me.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex h-9 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
                >
                  <Mail className="size-4" aria-hidden />
                  Email me
                </a>
                <CopyButton value={PROFILE.email} label="Copy email" />
              </div>

              <dl className="mt-8 divide-y divide-line border-t border-line">
                {rows.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 py-3">
                    <dt className="flex w-24 shrink-0 items-center gap-2 text-xs text-muted">
                      <Icon className="size-3.5" aria-hidden />
                      {label}
                    </dt>
                    <dd className="min-w-0 truncate text-sm">
                      {href ? (
                        <a href={href} className="group inline-flex items-center gap-1 text-fg hover:text-accent">
                          {value}
                          <ArrowUpRight className="size-3.5 text-muted transition-colors group-hover:text-accent" aria-hidden />
                        </a>
                      ) : (
                        <span className="text-fg">{value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Panel>
        </Reveal>

        <div className="grid gap-4">
          <Reveal delay={0.05}>
            <Panel className="h-full">
              <PanelHeader icon={Clock} title="Local time" meta="GST · UTC+4" />
              <div className="p-5">
                <LocalTime timeZone={PROFILE.timezone} className="font-mono text-4xl font-medium tracking-tight" />
                <p className="mt-1 text-sm text-muted">{PROFILE.location}</p>
              </div>
            </Panel>
          </Reveal>
          <Reveal delay={0.1}>
            <Panel className="h-full">
              <PanelHeader icon={Languages} title="Languages" />
              <ul className="divide-y divide-line">
                {LANGUAGES.map((l) => (
                  <li key={l.name} className="flex items-center justify-between gap-4 px-5 py-3.5">
                    <div>
                      <p className="text-sm font-medium">{l.name}</p>
                      <p className="text-xs text-muted">{l.label}</p>
                    </div>
                    <Meter level={l.level} label={l.label} />
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
