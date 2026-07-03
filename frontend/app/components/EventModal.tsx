"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Event } from "@/app/data/events";
import { getEventStatus } from "@/lib/eventStatus";
import { hashEventId } from "@/lib/eventHash";
import PersonCard from "@/app/components/PersonCard";

interface EventModalProps {
  event: Event;
  onClose: () => void;
}


export default function EventModal({ event, onClose }: EventModalProps) {
  const status = getEventStatus(event);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Move keyboard focus into the dialog; restore it to the opener on close.
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-deepest/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 h-[80vh] w-[80vw] overflow-y-auto rounded-2xl border border-deepest bg-secondary p-5 shadow-modal sm:p-8">

        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-ink/40 transition-colors hover:bg-background-dark hover:text-ink"
          aria-label="Close event details"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

{/* Badge + date */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-deepest px-3 py-1 text-xs font-medium text-accent/80">
            {event.type}
          </span>
          <span className="text-sm text-ink/40">{event.date}</span>
        </div>

        {/* Title + Register */}
        <div className="mt-2 flex flex-nowrap items-center justify-between gap-4">
          <h2 id="modal-title" className="text-2xl font-bold text-ink">
            {event.title}
          </h2>
          {status === 'completed' ? (
            <span className="shrink-0 rounded-xl border border-accent-dim/60 px-6 py-2.5 font-mono text-sm font-semibold uppercase tracking-widest text-accent-dim">
              Completed
            </span>
          ) : (
            <div className="flex shrink-0 items-center gap-3">
              {status === 'ongoing' && (
                <span className="animate-pulse rounded-full bg-accent px-3 py-1 font-mono text-xs font-semibold uppercase tracking-widest text-on-accent">
                  Live
                </span>
              )}
              {event.lumaUrl && (
                <Link
                  href={`/event/${hashEventId(event.id)}/register`}
                  className="rounded-xl bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
                >
                  Register
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Timeframe + Location — just below title */}
        <div className="mt-3 flex flex-wrap gap-5 text-sm text-ink/60">
          {event.timeframe && (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-accent/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {event.timeframe}
              {event.duration && (
                <span className="text-ink/35">· {event.duration}</span>
              )}
            </span>
          )}
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-accent/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
        </div>

        {/* Description */}
        <div className="mt-6">
          <p className="leading-7 text-ink/70">{event.description}</p>
        </div>

        {/* Program Schedule */}
        {event.schedule && event.schedule.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent/70">
              Program Schedule
            </h3>
            <div className="overflow-hidden rounded-xl border border-deepest">
              {/* Header */}
              <div className="grid grid-cols-[7rem_1fr] border-b border-deepest bg-deepest sm:grid-cols-[10rem_1fr]">
                <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-accent">
                  Time
                </div>
                <div className="border-l border-background-dark px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-accent">
                  Activity
                </div>
              </div>
              {/* Rows */}
              {event.schedule.map((item, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[7rem_1fr] sm:grid-cols-[10rem_1fr] ${
                    i % 2 === 0 ? 'bg-background-dark/60' : 'bg-deepest/50'
                  } ${i < event.schedule!.length - 1 ? 'border-b border-deepest/70' : ''}`}
                >
                  <div className="px-4 py-3 text-xs font-medium leading-snug text-accent/70">
                    {item.time}
                  </div>
                  <div className="border-l border-deepest/70 px-4 py-3 text-sm leading-snug text-ink/85">
                    {item.activity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partners */}
        {event.partners && event.partners.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent/70">
              Partners
            </h3>
            <div className="flex flex-wrap gap-4">
              {event.partners.map((person) => (
                <div key={person.name} className="w-40 h-40">
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent/70">
              Speakers
            </h3>
            <div className="flex flex-wrap gap-4">
              {event.speakers.map((person, i) => (
                <div key={`${person.name}-${i}`} className="w-40 h-40">
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organizers */}
        {event.organizers && event.organizers.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent/70">
              Organizers
            </h3>
            <div className="flex flex-wrap gap-4">
              {event.organizers.map((person, i) => (
                <div key={`${person.name}-${i}`} className="w-40 h-40">
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
