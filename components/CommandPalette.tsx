"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Github, Linkedin, Twitter, FileDown, Sun, Moon } from "lucide-react";
import { projects, contactLinks } from "@/lib/data";
import { useLang, tr, type Lang } from "@/lib/i18n";

const sectionKeys: { id: string; key: Parameters<typeof tr>[0] }[] = [
  { id: "hero", key: "navHome" },
  { id: "about", key: "navAbout" },
  { id: "skills", key: "navSkills" },
  { id: "projects", key: "navProjects" },
  { id: "leadership", key: "navLeadership" },
  { id: "credentials", key: "navCredentials" },
  { id: "extras", key: "extrasTitle" },
  { id: "resume", key: "navResume" },
  { id: "contact", key: "navContact" },
];

export default function CommandPalette({
  theme,
  onToggleTheme,
}: {
  theme: "dark" | "light";
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  const lang = useLang();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (e.key === "/" && document.activeElement?.tagName === "INPUT") return;
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 text-sm text-muted border border-border bg-surface hover:bg-surface2 transition-colors rounded-lg px-3 py-1.5"
        aria-label="Open command palette"
      >
        <Search size={14} />
        <span>{tr("cmdSearch", lang)}</span>
        <kbd className="ml-2 text-[11px] font-mono bg-surface2 border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full max-w-lg rounded-xl border border-border bg-surface shadow-glow overflow-hidden"
            >
              <Command loop label="Command Menu">
                <div className="flex items-center gap-2 px-4 border-b border-border">
                  <Search size={16} className="text-muted shrink-0" />
                  <Command.Input
                    autoFocus
                    placeholder={tr("cmdPlaceholder", lang)}
                    className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted"
                  />
                </div>
                <Command.List className="max-h-80 overflow-y-auto p-2">
                  <Command.Empty className="py-6 text-center text-sm text-muted">
                    {tr("cmdNoResults", lang)}
                  </Command.Empty>

                  <Command.Group heading={tr("cmdNavigate", lang)} className="text-[11px] font-mono uppercase text-muted px-2 py-1.5">
                    {sectionKeys.map((s) => (
                      <Command.Item
                        key={s.id}
                        onSelect={() => go(s.id)}
                        className="flex items-center justify-between gap-2 px-2 py-2 rounded-md text-sm cursor-pointer aria-selected:bg-surface2"
                      >
                        <span>{tr(s.key, lang)}</span>
                        <ArrowRight size={13} className="text-muted" />
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading={tr("cmdProjectsGroup", lang)} className="text-[11px] font-mono uppercase text-muted px-2 py-1.5 mt-1">
                    {projects.map((p) => (
                      <Command.Item
                        key={p.slug}
                        onSelect={() => go("projects")}
                        className="flex items-center justify-between gap-2 px-2 py-2 rounded-md text-sm cursor-pointer aria-selected:bg-surface2"
                      >
                        <span>{p.name}</span>
                        <span className="text-xs text-muted">{p.category[lang]}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading={tr("cmdActions", lang)} className="text-[11px] font-mono uppercase text-muted px-2 py-1.5 mt-1">
                    <Command.Item
                      onSelect={onToggleTheme}
                      className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer aria-selected:bg-surface2"
                    >
                      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                      {theme === "dark" ? tr("cmdToggleLight", lang) : tr("cmdToggleDark", lang)}
                    </Command.Item>
                    <Command.Item
                      onSelect={() => {
                        const a = document.createElement("a");
                        a.href = "/resume.pdf";
                        a.download = "";
                        a.click();
                      }}
                      className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer aria-selected:bg-surface2"
                    >
                      <FileDown size={14} /> {tr("cmdDownloadResume", lang)}
                    </Command.Item>
                    <Command.Item
                      onSelect={() => window.open(contactLinks.github, "_blank")}
                      className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer aria-selected:bg-surface2"
                    >
                      <Github size={14} /> {tr("cmdOpenGitHub", lang)}
                    </Command.Item>
                    <Command.Item
                      onSelect={() => window.open(contactLinks.linkedin, "_blank")}
                      className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer aria-selected:bg-surface2"
                    >
                      <Linkedin size={14} /> {tr("cmdOpenLinkedIn", lang)}
                    </Command.Item>
                    <Command.Item
                      onSelect={() => window.open(contactLinks.x, "_blank")}
                      className="flex items-center gap-2 px-2 py-2 rounded-md text-sm cursor-pointer aria-selected:bg-surface2"
                    >
                      <Twitter size={14} /> {tr("cmdOpenX", lang)}
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
