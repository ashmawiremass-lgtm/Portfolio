"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useLang, tr } from "@/lib/i18n";
import { contactLinks } from "@/lib/data";

export default function Contact() {
  const lang = useLang();
  const [sent, setSent] = useState(false);

  return (
    <SectionTransition id="contact" className="relative overflow-hidden max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs font-semibold text-signal uppercase font-mono-eyebrow tracking-widest mb-2">
        07
      </p>
      <h2 className="title-glow text-3xl md:text-4xl font-bold tracking-tight mb-2">
        {tr("contactEyebrow", lang)}
      </h2>
      <p className="font-mono text-base subtitle-glow font-semibold max-w-xl mb-10">
        <span>// </span>{tr("contactSubtitle", lang)}
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-4"
        >
          <div>
            <label className="font-mono text-[11px] text-muted uppercase" htmlFor="name">
              {tr("formName", lang)}
            </label>
            <input
              id="name"
              required
              className="mt-1 w-full rounded-lg bg-surface border border-border px-3.5 py-2.5 text-sm outline-none focus:border-signal"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-muted uppercase" htmlFor="email">
              {tr("formEmail", lang)}
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg bg-surface border border-border px-3.5 py-2.5 text-sm outline-none focus:border-signal"
            />
          </div>
          <div>
            <label className="font-mono text-[11px] text-muted uppercase" htmlFor="message">
              {tr("formMessage", lang)}
            </label>
            <textarea
              id="message"
              required
              rows={4}
              className="mt-1 w-full rounded-lg bg-surface border border-border px-3.5 py-2.5 text-sm outline-none focus:border-signal resize-none"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="rounded-lg bg-signal text-base text-sm font-medium px-5 py-2.5 hover:brightness-110 transition"
          >
            {sent ? tr("formSent", lang) : tr("formSend", lang)}
          </motion.button>
        </form>

        <div className="flex flex-col justify-center gap-6">
          <p className="text-sm text-muted">
            {tr("contactChannels", lang)}
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.a
              whileHover={{ y: -3 }}
              href={`mailto:${contactLinks.email}`}
              title={tr("tipEmail", lang)}
              aria-label={tr("tipEmail", lang)}
              className="flex items-center justify-center h-12 w-12 rounded-full border border-border bg-surface hover:border-signal hover:bg-surface2 transition-colors"
            >
              <Mail size={18} className="text-signal" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href={contactLinks.github}
              title={tr("tipGitHub", lang)}
              aria-label={tr("tipGitHub", lang)}
              className="flex items-center justify-center h-12 w-12 rounded-full border border-border bg-surface hover:border-signal hover:bg-surface2 transition-colors"
            >
              <Github size={18} className="text-signal" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href={contactLinks.linkedin}
              title={tr("tipLinkedIn", lang)}
              aria-label={tr("tipLinkedIn", lang)}
              className="flex items-center justify-center h-12 w-12 rounded-full border border-border bg-surface hover:border-signal hover:bg-surface2 transition-colors"
            >
              <Linkedin size={18} className="text-signal" />
            </motion.a>
            <motion.a
              whileHover={{ y: -3 }}
              href={contactLinks.x}
              title={tr("tipX", lang)}
              aria-label={tr("tipX", lang)}
              className="flex items-center justify-center h-12 w-12 rounded-full border border-border bg-surface hover:border-signal hover:bg-surface2 transition-colors"
            >
              <Twitter size={18} className="text-signal" />
            </motion.a>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
