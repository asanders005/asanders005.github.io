"use client";

// This component handles all the hero animations.
// It's a separate file so that app/page.tsx can remain a Server Component
// and export `metadata` — you can't export metadata from a "use client" file.

import Link from "next/link";
import { motion } from "framer-motion";
import ScanlineOverlay from "@/components/ui/ScanlineOverlay";

// Decorative circuit traces drawn in the background
const BG_TRACES = [
  "M 0 200 L 300 200 L 300 100 L 800 100",
  "M 1920 300 L 1500 300 L 1500 500 L 900 500",
  "M 0 600 L 200 600 L 200 400 L 1000 400",
  "M 400 0 L 400 250 L 700 250",
  "M 1500 900 L 1500 600 L 1200 600",
  "M 800 0 L 800 150 L 1200 150 L 1200 0",
];

// Small dots at trace endpoints
const BG_DOTS: [number, number][] = [
  [300, 100], [800, 100], [1500, 300], [400, 250], [700, 250],
];

function BackgroundTraces() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1920 1080"
      aria-hidden="true"
    >
      {BG_TRACES.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="var(--color-trace)"
          strokeWidth={1.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: i * 0.25 + 0.5, ease: "easeInOut" }}
        />
      ))}
      {BG_DOTS.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={3}
          fill="var(--color-glow)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.3, delay: i * 0.25 + 2 }}
        />
      ))}
    </svg>
  );
}

export default function HeroSection() {
  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-surface">
      <BackgroundTraces />
      <ScanlineOverlay />

      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,107,122,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,107,122,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Hero content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.p
          className="font-mono text-xs text-muted tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          // embedded systems · low-level software
        </motion.p>

        <motion.h1
          className="font-mono text-5xl md:text-6xl text-primary font-bold tracking-tight mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Aiden Sanders
        </motion.h1>

        <motion.p
          className="font-mono text-lg text-glow mb-2 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          Embedded Systems Developer, Software Engineer, Tinkerer
        </motion.p>

        <motion.p
          className="text-base text-muted mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          Writing firmware, debugging hardware, and building tools that live
          close to the metal.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <Link
            href="/projects"
            className="px-6 py-3 font-mono text-sm border border-glow text-glow hover:bg-glow/10 rounded transition-colors tracking-wide"
          >
            [ View Projects ]
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 font-mono text-sm border border-trace text-muted hover:border-glow hover:text-glow rounded transition-colors tracking-wide"
          >
            [ About Me ]
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
