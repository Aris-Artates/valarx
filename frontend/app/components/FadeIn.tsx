'use client';

import { useEffect, useRef, useState } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  fadeOut?: boolean;
}

export default function FadeIn({ children, className = '', delay = 0, fadeOut = false }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!fadeOut) observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fadeOut]);

  useEffect(() => {
    if (!fadeOut) return;

    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const fadeStart = window.innerHeight * 0.6;
      const fadeEnd = window.innerHeight * 0.1;

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
  }, [fadeOut]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: fadeOut && opacity !== undefined ? opacity : visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 1s ease ${delay}ms, transform 1s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
