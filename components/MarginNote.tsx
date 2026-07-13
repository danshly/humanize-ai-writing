/**
 * A handwritten margin note, invisible until Human Mode is on (see
 * globals.css for the `html[data-human]` rule). Purely decorative, so it is
 * hidden from assistive tech. Position it with absolute-placement classes.
 */
export function MarginNote({
  children,
  className = "",
  rotate = -3,
}: {
  children: string;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`margin-note absolute text-xl sm:text-2xl ${className}`}
      style={{ "--note-rotate": `${rotate}deg` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
