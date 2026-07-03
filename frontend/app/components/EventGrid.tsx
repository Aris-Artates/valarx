'use client';

import { Event } from '@/app/data/events';
import { getEventStatus, getEventSortDate } from '@/lib/eventStatus';
import EventCard from './EventCard';

interface EventGridProps {
  events: Event[];
  activeId: string | null;
  onSelect: (event: Event) => void;
}

/** Upcoming and ongoing events, soonest first. */
export default function EventGrid({ events, activeId, onSelect }: EventGridProps) {
  const sorted = [...events].sort((a, b) => getEventSortDate(a) - getEventSortDate(b));

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-ink/20 px-6 py-12 text-center">
        <p className="font-semibold text-ink/60">No upcoming events right now.</p>
        <p className="text-sm text-ink/40">
          New sessions are announced on Discord first &mdash; join us to hear about them early.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          status={getEventStatus(event)}
          variant="active"
          isActive={event.id === activeId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
