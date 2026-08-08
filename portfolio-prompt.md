# Portfolio build prompt — Remass Ashmawi

Use this as a single prompt to brief an AI (or a developer) on building this
portfolio from scratch, or to document what already exists.

## Who this is for

Remass Ashmawi — Information Systems undergraduate at King Abdulaziz
University (Jeddah, Saudi Arabia), Honor Student, GPA 4.69/5.00. CEO of
GreenLedger (INJAZ Entrepreneurship Competition), KAUST bioinformatics
researcher, frontend developer for the Oracle Student Club, and active in
several student leadership roles (Programming Club, Protothon, Google
Developer Group, IBM SkillsBuild, Microsoft LSAC). Bilingual: Arabic
(native), English (fluent).

## Brief

Build a personal portfolio website that feels like a considered software
product, not a template — a "digital workspace" in the spirit of Linear,
Raycast, Vercel, and Arc Browser. Professional enough for recruiters,
distinctive enough for designers and developers to remember. Every
interaction should feel intentional. Avoid gaming/cyberpunk aesthetics or
generic AI-generated portfolio tropes (stock hero blobs, "Hi I'm ___ 👋",
identical icon-in-circle feature grids).

## Tech stack

- Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- `cmdk` for the command palette, `lucide-react` for icons
- Google Fonts: **Tajawal** for all UI text (chosen specifically because it
  has genuine Arabic *and* Latin glyph support in one typeface, so both
  languages share one visual identity instead of two stitched-together fonts)

## Design system

**Palette — "technical yet feminine."** Deep plum ink, soft lavender-blush
background, violet as the primary accent, rose-gold as the secondary — built
on CSS custom properties (not hardcoded Tailwind colors) so every color
token flips correctly between light and dark mode, including with Tailwind's
opacity-modifier syntax (`bg-signal/20` etc.). This was a real bug the first
time it was built with hardcoded colors — build it on CSS variables from the
start.

| Token | Light | Dark |
|---|---|---|
| base (page bg) | `#FAF7FB` | `#16111C` |
| surface (cards) | `#FFFFFF` | `#36 2A 44` (lighter than base, for contrast) |
| ink (text) | `#3D2C4A` | `#F3ECF7` |
| muted (secondary text) | `#8A7690` | `#B6A5C2` |
| signal (primary accent) | `#7C5CBF` (violet) | `#A78BFA` |
| mint (secondary accent) | `#D98B99` (rose-gold) | `#E8A0AE` |

**Typography.** One typeface (Tajawal) for everything, including labels
that read as "mono" style — no separate monospace font. Headings and
section sub-headers use a moving gradient-text treatment (`title-glow` /
`subtitle-glow` classes): `background: linear-gradient(...)` across ink →
signal → mint, `background-clip: text`, animated via `background-position`
keyframes for a slow shimmer. Give gradient-text elements generous
`line-height` and a touch of `padding-block` — tight leading clips the tops
of tall Arabic glyphs like ش.

**Background.** A fixed, `-z-10` layer behind everything:
1. A faint two-tone radial-gradient vignette (violet + rose-gold), not a
   flat color.
2. A dense "particle wave" mesh of small dots sweeping in from the
   bottom-right corner (grid of dots with a diagonal density falloff and a
   gentle sine ripple), connected to their immediate grid-neighbors by very
   faint lines so it reads as a woven surface — not a random scatter, not a
   tangled "constellation," and never anything that looks like literal
   geometric shapes (hexagons, circles-as-icons, plus-marks — all tried and
   rejected as "weird").
3. Sparse particles scattered across the rest of the canvas, softly
   twinkling on staggered timers; a few larger ones get a blurred glow halo.
4. Everything animated but kept at low opacity — faint enough not to
   compete with reading the actual content. Use `Math.sin(i * 12.9898) *
   43758.5453` (fractional part) as a deterministic pseudo-random generator
   for any scattered positions — real `Math.random()` in a "use client"
   component causes SSR/hydration mismatches in Next.js.

**Motion.** Framer Motion throughout: scroll-triggered reveals
(`whileInView`), hover lifts on cards, a scroll-progress bar at the top of
the page, a custom cursor (small ring that trails the mouse with spring
physics, grows on hover over links/buttons, desktop-only, disabled under
`prefers-reduced-motion` and on touch devices).

**Signature interaction.** A ⌘K command palette (`cmdk`) that's the real
navigational spine — not decoration. Search/jump to any section, open a
project, toggle theme, toggle language, download the résumé, open social
links.

## Site structure (in order)

1. **Hero** — first name in the gradient-text treatment (large), a smaller
   supporting tagline below it (not competing for size), rotating role
   titles with a typewriter effect, two CTAs.
2. **About** — a lede statement, a longer paragraph, and a stat row
   (Location / University / GPA / Expected Graduation / Languages) as a
   `<dl>` grid.
3. **Skills** — grouped by category (Languages / Frontend & Web / Tools &
   Platforms / Professional & Leadership), not one flat list. Click/hover a
   skill to see years, a 1–5 confidence bar, a short note, and which
   projects used it.
4. **Projects** — case-study cards (not just links) that open a slide-over
   panel with Problem / Solution / Challenges / Outcome / Impact, tech
   stack tags, and GitHub/demo links.
5. **Leadership & Growth** — a 3×3 grid of cards (not a long vertical
   timeline — a 9-entry linear list was genuinely too long to scroll). Each
   card: photo banner (falls back to a role-appropriate icon + gradient if
   no photo exists yet), date pill with a pulsing "active" dot for ongoing
   roles, title, org, and two highlights (Achievement, Learned).
6. **Honors & Certifications** — grid of credential cards tagged Honor /
   Certification / Education.
7. **Languages** — a couple of cards with a language-code monogram badge
   and a plain-language proficiency description. Deliberately **no
   numeric self-rating bar** for languages — that reads oddly for a
   native/fluent claim; keep skill-confidence bars (for technical skills)
   separate from this.
8. **Contact** — a message form, plus real contact methods as icon-only
   circular buttons (not text link rows): email, GitHub, LinkedIn, X,
   résumé download (a real PDF in `/public`, not a placeholder link).

## Content rules

- All content is CV-grounded — no invented projects, numbers, or claims.
  When something is genuinely uncertain, ask rather than fabricate a
  statistic ("400+ member club" etc. — don't do this).
- Every long-form content field (project problem/solution/etc., skill
  notes, leadership learned/responsibilities/achievement, credential
  labels) is bilingual: `{ en: "...", ar: "..." }`. Interface chrome
  (nav labels, buttons, form labels, section sub-headers, tooltips) is
  translated too — not just the content. A language toggle that only
  translates the hero and nav while leaving 80% of the page in English is
  not actually bilingual; treat that as a bug, not a partial feature.
- One single source of truth for content: a typed `lib/data.ts` (arrays for
  `projects`, `skills`, `timeline`, `credentials`, `languages`) so
  non-developers can edit text without touching layout code.

## Guardrails learned the hard way

- Don't reintroduce a decorative "hero visual" component and then forget it
  exists while iterating on an unrelated background file for several
  rounds — if something looks wrong, check the whole page tree, not just
  the most recently touched file.
- Keep the whole design system on CSS variables (color, and be careful with
  font-family fallbacks for Arabic glyphs even inside "monospace-style"
  labels), not hardcoded hex, so light/dark and EN/AR all stay correct
  automatically instead of needing per-instance overrides.
