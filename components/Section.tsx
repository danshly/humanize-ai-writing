import { Reveal } from "@/components/Reveal";

/** A centered prose section capped at a comfortable reading width. */
export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-[700px] px-6 py-20 sm:py-28">
      <Reveal>
        <h2 className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
          {children}
        </div>
      </Reveal>
    </section>
  );
}
