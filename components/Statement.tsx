import { Reveal } from "@/components/Reveal";

export function Statement() {
  return (
    <section className="relative px-6 py-28 text-center sm:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50rem_30rem_at_50%_60%,color-mix(in_oklab,var(--accent)_8%,transparent),transparent_70%)]"
      />
      <Reveal>
        <p className="font-serif text-5xl tracking-tight text-balance sm:text-7xl">
          AI should save time.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-6 font-serif text-3xl tracking-tight text-balance text-muted italic sm:text-5xl">
          Not erase personality.
        </p>
      </Reveal>
    </section>
  );
}
