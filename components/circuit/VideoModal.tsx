"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Converts a YouTube watch/short URL to a privacy-enhanced nocookie embed URL.
 * Non-YouTube URLs are returned unchanged so other embeds (Vimeo etc.) work too.
 */
function toEmbedUrl(url: string): string {
  const watchMatch = url.match(/youtube\.com\/watch\?.*v=([^&#]+)/);
  if (watchMatch)
    return `https://www.youtube-nocookie.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
  const shortMatch = url.match(/youtu\.be\/([^?#]+)/);
  if (shortMatch)
    return `https://www.youtube-nocookie.com/embed/${shortMatch[1]}?autoplay=1&rel=0`;
  return url;
}

export default function VideoModal({ url, title, isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const embedUrl = toEmbedUrl(url);

  return (
    // z-[60] — stacks above the project modal which sits at z-50
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────── */}
          <motion.div
            className="fixed inset-0 z-[60] bg-surface/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* ── Panel ────────────────────────────────────────────────── */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Video player: ${title}`}
            className="fixed inset-x-4 top-1/2 z-[60] max-w-4xl mx-auto -translate-y-1/2 rounded-lg border border-trace/40 bg-chip p-4 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {/* Status LED */}
                <span className="inline-block w-2 h-2 rounded-full bg-glow shadow-[0_0_6px_var(--color-glow)] animate-pulse" />
                <p className="text-xs font-mono text-glow tracking-widest">
                  VIDEO OUTPUT // {title.toUpperCase()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted hover:text-glow transition-colors font-mono text-xl leading-none"
                aria-label="Close video player"
              >
                ×
              </button>
            </div>

            {/* CRT display frame — scaleY on this element so overflow-hidden
                 clips the contents during the power-on collapse. */}
            <motion.div
              className="relative rounded overflow-hidden border border-trace/30 bg-pcb"
              initial={{ scaleY: 0.015 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Scanline overlay */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
                }}
              />
              {/* Corner bracket pips */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-glow/60 z-10 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-glow/60 z-10 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-glow/60 z-10 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-glow/60 z-10 pointer-events-none" />

              <div className="aspect-video">
                <iframe
                  src={embedUrl}
                  title={title}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </motion.div>

            {/* Silkscreen footer */}
            <p className="mt-2 text-right text-[10px] font-mono text-muted/40 tracking-wider">
              DISP-1 · VIDEO MODULE · © 2026
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
