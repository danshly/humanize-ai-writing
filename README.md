# Don't AI Me — Make It Sound You

AI writes drafts. You write the final version.

A single-page website that encourages people to **edit AI-generated messages
before sending them**. Inspired by the reading experience of
[nohello.net](https://nohello.net); original implementation and styling.

> AI is an excellent assistant.
> It should not replace your own voice.

## Stack

- [Next.js 15](https://nextjs.org) (App Router, static export)
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (CSS-first config, no `tailwind.config`)
- Framer Motion micro-animations (respects `prefers-reduced-motion`)
- No backend, no database, no analytics, no cookies

## Development

Requires Node.js ≥ 18.18.

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
```

Try pressing <kbd>H</kbd> on the page — it toggles **Human Mode**, which
reveals handwritten margin notes. The moon/sun button toggles dark mode.

## Deployment

The site is fully static (`output: "export"` in [next.config.ts](next.config.ts)):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```

This writes plain HTML/CSS/JS to `out/`, including `robots.txt`,
`sitemap.xml` and the Open Graph image. Serve `out/` from any static host —
nginx, GitHub Pages, Cloudflare Pages, Netlify, an S3 bucket. No server
runtime is needed.

Example nginx location:

```nginx
location / {
  root /var/www/dont-ai-me/out;
  try_files $uri $uri.html $uri/ =404;
}
```

`NEXT_PUBLIC_SITE_URL` feeds the canonical URL, Open Graph tags, robots.txt
and sitemap.xml. You can also hardcode it in [lib/site.ts](lib/site.ts).

## Customization

| What                          | Where                                                          |
| ----------------------------- | -------------------------------------------------------------- |
| Colors (light + dark)         | CSS variables at the top of [app/globals.css](app/globals.css) |
| Fonts                         | `next/font` setup in [app/layout.tsx](app/layout.tsx)          |
| Site name / URL / description | [lib/site.ts](lib/site.ts)                                     |
| Favicon                       | [app/icon.svg](app/icon.svg)                                   |
| Social preview image          | [app/opengraph-image.tsx](app/opengraph-image.tsx)             |

The palette uses semantic tokens (`background`, `foreground`, `muted`,
`surface`, `edge`, `accent`), so a rebrand is usually just new hex values in
`globals.css`.

## Changing content

Each section of the page is one component:

| Section                                                | File                                                     |
| ------------------------------------------------------ | -------------------------------------------------------- |
| Hero ("Don't AI Me.")                                  | [components/Hero.tsx](components/Hero.tsx)                |
| "AI is a great first draft." / "But don't stop there." | inline in [app/page.tsx](app/page.tsx)                    |
| Chat-bubble example                                    | [components/ChatExample.tsx](components/ChatExample.tsx)  |
| Five-step checklist                                    | [components/Checklist.tsx](components/Checklist.tsx)      |
| Large statement                                        | [components/Statement.tsx](components/Statement.tsx)      |
| Footer                                                 | [components/SiteFooter.tsx](components/SiteFooter.tsx)    |

Human Mode margin notes are `<MarginNote>` elements
([components/MarginNote.tsx](components/MarginNote.tsx)) placed inside any
`relative` container; visibility is pure CSS keyed off a `data-human`
attribute on `<html>`, toggled by
[components/HumanMode.tsx](components/HumanMode.tsx).

## License

[MIT](LICENSE)
