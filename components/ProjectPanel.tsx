"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/data";
import { useLang, tr } from "@/lib/i18n";

export default function ProjectPanel({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const lang = useLang();
  const rows: [string, string][] = project
    ? [
        [tr("lblProblem", lang), project.problem[lang]],
        [tr("lblSolution", lang), project.solution[lang]],
        [tr("lblChallenges", lang), project.challenges[lang]],
        [tr("lblOutcome", lang), project.outcome[lang]],
        [tr("lblImpact", lang), project.impact[lang]],
      ]
    : [];

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-label={`${project.name} case study`}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-lg bg-surface border-l border-border overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-[11px] text-signal uppercase">
                  {project.category[lang]} · {project.year}
                </p>
                <h3 className="text-xl text-ink mt-0.5">{project.name}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close case study"
                className="p-2 rounded-lg hover:bg-surface2 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <p className="text-muted">{project.tagline[lang]}</p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2 py-1 rounded-md bg-surface2 border border-border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {rows.map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono text-[11px] text-mint uppercase mb-1.5">{label}</p>
                  <p className="text-base text-ink/90 leading-relaxed">{value}</p>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    className="flex items-center gap-1.5 text-sm border border-border rounded-lg px-3.5 py-2 hover:bg-surface2 transition-colors"
                  >
                    <Github size={14} /> {tr("lblCode", lang)}
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 text-sm border border-border rounded-lg px-3.5 py-2 hover:bg-surface2 transition-colors"
                  >
                    <ExternalLink size={14} /> {tr("lblLiveDemo", lang)}
                  </a>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
