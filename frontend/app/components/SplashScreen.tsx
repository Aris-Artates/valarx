'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// How long the bobbing phase lasts before the exit begins.
const SHOW_MS = 2000;

// Must cover the full exit sequence:
//   logo slide  → 0.6s  (starts at 0ms)
//   overlay fade → 0.4s  (starts at 0.55s delay)  →  last frame at 0.95s
// Add 50ms buffer → 1000ms total exit window.
const REMOVE_MS = SHOW_MS + 1000;

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Timer 1 — triggers exit animations.
    const fadeTimer = setTimeout(() => setIsFading(true), SHOW_MS);
    // Timer 2 — unmounts the component after animations complete.
    const removeTimer = setTimeout(() => setIsVisible(false), REMOVE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes splash-bob {
          0%, 100% { transform: translateY(0px);   animation-timing-function: ease-in-out; }
          50%       { transform: translateY(-24px); animation-timing-function: ease-in-out; }
        }
        @keyframes splash-exit-logo {
          from { transform: translateY(0); }
          to   { transform: translateY(120vh); }
        }
      `}</style>

      {/* Overlay — CSS transition handles the fade (no animationend race condition) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          pointerEvents: isFading ? 'none' : 'auto',
          opacity: isFading ? 0 : 1,
          transition: 'opacity 0.4s ease-in 0.55s',
        }}
      >
        {/* Logo — switches from bob to slide-down when isFading */}
        <div
          style={{
            animation: isFading
              ? 'splash-exit-logo 0.6s ease-in forwards'
              : 'splash-bob 1.5s ease-in-out infinite',
          }}
        >
          <Image src="/valarx.png" alt="VALARX" width={160} height={40} priority />
        </div>
      </div>
    </>
  );
}
