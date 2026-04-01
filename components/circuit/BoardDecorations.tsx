"use client";

import { motion } from "framer-motion";

// ─── Passive component helpers ────────────────────────────────────────────────

/** SMD capacitor: two pads with a gap */
function Capacitor({ x, y, label, rotate = 0 }: { x: number; y: number; label: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={0.7}>
      <rect x={-14} y={-6} width={11} height={12} rx={1} fill="var(--color-chip)" stroke="var(--color-trace)" strokeWidth={0.8} />
      <rect x={3}   y={-6} width={11} height={12} rx={1} fill="var(--color-chip)" stroke="var(--color-trace)" strokeWidth={0.8} />
      {/* gap line in the middle */}
      <line x1={0} y1={-7} x2={0} y2={7} stroke="var(--color-pcb)" strokeWidth={2} />
      <text x={0} y={18} textAnchor="middle" fill="var(--color-muted)" fontSize={7} fontFamily="monospace">{label}</text>
    </g>
  );
}

/** SMD resistor: a single body rectangle */
function Resistor({ x, y, label, rotate = 0 }: { x: number; y: number; label: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={0.7}>
      <rect x={-16} y={-5} width={32} height={10} rx={2} fill="var(--color-chip)" stroke="var(--color-trace)" strokeWidth={0.8} />
      {/* end pads */}
      <rect x={-20} y={-4} width={6} height={8} rx={1} fill="var(--color-trace)" opacity={0.5} />
      <rect x={14}  y={-4} width={6} height={8} rx={1} fill="var(--color-trace)" opacity={0.5} />
      <text x={0} y={16} textAnchor="middle" fill="var(--color-muted)" fontSize={7} fontFamily="monospace">{label}</text>
    </g>
  );
}

/** Crystal oscillator: rectangular HC-49 style body */
function Crystal({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.75}>
      {/* body */}
      <rect x={-10} y={-22} width={20} height={44} rx={3} fill="var(--color-chip)" stroke="var(--color-glow)" strokeWidth={0.8} strokeOpacity={0.6} />
      {/* end caps */}
      <rect x={-6} y={-28} width={12} height={8} rx={1} fill="var(--color-trace)" opacity={0.6} />
      <rect x={-6} y={20}  width={12} height={8} rx={1} fill="var(--color-trace)" opacity={0.6} />
      {/* label */}
      <text x={0} y={2} textAnchor="middle" fill="var(--color-muted)" fontSize={6} fontFamily="monospace">XTAL</text>
      <text x={0} y={11} textAnchor="middle" fill="var(--color-muted)" fontSize={5} fontFamily="monospace">16MHz</text>
    </g>
  );
}

/** Status LED: pad + animated glow circle */
function StatusLed({ x, y, color, label, delay = 0 }: {
  x: number; y: number; color: string; label: string; delay?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* solder pad */}
      <rect x={-7} y={-7} width={14} height={14} rx={2} fill="var(--color-chip)" stroke="var(--color-trace)" strokeWidth={0.8} opacity={0.8} />
      {/* animated glow */}
      <motion.circle
        cx={0} cy={0} r={4}
        fill={color}
        animate={{ opacity: [0.2, 1, 0.2], r: [3, 4.5, 3] }}
        transition={{ duration: 1.8, delay, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={0} y={20} textAnchor="middle" fill="var(--color-muted)" fontSize={7} fontFamily="monospace">{label}</text>
    </g>
  );
}

/** A row of rectangular edge-connector fingers (gold colour) */
function EdgeConnector({ x, y, count, pitch, vertical = false, label }: {
  x: number; y: number; count: number; pitch: number; vertical?: boolean; label: string;
}) {
  const fingers = Array.from({ length: count });
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.85}>
      {fingers.map((_, i) => {
        const px = vertical ? 0 : i * pitch;
        const py = vertical ? i * pitch : 0;
        return (
          <rect
            key={i}
            x={vertical ? -5  : px}
            y={vertical ? py  : -5}
            width={vertical ? 22 : 8}
            height={vertical ? 8  : 22}
            rx={1}
            fill="#c9a227"
            stroke="#a07a10"
            strokeWidth={0.6}
          />
        );
      })}
      {/* connector outline */}
      <rect
        x={vertical ? -9  : -4}
        y={vertical ? -4  : -9}
        width={vertical ? 30              : count * pitch + 0}
        height={vertical ? count * pitch  : 30}
        rx={2}
        fill="none"
        stroke="var(--color-trace)"
        strokeWidth={1}
        strokeDasharray="4 3"
        opacity={0.5}
      />
      <text
        x={vertical ? 28 : (count * pitch) / 2}
        y={vertical ? (count * pitch) / 2 : 30}
        textAnchor={vertical ? "start" : "middle"}
        dominantBaseline={vertical ? "middle" : "auto"}
        fill="var(--color-muted)"
        fontSize={7}
        fontFamily="monospace"
        opacity={0.9}
      >{label}</text>
    </g>
  );
}

