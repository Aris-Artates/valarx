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
      <div className="absolute inset-0 bg-[#0f005c]/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 h-[80vh] w-[80vw] overflow-y-auto rounded-2xl border border-[#0f005c] bg-[#42169b] p-8 shadow-2xl shadow-[#0f005c]">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-white/40 transition-colors hover:bg-[#230761] hover:text-white"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Badge + date */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#0f005c] px-3 py-1 text-xs font-medium text-[#a7ff04]/80">
            {event.type}
          </span>
          <span className="text-sm text-white/40">{event.date}</span>
        </div>

        {/* Title */}
        <h2 id="modal-title" className="mt-4 text-2xl font-bold text-white">
          {event.title}
        </h2>

        {/* Meta row */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {event.organizer && (
            <div className="rounded-lg border border-[#0f005c] bg-[#230761]/80 px-4 py-3">
              <p className="text-xs text-white/40">Organizer</p>
              <p className="mt-0.5 text-sm text-white">{event.organizer}</p>
            </div>
          )}
          {event.partner && (
            <div className="rounded-lg border border-[#0f005c] bg-[#230761]/80 px-4 py-3">
              <p className="text-xs text-white/40">Key Partner</p>
              <p className="mt-0.5 text-sm text-white">{event.partner}</p>
            </div>
          )}
          {event.contact && (
            <div className="rounded-lg border border-[#0f005c] bg-[#230761]/80 px-4 py-3">
              <p className="text-xs text-white/40">Primary Contact</p>
              <p className="mt-0.5 text-sm text-white">{event.contact}</p>
            </div>
          )}
          {event.platform && (
            <div className="rounded-lg border border-[#0f005c] bg-[#230761]/80 px-4 py-3">
              <p className="text-xs text-white/40">Platform</p>
              <p className="mt-0.5 text-sm text-white">
                {event.platform}
                {event.capacity && (
                  <span className="ml-2 text-white/40">· {event.capacity} participants</span>
                )}
              </p>
            </div>
          )}
          {event.timeframe && (
            <div className="rounded-lg border border-[#0f005c] bg-[#230761]/80 px-4 py-3">
              <p className="text-xs text-white/40">Timeframe</p>
              <p className="mt-0.5 text-sm text-white">
                {event.timeframe}
                {event.duration && (
                  <span className="ml-2 text-white/40">· {event.duration}</span>
                )}
              </p>
            </div>
          )}
          <div className="rounded-lg border border-[#0f005c] bg-[#230761]/80 px-4 py-3">
            <p className="text-xs text-white/40">Location</p>
            <p className="mt-0.5 text-sm text-white">{event.location}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="leading-7 text-white/70">{event.description}</p>
        </div>

        {/* Program Schedule */}
        {event.schedule && event.schedule.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#a7ff04]/70">
              Program Schedule
            </h3>
            <div className="flex flex-col gap-2">
              {event.schedule.map((item, i) => (
                <div key={i} className="flex gap-4 rounded-lg border border-[#0f005c] bg-[#230761]/50 px-4 py-3">
                  <span className="w-40 shrink-0 text-xs font-medium text-[#a7ff04]/60">
                    {item.time}
                  </span>
                  <span className="text-sm text-white/85">{item.activity}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partnership Details */}
        {event.partnershipNotes && event.partnershipNotes.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#a7ff04]/70">
              Partnership Details
            </h3>
            <ul className="flex flex-col gap-3">
              {event.partnershipNotes.map((note, i) => (
                <li key={i} className="flex gap-3 text-sm leading-6 text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#a7ff04]/50" />
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
            className="w-full rounded-xl bg-[#a7ff04] px-4 py-2.5 text-sm font-semibold text-[#0f005c] transition-colors hover:bg-[#91db03]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
