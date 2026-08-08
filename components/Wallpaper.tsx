"use client";

import { motion } from "framer-motion";

// deterministic pseudo-random (safe for SSR — identical output every render)
function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// sparse particles scattered across the whole canvas
const PARTICLE_COUNT = 55;
const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  x: seeded(i) * 100,
  y: seeded(i + 500) * 100,
  size: 1 + seeded(i + 900) * 2.4,
  big: seeded(i + 1100) > 0.84,
  mint: i % 4 === 0,
  duration: 3 + seeded(i + 200) * 5,
  delay: seeded(i + 700) * 6,
}));

// dense particle-wave mesh, sweeping in from the bottom-right corner,
// with faint lines to neighboring dots so it reads as a woven surface
const COLS = 36;
const ROWS = 20;
type WaveDot = { x: number; y: number; gx: number; gy: number; size: number; opacity: number; mint: boolean; duration: number; delay: number };
const waveDots: WaveDot[] = [];
const grid = new Map<string, WaveDot>();
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = r * COLS + c;
    const baseX = (c / (COLS - 1)) * 100;
    const baseY = (r / (ROWS - 1)) * 100;
    const diag = baseX * 0.7 + baseY * 0.6;
    if (diag < 55) continue;
    const ripple = Math.sin(baseX / 9 + r * 0.6) * 2.2;
    const density = Math.min(1, (diag - 55) / 36);
    const dot: WaveDot = {
      x: baseX,
      y: baseY + ripple,
      gx: c,
      gy: r,
      size: 1 + seeded(i + 1000) * 1.8,
      opacity: density * (0.3 + seeded(i + 1600) * 0.22),
      mint: seeded(i + 1800) > 0.78,
      duration: 3 + seeded(i + 2200) * 4,
      delay: seeded(i + 2500) * 5,
    };
    waveDots.push(dot);
    grid.set(`${c}_${r}`, dot);
  }
}
const meshLines: { a: WaveDot; b: WaveDot }[] = [];
waveDots.forEach((d) => {
  const right = grid.get(`${d.gx + 1}_${d.gy}`);
  const down = grid.get(`${d.gx}_${d.gy + 1}`);
  if (right) meshLines.push({ a: d, b: right });
  if (down) meshLines.push({ a: d, b: down });
});

export default function Wallpaper() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-base">
      {/* faint two-tone vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 82% 88%, rgb(var(--c-signal) / var(--wp-strong)), transparent 65%), " +
            "radial-gradient(ellipse 55% 50% at 82% 88%, rgb(var(--c-mint) / var(--wp-soft)), transparent 55%), " +
            "radial-gradient(ellipse 55% 50% at 12% 12%, rgb(var(--c-signal) / var(--wp-soft)), transparent 60%)",
        }}
      />

      {/* wave mesh — faint lines + dots, gently shimmering, slow drift */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: [0, -1, 0], y: [0, 0.6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
          {meshLines.map((l, i) => (
            <line
              key={i}
              x1={`${l.a.x}%`}
              y1={`${l.a.y}%`}
              x2={`${l.b.x}%`}
              y2={`${l.b.y}%`}
              stroke={l.a.mint ? "rgb(var(--c-mint))" : "rgb(var(--c-signal))"}
              strokeWidth="0.5"
              opacity={Math.min(0.12, l.a.opacity * 0.6)}
            />
          ))}
        </svg>
        {waveDots.map((d, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${d.mint ? "bg-mint" : "bg-signal"}`}
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size }}
            animate={{ opacity: [d.opacity * 0.5, d.opacity, d.opacity * 0.5] }}
            transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      {/* sparse, softly twinkling particles, a few with a faint glow halo */}
      {particles.map((p, i) => (
        <div key={i} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
          {p.big && (
            <div
              className="absolute rounded-full bg-signal"
              style={{ width: 10, height: 10, left: -5, top: -5, filter: "blur(4px)", opacity: 0.18 }}
            />
          )}
          <motion.div
            className={`absolute rounded-full ${p.mint ? "bg-mint" : "bg-signal"}`}
            style={{
              width: p.big ? 2.6 : p.size,
              height: p.big ? 2.6 : p.size,
              left: p.big ? -1.3 : -p.size / 2,
              top: p.big ? -1.3 : -p.size / 2,
            }}
            animate={{ opacity: [0.15, 0.75, 0.15] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ))}

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
