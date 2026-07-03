import { Event, staticEvents } from '@/app/data/events';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

/**
 * Module-level session cache for event data. The first page that needs
 * events fetches them; every later mount (home ↔ events ↔ register
 * navigation) reuses the same result instantly, so skeletons only ever
 * appear once per session. Concurrent callers share one in-flight request.
 *
 * The static fallback is cached too — if the API is down we don't want to
 * re-hit a dead endpoint on every navigation. A full reload retries.
 */
let cache: Event[] | null = null;
let inflight: Promise<Event[]> | null = null;

export function getCachedEvents(): Event[] | null {
  return cache;
}

export function getEvents(): Promise<Event[]> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = fetch(`${API}/events/`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: Event[]) => {
      cache = data;
      return data;
    })
    .catch(() => {
      cache = staticEvents;
      return staticEvents;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}
