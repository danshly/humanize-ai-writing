import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
      {/* Soft radial glow behind the title. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-10%,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_70%)]"
      />

      <Reveal>
        <h1 className="font-serif text-6xl font-medium tracking-tight text-balance sm:text-8xl">
          Don&rsquo;t AI Me.
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-8 max-w-[48ch] text-xl leading-relaxed text-muted sm:text-2xl">
          If you&rsquo;re sending me something written by AI&hellip;
          <br />
          <em className="font-serif text-foreground">make it sound like you.</em>
        </p>
      </Reveal>

      <a
        href="#first-draft"
        aria-label="Scroll to read more"
        className="scroll-arrow absolute bottom-10 text-2xl text-faint transition-colors hover:text-accent"
      >
        ↓
      </a>
    </header>
  );
}
