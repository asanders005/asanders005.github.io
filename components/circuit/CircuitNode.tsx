"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";

const CHIP_W = 80;
const CHIP_H = 50;
const PIN_W = 8;
const PIN_H = 8;
// Three evenly-spaced pins on each side of the chip, relative to chip center
const PIN_Y = [-14, 0, 14];

interface Props {
  project: Project;
  index: number;    // used to derive the part number label (IC-001, IC-002…)
  isActive: boolean;
  vpW: number;      // SVG viewBox width  (1000)
  vpH: number;      // SVG viewBox height (600)
  onClick: () => void;
}

export default function CircuitNode({
  project,
  index,
  isActive,
  vpW,
  vpH,
  onClick,
}: Props) {
  const cx = (project.node.x / 100) * vpW;
  const cy = (project.node.y / 100) * vpH;
  const partNum = `IC-${String(index + 1).padStart(3, "0")}`;
  const shortTitle =
    project.title.length > 9 ? project.title.slice(0, 8) + "…" : project.title;

  return (
    // Outer <g> just moves the coordinate origin to the chip centre.
    // All children are drawn relative to (0, 0) = chip centre.
    <g transform={`translate(${cx} ${cy})`} style={{ cursor: "pointer" }} onClick={onClick}>
      {/* ── Animated group ─────────────────────────────────────────────────
          transformBox + transformOrigin make the Framer Motion scale
          operate around the element's own bounding-box centre.            */}
      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.15 }}
      >
        {/* Active glow ring */}
        {isActive && (
          <motion.rect
            x={-CHIP_W / 2 - 7}
            y={-CHIP_H / 2 - 7}
            width={CHIP_W + 14}
            height={CHIP_H + 14}
            rx={5}
            fill="none"
            stroke="var(--color-glow)"
            strokeWidth={1}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        )}

        {/* Left pins */}
        {PIN_Y.map((py, i) => (
          <rect
            key={`l${i}`}
            x={-CHIP_W / 2 - PIN_W}
            y={py - PIN_H / 2}
            width={PIN_W}
            height={PIN_H}
            fill="none"
            stroke={isActive ? "var(--color-glow)" : "var(--color-trace)"}
            strokeWidth={1}
          />
        ))}

        {/* Right pins */}
        {PIN_Y.map((py, i) => (
          <rect
            key={`r${i}`}
            x={CHIP_W / 2}
            y={py - PIN_H / 2}
            width={PIN_W}
            height={PIN_H}
            fill="none"
            stroke={isActive ? "var(--color-glow)" : "var(--color-trace)"}
            strokeWidth={1}
          />
        ))}

        {/* Chip body */}
        <rect
          x={-CHIP_W / 2}
          y={-CHIP_H / 2}
          width={CHIP_W}
          height={CHIP_H}
          rx={2}
          fill="var(--color-chip)"
          stroke={isActive ? "var(--color-glow)" : "var(--color-trace)"}
          strokeWidth={isActive ? 1.5 : 1}
          style={{ filter: isActive ? "drop-shadow(0 0 6px var(--color-glow))" : "none" }}
        />

        {/* Orientation notch at the top-centre of the chip */}
        <path
          d={`M -8 ${-CHIP_H / 2} A 8 8 0 0 1 8 ${-CHIP_H / 2}`}
          fill="var(--color-surface)"
          stroke={isActive ? "var(--color-glow)" : "var(--color-trace)"}
          strokeWidth={1}
        />

        {/* Part number (small, top of chip body) */}
        <text
          x={0}
          y={-CHIP_H / 2 + 14}
          textAnchor="middle"
          fill="var(--color-muted)"
          fontSize={7}
          fontFamily="monospace"
        >
          {partNum}
        </text>

        {/* Project title (abbreviated, centre of chip body) */}
        <text
          x={0}
          y={-CHIP_H / 2 + 30}
          textAnchor="middle"
          fill={isActive ? "var(--color-glow)" : "var(--color-primary)"}
          fontSize={8}
          fontFamily="monospace"
          fontWeight="bold"
        >
          {shortTitle}
        </text>
      </motion.g>

      {/* Label below chip — outside the scale group so it doesn't distort */}
      <text
        x={0}
        y={CHIP_H / 2 + 16}
        textAnchor="middle"
        fill={isActive ? "var(--color-glow)" : "var(--color-primary)"}
        fontSize={9}
        fontFamily="monospace"
      >
        {project.title}
      </text>
    </g>
  );
}
