import { Fragment, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Panel({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("panel", className)} {...props}>
      {children}
    </div>
  );
}

export function PanelHeader({
  icon: Icon,
  title,
  meta,
  className,
}: {
  icon?: LucideIcon;
  title: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3 border-b border-line px-5 py-3", className)}>
      <div className="flex min-w-0 items-center gap-2">
        {Icon && <Icon className="size-3.5 shrink-0 text-muted" aria-hidden />}
        <span className="label-mono truncate">{title}</span>
      </div>
      {meta && <div className="shrink-0 font-mono text-[11px] text-muted">{meta}</div>}
    </div>
  );
}

export function SectionHeading({ id, title, description, aside }: { id: string; title: string; description?: string; aside?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div>
        <h2 id={`${id}-title`} className="text-xl font-semibold tracking-tight text-fg">
          {title}
        </h2>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
      {aside}
    </div>
  );
}

export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-20", className)}>
      {children}
    </section>
  );
}

export function Tag({ children, className, dim }: { children: ReactNode; className?: string; dim?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface-2 px-2 py-0.5 text-xs text-fg-2 transition-opacity",
        dim && "opacity-30",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Renders **bold** spans inside a plain string. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-medium text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded border border-line bg-surface-2 px-1 font-mono text-[10px] text-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex size-2", className)} aria-hidden>
      <span className="absolute inset-0 rounded-full bg-good opacity-60 motion-safe:animate-[ping-soft_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <span className="relative inline-flex size-2 rounded-full bg-good" />
    </span>
  );
}
