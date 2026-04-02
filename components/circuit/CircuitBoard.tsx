"use client";

// Pan/zoom implementation
// ─────────────────────────────────────────────────────────────────────────────
// All board content lives in a single <g transform="translate(tx,ty) scale(s)">.
// Three input methods feed into the same applyZoom / pan logic:
//   • Mouse wheel          → zoom toward cursor via non-passive DOM listener
//   • Pointer drag         → pan (single pointer)
//   • Pinch                → zoom toward midpoint (two pointers)
//   • HUD +/−/⌂ buttons    → zoom toward SVG centre (for touchscreens / mouse)
//
// Click detection:
//   setPointerCapture routes all future pointer events to the SVG element, which
//   means the browser never sees a matching pointerdown+pointerup on the same
//   child <g> and never fires a click event there. Instead, onPointerUp uses
//   document.elementFromPoint to find the element under the pointer and checks
//   for a data-project-id attribute (set on each CircuitNode's outer <g>).
//
// Bounds clamping:
//   clampXform ensures at least MARGIN SVG units of the board remain visible
//   on every axis. Applied to every transform update so the board can never
//   be dragged fully off-screen.

import { useState, useRef, useCallback, useEffect } from "react";
import { useInView } from "framer-motion";
import { Project } from "@/types/project";
import CircuitTraces from "./CircuitTraces";
import CircuitNode from "./CircuitNode";
import ProjectModal from "./ProjectModal";
import BoardDecorations from "./BoardDecorations";

const VIEW_W = 1000;
const VIEW_H = 600;
const MIN_SCALE = 0.4;
const MAX_SCALE = 6;
// Minimum SVG units of the board that must remain visible on each axis
const MARGIN = 250;

interface XForm { tx: number; ty: number; scale: number }
interface Props { projects: Project[] }

// ── Bounds clamping ────────────────────────────────────────────────────────
// Board left edge (tx) must not exceed VIEW_W - MARGIN (would hide too much on right).
// Board right edge (tx + scale*VIEW_W) must be at least MARGIN (can't go off left).
function clampXform({ tx, ty, scale }: XForm): XForm {
  return {
    scale,
    tx: Math.max(MARGIN - scale * VIEW_W, Math.min(VIEW_W - MARGIN, tx)),
    ty: Math.max(MARGIN - scale * VIEW_H, Math.min(VIEW_H - MARGIN, ty)),
  };
}

