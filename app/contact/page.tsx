/* eslint-disable react/jsx-no-comment-textnodes */
// Server Component — purely static, no interactivity needed.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Portfolio",
};

// ─── Individual contact card ──────────────────────────────────────────────────
// Styled like an IC chip footprint: dashed silkscreen outline, part-number
// label in the top-left corner, and the contact details centred inside.

type ContactCardProps = {
  partNumber: string;   // e.g. "J3 · EMAIL"
  label: string;        // human-readable heading
  value: string;        // the address / handle to display
  href: string;         // the link target
  icon: React.ReactNode;
};

function ContactCard({ partNumber, label, value, href, icon }: ContactCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center gap-5 p-8 w-72
                 border border-trace/40 rounded bg-chip/40
                 hover:border-glow hover:bg-chip/70
                 transition-colors duration-200"
    >
      {/* Silkscreen part-number label in top-left corner */}
      <span className="absolute top-2.5 left-3 font-mono text-[9px] text-muted tracking-widest">
        {partNumber}
      </span>

      {/* Corner bracket accents — appear on hover */}
      <span className="absolute top-0 left-0   w-3 h-3 border-t-2 border-l-2 border-glow opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-0 right-0  w-3 h-3 border-t-2 border-r-2 border-glow opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 left-0  w-3 h-3 border-b-2 border-l-2 border-glow opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-glow opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Icon */}
      <div className="text-trace group-hover:text-glow transition-colors mt-3">
        {icon}
      </div>

      {/* Label + value */}
      <div className="text-center">
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-1">
          {label}
        </p>
        <p className="font-mono text-sm text-primary group-hover:text-glow transition-colors break-all">
          {value}
        </p>
      </div>

      {/* "Connect" prompt that slides in on hover */}
      <span className="font-mono text-[10px] text-glow tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        [ connect → ]
      </span>
    </a>
  );
}

// ─── SVG trace that bridges the two cards ────────────────────────────────────
function BridgeTrace() {
  return (
    <svg
      viewBox="0 0 120 40"
      className="w-24 h-8 shrink-0"
      aria-hidden="true"
    >
      {/* Horizontal trace with a via dot in the centre */}
      <line x1="0"  y1="20" x2="50"  y2="20" stroke="var(--color-trace)" strokeWidth="1.5" />
      <circle cx="60" cy="20" r="3.5" fill="var(--color-trace)" opacity="0.7" />
      <line x1="70" y1="20" x2="120" y2="20" stroke="var(--color-trace)" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Email icon (SVG, inline) ─────────────────────────────────────────────────
function EmailIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  );
}

// ─── LinkedIn icon (SVG, inline) ──────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="3" />
      <line x1="8"  y1="11" x2="8"  y2="17" />
      <line x1="8"  y1="8"  x2="8"  y2="8.5" strokeWidth="2" />
      <path d="M12 17 v-4 a2 2 0 0 1 4 0 v4" />
      <line x1="12" y1="11" x2="12" y2="17" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
      <div className="max-w-3xl w-full flex flex-col items-center">

        {/* ── Header ────────────────────────────────────────────────── */}
        <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2 self-start">
          // contact.md
        </p>
        <h1 className="text-3xl font-mono text-primary font-bold mb-3 tracking-wide self-start">
          Get In Touch
        </h1>
        <p className="font-mono text-sm text-muted mb-14 self-start">
          Open to embedded, firmware, and software engineering roles.
        </p>

        {/* ── Cards + bridge trace ──────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center gap-0">
          <ContactCard
            partNumber="J3 · EMAIL"
            label="Email"
            value="aidensandersbiz@gmail.com"
            href="mailto:aidensandersbiz@gmail.com"
            icon={<EmailIcon />}
          />

          <BridgeTrace />

          <ContactCard
            partNumber="J4 · LINKEDIN"
            label="LinkedIn"
            value="Aiden Sanders"
            href="https://linkedin.com/in/aiden-sanders-09912b294/"
            icon={<LinkedInIcon />}
          />
        </div>

        {/* ── Silkscreen footer note ────────────────────────────────── */}
        <p className="mt-16 font-mono text-[10px] text-trace/60 tracking-widest">
          REV 1.0 · CONTACT-BLOCK · © 2026
        </p>
      </div>
    </div>
  );
}
