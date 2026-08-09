"use client";

import { useEffect, useState } from "react";
import { Save, Plus, Trash2, Lock, CheckCircle2, AlertCircle, Loader2, FileUp, FileText } from "lucide-react";

type Bi = { en: string; ar: string };

type Content = {
  hero: {
    name: Bi; eyebrow: Bi; headline1: Bi; headline2: Bi; body: Bi;
    rolesEn: string[]; rolesAr: string[];
  };
  about: { lede: Bi; body: Bi; location: Bi; university: Bi; gpa: string; grad: string };
  contactLinks: { email: string; github: string; linkedin: string; x: string };
  projects: any[];
  skills: any[];
  timeline: any[];
  credentials: any[];
  languages: any[];
};

const TABS = ["Hero", "About", "Contact", "Résumé", "Projects", "Skills", "Leadership", "Honors", "Languages"] as const;
type Tab = (typeof TABS)[number];

function BiField({ label, value, onChange }: { label: string; value: Bi; onChange: (v: Bi) => void }) {
  const isLong = value.en.length > 60;
  const Field = isLong ? "textarea" : "input";
  return (
    <div className="mb-4">
      <label className="block font-mono text-xs text-muted uppercase mb-1.5">{label}</label>
      <div className="grid sm:grid-cols-2 gap-2">
        <Field
          value={value.en}
          onChange={(e: any) => onChange({ ...value, en: e.target.value })}
          rows={isLong ? 3 : undefined}
          placeholder="English"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-signal"
        />
        <Field
          value={value.ar}
          onChange={(e: any) => onChange({ ...value, ar: e.target.value })}
          rows={isLong ? 3 : undefined}
          placeholder="Arabic"
          dir="rtl"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-signal"
        />
      </div>
    </div>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-xs text-muted uppercase mb-1.5">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-signal"
      />
    </div>
  );
}

function Card({ children, onRemove }: { children: React.ReactNode; onRemove?: () => void }) {
  return (
    <div className="relative rounded-xl border border-border bg-surface2 p-4 mb-4">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 text-muted hover:text-signal transition-colors"
          aria-label="Remove"
        >
          <Trash2 size={16} />
        </button>
      )}
      {children}
    </div>
  );
}