/** USB-C port silhouette */
function UsbCPort({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.85}>
      {/* outer shell */}
      <rect x={-18} y={-14} width={36} height={28} rx={7} fill="var(--color-chip)" stroke="var(--color-trace)" strokeWidth={1.2} />
      {/* inner cutout */}
      <rect x={-13} y={-9}  width={26} height={18} rx={5} fill="var(--color-surface)" stroke="var(--color-trace)" strokeWidth={0.7} opacity={0.8} />
      {/* solder pads bottom */}
      {[-10, -4, 2, 8].map((px, i) => (
        <rect key={i} x={px} y={17} width={5} height={7} rx={1} fill="#c9a227" stroke="#a07a10" strokeWidth={0.4} />
      ))}
      <text x={0} y={34} textAnchor="middle" fill="var(--color-muted)" fontSize={7} fontFamily="monospace">USB-C</text>
    </g>
  );
}

/** 2.1mm barrel jack */
function BarrelJack({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.85}>
      {/* outer ring */}
      <circle cx={0} cy={0} r={16} fill="var(--color-chip)" stroke="var(--color-trace)" strokeWidth={1.2} />
      <circle cx={0} cy={0} r={9}  fill="var(--color-surface)" stroke="var(--color-trace)" strokeWidth={0.8} />
      <circle cx={0} cy={0} r={3}  fill="var(--color-muted)" opacity={0.6} />
      {/* solder pads */}
      {[-18, 0, 18].map((py, i) => (
        <rect key={i} x={18} y={py - 3} width={8} height={6} rx={1} fill="#c9a227" stroke="#a07a10" strokeWidth={0.4} />
      ))}
      <text x={0} y={28} textAnchor="middle" fill="var(--color-muted)" fontSize={7} fontFamily="monospace">PWR</text>
    </g>
  );
}

/** Small debug/test point pad */
function TestPad({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.65}>
      <circle cx={0} cy={0} r={5} fill="var(--color-trace)" opacity={0.6} />
      <circle cx={0} cy={0} r={2} fill="var(--color-pcb)" />
      <text x={8} y={4} fill="var(--color-muted)" fontSize={6} fontFamily="monospace">{label}</text>
    </g>
  );
}

/** A short trace stub connecting a pad to a component */
function TraceStub({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="var(--color-trace)" strokeWidth={1.2} opacity={0.55} />
  );
}

// ─── Main decoration layer ────────────────────────────────────────────────────

