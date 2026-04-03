'use client';

import { useState } from 'react';
import { events, Event } from '@/app/data/events';
import TimelineContent from '@/app/components/TimelineContent';
import EventModal from '@/app/components/EventModal';

export default function EventPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="flex min-h-[80vh] w-full flex-col gap-2 px-8 py-12">
      {/* Page heading */}
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Events
        </span>
        <h1 className="text-4xl font-bold text-white">VALARX Timeline</h1>
        <p className="text-zinc-400">
          Hover over an event for a preview. Click to see full details.
        </p>
      </div>

      <TimelineContent
        events={events}
        activeId={selectedEvent?.id ?? null}
        onSelect={setSelectedEvent}
      />

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
