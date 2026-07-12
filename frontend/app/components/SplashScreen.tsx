'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Timeline: logo eases in (0–700ms), accent bar fills (300–1400ms),
// overlay fades out (1500–2000ms), unmount at 2000ms.
const EXIT_AT_MS = 1500;
const REMOVE_AT_MS = 2000;

// Shown once per browser session — repeat visits skip straight to content.
const SESSION_KEY = 'valarx-splash-shown';

export default function SplashScreen() {
  const [phase, setPhase] = useState<'enter' | 'exit' | 'done'>('enter');

  useEffect(() => {
    // Owner decision (July 2026): animations run for everyone, so the splash
    // no longer skips itself on prefers-reduced-motion. Repeat visits within
    // a session still skip it.
    const skip = sessionStorage.getItem(SESSION_KEY) !== null;

    const timers: number[] = [];
    if (skip) {
      timers.push(window.setTimeout(() => setPhase('done'), 0));
    } else {
      sessionStorage.setItem(SESSION_KEY, '1');
      timers.push(window.setTimeout(() => setPhase('exit'), EXIT_AT_MS));
      timers.push(window.setTimeout(() => setPhase('done'), REMOVE_AT_MS));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-500 ${
        phase === 'exit' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <style>{`
        .splash-logo {
          animation: splash-in 0.7s var(--ease-smooth) both;
        }
        .splash-bar {
          transform: scaleX(0);
          transform-origin: left;
          animation: splash-fill 1.1s var(--ease-smooth) 0.3s both;
        }
        @keyframes splash-in {
          from { opacity: 0; transform: translateY(14px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes splash-fill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      <div className="splash-logo flex flex-col items-center gap-6">
        <Image src="/valarx.png" alt="" width={120} height={123} priority />
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-deepest">
          <div className="splash-bar h-full w-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
