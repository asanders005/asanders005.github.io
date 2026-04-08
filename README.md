# Portfolio | Aiden Sanders

A Next.js (App Router) + TypeScript professional portfolio site with a PCB/circuit-board visual theme. Includes an animated hero, an interactive projects board (pan/zoom + modal inspector), and static About/Contact pages.

## Pages

- `/` — Hero landing page
- `/projects` — Interactive circuit-board projects explorer
- `/about` — Bio + skills (includes optional `public/photo.jpg` support)
- `/contact` — Contact cards (email + LinkedIn)

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Local Development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build / Export

This project is configured for static export:

- `output: "export"`
- `images.unoptimized: true`

Build the static output:

```bash
npm run build
```

## Customize Content

### Projects

Edit `data/projects.ts` to add/update projects. Each project defines:

- `title`, `description`, `techStack`
- `githubUrl` (+ optional `liveUrl`, `videoUrl`)
- `images` (drop screenshots under `public/projects/`)
- `node.x` / `node.y` (0–100) to position the chip on the circuit board

### About photo

To add a profile photo:

1. Add `public/photo.jpg`
2. Set `HAS_PHOTO = true` in `app/about/page.tsx`

### Resume

Place a PDF at `public/resume.pdf` to enable the “Resume PDF” link on the About page.

## Deployment

Because the site is statically exported, you can host it on any static host (e.g. GitHub Pages, Netlify, Cloudflare Pages).

Note: `next.config.ts` currently sets `basePath: "/public"`. If you deploy under a subpath (common for GitHub Pages), ensure `basePath` matches the repository/site path you’re serving from.

## License

No license specified yet. If you plan to open-source this, consider adding a LICENSE file.
