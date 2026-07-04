const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export interface FacebookStats {
  followers: number | null;
  likes: number | null;
  /** Total page views over the last 28 days. */
  pageVisits: number | null;
}

/**
 * Session cache mirroring lib/eventsCache: fetch once, share the result
 * across navigations. `null` (unavailable/unconfigured) is cached too so a
 * dead endpoint isn't re-hit on every page visit.
 */
let cache: FacebookStats | null | undefined;
let inflight: Promise<FacebookStats | null> | null = null;

export function getCachedFacebookStats(): FacebookStats | null | undefined {
  return cache;
}

export function getFacebookStats(): Promise<FacebookStats | null> {
  if (cache !== undefined) return Promise.resolve(cache);
  if (inflight) return inflight;

  inflight = fetch(`${API}/facebook/stats`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: FacebookStats) => {
      cache = data;
      return data;
    })
    .catch(() => {
      cache = null;
      return null;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}
