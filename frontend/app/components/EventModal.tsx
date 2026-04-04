"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Event, Person, SocialPlatform } from "@/app/data/events";

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const cls = "h-4 w-4";
  switch (platform) {
    case "linkedin":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}

function PersonCard({ person }: { person: Person }) {
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[#0f005c] bg-[#230761]/80 p-5 text-center">
      {person.photo ? (
        <Image
          src={person.photo}
          alt={person.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-[#a7ff04]/30"
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0f005c] text-lg font-bold text-[#a7ff04]">
          {initials}
        </div>
      )}
      <div>
        <p className="font-semibold text-white">{person.name}</p>
        <p className="mt-0.5 text-xs text-white/50">{person.title}</p>
      </div>
      {person.socials && person.socials.length > 0 && (
        <div className="flex gap-3">
          {person.socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 transition-colors hover:text-[#a7ff04]"
            >
              <SocialIcon platform={s.platform} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [showLuma, setShowLuma] = useState(false);

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

        {/* Luma registration overlay */}
        {showLuma && event.lumaUrl && (
          <div className="absolute inset-0 z-20 flex flex-col rounded-2xl bg-[#42169b] p-8">
            <button
              onClick={() => setShowLuma(false)}
              className="mb-4 self-start text-sm text-white/50 transition-colors hover:text-white"
            >
              ← Back to event
            </button>
            <iframe
              src={event.lumaUrl}
              className="w-full flex-1 rounded-xl"
              style={{ border: "1px solid #bfcbda88" }}
              allow="fullscreen; payment"
              tabIndex={0}
            />
          </div>
        )}

        {/* Badge + date */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#0f005c] px-3 py-1 text-xs font-medium text-[#a7ff04]/80">
            {event.type}
          </span>
          <span className="text-sm text-white/40">{event.date}</span>
        </div>

        {/* Title + Register */}
        <div className="mt-4 flex flex-nowrap items-center justify-between gap-4">
          <h2 id="modal-title" className="text-2xl font-bold text-white">
            {event.title}
          </h2>
          {event.lumaUrl && (
            <button
              onClick={() => setShowLuma(true)}
              className="shrink-0 rounded-xl bg-[#a7ff04] px-6 py-2.5 text-sm font-semibold text-[#0f005c] transition-colors hover:bg-[#91db03]"
            >
              Register
            </button>
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
            <div className="flex flex-col gap-2">
              {event.schedule.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-lg border border-[#0f005c] bg-[#230761]/50 px-4 py-3"
                >
                  <span className="w-40 shrink-0 text-xs font-medium text-[#a7ff04]/60">
                    {item.time}
                  </span>
                  <span className="text-sm text-white/85">{item.activity}</span>
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
