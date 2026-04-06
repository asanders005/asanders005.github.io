/* eslint-disable react/jsx-no-comment-textnodes */
// Server Component — no interactivity needed, so no "use client".
// To add your photo: set HAS_PHOTO = true and add your image to /public/photo.jpg.

import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Portfolio",
};

// ─── Flip this to true once you have your photo ──────────────────────────────
const HAS_PHOTO = false;
const PHOTO_SRC = "/photo.jpg"; // drop your image here in /public

// ─── Skills grouped by domain ────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    label: "Programming Languages",
    id: "languages",
    skills: ["C", "C++", "C#", "Java", "JavaScript", "Python", "SQL"],
  },
  {
    label: "Embedded & Hardware",
    id: "embedded",
    skills: ["Firmware Development", "Bare-metal Programming", "Microcontrollers", 
      "Multithreading", "Embedded Systems Design", "PlatformIO"],
  },
  {
    label: "Tools & Practices",
    id: "tools",
    skills: ["Git", "CMake", "OOP", "Unit Testing", "Debugging", "Design Patterns", 
      "AI-Assisted Development", "VS Code", "Visual Studio", "Linux", "Windows"],
  },
  {
    label: "Web & Backend",
    id: "web",
    skills: ["ASP.NET Core", "REST APIs", "Microsoft Azure", "HTML/CSS", "TypeScript", "Next.js", "React"],
  },
  {
    label: "Game & Graphics",
    id: "graphics",
    skills: ["Unity", "Unreal Engine", "OpenGL", "SDL2"],
  },
];

// ─── PCB corner-bracket photo frame ──────────────────────────────────────────
// Corner brackets are absolute-positioned divs whose two visible border sides
// form an L-shape. Pure CSS — no client JS needed.
function PhotoFrame() {
  const BRACKET = "absolute w-5 h-5 border-glow";
  return (
    <div className={`relative ${HAS_PHOTO ? "w-full aspect-[3/4] max-w-[220px]" : "w-[200px] h-[267px]"}`}>
      {/* Corner brackets */}
      <span className={`${BRACKET} top-0 left-0  border-t-2 border-l-2`} />
      <span className={`${BRACKET} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${BRACKET} bottom-0 left-0  border-b-2 border-l-2`} />
      <span className={`${BRACKET} bottom-0 right-0 border-b-2 border-r-2`} />

      {/* Inner frame with PCB grid */}
      <div
        className="absolute inset-2 bg-chip border border-trace/30 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14,107,122,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,107,122,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        {HAS_PHOTO ? (
          <Image
            src={PHOTO_SRC}
            alt="Profile photo"
            fill
            className="object-cover"
          />
        ) : (
          // Placeholder shown until you add a photo
          <div className="flex flex-col items-center justify-center h-full gap-3 select-none">
            {/* Person silhouette in SVG  */}
            <svg width="56" height="72" viewBox="0 0 56 72" fill="none" aria-hidden="true">
              <circle cx="28" cy="20" r="14" fill="none" stroke="var(--color-trace)" strokeWidth="1.5" />
              <path
                d="M4 68 C4 48 52 48 52 68"
                fill="none"
                stroke="var(--color-trace)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-mono text-[10px] text-muted tracking-widest">// photo.jpg</span>
            <span className="font-mono text-[9px] text-trace border border-trace/40 px-2 py-0.5 rounded">
              PENDING
            </span>
          </div>
        )}
      </div>

      {/* Silkscreen label below frame */}
      <p className="absolute -bottom-5 left-0 right-0 text-center font-mono text-[8px] text-muted tracking-widest">
        U1 · OPERATOR
      </p>
    </div>
  );
}

