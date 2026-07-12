'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { Event } from '@/app/data/events';
import { getEventStatus, getEventSortDate } from '@/lib/eventStatus';
import { getEvents, getCachedEvents } from '@/lib/eventsCache';
import GameDevCall from '@/app/components/GameDevCall';
import EventCard from '@/app/components/EventCard';
import EventGrid from '@/app/components/EventGrid';
import EventTimeline from '@/app/components/EventTimeline';
import EventModal from '@/app/components/EventModal';
import EventsSkeleton from '@/app/components/EventsSkeleton';

type TabId = 'ongoing' | 'upcoming' | 'past' | 'timeline';

const TABS: { id: TabId; label: string }[] = [
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past events' },
  { id: 'timeline', label: 'Timeline' },
];

// Remembered across client-side navigations (module scope, like the events
// cache) so coming back mid-session lands on the tab you left. A full page
// refresh resets it — a fresh visit always starts on Ongoing.
let savedTab: TabId = 'ongoing';

export default function EventPage() {
  // Starts from the session cache — the skeleton only appears on the first
  // visit of the session, not on every navigation back to this page.
  const [events, setEvents] = useState<Event[] | null>(getCachedEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [tab, setTab] = useState<TabId>(savedTab);
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

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

  const selectTab = (id: TabId) => {
    savedTab = id;
    setTab(id);
  };

  // Roving tabindex: arrow keys move and activate tabs.
  const onTablistKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const idx = TABS.findIndex((t) => t.id === tab);
    const step = e.key === 'ArrowRight' ? 1 : TABS.length - 1;
    const next = TABS[(idx + step) % TABS.length].id;
    selectTab(next);
    tabRefs.current[next]?.focus();
  };

  const loaded = events !== null;
  const list = events ?? [];

  const { ongoing, upcoming, past } = useMemo(() => {
    const withStatus = list.map((event) => ({ event, status: getEventStatus(event) }));
    const soonestFirst = (a: Event, b: Event) => getEventSortDate(a) - getEventSortDate(b);
    return {
      ongoing: withStatus.filter((x) => x.status === 'ongoing').map((x) => x.event).sort(soonestFirst),
      upcoming: withStatus.filter((x) => x.status === 'upcoming').map((x) => x.event).sort(soonestFirst),
      past: withStatus
        .filter((x) => x.status === 'completed')
        .map((x) => x.event)
        .sort((a, b) => getEventSortDate(b) - getEventSortDate(a)),
    };
  }, [list]);

  // The Game Dev Open Call is a standing "now running" program, so it lives
  // in (and counts toward) the Ongoing tab.
  const counts: Record<TabId, number> = {
    ongoing: ongoing.length + 1,
    upcoming: upcoming.length,
    past: past.length,
    timeline: list.length,
  };

  // Deep links to /event#open-call (home page pillar) land on the Ongoing
  // tab, where the open call lives now.
  useEffect(() => {
    if (!loaded || window.location.hash !== '#open-call') return;
    selectTab('ongoing');
    const t = setTimeout(() => {
      document.getElementById('open-call')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-ink">Events</h1>
        <p className="max-w-2xl text-ink/60">
          Workshops, seminars, and community sessions &mdash; see what&apos;s
          happening now, what&apos;s coming up, and what we&apos;ve run before.
        </p>
      </div>

      {!loaded && <EventsSkeleton />}

      {loaded && (
        <div className="flex flex-col gap-6">
          {/* Tab bar */}
          <div
            role="tablist"
            aria-label="Event views"
            onKeyDown={onTablistKeyDown}
            className="flex gap-6 overflow-x-auto border-b border-deepest"
          >
            {TABS.map(({ id, label }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    tabRefs.current[id] = el;
                  }}
                  role="tab"
                  id={`events-tab-${id}`}
                  aria-selected={active}
                  aria-controls="events-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => selectTab(id)}
                  className={`relative flex shrink-0 items-center gap-2 px-1 pb-3 text-sm font-medium transition-colors ${
                    active ? 'text-ink' : 'text-ink/50 hover:text-ink/80'
                  }`}
                >
                  {label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      active ? 'bg-accent/15 text-accent' : 'border border-deepest text-ink/40'
                    }`}
                  >
                    {counts[id]}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-0.5 origin-left rounded-full bg-accent transition-transform duration-200 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active panel — keyed by tab so switching remounts it and plays
              the swap-in entrance */}
          <div
            key={tab}
            role="tabpanel"
            id="events-panel"
            aria-labelledby={`events-tab-${tab}`}
            className="anim-swap-in flex flex-col gap-4"
          >
            {tab === 'ongoing' && (
              <>
                {ongoing.length > 0 && (
                  <EventGrid
                    events={ongoing}
                    activeId={selectedEvent?.id ?? null}
                    onSelect={setSelectedEvent}
                  />
                )}
                <GameDevCall />
              </>
            )}

            {tab === 'upcoming' && (
              <EventGrid
                events={upcoming}
                activeId={selectedEvent?.id ?? null}
                onSelect={setSelectedEvent}
              />
            )}

            {tab === 'past' &&
              (past.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {past.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      status="completed"
                      variant="archived"
                      isActive={event.id === selectedEvent?.id}
                      onSelect={setSelectedEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-ink/20 px-6 py-12 text-center">
                  <p className="font-semibold text-ink/60">No past events yet.</p>
                  <p className="text-sm text-ink/40">
                    Once an event wraps up, it lands here with its archive.
                  </p>
                </div>
              ))}

            {tab === 'timeline' &&
              (list.length > 0 ? (
                <>
                  <p className="text-sm text-ink/45">
                    Every event in one view &mdash; what&apos;s ahead, what&apos;s live,
                    and everything we&apos;ve run, newest first.
                  </p>
                  <EventTimeline
                    events={list}
                    activeId={selectedEvent?.id ?? null}
                    onSelect={setSelectedEvent}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-ink/20 px-6 py-12 text-center">
                  <p className="font-semibold text-ink/60">No events yet.</p>
                  <p className="text-sm text-ink/40">
                    New sessions are announced on Discord first &mdash; join us to hear about them early.
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
