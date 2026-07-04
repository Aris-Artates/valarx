'use client';

import { Fragment, useMemo } from 'react';
import { Event } from '@/app/data/events';
import { EventStatus, getEventStatus, getEventSortDate } from '@/lib/eventStatus';
import StatusChip from './StatusChip';

interface EventTimelineProps {
  events: Event[];
  activeId: string | null;
  onSelect: (event: Event) => void;
}

type Item =
  | { kind: 'year-separator'; year: string }
  | { kind: 'today-marker' }
  | { kind: 'event'; event: Event; status: EventStatus };

/**
 * Consolidated timeline of ALL events, newest first: upcoming/ongoing above
 * the "Today" line, completed below it. Rows are compact on purpose — the
 * status sections above the timeline carry the full cards.
 */
function buildItems(unsorted: Event[]): Item[] {
  const withStatus = unsorted.map((event) => ({
    event,
    status: getEventStatus(event),
  }));

  // Group by status first so the Today line cleanly splits future from past,
  // then newest-first within each group.
  const newestFirst = (a: { event: Event }, b: { event: Event }) =>
    getEventSortDate(b.event) - getEventSortDate(a.event);
  const future = withStatus.filter((x) => x.status !== 'completed').sort(newestFirst);
  const past = withStatus.filter((x) => x.status === 'completed').sort(newestFirst);

  const items: Item[] = [];
  let lastYear = '';

  const push = (entries: typeof withStatus) => {
    for (const { event, status } of entries) {
      const year = event.date.split(', ').at(-1) ?? event.date;
      if (year !== lastYear) {
        items.push({ kind: 'year-separator', year });
        lastYear = year;
      }
      items.push({ kind: 'event', event, status });
    }
  };

  push(future);
  if (future.length > 0 && past.length > 0) {
    items.push({ kind: 'today-marker' });
  }
  push(past);

  return items;
}

function Dot({ status, isActive }: { status: EventStatus; isActive: boolean }) {
  if (status === 'ongoing') {
    return (
      <span className="relative z-10 flex h-4 w-4 items-center justify-center">
        <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent/40" />
        <span className="relative h-3 w-3 rounded-full bg-accent" />
      </span>
    );
  }
  if (status === 'upcoming') {
    return (
      <span
        className={`relative z-10 h-4 w-4 rounded-full border-2 transition-all duration-200 ${
          isActive ? 'border-accent bg-accent' : 'border-accent/60 bg-background'
        }`}
      />
    );
  }
  return (
    <span
      className={`relative z-10 h-4 w-4 rounded-full border-2 transition-all duration-200 ${
        isActive ? 'border-accent-dim bg-accent-dim' : 'border-ink/30 bg-secondary'
      }`}
    />
  );
}

export default function EventTimeline({ events, activeId, onSelect }: EventTimelineProps) {
  const items = useMemo(() => buildItems(events), [events]);
  const total = items.length;

  return (
    <div className="grid grid-cols-[3rem_1fr] gap-x-4 sm:gap-x-6">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === total - 1;

        const DotCol = ({ children }: { children: React.ReactNode }) => (
          <div className="relative flex flex-col items-center justify-center">
            {!isFirst && (
              <div className="absolute top-0 bottom-1/2 left-1/2 w-px -translate-x-1/2 bg-deepest" />
            )}
            {!isLast && (
              <div className="absolute top-1/2 bottom-0 left-1/2 w-px -translate-x-1/2 bg-deepest" />
            )}
            {children}
          </div>
        );

        // ── YEAR SEPARATOR ROW ────────────────────────────────────────────
        if (item.kind === 'year-separator') {
          return (
            <Fragment key={`year-sep-${item.year}`}>
              <DotCol>
                <span className="relative z-10 h-4.5 w-4.5 rounded-full border-2 border-accent-dim/60 bg-accent-dim" />
              </DotCol>
              <div className="flex items-center py-4">
                <span className="eyebrow tracking-widest text-accent-dim">{item.year}</span>
              </div>
            </Fragment>
          );
        }

        // ── TODAY MARKER ROW ──────────────────────────────────────────────
        if (item.kind === 'today-marker') {
          return (
            <Fragment key="today-marker">
              <DotCol>
                <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-accent" />
              </DotCol>
              <div className="flex items-center gap-3 py-3" role="separator" aria-label="Today">
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Today
                </span>
                <div className="h-px flex-1 bg-accent/25" />
              </div>
            </Fragment>
          );
        }

        // ── EVENT ROW ─────────────────────────────────────────────────────
        const { event, status } = item;
        const completed = status === 'completed';
        const isActive = event.id === activeId;

        return (
          <Fragment key={event.id}>
            <DotCol>
              <Dot status={status} isActive={isActive} />
            </DotCol>

            <div className="my-1.5">
              <button
                onClick={() => onSelect(event)}
                aria-label={`${event.title} — ${status} event. View details`}
                className={`card-grow group flex w-full flex-wrap items-center gap-x-4 gap-y-1.5 rounded-lg border px-4 py-3 text-left ${
                  isActive
                    ? 'border-accent-dim bg-background-dark'
                    : completed
                      ? 'border-deepest bg-secondary/60 opacity-80 hover:border-accent-dim/60 hover:bg-background-dark hover:opacity-100'
                      : 'border-deepest bg-secondary hover:border-accent/40 hover:bg-background-dark'
                }`}
              >
                <span className="w-20 shrink-0 text-xs text-ink/40">
                  {event.month.slice(0, 3)} {event.date.split(', ').at(-1)}
                </span>
                <span
                  className={`min-w-0 flex-1 truncate text-sm font-medium ${
                    completed ? 'text-ink/55 group-hover:text-ink/80' : 'text-ink'
                  }`}
                >
                  {event.title}
                </span>
                <StatusChip status={status} />
              </button>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
