'use client';

import { Event } from '@/app/data/events';
import { EventStatus, daysUntil } from '@/lib/eventStatus';

interface EventCardProps {
  event: Event;
  status: EventStatus;
  variant: 'active' | 'archived';
  isActive?: boolean;
  onSelect: (event: Event) => void;
}

function StatusChip({ status }: { status: EventStatus }) {
  if (status === 'ongoing') {
    return (
      <span className="animate-pulse rounded-full bg-accent px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-widest text-on-accent">
        Live
      </span>
    );
  }
  if (status === 'upcoming') {
    return (
      <span className="rounded-full border border-accent/60 px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-widest text-accent/90">
        Upcoming
      </span>
    );
  }
  return null;
}

export default function EventCard({ event, status, variant, isActive = false, onSelect }: EventCardProps) {
  const archived = variant === 'archived';
  const days = archived ? null : daysUntil(event);
  const year = event.date.split(', ').at(-1) ?? '';

  return (
    <button
      onClick={() => onSelect(event)}
      aria-label={`${event.title} — ${archived ? 'completed' : status} event. View details`}
      className={`group relative w-full rounded-xl border text-left transition-all duration-200 ${
        archived
          ? `p-4 ${
              isActive
                ? 'border-accent-dim bg-background-dark'
                : 'border-deepest bg-secondary/60 opacity-80 hover:border-accent-dim/60 hover:bg-background-dark hover:opacity-100'
            }`
          : `p-5 ${
              isActive
                ? 'border-accent bg-background-dark'
                : 'border-deepest bg-secondary hover:border-accent/40 hover:bg-background-dark hover:shadow-glow-strong'
            }`
      }`}
    >
      {archived && (
        <span className="absolute right-3 top-3 rotate-3 rounded-sm border border-accent-dim/60 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent-dim">
          Completed
        </span>
      )}

      <div className="flex items-stretch gap-5">
        {/* Date rail — active quests only */}
        {!archived && (
          <div className="flex w-16 shrink-0 flex-col items-center justify-center gap-0.5 border-r border-deepest pr-5">
            <span className="font-mono text-lg font-bold uppercase leading-none text-accent">{event.month.slice(0, 3)}</span>
            <span className="font-mono text-xs text-ink/40">{year}</span>
            {days !== null && (
              <span className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent/60">
                in {days}d
              </span>
            )}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className={`flex flex-wrap items-center gap-2 ${archived ? 'pr-24' : ''}`}>
            {!archived && <StatusChip status={status} />}
            <span
              className={`rounded-full bg-deepest px-2.5 py-0.5 text-xs font-medium ${
                archived ? 'text-accent-dim' : 'text-accent/80'
              }`}
            >
              {event.type}
            </span>
            <span className="text-xs text-ink/40">{event.date}</span>
          </div>
          <h3 className={`mt-2 font-semibold text-ink ${archived ? 'text-sm' : 'text-base'}`}>
            {event.title}
          </h3>

          {/* Brief + location — expands on hover, keyboard focus, or while selected */}
          <div
            className={`overflow-hidden transition-all duration-200 ${
              isActive
                ? 'mt-2 max-h-24 opacity-100'
                : 'max-h-0 opacity-0 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:mt-2 group-focus-visible:max-h-24 group-focus-visible:opacity-100'
            }`}
          >
            <p className="text-sm text-ink/60">{event.brief}</p>
            <p className="mt-1 text-xs text-ink/35">
              {event.location} &mdash;{' '}
              <span className="text-ink/50">Click for full details</span>
            </p>
          </div>
        </div>

        {!archived && (
          <svg
            className={`mt-1 h-4 w-4 shrink-0 self-start text-accent transition-all duration-200 ${
              isActive
                ? 'translate-x-0 opacity-100'
                : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </div>
    </button>
  );
}
