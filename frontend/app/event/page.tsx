'use client';

import { useState, useEffect } from 'react';
import { Event, staticEvents } from '@/app/data/events';
import { getEventStatus } from '@/lib/eventStatus';
import QuestBoard from '@/app/components/QuestBoard';
import TimelineContent from '@/app/components/TimelineContent';
import EventModal from '@/app/components/EventModal';
import EventsSkeleton from '@/app/components/EventsSkeleton';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

function SectionHeader({ label, count, tone }: { label: string; count: number; tone: 'accent' | 'dim' }) {
  const color = tone === 'accent' ? 'text-accent' : 'text-accent-dim';
  const border = tone === 'accent' ? 'border-accent/60' : 'border-accent-dim/60';
  return (
    <div className="flex items-center gap-3">
      <h2 className={`font-mono text-sm font-semibold uppercase tracking-widest ${color}`}>{label}</h2>
      <span className={`rounded-full border px-2 py-0.5 font-mono text-[10px] font-semibold ${border} ${color}`}>
        {count}
      </span>
      <div className="h-px flex-1 bg-deepest" />
    </div>
  );
}

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetch(`${API}/events/`)
      .then(res => res.json())
      .then(setEvents)
      .catch(() => setEvents(staticEvents))
      .finally(() => setLoaded(true));
  }, []);

  const active = events.filter(e => getEventStatus(e) !== 'completed');
  const archived = events.filter(e => getEventStatus(e) === 'completed');

  return (
    <div className="flex min-h-[80vh] w-full flex-col gap-2 px-8 py-12">
      <div className="mb-6 flex flex-col gap-2">
        <span className="font-mono text-sm font-medium uppercase tracking-widest text-accent/70">
          &gt; Events
        </span>
        <h1 className="text-4xl font-bold text-ink">VALARX Quest Log</h1>
        <p className="text-ink/60">
          Hover over an event for a preview. Click to see full details.
        </p>
      </div>

      {!loaded && <EventsSkeleton />}

      {loaded && (
        <>
          <section className="mb-10 flex flex-col gap-4">
            <SectionHeader label="Active Quests" count={active.length} tone="accent" />
            <QuestBoard
              events={active}
              activeId={selectedEvent?.id ?? null}
              onSelect={setSelectedEvent}
            />
          </section>

          {archived.length > 0 && (
            <section className="flex flex-col gap-4">
              <SectionHeader label="Quest Archive" count={archived.length} tone="dim" />
              <TimelineContent
                events={archived}
                activeId={selectedEvent?.id ?? null}
                onSelect={setSelectedEvent}
              />
            </section>
          )}
        </>
      )}

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