export default function CircuitBoard({ projects }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [xform, setXform] = useState<XForm>({ tx: 0, ty: 0, scale: 1 });

  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true });

  // Gesture tracking — refs avoid triggering re-renders on every pointer event
  const isDragging    = useRef(false);
  const hasDragged    = useRef(false);
  const lastPos       = useRef({ x: 0, y: 0 });
  const activePtr     = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinchDist = useRef<number | null>(null);

  // ── Coordinate helpers ─────────────────────────────────────────────────────

  /** Client screen coords → SVG user-space coords (accounts for viewBox scaling) */
  const toSVG = useCallback((cx: number, cy: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: cx, y: cy };
    const pt = svg.createSVGPoint();
    pt.x = cx; pt.y = cy;
    const inv = svg.getScreenCTM()?.inverse();
    if (!inv) return { x: cx, y: cy };
    const r = pt.matrixTransform(inv);
    return { x: r.x, y: r.y };
  }, []);

  /**
   * Zoom by `factor` keeping the client-space point (cx, cy) fixed on screen.
   * Formula: pivot stays fixed ↔ newTx = pivot - (pivot - oldTx) * (newScale/oldScale)
   */
  const applyZoom = useCallback((cx: number, cy: number, factor: number) => {
    const { x: mx, y: my } = toSVG(cx, cy);
    setXform(prev => {
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev.scale * factor));
      const ratio = newScale / prev.scale;
      return clampXform({
        tx: mx - ratio * (mx - prev.tx),
        ty: my - ratio * (my - prev.ty),
        scale: newScale,
      });
    });
  }, [toSVG]);

  /** Zoom toward the centre of the SVG element — used by HUD buttons */
  const zoomAtCentre = useCallback((factor: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    applyZoom(r.left + r.width / 2, r.top + r.height / 2, factor);
  }, [applyZoom]);

  // ── Non-passive wheel listener ─────────────────────────────────────────────
  // React attaches wheel listeners passively by default, which silently ignores
  // preventDefault(). We attach directly to the DOM to override this.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      applyZoom(e.clientX, e.clientY, e.deltaY < 0 ? 1.12 : 1 / 1.12);
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, [applyZoom]);

  // ── Pointer handlers ───────────────────────────────────────────────────────

  function onPointerDown(e: React.PointerEvent<SVGSVGElement>) {
    activePtr.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (activePtr.current.size === 1) {
      isDragging.current = true;
      hasDragged.current = false;
      lastPos.current = { x: e.clientX, y: e.clientY };
      // Capture keeps pointermove firing even when the cursor leaves the SVG
      svgRef.current?.setPointerCapture(e.pointerId);
    }
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    activePtr.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = Array.from(activePtr.current.values());

    if (pts.length >= 2) {
      // ── Pinch-to-zoom ────────────────────────────────────────────────────
      const [a, b] = pts;
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (lastPinchDist.current !== null && dist > 0) {
        applyZoom((a.x + b.x) / 2, (a.y + b.y) / 2, dist / lastPinchDist.current);
      }
      lastPinchDist.current = dist;
      hasDragged.current = true;
    } else if (isDragging.current) {
      // ── Single-pointer pan ───────────────────────────────────────────────
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasDragged.current = true;

      // ctm.a / ctm.d convert screen-pixel deltas to SVG-space deltas
      const ctm = svgRef.current?.getScreenCTM();
      if (ctm) {
        setXform(prev => clampXform({
          ...prev,
          tx: prev.tx + dx / ctm.a,
          ty: prev.ty + dy / ctm.d,
        }));
      }
      lastPos.current = { x: e.clientX, y: e.clientY };
    }
  }

  function onPointerUp(e: React.PointerEvent<SVGSVGElement>) {
    activePtr.current.delete(e.pointerId);
    if (activePtr.current.size < 2) lastPinchDist.current = null;

    if (activePtr.current.size === 0) {
      isDragging.current = false;

      if (!hasDragged.current) {
        // setPointerCapture redirects pointerup to the SVG element, so no click
        // event fires on child <g> elements. Instead, we do our own hit test:
        // find the DOM element visually under the pointer and walk up to the
        // nearest ancestor that has a data-project-id attribute.
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const nodeEl = el?.closest("[data-project-id]");
        if (nodeEl) {
          const id = nodeEl.getAttribute("data-project-id");
          if (id) setSelectedId(prev => (prev === id ? null : id));
        } else {
          // Tapped on empty board — deselect
          setSelectedId(null);
        }
      }
    }
  }

  const selectedProject = selectedId
    ? (projects.find(p => p.id === selectedId) ?? null)
    : null;
  const selectedIndex = selectedId
    ? projects.findIndex(p => p.id === selectedId)
    : -1;

  const { tx, ty, scale } = xform;

  return (
    <div className="relative w-full h-full select-none">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        preserveAspectRatio="xMidYMid meet"
        overflow="hidden"
        style={{ touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Fixed backdrop — visible when board is panned away from edges */}
        <rect width={VIEW_W} height={VIEW_H} fill="var(--color-surface)" />

        <defs>
          <pattern id="pcb-grid" width={40} height={40} patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(30,100,90,0.18)" strokeWidth={0.6} />
          </pattern>
        </defs>

        {/* Everything inside this group pans and zooms together */}
        <g transform={`translate(${tx}, ${ty}) scale(${scale})`}>
          <rect width={VIEW_W} height={VIEW_H} fill="var(--color-pcb)" />
          <rect width={VIEW_W} height={VIEW_H} fill="url(#pcb-grid)" />

          {([
            [22, 22],
            [VIEW_W - 22, 22],
            [22, VIEW_H - 22],
            [VIEW_W - 22, VIEW_H - 22],
          ] as [number, number][]).map(([hx, hy], i) => (
            <g key={i}>
              <circle cx={hx} cy={hy} r={11} fill="var(--color-surface)" stroke="var(--color-trace)" strokeWidth={1} />
              <circle cx={hx} cy={hy} r={4} fill="var(--color-trace)" opacity={0.5} />
            </g>
          ))}

          <BoardDecorations />

          {isInView && <CircuitTraces projects={projects} activeId={selectedId} />}

          {projects.map((project, i) => (
            <CircuitNode
              key={project.id}
              project={project}
              index={i}
              isActive={selectedId === project.id}
              vpW={VIEW_W}
              vpH={VIEW_H}
            />
          ))}
        </g>
      </svg>

      {/* ── Zoom HUD ────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1 z-10">
        <button
          onClick={() => zoomAtCentre(1.3)}
          className="w-8 h-8 font-mono text-lg leading-none border border-trace/50 bg-surface/90 text-glow hover:bg-trace/20 rounded transition-colors"
          aria-label="Zoom in"
        >+</button>
        <span className="font-mono text-[9px] text-muted select-none tracking-wider">
          {scale.toFixed(1)}×
        </span>
        <button
          onClick={() => setXform({ tx: 0, ty: 0, scale: 1 })}
          className="w-8 h-8 font-mono text-xs leading-none border border-trace/50 bg-surface/90 text-muted hover:bg-trace/20 rounded transition-colors"
          aria-label="Reset view"
        >⌂</button>
        <button
          onClick={() => zoomAtCentre(1 / 1.3)}
          className="w-8 h-8 font-mono text-lg leading-none border border-trace/50 bg-surface/90 text-glow hover:bg-trace/20 rounded transition-colors"
          aria-label="Zoom out"
        >−</button>
      </div>

      {/* ── Hint label ──────────────────────────────────────────────────────── */}
      <div className="absolute bottom-4 left-4 font-mono text-[9px] text-muted/50 tracking-widest pointer-events-none hidden md:block">
        scroll · drag · pinch
      </div>

      <ProjectModal
        project={selectedProject}
        index={selectedIndex}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}

