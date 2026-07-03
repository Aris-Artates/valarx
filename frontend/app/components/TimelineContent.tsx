'use client';

import { Fragment, useMemo } from 'react';
import { Event } from '@/app/data/events';
import { getEventSortDate } from '@/lib/eventStatus';
import EventCard from './EventCard';

interface TimelineContentProps {
  events: Event[];
  activeId: string | null;
  onSelect: (event: Event) => void;
}

type Item =
  | { kind: 'year-separator'; year: string }
  | { kind: 'month-separator'; month: string }
  | { kind: 'event'; event: Event };

function buildItems(unsorted: Event[]): Item[] {
  // Archive reads newest-first (reverse chronological).
  const events = [...unsorted].sort((a, b) => getEventSortDate(b) - getEventSortDate(a));

  // Count events per month key (e.g. "Jan 2025")
  const monthCounts: Record<string, number> = {};
  for (const event of events) {
    const year  = event.date.split(', ').at(-1) ?? event.date;
    const key   = `${event.month} ${year}`;
    monthCounts[key] = (monthCounts[key] ?? 0) + 1;
  }

  const items: Item[] = [];
  let lastYear  = '';
  let lastMonth = '';

  for (const event of events) {
    const year     = event.date.split(', ').at(-1) ?? event.date;
    const monthKey = `${event.month} ${year}`;

    if (year !== lastYear) {
      items.push({ kind: 'year-separator', year });
      lastYear  = year;
      lastMonth = '';
    }

    if (monthCounts[monthKey] > 1 && monthKey !== lastMonth) {
      items.push({ kind: 'month-separator', month: event.month });
      lastMonth = monthKey;
    }

    items.push({ kind: 'event', event });
  }

  return items;
}

export default function TimelineContent({ events, activeId, onSelect }: TimelineContentProps) {
  const items = useMemo(() => buildItems(events), [events]);
  const total = items.length;

  return (
    <div className="grid grid-cols-[3rem_1fr] gap-x-6">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast  = index === total - 1;

        // ── Dot column ───────────────────────────────────────────────────
        const DotCol = ({ children }: { children: React.ReactNode }) => (
          <div className="relative flex flex-col items-center">
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
                <span className="relative z-10 mt-5 h-4.5 w-4.5 rounded-full border-2 border-accent-dim/60 bg-accent-dim" />
              </DotCol>
              <div className="flex items-center py-4">
                <span className="eyebrow tracking-widest text-accent-dim">
                  {item.year}
                </span>
              </div>
            </Fragment>
          );
        }

        // ── MONTH SEPARATOR ROW ──────────────────────────────────────────
        if (item.kind === 'month-separator') {
          return (
            <Fragment key={`month-sep-${item.month}-${index}`}>
              <DotCol>
                <span className="relative z-10 mt-5 h-4 w-4 rounded-full border-2 border-accent-dim/40 bg-background" />
              </DotCol>
              <div className="flex items-center py-3">
                <span className="text-xs font-medium uppercase tracking-widest text-ink/35">
                  {item.month}
                </span>
              </div>
            </Fragment>
          );
        }

        // ── EVENT ROW ─────────────────────────────────────────────────────
        const { event } = item;
        const isActive  = event.id === activeId;

        return (
          <Fragment key={event.id}>
            <DotCol>
              <button
                onClick={() => onSelect(event)}
                title={event.title}
                className="group absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              >
                <div className="flex h-5 w-5 items-center justify-center">
                  <span className={`
                    block rounded-full border-2 transition-all duration-200
                    ${isActive
                      ? 'h-5 w-5 border-accent-dim bg-accent-dim'
                      : 'h-4 w-4 border-ink/30 bg-secondary group-hover:border-accent-dim group-hover:bg-background-dark'
                    }
                  `} />
                </div>
                <span className="mt-1 text-[10px] text-ink/30 group-hover:text-accent-dim">
                  {event.month}
                </span>
              </button>
            </DotCol>

            <div className="my-3">
              <EventCard
                event={event}
                status="completed"
                variant="archived"
                isActive={isActive}
                onSelect={onSelect}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
