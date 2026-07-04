'use client';

import { useEffect, useState } from 'react';
import {
  FacebookStats as Stats,
  getFacebookStats,
  getCachedFacebookStats,
} from '@/lib/facebookStats';

/**
 * Facebook page numbers for publicity — followers, likes, recent visits.
 * Renders nothing while loading and nothing at all when the backend
 * integration isn't configured, so it can sit on the page risk-free.
 */
export default function FacebookStats() {
  const [stats, setStats] = useState<Stats | null | undefined>(getCachedFacebookStats);

  useEffect(() => {
    let alive = true;
    if (stats === undefined) {
      getFacebookStats().then((data) => {
        if (alive) setStats(data);
      });
    }
    return () => {
      alive = false;
    };
  }, [stats]);

  if (!stats) return null;

  const items = [
    { label: 'Followers', value: stats.followers },
    { label: 'Page likes', value: stats.likes },
    { label: 'Visits, last 28 days', value: stats.pageVisits },
  ].filter((item): item is { label: string; value: number } => item.value !== null);

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-end gap-x-10 gap-y-4 border-t border-deepest pt-6">
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-0.5">
          <span className="text-2xl font-bold text-ink">{value.toLocaleString()}</span>
          <span className="text-xs font-medium uppercase tracking-wider text-ink/40">
            {label}
          </span>
        </div>
      ))}
      <span className="ml-auto self-end text-xs text-ink/30">From our Facebook page</span>
    </div>
  );
}
