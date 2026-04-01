"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/project";
import Badge from "@/components/ui/Badge";

interface Props {
  project: Project | null;
  index: number;
  onClose: () => void;
}

export default function ProjectModal({ project, index, onClose }: Props) {
  const [imgIdx, setImgIdx] = useState(0);

  // Reset the carousel when a different project is selected
  useEffect(() => {
    setImgIdx(0);
  }, [project?.id]);

  // Close on Escape key — useEffect registers the listener when the
  // component mounts and cleans it up when it unmounts (the return value).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const partNum = project ? `IC-${String(index + 1).padStart(3, "0")}` : "";

  return (
    // AnimatePresence watches its children. When `project` becomes null
    // the modal animates out before being removed from the DOM.
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
            className="fixed inset-x-4 top-1/2 z-50 max-w-lg mx-auto -translate-y-1/2 rounded-lg border border-trace bg-surface p-6 shadow-2xl"
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

            {/* Screenshot carousel */}
            {project.images.length > 0 && (
              <div className="relative mb-5 rounded overflow-hidden bg-pcb aspect-video">
                <Image
                  src={project.images[imgIdx]}
                  alt={`${project.title} screenshot ${imgIdx + 1}`}
                  fill
                  className="object-cover"
                />
                {project.images.length > 1 && (
                  <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
                    <button
                      onClick={() =>
                        setImgIdx((i) => (i - 1 + project.images.length) % project.images.length)
                      }
                      className="px-2 py-0.5 text-xs font-mono bg-surface/80 text-glow border border-trace rounded"
                    >
                      ‹
                    </button>
                    <span className="text-xs font-mono text-muted self-center">
                      {imgIdx + 1}/{project.images.length}
                    </span>
                    <button
                      onClick={() =>
                        setImgIdx((i) => (i + 1) % project.images.length)
                      }
                      className="px-2 py-0.5 text-xs font-mono bg-surface/80 text-glow border border-trace rounded"
                    >
                      ›
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm text-primary/80 leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <Badge key={tech} label={tech} />
              ))}
            </div>

            {/* Links */}
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
