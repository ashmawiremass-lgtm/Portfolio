"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Leadership from "@/components/Leadership";
import Credentials from "@/components/Credentials";
import Extras from "@/components/Extras";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import { LangProvider, tr } from "@/lib/i18n";
import NameIntro from "@/components/NameIntro";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return (
    <LangProvider value={lang}>
      <NameIntro />
      <ScrollProgress />
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        lang={lang}
        onToggleLang={() => setLang((l) => (l === "en" ? "ar" : "en"))}
      />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Leadership />
        <Credentials />
        <Extras />
        <Resume />
        <Contact />
      </main>
      <footer className="border-t border-border px-6 py-8 text-center text-xs font-mono text-muted">
        {tr("footer", lang)}
      </footer>
    </LangProvider>
  );
}
