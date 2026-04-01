// Server Component — static content, no interactivity needed.
// Replace the placeholder text below with your real bio, skills, and links.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Portfolio",
};

const SKILLS = [
  "C", "C++", "Rust", "Python",
  "STM32", "RISC-V", "ARM Cortex-M",
  "JTAG", "SPI", "UART", "I²C",
  "FreeRTOS", "CMake", "GDB",
];

export default function AboutPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
      <div className="max-w-2xl w-full">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">
          // about.md
        </p>

        <h1 className="text-3xl font-mono text-primary font-bold mb-8 tracking-wide">
          About Me
        </h1>

        {/* ─── Replace with your real bio ─────────────────────────── */}
        <div className="space-y-4 text-primary/80 leading-relaxed text-sm">
          <p>
            I&apos;m an embedded systems developer with a passion for low-level
            programming and hardware-software integration. I work primarily in C
            and C++, with a growing interest in Rust for systems programming.
          </p>
          <p>
            My projects span microcontroller firmware, real-time operating
            systems, custom debugging tools, and hardware bring-up work.
          </p>
        </div>

        {/* ─── Skills ─────────────────────────────────────────────── */}
        <div className="mt-10">
          <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
            // skills
          </p>
          <div className="flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm font-mono border border-trace/40 text-muted rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ─── Links ──────────────────────────────────────────────── */}
        <div className="mt-10 flex gap-6">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-glow hover:underline"
          >
            [ GitHub ]
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted hover:text-glow transition-colors"
          >
            [ Resume PDF ]
          </a>
        </div>
      </div>
    </div>
  );
}
