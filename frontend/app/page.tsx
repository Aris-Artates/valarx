'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/app/data/events';
import { getEventStatus, getEventSortDate, pickFeaturedEvent } from '@/lib/eventStatus';
import { getEvents, getCachedEvents } from '@/lib/eventsCache';
import { DISCORD_URL, FACEBOOK_URL } from '@/app/data/site';
import FadeIn from '@/app/components/FadeIn';
import FeaturedEvent from '@/app/components/FeaturedEvent';
import EventCard from '@/app/components/EventCard';
import EventModal from '@/app/components/EventModal';
import FacebookStats from '@/app/components/FacebookStats';

const pillars = [
  {
    title: 'Learn by doing',
    description:
      'Workshops built around real tools and real game environments. The theory follows the experience, not the other way around.',
    href: '/about',
    cta: 'How we teach',
  },
  {
    title: 'Build together',
    description:
      'Our Game Dev Open Call is running now — develop your own game, join a team that needs your skills, or pitch an idea to the community.',
    href: '/event#open-call',
    cta: 'See the open call',
  },
  {
    title: 'Community first',
    description:
      'Aspiring programmers, game developers, and enthusiasts in one space — the mixing is intentional.',
    href: '/connect',
    cta: 'Get involved',
  },
];

export default function Home() {
  // Session cache: reuses events already fetched by any other page.
  const [events, setEvents] = useState<Event[] | null>(getCachedEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    let alive = true;
    if (events === null) {
      getEvents().then((data) => {
        if (alive) setEvents(data);
      });
    }
    return () => {
      alive = false;
    };
  }, [events]);

  const loaded = events !== null;
  const featured = useMemo(() => pickFeaturedEvent(events ?? []), [events]);

  // Up to two more non-completed events alongside the spotlight.
  const alsoFeatured = useMemo(() => {
    if (!events || !featured) return [];
    return events
      .filter((e) => e.id !== featured.event.id && getEventStatus(e) !== 'completed')
      .sort((a, b) => getEventSortDate(a) - getEventSortDate(b))
      .slice(0, 2);
  }, [events, featured]);

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center overflow-hidden px-6 pb-24 pt-28 text-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-brand-tint" />

        <div className="relative flex max-w-2xl flex-col items-center gap-8">
          <Image
            src="/valarx.png"
            alt="VALARX"
            width={110}
            height={112}
            priority
            className="object-contain"
          />

          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-display">
            Understand games, don&apos;t just play them.
          </h1>

          <p className="max-w-xl text-ink/60">
            VALARX is a community for aspiring programmers, game developers,
            and enthusiasts &mdash; workshops, events, and builders learning
            side by side.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/event"
              className="btn-lift rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
            >
              View events
            </Link>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift rounded-full border border-accent/40 px-6 py-2.5 text-sm font-semibold text-ink hover:border-accent hover:bg-background-dark"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 pb-24">
        {/* Featured events — spotlight plus whatever else is on the calendar */}
        {loaded && featured && (
          <FadeIn className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink/50">
                Featured events
              </h2>
              <div className="h-px flex-1 bg-deepest" />
              <Link
                href="/event"
                className="text-sm font-medium text-ink/50 transition-colors hover:text-ink"
              >
                All events &rarr;
              </Link>
            </div>
            <FeaturedEvent
              event={featured.event}
              status={featured.status}
              variant="compact"
              onDetails={setSelectedEvent}
            />
            {alsoFeatured.length > 0 && (
              <div className="flex flex-col gap-3">
                {alsoFeatured.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    status={getEventStatus(event)}
                    variant="active"
                    isActive={event.id === selectedEvent?.id}
                    onSelect={setSelectedEvent}
                  />
                ))}
              </div>
            )}
          </FadeIn>
        )}

        {/* What VALARX is */}
        <FadeIn className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              What we&apos;re about
            </h2>
            <p className="max-w-2xl text-ink/60">
              Understanding games is just as rewarding as playing them. We help
              people cross from player to builder.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {pillars.map(({ title, description, href, cta }) => (
              <Link
                key={title}
                href={href}
                className="card-grow ease-snap group flex flex-col gap-4 rounded-xl border border-deepest bg-secondary p-7 hover:border-accent/40"
              >
                <div className="h-px w-14 origin-left scale-x-50 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <p className="font-semibold text-ink">{title}</p>
                <p className="text-sm leading-6 text-ink/55">{description}</p>
                <span className="mt-auto inline-block text-sm font-medium text-ink/40 transition-all group-hover:translate-x-1 group-hover:text-accent">
                  {cta} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Community strip */}
        <FadeIn>
          <div className="panel-grow flex flex-col gap-8 rounded-2xl border border-deepest bg-secondary p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-ink">Join the community</h2>
                <p className="max-w-md text-sm text-ink/55">
                  Announcements, event registrations, and everyday chat &mdash;
                  it all happens on Discord first.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lift rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
                >
                  Join Discord
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-lift rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/50"
                >
                  Follow on Facebook
                </a>
              </div>
            </div>
            {/* Facebook page numbers — renders nothing until the backend
                integration is configured, so the panel stays clean. */}
            <FacebookStats />
          </div>
        </FadeIn>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
