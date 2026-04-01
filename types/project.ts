export type Project = {
  id: string;          // unique slug, e.g. "uart-debugger"
  title: string;
  description: string; // 2–4 sentence summary
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;    // optional — only include if a live demo exists
  images: string[];    // paths relative to /public, e.g. ["/projects/uart.png"]
  node: {
    x: number;         // 0–100 — percentage of board width
    y: number;         // 0–100 — percentage of board height
  };
};
