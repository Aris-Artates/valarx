'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { Event } from '@/app/data/events';
import { findEventByHash } from '@/lib/eventHash';
import { getEvents } from '@/lib/eventsCache';

export default function RegisterPage() {
  const { id } = useParams<{ id: string }>();
  // undefined = still resolving; null = resolved but not found.
  const [event, setEvent] = useState<Event | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    getEvents().then((data) => {
      if (alive) setEvent(findEventByHash(data, id) ?? null);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  if (event === undefined) {
    return (
      <div role="status" aria-busy="true" className="flex min-h-screen flex-col px-8 py-10">
        <span className="sr-only">Loading registration&hellip;</span>
        <div aria-hidden="true" className="skeleton mb-6 h-4 w-48 rounded" />
        <div aria-hidden="true" className="skeleton w-full flex-1 rounded-2xl border border-deepest" style={{ minHeight: '50vh' }} />
      </div>
    );
  }
  if (!event || !event.lumaUrl) notFound();

  return (
    <div className="flex min-h-screen flex-col px-8 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/event"
          className="text-sm text-ink/50 transition-colors hover:text-ink"
        >
          ← Back to events
        </Link>
        <span className="text-ink/20">·</span>
        <span className="text-sm text-ink/60">{event.title}</span>
      </div>

      <iframe
        src={event.lumaUrl}
        title={`Register for ${event.title}`}
        className="w-full flex-1 rounded-2xl border border-deepest"
        style={{ minHeight: '50vh', maxHeight: '80vh' }}
        allow="fullscreen; payment"
        tabIndex={0}
      />
    </div>  
  );
}
