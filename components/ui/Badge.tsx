// Server Component — no interactivity needed, so no "use client".
// Next.js renders this on the server and sends only HTML to the browser.

type BadgeProps = {
  label: string;
};

export default function Badge({ label }: BadgeProps) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono rounded border border-glow/30 bg-badge text-badge-fg">
      {label}
    </span>
  );
}
