'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Event } from '@/app/data/events';
import { pickFeaturedEvent } from '@/lib/eventStatus';
import { getEvents, getCachedEvents } from '@/lib/eventsCache';
import { DISCORD_URL, FACEBOOK_URL } from '@/app/data/site';
import FadeIn from '@/app/components/FadeIn';
import FeaturedEvent from '@/app/components/FeaturedEvent';

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
        {/* Next / latest event spotlight */}
        {loaded && featured && (
          <FadeIn className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink/50">
                On the calendar
              </h2>
              <div className="h-px flex-1 bg-deepest" />
              <Link
                href="/event"
                className="text-sm font-medium text-ink/50 transition-colors hover:text-ink"
              >
                All events &rarr;
              </Link>
            </div>
            <FeaturedEvent event={featured.event} status={featured.status} variant="compact" />
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
                className="btn-lift group flex flex-col gap-4 rounded-xl border border-deepest bg-secondary p-7 hover:border-accent/40"
              >
                <div className="h-px w-8 bg-accent" />
                <p className="font-semibold text-ink">{title}</p>
                <p className="text-sm leading-6 text-ink/55">{description}</p>
                <span className="mt-auto text-sm font-medium text-ink/40 transition-colors group-hover:text-accent">
                  {cta} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </FadeIn>

        {/* Community strip */}
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-deepest bg-secondary p-8 sm:flex-row sm:items-center sm:p-10">
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
        </FadeIn>
      </div>
    </div>
  );
}
