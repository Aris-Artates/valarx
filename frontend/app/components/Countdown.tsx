'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  /** Epoch ms of the moment being counted down to. */
  target: number;
}

interface Parts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getParts(target: number, now: number): Parts | null {
  const diff = target - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

/** Live ticking countdown. Renders nothing once the target has passed. */
export default function Countdown({ target }: CountdownProps) {
  const [parts, setParts] = useState<Parts | null>(() => getParts(target, Date.now()));

  useEffect(() => {
    const tick = () => setParts(getParts(target, Date.now()));
    tick();
    const interval = setInterval(tick, 1_000);
    return () => clearInterval(interval);
  }, [target]);

  if (!parts) return null;

  const segments = [
    { value: parts.days, label: parts.days === 1 ? 'day' : 'days' },
    { value: parts.hours, label: 'hrs' },
    { value: parts.minutes, label: 'min' },
    { value: parts.seconds, label: 'sec' },
  ];

  return (
    <div className="flex items-center gap-4">
      {segments.map(({ value, label }) => (
        <div key={label} className="flex min-w-11 flex-col items-center gap-0.5">
          <span className="text-2xl font-bold tabular-nums leading-none text-ink">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-ink/40">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
