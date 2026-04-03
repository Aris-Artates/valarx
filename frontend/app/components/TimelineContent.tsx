'use client';

import { Fragment, useMemo, useState } from 'react';
import { Event } from '@/app/data/events';

interface TimelineContentProps {
  events: Event[];
  activeId: string | null;
  onSelect: (event: Event) => void;
}

type Item =
  | { kind: 'separator'; year: string }
  | { kind: 'event'; event: Event };

function buildItems(events: Event[]): Item[] {
  const items: Item[] = [];
  let lastYear = '';

  for (const event of events) {
    const year = event.date.split(', ').at(-1) ?? event.date;
    if (year !== lastYear) {
      items.push({ kind: 'separator', year });
      lastYear = year;
    }
    items.push({ kind: 'event', event });
  }

  return items;
}

export default function TimelineContent({ events, activeId, onSelect }: TimelineContentProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const items = useMemo(() => buildItems(events), [events]);
  const total = items.length;

  return (
    <div className="grid grid-cols-[3rem_1fr] gap-x-6">
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast  = index === total - 1;

        // ── Dot column (shared between separator and event) ──────────────
        const DotCol = ({ children }: { children: React.ReactNode }) => (
          <div className="relative flex flex-col items-center">
            {!isFirst && (
              <div className="absolute top-0 bottom-1/2 left-1/2 w-px -translate-x-1/2 bg-zinc-700" />
            )}
            {!isLast && (
              <div className="absolute top-1/2 bottom-0 left-1/2 w-px -translate-x-1/2 bg-zinc-700" />
            )}
            {children}
          </div>
        );

        // ── SEPARATOR ROW ─────────────────────────────────────────────────
        if (item.kind === 'separator') {
          return (
            <Fragment key={`sep-${item.year}`}>
              <DotCol>
                <span className="relative z-10 mt-5 h-4 w-4 rounded-full border-2 border-zinc-500 bg-zinc-950" />
              </DotCol>

              {/* Year label — no card */}
              <div className="flex items-center py-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  {item.year}
                </span>
              </div>
            </Fragment>
          );
        }

        // ── EVENT ROW ─────────────────────────────────────────────────────
        const { event } = item;
        const isActive  = event.id === activeId;
        const isHovered = event.id === hoveredId;

        return (
          <Fragment key={event.id}>
            <DotCol>
              <button
                onClick={() => onSelect(event)}
                title={event.title}
                className="group relative z-10 mt-5 flex flex-col items-center"
              >
                <span className={`
                  h-4 w-4 rounded-full border-2 transition-all duration-200
                  ${isActive
                    ? 'scale-125 border-white bg-white'
                    : 'border-zinc-500 bg-zinc-900 group-hover:border-white group-hover:bg-zinc-700'
                  }
                `} />
                <span className="mt-1 text-[10px] text-zinc-600 group-hover:text-zinc-400">
                  {event.month}
                </span>
              </button>
            </DotCol>

            <button
              onClick={() => onSelect(event)}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`
                my-3 w-full rounded-xl border p-5 text-left transition-all duration-200
                ${isActive
                  ? 'border-white bg-zinc-800'
                  : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800'
                }
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-zinc-700 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                      {event.type}
                    </span>
                    <span className="text-xs text-zinc-500">{event.date}</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-white">{event.title}</h3>

                  <div className={`overflow-hidden transition-all duration-200 ${
                    isHovered || isActive ? 'mt-2 max-h-24 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-sm text-zinc-400">{event.brief}</p>
                    <p className="mt-1 text-xs text-zinc-600">
                      {event.location} &mdash;{' '}
                      <span className="text-zinc-500">Click for full details</span>
                    </p>
                  </div>
                </div>

                <svg
                  className={`mt-1 h-4 w-4 shrink-0 text-zinc-600 transition-all duration-200 ${
                    isHovered || isActive ? 'translate-x-0 text-zinc-400' : '-translate-x-1 opacity-0'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </Fragment>
        );
      })}
    </div>
  );
}