export default function AdminEditor() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<Content | null>(null);
  const [tab, setTab] = useState<Tab>("Hero");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveMsg, setSaveMsg] = useState("");
  const [resumeState, setResumeState] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [resumeMsg, setResumeMsg] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => {
        if (r.status === 401) { setAuthed(false); return null; }
        setAuthed(true);
        return r.json();
      })
      .then((data) => { if (data) setContent(data); })
      .catch(() => setAuthed(false));
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setLoginError(data.error || "Login failed");
      return;
    }
    const r = await fetch("/api/admin/content");
    const data = await r.json();
    setContent(data);
    setAuthed(true);
  }

  async function uploadResume(file: File) {
    if (file.type !== "application/pdf") {
      setResumeState("error");
      setResumeMsg("Please choose a PDF file.");
      return;
    }
    setResumeState("uploading");
    setResumeFileName(file.name);
    try {
      const buffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), "")
      );
      const res = await fetch("/api/admin/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setResumeState("done");
      setResumeMsg(
        data.mode === "github"
          ? "Uploaded — committed to GitHub, your site will redeploy in ~1 minute."
          : "Saved locally to public/resume.pdf."
      );
    } catch (e: any) {
      setResumeState("error");
      setResumeMsg(String(e.message || e));
    }
  }

  async function save() {
    if (!content) return;
    setSaveState("saving");
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSaveState("saved");
      setSaveMsg(
        data.mode === "github"
          ? "Saved — committed to GitHub, your site will redeploy in ~1 minute."
          : "Saved locally to data/content.json."
      );
      setTimeout(() => setSaveState("idle"), 4000);
    } catch (e: any) {
      setSaveState("error");
      setSaveMsg(String(e.message || e));
    }
  }

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-signal" size={28} />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={18} className="text-signal" />
            <h1 className="text-lg font-semibold text-ink">Admin login</h1>
          </div>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-border bg-surface2 px-3 py-2.5 text-sm outline-none focus:border-signal mb-3"
          />
          {loginError && <p className="text-sm text-signal mb-3">{loginError}</p>}
          <button className="w-full rounded-lg bg-signal text-base font-medium text-sm px-4 py-2.5 hover:brightness-110 transition">
            Log in
          </button>
        </form>
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="title-glow text-2xl font-bold">Edit portfolio content</h1>
        <button
          onClick={save}
          disabled={saveState === "saving"}
          className="flex items-center gap-2 rounded-lg bg-signal text-base text-sm font-medium px-4 py-2.5 hover:brightness-110 transition disabled:opacity-60"
        >
          {saveState === "saving" ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save changes
        </button>
      </div>

      {saveState === "saved" && (
        <div className="flex items-center gap-2 text-sm text-mint mb-4"><CheckCircle2 size={16} />{saveMsg}</div>
      )}
      {saveState === "error" && (
        <div className="flex items-center gap-2 text-sm text-signal mb-4"><AlertCircle size={16} />{saveMsg}</div>
      )}

      <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
              tab === t ? "border-signal bg-signal/10 text-ink" : "border-border bg-surface text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Hero" && (
        <div>
          <BiField label="Name" value={content.hero.name} onChange={(v) => setContent({ ...content, hero: { ...content.hero, name: v } })} />
          <BiField label="Eyebrow line" value={content.hero.eyebrow} onChange={(v) => setContent({ ...content, hero: { ...content.hero, eyebrow: v } })} />
          <BiField label="Headline part 1" value={content.hero.headline1} onChange={(v) => setContent({ ...content, hero: { ...content.hero, headline1: v } })} />
          <BiField label="Headline part 2 (highlighted)" value={content.hero.headline2} onChange={(v) => setContent({ ...content, hero: { ...content.hero, headline2: v } })} />
          <BiField label="Body paragraph" value={content.hero.body} onChange={(v) => setContent({ ...content, hero: { ...content.hero, body: v } })} />
          <div className="mb-4">
            <label className="block font-mono text-xs text-muted uppercase mb-1.5">Rotating roles (English, one per line)</label>
            <textarea
              rows={3}
              value={content.hero.rolesEn.join("\n")}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, rolesEn: e.target.value.split("\n") } })}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-signal"
            />
          </div>
          <div className="mb-4">
            <label className="block font-mono text-xs text-muted uppercase mb-1.5">Rotating roles (Arabic, one per line)</label>
            <textarea
              rows={3}
              dir="rtl"
              value={content.hero.rolesAr.join("\n")}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, rolesAr: e.target.value.split("\n") } })}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-signal"
            />
          </div>
        </div>
      )}

      {tab === "About" && (
        <div>
          <BiField label="Lede (bold intro sentence)" value={content.about.lede} onChange={(v) => setContent({ ...content, about: { ...content.about, lede: v } })} />
          <BiField label="Body paragraph" value={content.about.body} onChange={(v) => setContent({ ...content, about: { ...content.about, body: v } })} />
          <BiField label="Location" value={content.about.location} onChange={(v) => setContent({ ...content, about: { ...content.about, location: v } })} />
          <BiField label="University" value={content.about.university} onChange={(v) => setContent({ ...content, about: { ...content.about, university: v } })} />
          <TextField label="GPA" value={content.about.gpa} onChange={(v) => setContent({ ...content, about: { ...content.about, gpa: v } })} />
          <TextField label="Expected graduation" value={content.about.grad} onChange={(v) => setContent({ ...content, about: { ...content.about, grad: v } })} />
        </div>
      )}

      {tab === "Résumé" && (
        <div>
          <div className="rounded-xl border border-border bg-surface2 p-6 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <FileText size={20} className="text-signal" />
              <p className="text-sm text-ink">
                Upload a new PDF to replace your résumé everywhere it's linked on the site
                (Résumé section and Contact icon).
              </p>
            </div>

            <label className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border hover:border-signal transition-colors cursor-pointer py-8">
              <FileUp size={24} className="text-muted" />
              <span className="text-sm text-muted">
                {resumeState === "uploading" ? "Uploading…" : "Click to choose a PDF file"}
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                disabled={resumeState === "uploading"}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadResume(file);
                }}
              />
            </label>

            {resumeFileName && resumeState !== "idle" && (
              <p className="text-xs text-muted mt-3">Selected: {resumeFileName}</p>
            )}

            {resumeState === "uploading" && (
              <div className="flex items-center gap-2 text-sm text-muted mt-3">
                <Loader2 size={14} className="animate-spin" /> Uploading…
              </div>
            )}
            {resumeState === "done" && (
              <div className="flex items-center gap-2 text-sm text-mint mt-3">
                <CheckCircle2 size={14} /> {resumeMsg}
              </div>
            )}
            {resumeState === "error" && (
              <div className="flex items-center gap-2 text-sm text-signal mt-3">
                <AlertCircle size={14} /> {resumeMsg}
              </div>
            )}
          </div>
          <p className="text-xs text-muted">
            This replaces the file at <code className="text-ink">public/resume.pdf</code>.
            It uploads immediately on selection — no need to click "Save changes" for this one.
          </p>
        </div>
      )}

      {tab === "Contact" && (
        <div>
          <TextField label="Email" value={content.contactLinks.email} onChange={(v) => setContent({ ...content, contactLinks: { ...content.contactLinks, email: v } })} />
          <TextField label="GitHub URL" value={content.contactLinks.github} onChange={(v) => setContent({ ...content, contactLinks: { ...content.contactLinks, github: v } })} />
          <TextField label="LinkedIn URL" value={content.contactLinks.linkedin} onChange={(v) => setContent({ ...content, contactLinks: { ...content.contactLinks, linkedin: v } })} />
          <TextField label="X URL" value={content.contactLinks.x} onChange={(v) => setContent({ ...content, contactLinks: { ...content.contactLinks, x: v } })} />
        </div>
      )}

      {tab === "Projects" && (
        <div>
          {content.projects.map((p, i) => (
            <Card key={i} onRemove={() => setContent({ ...content, projects: content.projects.filter((_, j) => j !== i) })}>
              <TextField label="Slug" value={p.slug} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, slug: v }; setContent({ ...content, projects: arr }); }} />
              <TextField label="Name" value={p.name} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, name: v }; setContent({ ...content, projects: arr }); }} />
              <BiField label="Tagline" value={p.tagline} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, tagline: v }; setContent({ ...content, projects: arr }); }} />
              <BiField label="Category" value={p.category} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, category: v }; setContent({ ...content, projects: arr }); }} />
              <TextField label="Year" value={p.year} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, year: v }; setContent({ ...content, projects: arr }); }} />
              <TextField label="Tech stack (comma-separated)" value={p.stack.join(", ")} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, stack: v.split(",").map((s: string) => s.trim()).filter(Boolean) }; setContent({ ...content, projects: arr }); }} />
              <BiField label="Problem" value={p.problem} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, problem: v }; setContent({ ...content, projects: arr }); }} />
              <BiField label="Solution" value={p.solution} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, solution: v }; setContent({ ...content, projects: arr }); }} />
              <BiField label="Challenges" value={p.challenges} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, challenges: v }; setContent({ ...content, projects: arr }); }} />
              <BiField label="Outcome" value={p.outcome} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, outcome: v }; setContent({ ...content, projects: arr }); }} />
              <BiField label="Impact" value={p.impact} onChange={(v) => { const arr = [...content.projects]; arr[i] = { ...p, impact: v }; setContent({ ...content, projects: arr }); }} />
            </Card>
          ))}
          <button
            onClick={() => setContent({ ...content, projects: [...content.projects, {
              slug: "new-project", name: "New Project",
              tagline: { en: "", ar: "" }, category: { en: "", ar: "" }, year: "",
              stack: [], problem: { en: "", ar: "" }, solution: { en: "", ar: "" },
              challenges: { en: "", ar: "" }, outcome: { en: "", ar: "" }, impact: { en: "", ar: "" },
            }] })}
            className="flex items-center gap-2 text-sm text-signal hover:brightness-110"
          >
            <Plus size={16} /> Add project
          </button>
        </div>
      )}

      {tab === "Skills" && (
        <div>
          {content.skills.map((s, i) => (
            <Card key={i} onRemove={() => setContent({ ...content, skills: content.skills.filter((_, j) => j !== i) })}>
              <TextField label="Name" value={s.name} onChange={(v) => { const arr = [...content.skills]; arr[i] = { ...s, name: v }; setContent({ ...content, skills: arr }); }} />
              <TextField label="Category (Language / Frontend / Web / Tools / Professional)" value={s.category} onChange={(v) => { const arr = [...content.skills]; arr[i] = { ...s, category: v }; setContent({ ...content, skills: arr }); }} />
              <TextField label="Years" value={s.years} onChange={(v) => { const arr = [...content.skills]; arr[i] = { ...s, years: v }; setContent({ ...content, skills: arr }); }} />
              <TextField label="Confidence (1-5)" value={String(s.confidence)} onChange={(v) => { const arr = [...content.skills]; arr[i] = { ...s, confidence: Number(v) || 1 }; setContent({ ...content, skills: arr }); }} />
              <BiField label="Note" value={s.note} onChange={(v) => { const arr = [...content.skills]; arr[i] = { ...s, note: v }; setContent({ ...content, skills: arr }); }} />
            </Card>
          ))}
          <button
            onClick={() => setContent({ ...content, skills: [...content.skills, { name: "New Skill", category: "Professional", years: "", confidence: 3, usedIn: [], note: { en: "", ar: "" } }] })}
            className="flex items-center gap-2 text-sm text-signal hover:brightness-110"
          >
            <Plus size={16} /> Add skill
          </button>
        </div>
      )}

      {tab === "Leadership" && (
        <div>
          {content.timeline.map((t, i) => (
            <Card key={i} onRemove={() => setContent({ ...content, timeline: content.timeline.filter((_, j) => j !== i) })}>
              <TextField label="Date range" value={t.date} onChange={(v) => { const arr = [...content.timeline]; arr[i] = { ...t, date: v }; setContent({ ...content, timeline: arr }); }} />
              <TextField label="Title" value={t.title} onChange={(v) => { const arr = [...content.timeline]; arr[i] = { ...t, title: v }; setContent({ ...content, timeline: arr }); }} />
              <TextField label="Organization" value={t.org} onChange={(v) => { const arr = [...content.timeline]; arr[i] = { ...t, org: v }; setContent({ ...content, timeline: arr }); }} />
              <BiField label="Learned" value={t.learned} onChange={(v) => { const arr = [...content.timeline]; arr[i] = { ...t, learned: v }; setContent({ ...content, timeline: arr }); }} />
              <BiField label="Responsibilities" value={t.responsibilities} onChange={(v) => { const arr = [...content.timeline]; arr[i] = { ...t, responsibilities: v }; setContent({ ...content, timeline: arr }); }} />
              <BiField label="Achievement" value={t.achievement} onChange={(v) => { const arr = [...content.timeline]; arr[i] = { ...t, achievement: v }; setContent({ ...content, timeline: arr }); }} />
            </Card>
          ))}
          <button
            onClick={() => setContent({ ...content, timeline: [...content.timeline, { date: "", title: "New Role", org: "", learned: { en: "", ar: "" }, responsibilities: { en: "", ar: "" }, achievement: { en: "", ar: "" } }] })}
            className="flex items-center gap-2 text-sm text-signal hover:brightness-110"
          >
            <Plus size={16} /> Add role
          </button>
        </div>
      )}

      {tab === "Honors" && (
        <div>
          {content.credentials.map((c, i) => (
            <Card key={i} onRemove={() => setContent({ ...content, credentials: content.credentials.filter((_, j) => j !== i) })}>
              <BiField label="Label" value={c.label} onChange={(v) => { const arr = [...content.credentials]; arr[i] = { ...c, label: v }; setContent({ ...content, credentials: arr }); }} />
              <TextField label="Organization" value={c.org} onChange={(v) => { const arr = [...content.credentials]; arr[i] = { ...c, org: v }; setContent({ ...content, credentials: arr }); }} />
              <TextField label="Date" value={c.date} onChange={(v) => { const arr = [...content.credentials]; arr[i] = { ...c, date: v }; setContent({ ...content, credentials: arr }); }} />
              <TextField label="Kind (Honor / Certification / Education)" value={c.kind} onChange={(v) => { const arr = [...content.credentials]; arr[i] = { ...c, kind: v }; setContent({ ...content, credentials: arr }); }} />
            </Card>
          ))}
          <button
            onClick={() => setContent({ ...content, credentials: [...content.credentials, { label: { en: "", ar: "" }, org: "", date: "", kind: "Certification" }] })}
            className="flex items-center gap-2 text-sm text-signal hover:brightness-110"
          >
            <Plus size={16} /> Add credential
          </button>
        </div>
      )}

      {tab === "Languages" && (
        <div>
          {content.languages.map((l, i) => (
            <Card key={i} onRemove={() => setContent({ ...content, languages: content.languages.filter((_, j) => j !== i) })}>
              <TextField label="Name" value={l.name} onChange={(v) => { const arr = [...content.languages]; arr[i] = { ...l, name: v }; setContent({ ...content, languages: arr }); }} />
              <TextField label="Level (e.g. Native, Fluent)" value={l.level} onChange={(v) => { const arr = [...content.languages]; arr[i] = { ...l, level: v }; setContent({ ...content, languages: arr }); }} />
            </Card>
          ))}
          <button
            onClick={() => setContent({ ...content, languages: [...content.languages, { name: "", level: "" }] })}
            className="flex items-center gap-2 text-sm text-signal hover:brightness-110"
          >
            <Plus size={16} /> Add language
          </button>
        </div>
      )}
    </div>
  );
}
