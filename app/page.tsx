import { ChatExample } from "@/components/ChatExample";
import { Checklist } from "@/components/Checklist";
import { Hero } from "@/components/Hero";
import { HumanModeToggle } from "@/components/HumanMode";
import { MarginNote } from "@/components/MarginNote";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Section } from "@/components/Section";
import { SiteFooter } from "@/components/SiteFooter";
import { Statement } from "@/components/Statement";
import { ThemeToggle } from "@/components/ThemeToggle";

const goodUses: ReadonlyArray<[string, string]> = [
  ["Brainstorming", "ten options in ten seconds when the page is blank."],
  ["Rewriting", "untangling the sentence you’ve reread five times."],
  ["Summarizing", "turning a forty-message thread into three lines."],
  ["Fixing grammar", "catching what your tired eyes no longer can."],
  ["Organizing ideas", "finding the structure hiding in your notes."],
];

const sameness: ReadonlyArray<[string, string]> = [
  ["Corporate.", "Polished to the point of plastic."],
  ["Generic.", "Could be from anyone, to anyone."],
  ["Emotionless.", "Every feeling filed smooth."],
  ["Predictable.", "You know the next sentence before you read it."],
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ThemeToggle />
      <HumanModeToggle />

      <main>
        <Hero />

        <Section id="first-draft" title="AI is a great first draft.">
          <p>
            Use it. Honestly. AI is brilliant at the unglamorous parts of
            writing:
          </p>
          <ul className="space-y-3">
            {goodUses.map(([what, why]) => (
              <li key={what} className="flex gap-3">
                <span aria-hidden="true" className="text-accent">
                  •
                </span>
                <span>
                  <strong className="font-medium text-foreground">{what}</strong>{" "}
                  — {why}
                </span>
              </li>
            ))}
          </ul>
          <p>
            These are excellent uses. Nobody is grading you on typing every
            word yourself.
          </p>
        </Section>

        <Section id="dont-stop" title="But don’t stop there.">
          <MarginNote className="-top-2 right-0 sm:top-24 sm:-right-20" rotate={4}>
            This needs my voice.
          </MarginNote>
          <p>
            The catch: the first answer AI gives you is the first answer it
            gives <em>everyone</em>. Sent unedited, every message drifts toward
            the same voice —
          </p>
          <dl className="grid gap-4 sm:grid-cols-2">
            {sameness.map(([word, meaning]) => (
              <div
                key={word}
                className="rounded-2xl border border-edge bg-surface p-5"
              >
                <dt className="font-serif text-2xl text-foreground">{word}</dt>
                <dd className="mt-1 text-base">{meaning}</dd>
              </div>
            ))}
          </dl>
          <p>
            When nobody edits, everybody sounds the same. And the person
            reading you can tell.
          </p>
        </Section>

        <ChatExample />
        <Checklist />
        <Statement />
      </main>

      <SiteFooter />
    </>
  );
}
