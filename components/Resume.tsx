"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink } from "lucide-react";
import SectionTransition from "./SectionTransition";
import { useLang, tr } from "@/lib/i18n";

export default function Resume() {
  const lang = useLang();
  return (
    <SectionTransition id="resume" className="relative overflow-hidden max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs font-semibold text-signal uppercase font-mono-eyebrow tracking-widest mb-2">
        06
      </p>
      <h2 className="title-glow text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {tr("resumeEyebrow", lang)}
      </h2>
      <p className="font-mono text-base subtitle-glow font-semibold mb-10">
        <span>// </span>{tr("resumeSubtitle", lang)}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center gap-6 rounded-2xl border border-border bg-surface p-6 md:p-8"
      >
        <div className="h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br from-signal to-mint p-[1.5px]">
          <div className="h-full w-full rounded-xl bg-base flex items-center justify-center">
            <FileText size={26} className="text-signal" />
          </div>
        </div>

        <p className="text-base text-muted leading-relaxed flex-1">
          {tr("resumeBlurb", lang)}
        </p>

        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-lg bg-signal text-base text-sm font-medium px-5 py-2.5 hover:brightness-110 transition"
          >
            <Download size={16} />
            {tr("resumeDownload", lang)}
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface2 text-sm px-5 py-2.5 hover:bg-surface transition"
          >
            <ExternalLink size={16} />
            {tr("resumeOpen", lang)}
          </a>
        </div>
      </motion.div>
    </SectionTransition>
  );
}
