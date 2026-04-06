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
      "A Raspberry Pi-based system that uses computer vision to track foot traffic -- combining embedded Linux, OpenCV image processing, and an image-recognition model from Ultralytics. I built this project to learn more about computer vision and machine learning on edge devices, and it was a great opportunity to apply my C++ skills in a practical context.",
    techStack: ["C++", "RPi", "OpenCV", "Ultralytics"],
    githubUrl: "https://github.com/asanders005/Marble-Metrics",
    liveUrl: "https://demo-url.com",
    images: [],
    node: { x: 25, y: 35 },
  },
  // {
  //   id: "experimental",
  //   title: "Experimental Hardware Project",
  //   description: "A project I'm currently working on. More details coming soon!",
  //   techStack: ["C/C++", "ESP32", "FreeRTOS"],
  //   githubUrl: "https://github.com/asanders005/project-two",
  //   images: [],
  //   node: { x: 65, y: 25 },
  // },
  {
    id: "graphics-engine",
    title: "C++ Graphics Engine",
    description: "A graphics engine built from scratch in C++. It features a software rasterizer, raytracing, basic lighting, and support for textured models. This project was a deep dive into the fundamentals of 3D rendering and real-time graphics programming, and served as a hands-on exercise in memory management, software architecture, and performance optimization that applies beyond just graphics work.",
    techStack: ["C++", "SDL2"],
    githubUrl: "https://github.com/asanders005/GAT350",
    images: ["/projects/GraphicsRenderer/RealTime.png", "/projects/GraphicsRenderer/RayTrace.png"],
    node: { x: 45, y: 65 },
  },
  {
    id: "corruption",
    title: "Corruption",
    description: "A retro-style roguelike game developed in C# using the Unity engine. The game features procedurally generated dungeons, fast-paced combat, and pixel art graphics. I made this with a couple of friends for a game jam. I was responsible for implementing core gameplay mechanics, including the procedural generation system, player progression, and environmental interaction systems.",
    techStack: ["C#", "Unity"],
    githubUrl: "https://github.com/asanders005/project-four",
    images: [],
    node: { x: 75, y: 60 },
  },
];
