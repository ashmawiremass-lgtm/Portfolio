"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang, tr } from "@/lib/i18n";
import { heroContent } from "@/lib/data";

export default function Hero() {
  const lang = useLang();
  const roles = lang === "ar" ? heroContent.rolesAr : heroContent.rolesEn;
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    setRoleIndex(0);
    setText("");
  }, [lang]);

  useEffect(() => {
    let i = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const full = roles[roleIndex] ?? roles[0];
      if (!deleting) {
        i++;
        setText(full.slice(0, i));
        if (i === full.length) {
          deleting = true;
          timeout = setTimeout(tick, 1400);
          return;
        }
      } else {
        i--;
        setText(full.slice(0, i));
        if (i === 0) {
          deleting = false;
          setRoleIndex((r) => (r + 1) % roles.length);
          timeout = setTimeout(tick, 300);
          return;
        }
      }
      timeout = setTimeout(tick, deleting ? 35 : 55);
    };

    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleIndex, lang]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 max-w-5xl mx-auto pt-24"
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs text-signal uppercase font-mono-eyebrow mb-3"
      >
        {heroContent.eyebrow[lang]}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={`title-glow text-5xl md:text-7xl font-bold ${
          lang === "ar" ? "" : "tracking-tight"
        }`}
      >
        {heroContent.name[lang]}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-3 text-lg md:text-xl font-semibold text-ink max-w-2xl leading-snug"
      >
        {heroContent.headline1[lang]}{" "}
        <span className="subtitle-glow">{heroContent.headline2[lang]}</span>
      </motion.p>

      <div className="mt-6 h-8 font-mono text-lg text-muted">
        <span>{text}</span>
        <span className="inline-block w-[2px] h-5 bg-signal ml-1 animate-blink align-middle" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 max-w-xl text-muted leading-relaxed"
      >
        {heroContent.body[lang]}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-10 flex items-center gap-4"
      >
        <a
          href="#projects"
          className="rounded-lg bg-signal text-base font-medium text-sm px-5 py-2.5 hover:brightness-110 transition"
        >
          {tr("heroCtaProjects", lang)}
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-border bg-surface text-sm px-5 py-2.5 hover:bg-surface2 transition"
        >
          {tr("heroCtaContact", lang)}
        </a>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted hover:text-signal transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 7L10 13L16 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}
