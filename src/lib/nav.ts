import { Boxes, BriefcaseBusiness, Gauge, LayoutDashboard, Layers, Mail } from "lucide-react";

export const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "impact", label: "Impact", icon: Gauge },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", icon: Boxes },
  { id: "stack", label: "Stack", icon: Layers },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export type SectionId = (typeof NAV)[number]["id"];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
