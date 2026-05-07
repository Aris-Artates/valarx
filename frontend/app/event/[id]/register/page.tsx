'use client';

import { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { Event } from '@/app/data/events';
import { findEventByHash } from '@/lib/eventHash';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export default function RegisterPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/events/`)
      .then(res => res.json())
      .then((data: Event[]) => setEvent(findEventByHash(data, id) ?? null))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return null;
  if (!event || !event.lumaUrl) notFound();

  return (
    <div className="flex min-h-screen flex-col px-8 py-10">
      <div className="mb-6 flex items-center gap-4">
        <Link
          href="/event"
          className="text-sm text-white/50 transition-colors hover:text-white"
        >
          ← Back to events
        </Link>
        <span className="text-white/20">·</span>
        <span className="text-sm text-white/60">{event.title}</span>
      </div>

      <iframe
        src={event.lumaUrl}
        className="w-full flex-1 rounded-2xl"
        style={{ border: '1px solid #bfcbda88', minHeight: '50vh', maxHeight: '80vh' }}
        allow="fullscreen; payment"
        tabIndex={0}
      />
    </div>  
  );
}
