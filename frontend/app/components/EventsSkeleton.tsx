function CardSkeleton({ withRail = true }: { withRail?: boolean }) {
  return (
    <div className="animate-pulse rounded-xl border border-deepest bg-secondary/40 p-5">
      <div className="flex items-stretch gap-5">
        {withRail && (
          <div className="flex w-16 shrink-0 flex-col items-center justify-center gap-2 border-r border-deepest pr-5">
            <div className="h-5 w-10 rounded bg-ink/10" />
            <div className="h-3 w-8 rounded bg-ink/10" />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <div className="h-5 w-24 rounded-full bg-accent/10" />
            <div className="h-5 w-40 max-w-full rounded-full bg-ink/10" />
          </div>
          <div className="h-4 w-2/3 rounded bg-ink/15" />
          <div className="h-3 w-1/2 rounded bg-ink/10" />
        </div>
      </div>
    </div>
  );
}

function SectionHeaderSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-4 w-32 animate-pulse rounded bg-accent/10" />
      <div className="h-px flex-1 bg-deepest" />
    </div>
  );
}

/** Loading state for the quest log — mirrors the real layout so nothing jumps. */
export default function EventsSkeleton() {
  return (
    <div role="status" aria-busy="true" className="flex flex-col gap-4">
      <span className="sr-only">Loading events&hellip;</span>

      <p aria-hidden="true" className="font-mono text-xs text-accent/60">
        &gt; syncing quest log<span className="animate-pulse">&#9612;</span>
      </p>

      <div aria-hidden="true" className="flex flex-col gap-4">
        <SectionHeaderSkeleton />
        <CardSkeleton />
        <CardSkeleton />

        <div className="mt-6">
          <SectionHeaderSkeleton />
        </div>
        <CardSkeleton withRail={false} />
      </div>
    </div>
  );
}
