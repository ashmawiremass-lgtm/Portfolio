"use client";

import { motion } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { credentials, aboutContent } from "@/lib/data";
import { useLang, tr } from "@/lib/i18n";

export default function Credentials() {
  const lang = useLang();
  const education = credentials.find((c) => c.kind === "Education");
  const rest = credentials.filter((c) => c.kind !== "Education");

  return (
    <SectionTransition id="credentials" className="relative overflow-hidden max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs font-semibold text-signal uppercase font-mono-eyebrow tracking-widest mb-2">
        05
      </p>
      <h2 className="title-glow text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {tr("credentialsEyebrow", lang)}
      </h2>
      <p className="font-mono text-base subtitle-glow font-semibold mb-8">
        <span>// </span>{tr("credentialsSubtitle", lang)}
      </p>

      {education && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-2xl border border-signal/40 bg-surface p-6"
        >
          <div>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-signal/10 text-signal">
              {tr("kindEducation", lang)}
            </span>
            <p className="text-xl md:text-2xl text-ink font-bold mt-2">{education.label[lang]}</p>
            <p className="text-sm text-muted mt-1">{education.org} · {education.date}</p>
          </div>
          <div className="text-left sm:text-right shrink-0">
            <p className="title-glow text-4xl font-bold">{aboutContent.gpa}</p>
            <p className="font-mono text-xs text-muted uppercase mt-1">{tr("statGPA", lang)}</p>
          </div>
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 gap-2.5">
        {rest.map((c, i) => (
          <motion.div
            key={c.label.en}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            className="flex items-start justify-between gap-4 rounded-lg border border-border bg-surface px-4 py-3 hover:border-signal/40 hover:bg-surface2 transition-colors"
            whileHover={{ x: 3 }}
          >
            <div>
              <p className="text-base text-ink leading-snug">{c.label[lang]}</p>
              <p className="text-xs text-muted mt-0.5">{c.org}</p>
            </div>
            <div className="text-right shrink-0">
              <span
                className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                  c.kind === "Honor"
                    ? "bg-mint/10 text-mint"
                    : "bg-signal/10 text-signal"
                }`}
              >
                {c.kind === "Honor" ? tr("kindHonor", lang) : tr("kindCertification", lang)}
              </span>
              <p className="text-[11px] font-mono text-muted mt-1">{c.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionTransition>
  );
}
