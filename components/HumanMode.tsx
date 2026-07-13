"use client";

import { useEffect, useState } from "react";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA"
  );
}

/**
 * Human Mode: pressing "H" (or tapping the pill) toggles `data-human` on
 * <html>, which reveals the handwritten margin notes via CSS. Decorative only.
 */
export function HumanModeToggle() {
  const [active, setActive] = useState(false);

  function toggle() {
    const next = !document.documentElement.hasAttribute("data-human");
    document.documentElement.toggleAttribute("data-human", next);
    setActive(next);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      if (event.key === "h" || event.key === "H") toggle();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-edge bg-surface/80 px-4 py-2 text-sm text-muted backdrop-blur transition-colors hover:border-faint hover:text-foreground"
    >
      <span
        aria-hidden="true"
        className={`font-hand text-lg leading-none ${active ? "text-accent" : ""}`}
      >
        ✎
      </span>
      Human Mode
      <kbd className="rounded border border-edge px-1.5 py-0.5 font-sans text-xs text-faint">
        H
      </kbd>
    </button>
  );
}
