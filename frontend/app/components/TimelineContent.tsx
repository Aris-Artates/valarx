'use client';

import { Fragment, useMemo, useState } from 'react';
import { Event } from '@/app/data/events';

interface TimelineContentProps {
  events: Event[];
  activeId: string | null;
  onSelect: (event: Event) => void;
}

type Item =
  | { kind: 'year-separator'; year: string }
  | { kind: 'month-separator'; month: string }
  | { kind: 'event'; event: Event };

function buildItems(events: Event[]): Item[] {
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
              <div className="absolute top-0 bottom-1/2 left-1/2 w-px -translate-x-1/2 bg-[#0f005c]" />
            )}
            {!isLast && (
              <div className="absolute top-1/2 bottom-0 left-1/2 w-px -translate-x-1/2 bg-[#0f005c]" />
            )}
            {children}
          </div>
        );

        // ── YEAR SEPARATOR ROW ────────────────────────────────────────────
        if (item.kind === 'year-separator') {
          return (
            <Fragment key={`year-sep-${item.year}`}>
              <DotCol>
                <span
                  className="relative z-10 mt-5 h-4.5 w-4.5 rounded-full border-2 border-[#a7ff04]/60"
                  style={{ backgroundColor: '#6b9e02' }}
                />
              </DotCol>
              <div className="flex items-center py-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#a7ff04]/70">
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
                <span className="relative z-10 mt-5 h-4 w-4 rounded-full border-2 border-[#a7ff04]/30 bg-[#300a86]" />
              </DotCol>
              <div className="flex items-center py-3">
                <span className="text-xs font-medium uppercase tracking-widest text-white/35">
                  {item.month}
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
                    ? 'scale-125 border-[#a7ff04] bg-[#a7ff04]'
                    : 'border-white/30 bg-[#42169b] group-hover:border-[#a7ff04] group-hover:bg-[#230761]'
                  }
                `} />
                <span className="mt-1 text-[10px] text-white/30 group-hover:text-[#a7ff04]/70">
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
                  ? 'border-[#a7ff04] bg-[#230761]'
                  : 'border-[#0f005c] bg-[#42169b] hover:border-[#a7ff04]/40 hover:bg-[#230761]'
                }
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#0f005c] px-2.5 py-0.5 text-xs font-medium text-[#a7ff04]/80">
                      {event.type}
                    </span>
                    <span className="text-xs text-white/40">{event.date}</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-white">{event.title}</h3>

                  <div className={`overflow-hidden transition-all duration-200 ${
                    isHovered || isActive ? 'mt-2 max-h-24 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-sm text-white/60">{event.brief}</p>
                    <p className="mt-1 text-xs text-white/35">
                      {event.location} &mdash;{' '}
                      <span className="text-white/50">Click for full details</span>
                    </p>
                  </div>
                </div>

                <svg
                  className={`mt-1 h-4 w-4 shrink-0 transition-all duration-200 ${
                    isHovered || isActive ? 'translate-x-0 text-[#a7ff04]' : '-translate-x-1 opacity-0 text-white/30'
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
