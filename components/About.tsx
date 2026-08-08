"use client";

import { motion } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { useLang, tr } from "@/lib/i18n";
import { aboutContent } from "@/lib/data";

export default function About() {
  const lang = useLang();
  return (
    <SectionTransition id="about" className="relative overflow-hidden max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs font-semibold text-signal uppercase font-mono-eyebrow tracking-widest mb-2">
        01
      </p>
      <h2 className="title-glow text-3xl md:text-4xl font-bold tracking-tight mb-6">
        {tr("aboutEyebrow", lang)}
      </h2>

      <div className="grid md:grid-cols-[1fr_auto_15rem] gap-8 md:gap-10 items-start">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-xl font-medium leading-snug text-ink"
          >
            {aboutContent.lede[lang]}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-base text-muted leading-relaxed"
          >
            {aboutContent.body[lang]}
          </motion.p>
        </div>

        <div className="hidden md:block w-px bg-border self-stretch" aria-hidden />

        <motion.dl
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-5 md:pl-1 pt-6 md:pt-0 border-t md:border-t-0 border-border"
        >
          {[
            [tr("statLocation", lang), aboutContent.location[lang]],
            [tr("statUniversity", lang), aboutContent.university[lang]],
            [tr("statGPA", lang), aboutContent.gpa],
            [tr("statGrad", lang), aboutContent.grad],
            [tr("statLanguages", lang), tr("valLanguages", lang)],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-xs text-muted uppercase mb-1.5">{label}</dt>
              <dd className="text-base text-ink font-medium">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </SectionTransition>
  );
}