// ─── Styled section divider that looks like a PCB trace ──────────────────────
function TraceDivider() {
  return (
    <div className="flex items-center gap-3 my-10" aria-hidden="true">
      <div className="h-px flex-1 bg-trace/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-trace/60" />
      <div className="h-px w-8 bg-trace/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-glow/50" />
      <div className="h-px w-4 bg-trace/30" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-12">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ────────────────────────────────────────────────── */}
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">
          // about.md
        </p>
        <h1 className="text-3xl font-mono text-primary font-bold mb-10 tracking-wide">
          About Me
        </h1>

        {/* ── Photo + bio (two-column on md+) ───────────────────────── */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className={`shrink-0 pb-6 md:pb-0 ${HAS_PHOTO ? "w-full max-w-[220px]" : "w-[200px]"}`}>
            <PhotoFrame />
          </div>

          {/* Bio styled as a terminal session */}
          <div className="flex-1 min-w-0">
            {/* Terminal chrome bar */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-chip border border-trace/40 rounded-t border-b-0">
              <span className="w-2.5 h-2.5 rounded-full bg-trace/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-trace/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-trace/50" />
              <span className="ml-2 font-mono text-[10px] text-muted tracking-widest">
                about@portfolio:~
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-chip/60 border border-trace/40 rounded-b p-5 space-y-4 font-mono text-sm">
              <p>
                <span className="text-glow select-none">$ </span>
                <span className="text-muted">cat bio.txt</span>
              </p>

              <p className="text-primary/85 leading-relaxed pl-3 border-l border-trace/30">
                I&apos;m a software engineering student specializing in embedded systems,
                graduating later this year. I was drawn to CS by a fascination with how software 
                interacts with and shapes the physical world, and that curiosity has pushed 
                me to build across the full stack — from bare-metal firmware to web APIs.
              </p>
              <p className="text-primary/85 leading-relaxed pl-3 border-l border-trace/30">
                I have professional experience building REST APIs with ASP.NET
                Core, and my degree&apos;s game development track deepened
                my understanding of real-time systems and graphics programming.
                I&apos;m currently gaining industry experience through internships while
                looking for full-time opportunities where I can build things that matter, 
                whether that&apos;s at the firmware layer or further up the stack.
              </p>

              {/* Blinking cursor — animate-pulse is a built-in Tailwind animation */}
              <p>
                <span className="text-glow select-none">$ </span>
                <span className="inline-block w-2 h-4 bg-glow align-middle animate-pulse" />
              </p>
            </div>
          </div>
        </div>

        <TraceDivider />

        {/* ── Skills ───────────────────────────────────────────────── */}
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-6">
          // skills
        </p>

        {/* First group centred above the rest */}
        <div className="flex justify-center mb-6">
          <div className="border border-trace/25 rounded p-4 bg-chip/30 w-full sm:max-w-md">
            <p className="font-mono text-[10px] text-glow tracking-widest uppercase mb-3 flex items-center gap-2">
              <span className="inline-block w-3 h-px bg-glow/60" />
              {SKILL_GROUPS[0].label}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SKILL_GROUPS[0].skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-xs font-mono border border-trace/35 text-muted rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Remaining groups in a 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SKILL_GROUPS.slice(1).map(({ label, id, skills }) => (
            <div key={id} className="border border-trace/25 rounded p-4 bg-chip/30">
              <p className="font-mono text-[10px] text-glow tracking-widest uppercase mb-3 flex items-center gap-2">
                <span className="inline-block w-3 h-px bg-glow/60" />
                {label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs font-mono border border-trace/35 text-muted rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <TraceDivider />

        {/* ── Links ────────────────────────────────────────────────── */}
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
          // links
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="https://github.com/asanders005"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 font-mono text-sm border border-muted text-muted hover:border-glow hover:bg-trace/20 hover:text-glow rounded transition-colors"
          >
            [ GitHub ]
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 font-mono text-sm border border-muted text-muted hover:border-glow hover:bg-trace/20 hover:text-glow rounded transition-colors"
          >
            [ Resume PDF ]
          </a>
        </div>

        {/* bottom breathing room */}
        <div className="h-12" />
      </div>
    </div>
  );
}
