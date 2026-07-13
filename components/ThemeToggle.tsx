"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark toggle. The initial theme is applied before paint by an inline
 * script in the root layout; this button just flips the class and remembers
 * the choice in localStorage.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private browsing — the theme just won't persist.
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed top-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-edge bg-surface/80 text-lg backdrop-blur transition-colors hover:border-faint"
    >
      {/* Render both glyphs until mounted so server and client HTML match. */}
      <span aria-hidden="true">{dark === null ? "◐" : dark ? "☀️" : "🌙"}</span>
    </button>
  );
}
