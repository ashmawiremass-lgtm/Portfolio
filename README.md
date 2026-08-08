# Remass Ashmawi — Portfolio

A workspace-style personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion — bilingual (English/Arabic), with a built-in no-code content editor.

## Signature features
- **⌘K command palette** — the real navigational spine of the site: jump to any section, open a project, toggle theme/language, download the résumé, or open a social link.
- **Bilingual (EN/AR)** — every piece of content (projects, skills, leadership, credentials) is stored as `{ en, ar }` pairs and the whole page flips to RTL in Arabic, including the typeface (Tajawal, chosen because it has proper glyph support for both scripts).
- **No-code editor at `/admin`** — edit every piece of text on the site (hero, about, projects, skills, leadership, honors, languages, contact links) through a form, no code required. See **Editing content** below.

## Getting started (local development)
```bash
npm install
npm run dev
```
Open http://localhost:3000. Content edits made at `/admin` locally are written straight to `data/content.json` on disk.

## Editing content — the no-code way
1. Go to `/admin` on your deployed site (or `localhost:3000/admin` locally).
2. Log in with the password you set in `ADMIN_PASSWORD` (see **Deploying** below).
3. Edit any field, click **Save changes**.
   - **Locally**: saves straight to `data/content.json`.
   - **On Vercel (or any host without a writable filesystem)**: saves by committing the updated `data/content.json` straight to your GitHub repo via the GitHub API — that's what makes edits actually persist on a serverless host. Vercel then auto-redeploys from that commit (~1 minute), and your changes go live.
4. If you'd rather edit the raw file yourself: everything lives in `data/content.json`, in plain English/Arabic text. `lib/data.ts` just types and re-exports it — you never need to touch that file.

## Deploying (Vercel)
1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), **New Project**, import that repo. It auto-detects Next.js — no config needed.
3. Before or after the first deploy, add these **Environment Variables** in the Vercel project settings:

   | Variable | What it's for | How to get it |
   |---|---|---|
   | `ADMIN_PASSWORD` | Your password for `/admin` | Make one up — anything you'll remember |
   | `GITHUB_TOKEN` | Lets `/admin` commit content changes back to your repo | GitHub → Settings → Developer settings → **Fine-grained tokens** → generate one scoped to just this repo, with **Contents: Read and write** permission |
   | `GITHUB_REPO` | Which repo to commit to | `your-username/your-repo-name` |
   | `GITHUB_BRANCH` | *(optional)* | Defaults to `main` if not set |

4. Redeploy once after adding the variables (Vercel → Deployments → ⋯ → Redeploy) so they take effect.

Without `GITHUB_TOKEN`/`GITHUB_REPO` set, `/admin` still works but changes only save to the serverless function's temporary disk and will disappear on the next deploy — the GitHub token is what makes edits permanent.

## A few things still worth doing
- Add a real `resume.pdf` to `/public` if you haven't (linked from the Résumé section and Contact).
- Wire the Contact form to an actual backend (it currently only simulates sending) — Formspree or Resend are quick options.
- Add real screenshots to project case studies if you want them (there's room under each tagline in `components/ProjectPanel.tsx`).
- The `/admin` page has no link from the public site on purpose (it's for you, not visitors) — bookmark it or type the URL directly.

## Design system
- **Palette**: deep plum ink, soft lavender-blush background (light) / near-black plum (dark), violet as the primary accent, rose-gold as the secondary — all on CSS custom properties in `app/globals.css`, not hardcoded colors, so both themes and Tailwind's opacity modifiers (`bg-signal/20` etc.) work correctly.
- **Type**: Tajawal for everything (headings, body, and "mono-style" labels), for a single consistent identity across English and Arabic.
- **Background**: a fixed layer (`components/Wallpaper.tsx`) behind everything — a soft drifting gradient wash, a dense particle-wave mesh sweeping from one corner, and sparse twinkling particles. Kept deliberately faint so it never competes with reading.
