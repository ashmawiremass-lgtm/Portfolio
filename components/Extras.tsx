"use client";

import { motion } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { languages } from "@/lib/data";
import { useLang, tr } from "@/lib/i18n";

const codeFor = (name: string) => name.slice(0, 2).toUpperCase();

export default function Extras() {
  const lang = useLang();
  const descKey = (name: string) => (name === "Arabic" ? "arabicDesc" : "englishDesc");

  return (
    <SectionTransition id="extras" className="relative overflow-hidden max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs font-semibold text-signal uppercase font-mono-eyebrow tracking-widest mb-2">
        06
      </p>
      <h2 className="title-glow text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {tr("extrasTitle", lang)}
      </h2>
      <p className="font-mono text-base subtitle-glow font-semibold mb-8">
        <span>// </span>{tr("extrasSubtitle", lang)}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        {languages.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -3 }}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-signal to-mint p-[1.5px] shrink-0">
                <div className="h-full w-full rounded-full bg-base flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-signal">
                    {codeFor(l.name)}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-lg text-ink font-semibold">{l.name}</p>
                <p className="font-mono text-[11px] text-mint uppercase mt-0.5 px-1.5 py-0.5 rounded-full bg-mint/10 inline-block">
                  {l.level}
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {tr(descKey(l.name), lang)}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionTransition>
  );
}
