import { CommandMenu } from "@/components/command-menu";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Impact, Overview } from "@/components/sections/overview";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Sidebar, Topbar } from "@/components/shell";
import { PROFILE } from "@/data/resume";

// Re-render daily so "Present" durations stay current.
export const revalidate = 86400;

export default function Home() {
  return (
    <div className="lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="min-w-0">
        <Topbar />
        <main className="mx-auto max-w-[1180px] space-y-14 px-4 pb-16 sm:px-6 lg:px-10">
          <Overview />
          <Impact />
          <Experience />
          <Projects />
          <Stack />
          <Contact />
        </main>
        <footer className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-6 font-mono text-[11px] text-muted sm:px-6 lg:px-10">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span>Press ⌘K / Ctrl K for quick actions</span>
        </footer>
      </div>
      <CommandMenu />
    </div>
  );
}
