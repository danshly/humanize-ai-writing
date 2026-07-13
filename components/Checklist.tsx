import { MarginNote } from "@/components/MarginNote";
import { Reveal } from "@/components/Reveal";

const steps: ReadonlyArray<{ title: string; detail: string }> = [
  {
    title: "Delete unnecessary words.",
    detail: "If the sentence survives without it, it was never needed.",
  },
  {
    title: "Rewrite the opening sentence.",
    detail:
      "“I hope this message finds you well” has never found anyone well.",
  },
  {
    title: "Add something only you know.",
    detail: "A detail, a name, an inside joke. Proof that a person was here.",
  },
  {
    title: "Replace phrases you’d never normally say.",
    detail:
      "If you wouldn’t say “leverage synergies” out loud, don’t press Send on it.",
  },
  {
    title: "Read it out loud.",
    detail: "If it doesn’t sound like you, it isn’t you. Yet.",
  },
];

export function Checklist() {
  return (
    <section
      id="checklist"
      className="relative mx-auto w-full max-w-[700px] px-6 py-20 sm:py-28"
    >
      <Reveal>
        <h2 className="font-serif text-4xl tracking-tight text-balance sm:text-5xl">
          Five things to do before pressing Send
        </h2>
      </Reveal>

      <ol className="mt-12 space-y-8">
        {steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.05}>
            <li className="relative flex gap-5">
              {index === steps.length - 1 && (
                <MarginNote className="-top-6 right-0 sm:top-2 sm:-right-24" rotate={3}>
                  Works every time.
                </MarginNote>
              )}
              <span
                aria-hidden="true"
                className="font-serif text-3xl text-accent tabular-nums sm:text-4xl"
              >
                {index + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-xl font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="mt-1 text-lg leading-relaxed text-muted">
                  {step.detail}
                </p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
