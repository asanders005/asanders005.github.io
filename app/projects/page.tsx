// Server Component — no "use client" needed because CircuitBoard handles all
// interactivity. This page just fetches data and hands it to the board.
//
// In Next.js App Router, any file named `page.tsx` inside a folder under
// `app/` automatically becomes a route. This file lives at app/projects/page.tsx,
// so it's accessible at /projects.

import type { Metadata } from "next";
import CircuitBoard from "@/components/circuit/CircuitBoard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects | Portfolio",
};

export default function ProjectsPage() {
  return (
    // flex-1 makes this div fill all remaining vertical space after the navbar.
    // The board SVG then stretches to fill this container.
    <div className="flex-1 flex flex-col min-h-0">
      {/* Thin header bar */}
      <div className="shrink-0 px-6 py-3 border-b border-trace/20">
        <p className="font-mono text-xs text-muted tracking-widest">
          // circuit board &mdash; click a node to inspect
        </p>
      </div>

      {/* Board fills the remaining space */}
      <div className="flex-1 min-h-0">
        <CircuitBoard projects={projects} />
      </div>
    </div>
  );
}
