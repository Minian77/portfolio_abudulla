import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { PROFILE } from "@/data/resume";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const title = `${PROFILE.name} — ${PROFILE.role}`;

export const metadata: Metadata = {
  title,
  description: PROFILE.headline,
  keywords: ["AI Engineer", "Agentic AI", "LangGraph", "RAG", "Data Engineering", "Full-Stack", "Next.js", "FastAPI", "Dubai"],
  authors: [{ name: PROFILE.name }],
  openGraph: { title, description: PROFILE.headline, type: "profile", locale: "en_US", siteName: PROFILE.name },
  twitter: { card: "summary", title, description: PROFILE.headline },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#121318" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} min-h-dvh bg-bg font-sans text-fg antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
