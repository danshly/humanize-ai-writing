import { MarginNote } from "@/components/MarginNote";
import { Reveal } from "@/components/Reveal";

function Bubble({
  tone,
  label,
  children,
}: {
  tone: "draft" | "human";
  label: string;
  children: React.ReactNode;
}) {
  const badge =
    tone === "draft"
      ? "bg-red-500/10 text-red-700 dark:text-red-400"
      : "bg-green-500/10 text-green-700 dark:text-green-400";

  return (
    <figure className="relative">
      <figcaption
        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${badge}`}
      >
        {label}
      </figcaption>
      <div className="mt-3 space-y-4 rounded-3xl rounded-tl-md border border-edge bg-surface p-6 text-base leading-relaxed text-muted shadow-sm sm:p-8">
        {children}
      </div>
    </figure>
  );
}

export function ChatExample() {
  return (
    <section
      id="example"
      className="relative mx-auto w-full max-w-[700px] px-6 py-20 sm:py-28"
    >
      <Reveal>
        <h2 className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">
          Same announcement. Two voices.
        </h2>
      </Reveal>

      <div className="mt-12 space-y-12">
        <Reveal>
          <Bubble tone="draft" label="❌ First draft">
            <MarginNote className="-top-2 -left-2 sm:top-6 sm:-left-24" rotate={-6}>
              Too formal.
            </MarginNote>
            <MarginNote
              className="top-1/3 -right-2 sm:-right-24"
              rotate={4}
            >
              Feels like ChatGPT.
            </MarginNote>
            <MarginNote
              className="-bottom-4 left-4 sm:bottom-10 sm:-left-36"
              rotate={-4}
            >
              I&rsquo;d never say this.
            </MarginNote>

            <p>Dear team,</p>
            <p>
              I hope this message finds you well. I am reaching out to inform
              you that, effective Monday, our weekly sync will be moving to
              10:00&nbsp;AM. This adjustment is designed to streamline
              communication, minimize scheduling conflicts, and foster
              alignment across the organization.
            </p>
            <p>
              Please do not hesitate to reach out should you have any questions
              or concerns. Thank you for your continued dedication and support.
            </p>
            <p>
              Best regards,
              <br />
              Sarah
            </p>
          </Bubble>
        </Reveal>

        <Reveal>
          <Bubble tone="human" label="✅ Sounds human">
            <MarginNote className="-bottom-4 right-2 sm:bottom-6 sm:-right-24" rotate={3}>
              Now it&rsquo;s you.
            </MarginNote>

            <p>
              Hey all — quick change: the weekly sync moves to 10am starting
              Monday, so it stops colliding with lunch. Anyone who&rsquo;s seen
              me before I&rsquo;ve eaten knows this is for your own safety.
            </p>
            <p>Same link, same room. Shout if 10 clashes with something.</p>
            <p>— Sarah</p>
          </Bubble>
        </Reveal>
      </div>

      <Reveal>
        <p className="mt-12 text-lg leading-relaxed text-muted">
          Both took the same AI draft. The second one got ninety seconds of
          editing — and it&rsquo;s the only one people will actually read.
        </p>
      </Reveal>
    </section>
  );
}
