// A fixed full-screen overlay of repeating horizontal lines to simulate a CRT scanline effect.
// "use client" is needed here only because it's imported by a client component tree;
// it has no hooks of its own — just a styled div.

export default function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
      }}
      aria-hidden="true"
    />
  );
}
