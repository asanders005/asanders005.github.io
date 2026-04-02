"use client";

// usePathname is a Next.js hook — it gives us the current URL path so we can
// highlight whichever nav link is active. Hooks require "use client".

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "~/home" },
  { href: "/projects", label: "~/projects" },
  { href: "/about", label: "~/about" },
  { href: "/contact", label: "~/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 border-b border-trace/30 bg-surface/80 backdrop-blur-sm">
      <span className="font-mono text-glow text-sm tracking-widest uppercase select-none">
        &lt;portfolio /&gt;
      </span>

      <ul className="flex gap-6 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            {/* Next.js <Link> is a client-side navigation component — no full page reload */}
            <Link
              href={href}
              className={`font-mono text-sm transition-colors ${
                pathname === href
                  ? "text-glow"
                  : "text-muted hover:text-glow"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
