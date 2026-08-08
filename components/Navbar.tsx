"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Languages } from "lucide-react";
import CommandPalette from "./CommandPalette";
import Logo from "./Logo";
import { useLang, tr, type Lang } from "@/lib/i18n";

const sections: { id: string; key: Parameters<typeof tr>[0] }[] = [
  { id: "about", key: "navAbout" },
  { id: "skills", key: "navSkills" },
  { id: "projects", key: "navProjects" },
  { id: "leadership", key: "navLeadership" },
  { id: "credentials", key: "navCredentials" },
  { id: "resume", key: "navResume" },
  { id: "contact", key: "navContact" },
];

export default function Navbar({
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  lang: Lang;
  onToggleLang: () => void;
}) {
  const [active, setActive] = useState("hero");
  const currentLang = useLang();

  useEffect(() => {
    const ids = ["hero", ...sections.map((s) => s.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-border/80 bg-base/80 backdrop-blur-md">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <Logo />

        <ul className="hidden md:flex items-center gap-6 text-sm text-muted">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`transition-colors hover:text-ink ${
                  active === s.id ? "text-ink" : ""
                }`}
              >
                {tr(s.key, currentLang)}
                {active === s.id && <span className="block h-px mt-1 bg-signal" />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <CommandPalette theme={theme} onToggleTheme={onToggleTheme} />
          <button
            onClick={onToggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 px-2 py-2 rounded-lg border border-border bg-surface hover:bg-surface2 transition-colors font-mono text-[11px]"
          >
            <Languages size={14} />
            {lang === "en" ? "ع" : "EN"}
          </button>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-border bg-surface hover:bg-surface2 transition-colors"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
