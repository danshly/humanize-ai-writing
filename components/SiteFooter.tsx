export function SiteFooter() {
  return (
    <footer className="border-t border-edge px-6 py-16 text-center">
      <p className="font-serif text-2xl text-balance sm:text-3xl">
        Use AI.
        <br />
        <span className="text-muted">Just don&rsquo;t outsource being yourself.</span>
      </p>

      <div className="mt-12 space-y-2 text-sm text-faint">
        <p>
          Press <kbd className="rounded border border-edge px-1.5 py-0.5">H</kbd>{" "}
          for Human Mode. No cookies, no tracking — just an opinion.
        </p>
        <p>
          Drafted with AI. Edited, like all good things, by the humans at{" "}
          <a
            href="https://danshly.com"
            rel="noopener"
            className="underline decoration-accent/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent"
          >
            Danshly
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
