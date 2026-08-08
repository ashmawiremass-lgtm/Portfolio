"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { skills, projects, type Skill } from "@/lib/data";
import { useLang, tr, categoryLabel } from "@/lib/i18n";

const groupOrder: { match: (s: Skill) => boolean; key: Parameters<typeof tr>[0] }[] = [
  { match: (s) => s.category === "Language", key: "groupLanguages" },
  { match: (s) => s.category === "Frontend" || s.category === "Web", key: "groupFrontendWeb" },
  { match: (s) => s.category === "Tools", key: "groupTools" },
  { match: (s) => s.category === "Professional", key: "groupProfessional" },
];

export default function Skills() {
  const lang = useLang();
  const [active, setActive] = useState(skills[0]);

  return (
    <SectionTransition id="skills" className="relative overflow-hidden max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs font-semibold text-signal uppercase font-mono-eyebrow tracking-widest mb-2">
        02
      </p>
      <h2 className="title-glow text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {tr("skillsEyebrow", lang)}
      </h2>
      <p className="font-mono text-base subtitle-glow font-semibold mb-8">
        <span>// </span>{tr("skillsSubtitle", lang)}
      </p>

      <div className="grid md:grid-cols-[1.1fr_1fr] gap-8">
        <div className="space-y-6">
          {groupOrder.map((group) => {
            const items = skills.filter(group.match);
            if (items.length === 0) return null;
            return (
              <div key={group.key}>
                <p className="font-mono text-[11px] text-muted uppercase mb-2.5">
                  {tr(group.key, lang)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <button
                      key={s.name}
                      onMouseEnter={() => setActive(s)}
                      onFocus={() => setActive(s)}
                      onClick={() => setActive(s)}
                      className={`px-3.5 py-2 rounded-lg text-sm border transition-all ${
                        active.name === s.name
                          ? "border-signal bg-signal/10 text-ink"
                          : "border-border bg-surface text-muted hover:text-ink hover:border-muted"
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="h-fit rounded-xl border border-border bg-surface p-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted uppercase">{categoryLabel(active.category, lang)}</span>
              <span className="font-mono text-xs text-mint">{active.years}</span>
            </div>
            <h3 className="mt-2 text-lg text-ink">{active.name}</h3>
            <p className="mt-2 text-base text-muted leading-relaxed">{active.note[lang]}</p>

            <div className="mt-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span
                    key={n}
                    className={`h-1.5 flex-1 rounded-full ${
                      n <= active.confidence ? "bg-signal" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-muted">
                {tr("lblConfidenceOf5", lang)} {active.confidence}/5
              </p>
            </div>

            {active.usedIn.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {active.usedIn.map((slug) => {
                  const p = projects.find((pr) => pr.slug === slug);
                  if (!p) return null;
                  return (
                    <a
                      key={slug}
                      href="#projects"
                      className="text-xs font-mono px-2 py-1 rounded-md bg-surface2 border border-border text-muted hover:text-ink transition-colors"
                    >
                      {p.name} →
                    </a>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionTransition>
  );
}
