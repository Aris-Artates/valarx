import { EventStatus } from '@/lib/eventStatus';

/** Shared status chip — one look for event status everywhere. */
export default function StatusChip({ status }: { status: EventStatus }) {
  if (status === 'ongoing') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-on-accent">
        <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-accent" />
        Happening now
      </span>
    );
  }
  if (status === 'upcoming') {
    return (
      <span className="rounded-full border border-accent/50 px-2.5 py-0.5 text-xs font-medium text-accent">
        Upcoming
      </span>
    );
  }
  return (
    <span className="rounded-full border border-deepest px-2.5 py-0.5 text-xs font-medium text-ink/40">
      Completed
    </span>
  );
}
