"use client";

import { motion } from "framer-motion";
import SectionTransition from "./SectionTransition";
import {
  Megaphone,
  HandCoins,
  ShieldCheck,
  Rocket,
  GraduationCap,
  Wrench,
  Code2,
} from "lucide-react";
import { timeline, type TimelineItem } from "@/lib/data";
import { useLang, tr, type Lang } from "@/lib/i18n";

function iconFor(title: string) {
  const t = title.toLowerCase();
  if (t.includes("ceo")) return Rocket;
  if (t.includes("pr member") || t.includes("pr leader")) return Megaphone;
  if (t.includes("sponsor")) return HandCoins;
  if (t.includes("risk")) return ShieldCheck;
  if (t.includes("ambassador")) return GraduationCap;
  if (t.includes("project leader")) return Wrench;
  return Code2;
}

function TimelineCard({ item, index, lang }: { item: TimelineItem; index: number; lang: Lang }) {
  const Icon = iconFor(item.title);
  const current = item.date.toLowerCase().includes("present");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      className="flex flex-col rounded-xl border border-border bg-surface p-4 hover:border-signal/40 hover:bg-surface2 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-signal to-mint p-[1.5px]">
          <div className="h-full w-full rounded-full bg-base flex items-center justify-center">
            <Icon size={18} className="text-signal" />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[11px] text-mint uppercase px-2 py-0.5 rounded-full bg-mint/10">
            {item.date}
          </span>
          {current && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
            </span>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-base font-semibold text-ink leading-snug">{item.title}</h3>
        <p className="text-sm text-muted mt-0.5">{item.org}</p>

        <div className="mt-3 space-y-2.5 text-sm">
          <div>
            <dt className="font-mono text-[11px] text-muted uppercase mb-0.5">{tr("lblAchievement", lang)}</dt>
            <dd className="text-ink/85 leading-relaxed">{item.achievement[lang]}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] text-muted uppercase mb-0.5">{tr("lblLearned", lang)}</dt>
            <dd className="text-ink/70 leading-relaxed">{item.learned[lang]}</dd>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  const lang = useLang();
  return (
    <SectionTransition id="leadership" className="relative overflow-hidden max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs font-semibold text-signal uppercase font-mono-eyebrow tracking-widest mb-2">
        04
      </p>
      <h2 className="title-glow text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {tr("leadershipEyebrow", lang)}
      </h2>
      <p className="font-mono text-base subtitle-glow font-semibold mb-10">
        <span>// </span>{tr("leadershipSubtitle", lang)}
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {timeline.map((item, i) => (
          <TimelineCard key={item.title} item={item} index={i} lang={lang} />
        ))}
      </div>
    </SectionTransition>
  );
}
