function CardSkeleton({ withRail = true }: { withRail?: boolean }) {
  return (
    <div className="rounded-xl border border-deepest bg-secondary/40 p-5">
      <div className="flex items-stretch gap-5">
        {withRail && (
          <div className="flex w-16 shrink-0 flex-col items-center justify-center gap-2 border-r border-deepest pr-5">
            <div className="skeleton h-5 w-10 rounded" />
            <div className="skeleton h-3 w-8 rounded" />
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <div className="skeleton h-5 w-24 rounded-full" />
            <div className="skeleton h-5 w-40 max-w-full rounded-full" />
          </div>
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>
    </div>
  );
}

function SectionHeaderSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="skeleton h-4 w-32 rounded" />
      <div className="h-px flex-1 bg-deepest" />
    </div>
  );
}

/** Loading state for the events page — mirrors the real layout so nothing jumps. */
export default function EventsSkeleton() {
  return (
    <div role="status" aria-busy="true" className="flex flex-col gap-6">
      <span className="sr-only">Loading events&hellip;</span>

      <div aria-hidden="true" className="flex flex-col gap-6">
        {/* Featured spotlight */}
        <div className="rounded-2xl border border-deepest bg-secondary/40 p-8 sm:p-10">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="skeleton h-5 w-28 rounded-full" />
              <div className="skeleton h-5 w-40 max-w-full rounded-full" />
            </div>
            <div className="skeleton h-8 w-3/4 rounded" />
            <div className="skeleton h-4 w-1/2 rounded" />
            <div className="mt-2 flex gap-3">
              <div className="skeleton h-10 w-28 rounded-full" />
              <div className="skeleton h-10 w-28 rounded-full" />
            </div>
          </div>
        </div>

        <SectionHeaderSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
