'use client';

import { useEffect } from 'react';
import { Event } from '@/app/data/events';

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 h-[80vh] w-[80vw] overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Badge + date */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300">
            {event.type}
          </span>
          <span className="text-sm text-zinc-500">{event.date}</span>
        </div>

        {/* Title */}
        <h2 id="modal-title" className="mt-4 text-2xl font-bold text-white">
          {event.title}
        </h2>

        {/* Meta row */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {event.organizer && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3">
              <p className="text-xs text-zinc-500">Organizer</p>
              <p className="mt-0.5 text-sm text-white">{event.organizer}</p>
            </div>
          )}
          {event.partner && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3">
              <p className="text-xs text-zinc-500">Key Partner</p>
              <p className="mt-0.5 text-sm text-white">{event.partner}</p>
            </div>
          )}
          {event.contact && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3">
              <p className="text-xs text-zinc-500">Primary Contact</p>
              <p className="mt-0.5 text-sm text-white">{event.contact}</p>
            </div>
          )}
          {event.platform && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3">
              <p className="text-xs text-zinc-500">Platform</p>
              <p className="mt-0.5 text-sm text-white">
                {event.platform}
                {event.capacity && (
                  <span className="ml-2 text-zinc-500">· {event.capacity} participants</span>
                )}
              </p>
            </div>
          )}
          {event.timeframe && (
            <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3">
              <p className="text-xs text-zinc-500">Timeframe</p>
              <p className="mt-0.5 text-sm text-white">
                {event.timeframe}
                {event.duration && (
                  <span className="ml-2 text-zinc-500">· {event.duration}</span>
                )}
              </p>
            </div>
          )}
          <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3">
            <p className="text-xs text-zinc-500">Location</p>
            <p className="mt-0.5 text-sm text-white">{event.location}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="leading-7 text-zinc-300">{event.description}</p>
        </div>

        {/* Program Schedule */}
        {event.schedule && event.schedule.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Program Schedule
            </h3>
            <div className="flex flex-col gap-2">
              {event.schedule.map((item, i) => (
                <div key={i} className="flex gap-4 rounded-lg border border-zinc-800 bg-zinc-800/30 px-4 py-3">
                  <span className="w-40 shrink-0 text-xs font-medium text-zinc-400">
                    {item.time}
                  </span>
                  <span className="text-sm text-zinc-200">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partnership Details */}
        {event.partnershipNotes && event.partnershipNotes.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Partnership Details
            </h3>
            <ul className="flex flex-col gap-3">
              {event.partnershipNotes.map((note, i) => (
                <li key={i} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Close */}
        <div className="mt-8">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
