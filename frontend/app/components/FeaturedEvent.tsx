'use client';

import Link from 'next/link';
import { Event } from '@/app/data/events';
import { EventStatus, getEventStartTime } from '@/lib/eventStatus';
import { hashEventId } from '@/lib/eventHash';
import Countdown from './Countdown';

interface FeaturedEventProps {
  event: Event;
  status: EventStatus;
  /** 'full' = events page spotlight; 'compact' = home page teaser. */
  variant?: 'full' | 'compact';
  onDetails?: (event: Event) => void;
}

const LABELS: Record<EventStatus, string> = {
  ongoing: 'Happening now',
  upcoming: 'Next event',
  completed: 'Latest event',
};

export default function FeaturedEvent({
  event,
  status,
  variant = 'full',
  onDetails,
}: FeaturedEventProps) {
  const compact = variant === 'compact';
  const startTime = getEventStartTime(event);
  const showCountdown = status === 'upcoming' && startTime !== null;
  const canRegister = status !== 'completed' && Boolean(event.lumaUrl);

  return (
    <section
      aria-label={`${LABELS[status]}: ${event.title}`}
      className={`panel-grow relative overflow-hidden rounded-2xl border border-deepest bg-secondary ${
        compact ? 'p-6 sm:p-8' : 'p-8 sm:p-10'
      }`}
    >
      {/* Brand-purple tint — the one decorative accent on this panel */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-brand-tint" />

      <div className="relative flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`eyebrow ${
              status === 'ongoing'
                ? 'rounded-full bg-accent px-3 py-1 text-on-accent'
                : 'text-accent'
            }`}
          >
            {LABELS[status]}
          </span>
          <span className="rounded-full bg-deepest px-2.5 py-0.5 text-xs font-medium text-ink/60">
            {event.type}
          </span>
          <span className="text-xs text-ink/40">{event.date}</span>
        </div>

        <h2 className={`font-bold text-ink ${compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
          {event.title}
        </h2>

        <p className="max-w-2xl text-ink/60">{event.brief}</p>

        <div className="flex flex-wrap gap-5 text-sm text-ink/50">
          {event.timeframe && (
            <span className="flex items-center gap-2">
              <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-ink/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {event.timeframe}
            </span>
          )}
          <span className="flex items-center gap-2">
            <svg aria-hidden="true" className="h-4 w-4 shrink-0 text-ink/40" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
        </div>

        {showCountdown && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-ink/40">
              Starts in
            </span>
            <Countdown target={startTime} />
          </div>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-3">
          {canRegister && (
            <Link
              href={`/event/${hashEventId(event.id)}/register`}
              className="btn-lift rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
            >
              Register
            </Link>
          )}
          {onDetails ? (
            <button
              onClick={() => onDetails(event)}
              className="btn-lift rounded-full border border-ink/20 px-6 py-2.5 text-sm font-semibold text-ink hover:border-ink/50"
            >
              View details
            </button>
          ) : (
            <Link
              href="/event"
              className="btn-lift rounded-full border border-ink/20 px-6 py-2.5 text-sm font-semibold text-ink hover:border-ink/50"
            >
              View details
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
