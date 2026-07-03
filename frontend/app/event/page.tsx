'use client';

import { useState, useEffect, useMemo } from 'react';
import { Event } from '@/app/data/events';
import { getEventStatus, pickFeaturedEvent } from '@/lib/eventStatus';
import { getEvents, getCachedEvents } from '@/lib/eventsCache';
import FeaturedEvent from '@/app/components/FeaturedEvent';
import GameDevCall from '@/app/components/GameDevCall';
import EventGrid from '@/app/components/EventGrid';
import EventTimeline from '@/app/components/EventTimeline';
import EventModal from '@/app/components/EventModal';
import EventsSkeleton from '@/app/components/EventsSkeleton';

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-ink/50">{label}</h2>
      <span className="rounded-full border border-deepest px-2 py-0.5 text-[11px] font-semibold text-ink/40">
        {count}
      </span>
      <div className="h-px flex-1 bg-deepest" />
    </div>
  );
}

export default function EventPage() {
  // Starts from the session cache — the skeleton only appears on the first
  // visit of the session, not on every navigation back to this page.
  const [events, setEvents] = useState<Event[] | null>(getCachedEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    let alive = true;
    if (events === null) {
      getEvents().then((data) => {
        if (alive) setEvents(data);
      });
    }
    return () => {
      alive = false;
    };
  }, [events]);

  const loaded = events !== null;
  const list = events ?? [];
  const featured = useMemo(() => pickFeaturedEvent(list), [list]);
  const rest = list.filter(e => e.id !== featured?.event.id);
  const upcoming = rest.filter(e => getEventStatus(e) !== 'completed');
  const past = rest.filter(e => getEventStatus(e) === 'completed');

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-ink">Events</h1>
        <p className="max-w-2xl text-ink/60">
          Workshops, seminars, and community sessions &mdash; see what&apos;s coming
          up and what we&apos;ve run before.
        </p>
      </div>

      {!loaded && <EventsSkeleton />}

      {loaded && !featured && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-ink/20 px-6 py-16 text-center">
          <p className="font-semibold text-ink/60">No events yet.</p>
          <p className="text-sm text-ink/40">
            New sessions are announced on Discord first &mdash; join us to hear about them early.
          </p>
        </div>
      )}

      {loaded && featured && (
        <FeaturedEvent
          event={featured.event}
          status={featured.status}
          onDetails={setSelectedEvent}
        />
      )}

      <GameDevCall />

      {loaded && upcoming.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeader label="More upcoming" count={upcoming.length} />
          <EventGrid
            events={upcoming}
            activeId={selectedEvent?.id ?? null}
            onSelect={setSelectedEvent}
          />
        </section>
      )}

      {loaded && past.length > 0 && (
        <section className="flex flex-col gap-4">
          <SectionHeader label="Past events" count={past.length} />
          <EventTimeline
            events={past}
            activeId={selectedEvent?.id ?? null}
            onSelect={setSelectedEvent}
          />
        </section>
      )}

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
