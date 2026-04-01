import { Project } from "@/types/project";

// ─── Edit this file to manage your projects ──────────────────────────────────
//
// • node.x / node.y position the IC chip on the circuit board (0–100 %).
// • Drop screenshot images into /public/projects/ and reference them here.
// • liveUrl is optional — omit it if there is no public demo.
//
// ─────────────────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "marble-metrics",
    title: "Marble Metrics",
    description:
      "Marble Metrics is a Raspberry Pi-based system that uses computer vision to track foot traffic at store entrances. It helps small businesses understand customer patterns without expensive hardware or manual counting.",
    techStack: ["C++", "RPi", "OpenCV"],
    githubUrl: "https://github.com/asanders005/Marble-Metrics",
    liveUrl: "https://demo-url.com",
    images: [],
    node: { x: 25, y: 35 },
  },
  {
    id: "experimental",
    title: "Experimental Hardware Project",
    description: "A project I'm currently working on. More details coming soon!",
    techStack: ["C/C++", "RPi"],
    githubUrl: "https://github.com/asanders005/project-two",
    images: [],
    node: { x: 65, y: 25 },
  },
  {
    id: "graphics-engine",
    title: "C++ Graphics Engine",
    description: "A graphics engine built from scratch in C++. It features a software rasterizer, raytracing, basic lighting, and support for textured models. This project was a deep dive into the fundamentals of 3D rendering and real-time graphics programming.",
    techStack: ["C++", "SDL2"],
    githubUrl: "https://github.com/asanders005/GAT350",
    images: [],
    node: { x: 45, y: 65 },
  },
  {
    id: "corruption",
    title: "Corruption",
    description: "A retro-style roguelike game developed in C# using the Unity engine. The game features procedurally generated dungeons, fast-paced combat, and pixel art graphics. I made this for a game jam, and it was a great opportunity to test my skills in game design, C# programming, and Unity development.",
    techStack: ["C#", "Unity"],
    githubUrl: "https://github.com/asanders005/project-four",
    images: [],
    node: { x: 75, y: 60 },
  },
];
