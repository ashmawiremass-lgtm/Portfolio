"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import ProjectPanel from "./ProjectPanel";
import { useLang, tr } from "@/lib/i18n";

export default function Projects() {
  const lang = useLang();
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <SectionTransition id="projects" className="relative overflow-hidden max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs font-semibold text-signal uppercase font-mono-eyebrow tracking-widest mb-2">
        03
      </p>
      <h2 className="title-glow text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {tr("projectsEyebrow", lang)}
      </h2>
      <p className="font-mono text-base subtitle-glow font-semibold mb-10">
        <span>// </span>{tr("projectsSubtitle", lang)}
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((p, i) => (
          <motion.button
            key={p.slug}
            onClick={() => setOpen(p)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative text-left rounded-xl border border-border bg-surface p-5 hover:border-signal/50 hover:bg-surface2 transition-colors group"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] text-muted uppercase">
                {p.category[lang]}
              </span>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-signal to-mint p-[1.5px]">
                  <div className="h-full w-full rounded-full bg-surface group-hover:bg-surface2 flex items-center justify-center transition-colors">
                    <span className="font-mono text-[11px] text-signal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-muted group-hover:text-signal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>
            </div>
            <h3 className="mt-3 text-lg text-ink">{p.name}</h3>
            <p className="mt-2 text-base text-muted leading-relaxed">{p.tagline[lang]}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-surface2 border border-border text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      <ProjectPanel project={open} onClose={() => setOpen(null)} />
    </SectionTransition>
  );
}
