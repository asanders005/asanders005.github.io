export type Project = {
  id: string;             // unique slug, e.g. "uart-debugger"
  title: string;
  description: string;    // 2–4 sentence summary
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;       // optional — external link (itch.io, live site, etc.)
  liveLinkText?: string;  // optional — label for the liveUrl button
  videoUrl?: string;      // optional — YouTube/embed URL; opens in-app video modal
  images: string[];       // paths relative to /public, e.g. ["/projects/uart.png"]
  node: {
    x: number;            // 0–100 — percentage of board width
    y: number;            // 0–100 — percentage of board height
  };
};
