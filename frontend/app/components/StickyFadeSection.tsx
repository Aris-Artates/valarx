'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function StickyFadeSection({ children, className = '' }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const fadeStart = window.innerHeight * 0.6;
      const fadeEnd = window.innerHeight * 0.2;

      if (rect.bottom > fadeStart) {
        setOpacity(1);
      } else if (rect.bottom < fadeEnd) {
        setOpacity(0);
      } else {
        setOpacity((rect.bottom - fadeEnd) / (fadeStart - fadeEnd));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={wrapperRef} className="flex flex-col">
      <div
        className={`sticky top-36 flex flex-col bg-[#1a0660]/60 rounded-xl p-12 transition-opacity duration-100 ${className}`}
        style={{ opacity }}
      >
        {children}
      </div>
    </div>
  );
}
