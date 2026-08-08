import content from "@/data/content.json";

export type Bi = { en: string; ar: string };

export type HeroContent = {
  name: Bi;
  eyebrow: Bi;
  headline1: Bi;
  headline2: Bi;
  body: Bi;
  rolesEn: string[];
  rolesAr: string[];
};

export type AboutContent = {
  lede: Bi;
  body: Bi;
  location: Bi;
  university: Bi;
  gpa: string;
  grad: string;
};

export type ContactLinks = {
  email: string;
  github: string;
  linkedin: string;
  x: string;
};


export type Project = {
  slug: string;
  name: string;
  tagline: Bi;
  category: Bi;
  year: string;
  stack: string[];
  problem: Bi;
  solution: Bi;
  challenges: Bi;
  outcome: Bi;
  impact: Bi;
  github?: string;
  demo?: string;
};

export type Skill = {
  name: string;
  category: string;
  years: string;
  confidence: number;
  usedIn: string[];
  note: Bi;
};

export type TimelineItem = {
  date: string;
  title: string;
  org: string;
  learned: Bi;
  responsibilities: Bi;
  achievement: Bi;
};

export type Language = {
  name: string;
  level: string;
};

export type Credential = {
  label: Bi;
  org: string;
  date: string;
  kind: "Honor" | "Certification" | "Education";
};

// Content now lives in /data/content.json (edited via /admin) instead of
// being hardcoded here — this file just types and re-exports it, so every
// component that imports from "@/lib/data" keeps working unchanged.
export const projects = content.projects as Project[];
export const skills = content.skills as Skill[];
export const timeline = content.timeline as TimelineItem[];
export const languages = content.languages as Language[];
export const credentials = content.credentials as Credential[];
export const heroContent = content.hero as HeroContent;
export const aboutContent = content.about as AboutContent;
export const contactLinks = content.contactLinks as ContactLinks;
