/**
 * Site-wide constants. Change the URL here (or set NEXT_PUBLIC_SITE_URL at
 * build time) when deploying to your own domain — it feeds the canonical
 * URL, Open Graph tags, robots.txt and sitemap.xml.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://makeitsoundyou.com",
  name: "Don't AI Me.",
  title: "Don't AI Me — Make it sound like you",
  description:
    "AI is an excellent assistant. It shouldn't replace your voice. A short, friendly guide to editing AI-generated messages before you press Send.",
} as const;
