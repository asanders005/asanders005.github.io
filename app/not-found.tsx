import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Signal Lost | Portfolio",
};

// Decorative background traces — same viewBox convention as HeroSection
function BackgroundTraces() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1920 1080"
      aria-hidden="true"
    >
      {/* Broken/incomplete traces to suggest a severed connection */}
      <path d="M 0 300 L 400 300 L 400 200 L 700 200"         fill="none" stroke="var(--color-trace)" strokeWidth="1.5" strokeDasharray="8 4" />
      <path d="M 1920 400 L 1400 400 L 1400 260 L 1050 260"   fill="none" stroke="var(--color-trace)" strokeWidth="1.5" strokeDasharray="8 4" />
      <path d="M 0 750 L 300 750 L 300 900 L 600 900"         fill="none" stroke="var(--color-trace)" strokeWidth="1.5" strokeDasharray="8 4" />
      <path d="M 1920 700 L 1600 700 L 1600 820 L 1300 820"   fill="none" stroke="var(--color-trace)" strokeWidth="1.5" strokeDasharray="8 4" />
      {/* Severed endpoint — open circle to imply a broken via */}
      <circle cx="700"  cy="200" r="5" fill="none" stroke="var(--color-trace)" strokeWidth="1.5" />
      <circle cx="1050" cy="260" r="5" fill="none" stroke="var(--color-trace)" strokeWidth="1.5" />
      <circle cx="600"  cy="900" r="5" fill="none" stroke="var(--color-trace)" strokeWidth="1.5" />
      <circle cx="1300" cy="820" r="5" fill="none" stroke="var(--color-trace)" strokeWidth="1.5" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-surface">
      <BackgroundTraces />

      {/* Dot-grid identical to HeroSection */}
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

      {/* Main card */}
      <div className="relative z-10 w-full max-w-lg mx-4">

        {/* IC chip "package" border */}
        <div className="border border-trace/50 rounded-lg p-8 bg-chip/60">

          {/* Corner bracket pips */}
          <span className="absolute top-3 left-3  w-3 h-3 border-t-2 border-l-2 border-glow/50" />
          <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-glow/50" />
          <span className="absolute bottom-3 left-3  w-3 h-3 border-b-2 border-l-2 border-glow/50" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-glow/50" />

          {/* Part number label */}
          <p className="font-mono text-[10px] text-muted tracking-widest uppercase mb-3">
            ERR-404 · ADDR_NOT_FOUND
          </p>

          {/* Large fault code */}
          <h1 className="font-mono text-8xl font-bold text-primary/10 select-none leading-none mb-2"
              aria-hidden="true">
            404
          </h1>

          {/* Terminal-style diagnostic block */}
          <div className="mt-4 border border-trace/30 rounded bg-surface/60">
            {/* Terminal chrome */}
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-trace/20">
              <span className="w-2 h-2 rounded-full bg-trace/40" />
              <span className="w-2 h-2 rounded-full bg-trace/40" />
              {/* Fault LED — amber pulse */}
              <span className="w-2 h-2 rounded-full bg-yellow-500/80 animate-pulse shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
              <span className="ml-2 font-mono text-[10px] text-muted tracking-widest">
                system@portfolio:~
              </span>
            </div>

            {/* Diagnostic output */}
            <div className="p-4 font-mono text-xs space-y-1.5">
              <p>
                <span className="text-glow select-none">$ </span>
                <span className="text-muted">resolve_path --target &quot;{"{URL}"}&quot;</span>
              </p>
              <p className="text-yellow-400/80">  [WARN]  Bus transaction timed out</p>
              <p className="text-yellow-400/80">  [WARN]  Retrying... (3/3)</p>
              <p className="text-red-400/80">  [FAULT] Address could not be resolved</p>
              <p className="text-red-400/80">  [FAULT] No route to host — signal lost</p>
              <p className="text-muted mt-2">  Fault code: <span className="text-primary/70">0x404</span></p>
              <p className="mt-3">
                <span className="text-glow select-none">$ </span>
                <span className="inline-block w-2 h-3.5 bg-glow align-middle animate-pulse" />
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 text-center py-2.5 px-4 font-mono text-sm border border-glow text-glow hover:bg-glow/10 rounded transition-colors tracking-wide"
            >
              [ Return to ~/home ]
            </Link>
            <Link
              href="/projects"
              className="flex-1 text-center py-2.5 px-4 font-mono text-sm border border-trace text-muted hover:bg-trace/10 hover:text-glow rounded transition-colors tracking-wide"
            >
              [ ~/projects ]
            </Link>
          </div>

          {/* Silkscreen footer */}
          <p className="mt-5 text-right font-mono text-[9px] text-muted/30 tracking-widest">
            ERR-BLOCK · FAULT MODULE · © 2026
          </p>
        </div>
      </div>
    </div>
  );
}