export default function BoardDecorations() {
  return (
    <g>
      {/* ── Board edge silkscreen border ────────────────────────────────── */}
      <rect x={8} y={8} width={984} height={584} rx={4}
        fill="none" stroke="var(--color-trace)" strokeWidth={0.8} strokeOpacity={0.25}
        strokeDasharray="6 4"
      />

      {/* ── Left edge: USB-C + Barrel Jack ports ────────────────────────── */}
      <UsbCPort x={0} y={160} />
      <BarrelJack x={0} y={260} />

      {/* Short trace stubs from ports inward */}
      <TraceStub x1={18} y1={160} x2={60} y2={160} />
      <TraceStub x1={18} y1={260} x2={60} y2={260} />
      <TraceStub x1={60} y1={160} x2={60} y2={210} />
      <TraceStub x1={60} y1={210} x2={100} y2={210} />

      {/* ── Bottom edge connector (40-pin GPIO style) ───────────────────── */}
      <EdgeConnector x={200} y={578} count={20} pitch={24} vertical={false} label="J1 · GPIO" />

      {/* ── Right edge connector (10-pin SWD/JTAG) ─────────────────────── */}
      <EdgeConnector x={982} y={180} count={10} pitch={20} vertical={true} label="J2 · JTAG" />

      {/* ── Crystal oscillator (top-centre area) ────────────────────────── */}
      <Crystal x={500} y={60} />
      {/* trace stubs from crystal outward */}
      <TraceStub x1={500} y1={90} x2={500} y2={120} />
      <TraceStub x1={500} y1={32} x2={500} y2={8} />

      {/* ── Decoupling capacitors near crystal ──────────────────────────── */}
      <Capacitor x={440} y={55} label="C1 100n" />
      <Capacitor x={560} y={55} label="C2 100n" />
      <TraceStub x1={456} y1={55} x2={490} y2={55} />
      <TraceStub x1={510} y1={55} x2={544} y2={55} />

      {/* ── Capacitors in the lower-left area ───────────────────────────── */}
      <Capacitor x={130} y={480} label="C3 10µ" />
      <Capacitor x={180} y={480} label="C4 10µ" />
      <Capacitor x={130} y={520} label="C5 100n" rotate={90} />
      <TraceStub x1={130} y1={468} x2={130} y2={450} />

      {/* ── Resistors top-left ──────────────────────────────────────────── */}
      <Resistor x={120} y={130} label="R1 10k" />
      <Resistor x={120} y={165} label="R2 10k" />
      <Resistor x={120} y={200} label="R3 4k7" />
      <TraceStub x1={140} y1={130} x2={180} y2={130} />
      <TraceStub x1={140} y1={165} x2={180} y2={165} />

      {/* ── Resistors top-right ─────────────────────────────────────────── */}
      <Resistor x={860} y={120} label="R4 1k" />
      <Resistor x={860} y={155} label="R5 1k" />
      <TraceStub x1={840} y1={120} x2={820} y2={120} />
      <TraceStub x1={840} y1={155} x2={820} y2={155} />

      {/* ── More decoupling caps: bottom-right ──────────────────────────── */}
      <Capacitor x={820} y={500} label="C6 100n" />
      <Capacitor x={870} y={500} label="C7 100n" />
      <Capacitor x={920} y={500} label="C8 10µ" />

      {/* ── Status LEDs (right side, near top) ──────────────────────────── */}
      <StatusLed x={920} y={80}  color="var(--color-glow)"  label="PWR"  delay={0}   />
      <StatusLed x={955} y={80}  color="#22c55e"             label="SYS"  delay={0.6} />
      <StatusLed x={920} y={115} color="#f59e0b"             label="TX"   delay={1.1} />
      <StatusLed x={955} y={115} color="#f59e0b"             label="RX"   delay={1.5} />
      {/* short traces to LEDs */}
      <TraceStub x1={913} y1={80}  x2={895} y2={80}  />
      <TraceStub x1={913} y1={115} x2={895} y2={115} />
      <TraceStub x1={895} y1={80}  x2={895} y2={115} />

      {/* ── Test points scattered around ────────────────────────────────── */}
      <TestPad x={200} y={55}  label="TP1" />
      <TestPad x={240} y={55}  label="TP2" />
      <TestPad x={340} y={540} label="TP3" />
      <TestPad x={380} y={540} label="TP4" />
      <TestPad x={750} y={540} label="TP5" />
      <TestPad x={790} y={540} label="TP6" />
      <TestPad x={880} y={300} label="TP7" />

      {/* ── Net labels (silkscreen text annotations) ────────────────────── */}
      <text x={70} y={155} fill="var(--color-muted)" fontSize={8} fontFamily="monospace" opacity={0.7}>3V3</text>
      <text x={70} y={175} fill="var(--color-muted)" fontSize={8} fontFamily="monospace" opacity={0.7}>GND</text>
      <text x={70} y={195} fill="var(--color-muted)" fontSize={8} fontFamily="monospace" opacity={0.7}>VIN</text>
      <text x={185} y={130} fill="var(--color-muted)" fontSize={7} fontFamily="monospace" opacity={0.65}>→ MCU</text>
      <text x={185} y={165} fill="var(--color-muted)" fontSize={7} fontFamily="monospace" opacity={0.65}>→ MCU</text>

      {/* ── Board revision & info silkscreen (bottom edge) ──────────────── */}
      <text x={800} y={585} textAnchor="middle" fill="var(--color-muted)" fontSize={8} fontFamily="monospace" opacity={0.5}>
        REV 1.0 · PORTFOLIO-DEV-BOARD · © 2026
      </text>

      {/* ── Polarity markers near barrel jack ───────────────────────────── */}
      <text x={28} y={248} fill="var(--color-glow)"  fontSize={10} fontFamily="monospace" opacity={0.7}>+</text>
      <text x={28} y={276} fill="var(--color-muted)" fontSize={10} fontFamily="monospace" opacity={0.7}>−</text>

      {/* ── Pin-1 indicator triangles on edge connectors ────────────────── */}
      <polygon points="200,572 206,565 212,572" fill="var(--color-glow)" opacity={0.6} />
      <polygon points="992,180 985,174 985,186" fill="var(--color-glow)" opacity={0.6} />

      {/* ── Silkscreen component outlines (bare rectangles, no pads) ─────── */}
      {/* represents a small IC near the resistors */}
      <rect x={100} y={310} width={60} height={80} rx={2}
        fill="none" stroke="var(--color-muted)" strokeWidth={0.7} strokeOpacity={0.45}
        strokeDasharray="3 2"
      />
      <text x={130} y={354} textAnchor="middle" fill="var(--color-muted)" fontSize={7} fontFamily="monospace" opacity={0.55}>U2</text>
      {/* small passives footprint cluster bottom-centre */}
      <rect x={420} y={530} width={30} height={18} rx={1}
        fill="none" stroke="var(--color-muted)" strokeWidth={0.6} strokeOpacity={0.35} />
      <rect x={460} y={530} width={30} height={18} rx={1}
        fill="none" stroke="var(--color-muted)" strokeWidth={0.6} strokeOpacity={0.35} />
      <rect x={500} y={530} width={30} height={18} rx={1}
        fill="none" stroke="var(--color-muted)" strokeWidth={0.6} strokeOpacity={0.35} />
    </g>
  );
}
