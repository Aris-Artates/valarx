'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { events } from '@/app/data/events';

export default function RegisterPage() {
  const { id } = useParams<{ id: string }>();
  const event = events.find((e) => e.id === id);

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
        style={{ border: '1px solid #bfcbda88', minHeight: '80vh' }}
        allow="fullscreen; payment"
        tabIndex={0}
      />
    </div>
  );
}
