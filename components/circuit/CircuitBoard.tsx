"use client";

// useState tracks which node is selected; useRef + useInView defer the
// trace draw-on animation until the SVG enters the viewport.

import { useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Project } from "@/types/project";
import CircuitTraces from "./CircuitTraces";
import CircuitNode from "./CircuitNode";
import ProjectModal from "./ProjectModal";
import BoardDecorations from "./BoardDecorations";

const VIEW_W = 1000;
const VIEW_H = 600;

interface Props {
  projects: Project[];
}

export default function CircuitBoard({ projects }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  // once: true means the animation only triggers the first time it comes into view
  const isInView = useInView(svgRef, { once: true });

  const selectedProject = selectedId
    ? (projects.find((p) => p.id === selectedId) ?? null)
    : null;
  const selectedIndex = selectedId
    ? projects.findIndex((p) => p.id === selectedId)
    : -1;

  const toggle = (id: string) =>
    setSelectedId((prev) => (prev === id ? null : id));

  return (
    // relative so the modal (position: fixed) is stacked correctly
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-full"
        // xMidYMid meet: scale the board to fit while keeping aspect ratio
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── PCB surface ──────────────────────────────────────────────── */}
        <rect width={VIEW_W} height={VIEW_H} fill="var(--color-pcb)" />

        {/* ── Grid pattern ─────────────────────────────────────────────── */}
        <defs>
          <pattern id="pcb-grid" width={40} height={40} patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(30,100,90,0.18)"
              strokeWidth={0.6}
            />
          </pattern>
        </defs>
        <rect width={VIEW_W} height={VIEW_H} fill="url(#pcb-grid)" />

        {/* ── Corner mounting holes ─────────────────────────────────────── */}
        {([
          [22, 22],
          [VIEW_W - 22, 22],
          [22, VIEW_H - 22],
          [VIEW_W - 22, VIEW_H - 22],
        ] as [number, number][]).map(([hx, hy], i) => (
          <g key={i}>
            <circle
              cx={hx}
              cy={hy}
              r={11}
              fill="var(--color-surface)"
              stroke="var(--color-trace)"
              strokeWidth={1}
            />
            <circle cx={hx} cy={hy} r={4} fill="var(--color-trace)" opacity={0.5} />
          </g>
        ))}

        {/* ── Decorative board features (ports, passives, silkscreen) ─── */}
        <BoardDecorations />

        {/* ── Traces (rendered only after the board enters the viewport) ─ */}
        {isInView && (
          <CircuitTraces projects={projects} activeId={selectedId} />
        )}

        {/* ── Nodes ────────────────────────────────────────────────────── */}
        {projects.map((project, i) => (
          <CircuitNode
            key={project.id}
            project={project}
            index={i}
            isActive={selectedId === project.id}
            vpW={VIEW_W}
            vpH={VIEW_H}
            onClick={() => toggle(project.id)}
          />
        ))}
      </svg>

      {/* Modal lives outside the SVG so it can use normal CSS layout */}
      <ProjectModal
        project={selectedProject}
        index={selectedIndex}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
