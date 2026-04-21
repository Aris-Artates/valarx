"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Event } from "@/app/data/events";
import { hashEventId } from "@/lib/eventHash";
import PersonCard from "@/app/components/PersonCard";

interface EventModalProps {
  event: Event;
  onClose: () => void;
}


export default function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
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
        className="absolute inset-0 bg-[#0f005c]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 h-[80vh] w-[80vw] overflow-y-auto rounded-2xl border border-[#0f005c] bg-[#42169b] p-5 shadow-2xl shadow-[#0f005c] sm:p-8">

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

        {/* Title + Register */}
        <div className="mt-2 flex flex-nowrap items-center justify-between gap-4">
          <h2 id="modal-title" className="text-2xl font-bold text-white">
            {event.title}
          </h2>
          {event.lumaUrl && (
            <Link
              href={`/event/${hashEventId(event.id)}/register`}
              className="shrink-0 rounded-xl bg-[#a7ff04] px-6 py-2.5 text-sm font-semibold text-[#0f005c] transition-colors hover:bg-[#91db03]"
            >
              Register
            </Link>
          )}
        </div>

        {/* Timeframe + Location — just below title */}
        <div className="mt-3 flex flex-wrap gap-5 text-sm text-white/60">
          {event.timeframe && (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-[#a7ff04]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {event.timeframe}
              {event.duration && (
                <span className="text-white/35">· {event.duration}</span>
              )}
            </span>
          )}
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0 text-[#a7ff04]/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
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
            <div className="overflow-hidden rounded-xl border border-[#0f005c]">
              {/* Header */}
              <div className="grid grid-cols-[7rem_1fr] border-b border-[#0f005c] bg-[#0f005c] sm:grid-cols-[10rem_1fr]">
                <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#a7ff04]">
                  Time
                </div>
                <div className="border-l border-[#230761] px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#a7ff04]">
                  Activity
                </div>
              </div>
              {/* Rows */}
              {event.schedule.map((item, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[7rem_1fr] sm:grid-cols-[10rem_1fr] ${
                    i % 2 === 0 ? 'bg-[#230761]/60' : 'bg-[#0f005c]/50'
                  } ${i < event.schedule!.length - 1 ? 'border-b border-[#0f005c]/70' : ''}`}
                >
                  <div className="px-4 py-3 text-xs font-medium leading-snug text-[#a7ff04]/70">
                    {item.time}
                  </div>
                  <div className="border-l border-[#0f005c]/70 px-4 py-3 text-sm leading-snug text-white/85">
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#a7ff04]/70">
              Partners
            </h3>
            <div className="flex flex-wrap gap-4">
              {event.partners.map((person) => (
                <div key={person.name} className="w-40">
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#a7ff04]/70">
              Speakers
            </h3>
            <div className="flex flex-wrap gap-4">
              {event.speakers.map((person, i) => (
                <div key={`${person.name}-${i}`} className="w-40">
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organizers */}
        {event.organizers && event.organizers.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#a7ff04]/70">
              Organizers
            </h3>
            <div className="flex flex-wrap gap-4">
              {event.organizers.map((person, i) => (
                <div key={`${person.name}-${i}`} className="w-40">
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
