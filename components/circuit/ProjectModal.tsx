"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";
import Badge from "@/components/ui/Badge";

interface Props {
  project: Project | null;
  index: number;
  onClose: () => void;
}

// Directional slide variants — mimics signal data scrolling across an
// oscilloscope or logic-analyzer screen.
const slideVariants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" as const },
  }),
};

export default function ProjectModal({ project, index, onClose }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    setImgIdx(0);
    setDirection(1);
  }, [project?.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const navigate = (dir: number) => {
    if (!project) return;
    setDirection(dir);
    setImgIdx((i) => (i + dir + project.images.length) % project.images.length);
  };

  // Swipe / drag detection
  const swipeStartX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 40;

  const onSwipeStart = (e: React.PointerEvent) => {
    // Capture the pointer so the container keeps receiving events even if the
    // browser would normally steal them for a native image drag.
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    swipeStartX.current = e.clientX;
  };

  const onSwipeEnd = (e: React.PointerEvent) => {
    if (swipeStartX.current === null) return;
    const delta = swipeStartX.current - e.clientX;
    if (Math.abs(delta) >= SWIPE_THRESHOLD) navigate(delta > 0 ? 1 : -1);
    swipeStartX.current = null;
  };

  const partNum = project ? `IC-${String(index + 1).padStart(3, "0")}` : "";

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-50 bg-surface/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ── Modal panel ──────────────────────────────────────────── */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-x-4 top-1/2 z-50 max-w-3xl mx-auto -translate-y-1/2 rounded-lg border border-trace bg-surface p-6 shadow-2xl max-h-[calc(100vh-2rem)] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-muted hover:text-glow transition-colors font-mono text-xl leading-none"
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Part number + title */}
            <p className="text-xs font-mono text-muted tracking-widest mb-1">
              {partNum} ·
            </p>
            <h2
              id="modal-title"
              className="text-xl font-mono text-primary font-bold mb-5"
            >
              {project.title}
            </h2>

            {/* ── Two-column row: description + carousel ───────────────── */}
            <div className="flex flex-col md:flex-row gap-6 mb-5">

              {/* Left — description only */}
              <div className="flex-1 flex flex-col gap-4">

                <p className="text-sm text-primary/80 leading-relaxed min-w-0">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} label={tech} />
                  ))}
                </div>

              </div>

              {/* Right — CRT-style image carousel */}
              {project.images.length > 0 && (
                <div className="w-full md:w-80 shrink-0 flex flex-col gap-2">
                  {/* Display panel with scanline overlay */}
                  <div
                    className="relative rounded overflow-hidden bg-pcb aspect-[4/3] border border-trace/40 touch-pan-y"
                    onPointerDown={onSwipeStart}
                    onPointerUp={onSwipeEnd}
                    onPointerCancel={() => { swipeStartX.current = null; }}
                  >
                    {/* CRT scanline overlay */}
                    <div
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
                      }}
                    />
                    {/* Corner bracket pips */}
                    <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-glow/50 z-10 pointer-events-none" />
                    <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-glow/50 z-10 pointer-events-none" />
                    <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-glow/50 z-10 pointer-events-none" />
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-glow/50 z-10 pointer-events-none" />

                    {/* Sliding image */}
                    <AnimatePresence initial={false} custom={direction} mode="sync">
                      <motion.div
                        key={imgIdx}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0"
                      >
                        <Image
                          src={project.images[imgIdx]}
                          alt={`${project.title} screenshot ${imgIdx + 1}`}
                          fill
                          draggable={false}
                          className="object-cover select-none"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Navigation controls */}
                  {project.images.length > 1 && (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => navigate(-1)}
                        className="px-2 py-0.5 text-xs font-mono bg-surface/80 text-glow border border-trace rounded hover:bg-trace/20 transition-colors"
                      >
                        ‹
                      </button>
                      <span className="text-xs font-mono text-muted">
                        {imgIdx + 1} / {project.images.length}
                      </span>
                      <button
                        onClick={() => navigate(1)}
                        className="px-2 py-0.5 text-xs font-mono bg-surface/80 text-glow border border-trace rounded hover:bg-trace/20 transition-colors"
                      >
                        ›
                      </button>
                      {/* Dot indicators */}
                      <div className="flex gap-1 ml-1">
                        {project.images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setDirection(i > imgIdx ? 1 : -1);
                              setImgIdx(i);
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-colors ${
                              i === imgIdx ? "bg-glow" : "bg-trace/50"
                            }`}
                            aria-label={`View screenshot ${i + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Full-width footer: badges + links ────────────────────── */}
            
            <div className="flex gap-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 px-4 text-sm font-mono border border-trace text-glow hover:bg-trace/20 rounded transition-colors"
              >
                [ GitHub ]
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-4 text-sm font-mono border border-glow text-glow hover:bg-glow/10 rounded transition-colors"
                >
                  [ Live Demo ]
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
