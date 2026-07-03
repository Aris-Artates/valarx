'use client';

import { Event } from '@/app/data/events';
import { getEventStatus, getEventSortDate } from '@/lib/eventStatus';
import EventCard from './EventCard';

interface QuestBoardProps {
  events: Event[];
  activeId: string | null;
  onSelect: (event: Event) => void;
}

/** Upcoming and ongoing events, soonest first. */
export default function QuestBoard({ events, activeId, onSelect }: QuestBoardProps) {
  const sorted = [...events].sort((a, b) => getEventSortDate(a) - getEventSortDate(b));

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-ink/20 px-6 py-12 text-center">
        <p className="font-semibold text-ink/60">No active quests right now.</p>
        <p className="text-sm text-ink/40">
          New events are being forged &mdash; check back soon or join the Discord for announcements.
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
