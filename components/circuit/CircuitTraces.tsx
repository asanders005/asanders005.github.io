"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";

// The SVG viewBox is 1000×600 units. Node positions are 0–100 %, so we
// multiply by 10 for x and 6 for y to get SVG coordinates.
const VIEW_W = 1000;
const VIEW_H = 600;

function toSVG(p: Project) {
  return { x: (p.node.x / 100) * VIEW_W, y: (p.node.y / 100) * VIEW_H };
}

// Build an L-shaped path between two points.
// "horizontal first" means: go sideways, then up/down  →  ┘ shape
// "vertical first"   means: go up/down, then sideways  →  └ shape
function lPath(x1: number, y1: number, x2: number, y2: number, hFirst: boolean) {
  return hFirst
    ? `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`
    : `M ${x1} ${y1} L ${x1} ${y2} L ${x2} ${y2}`;
}

// Return the via (corner) dot coordinate for an L-path.
function via(x1: number, y1: number, x2: number, y2: number, hFirst: boolean) {
  return hFirst ? { vx: x2, vy: y1 } : { vx: x1, vy: y2 };
}

// Auto-generate trace connections: a ring (0→1→2→…→0) plus one cross-diagonal.
function buildPairs(count: number) {
  const pairs: { from: number; to: number; hFirst: boolean }[] = [];
  for (let i = 0; i < count; i++) {
    pairs.push({ from: i, to: (i + 1) % count, hFirst: i % 2 === 0 });
  }
  if (count >= 3) pairs.push({ from: 0, to: 2, hFirst: true });
  if (count >= 4) pairs.push({ from: 1, to: 3, hFirst: false });
  return pairs;
}

interface Props {
  projects: Project[];
  activeId: string | null;
}

export default function CircuitTraces({ projects, activeId }: Props) {
  const coords = projects.map(toSVG);
  const pairs = buildPairs(projects.length);

  return (
    <g>
      {pairs.map(({ from, to, hFirst }, i) => {
        if (from >= projects.length || to >= projects.length) return null;
        const { x: x1, y: y1 } = coords[from];
        const { x: x2, y: y2 } = coords[to];
        const d = lPath(x1, y1, x2, y2, hFirst);
        const { vx, vy } = via(x1, y1, x2, y2, hFirst);
        const lit =
          activeId !== null &&
          (projects[from].id === activeId || projects[to].id === activeId);

        return (
          <g key={i}>
            {/* ── Base trace ──────────────────────────────────────────────
                pathLength animates from 0→1, which "draws" the path on
                screen regardless of its actual pixel length. */}
            <motion.path
              d={d}
              fill="none"
              stroke={lit ? "var(--color-glow)" : "var(--color-trace)"}
              strokeWidth={lit ? 2 : 1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: i * 0.18, ease: "easeInOut" }}
              style={{
                filter: lit ? "drop-shadow(0 0 4px var(--color-glow))" : "none",
              }}
            />

            {/* ── Via dot at the corner bend ───────────────────────────── */}
            <motion.circle
              cx={vx}
              cy={vy}
              r={3}
              fill={lit ? "var(--color-glow)" : "var(--color-trace)"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.18 + 0.9 }}
            />

            {/* ── Signal pulse ─────────────────────────────────────────────
                A short dash (10 units) with a very long gap (2500 units)
                travels along the path by animating strokeDashoffset.
                The gap must exceed the maximum path length to keep
                only one pulse visible at a time. */}
            <motion.path
              d={d}
              fill="none"
              stroke="var(--color-glow)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="10 2500"
              initial={{ strokeDashoffset: 0, opacity: 0 }}
              animate={{ strokeDashoffset: [0, -2510], opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: 3.5,
                delay: i * 0.6 + 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        );
      })}
    </g>
  );
}
