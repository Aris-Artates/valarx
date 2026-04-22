"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Person, SocialPlatform } from "@/app/data/events";

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const cls = "h-4 w-4";
  switch (platform) {
    case "linkedin":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "twitter":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "github":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    case "facebook":
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return (
        <svg
          className={cls}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}

function CardContent({ person, size }: { person: Person; size: "sm" | "lg" }) {
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarText = size === "lg" ? "" : "text-lg";

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* Full background — avatar */}
      <div
        className={`flex flex-2 w-full items-center justify-center bg-[#0f005c] ${avatarText} font-bold text-[#a7ff04] overflow-hidden`}
      >
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            width={size === "lg" ? 96 : 64}
            height={size === "lg" ? 96 : 64}
            className="h-full w-full object-cover"
          />
        ) : (
          <span style={size === "lg" ? { fontSize: "6vh" } : undefined}>
            {initials}
          </span>
        )}
      </div>
      <div className="flex-1" />

      {/* Floating text overlay */}
      <div
        className={
          size === "lg"
            ? "absolute bottom-0 left-0 flex flex-col items-start text-left bg-linear-to-b from-[#230761]/90 to-transparent"
            : "absolute bottom-0 inset-x-0 flex flex-col items-center justify-end text-center bg-linear-to-t from-[#230761]/90 to-transparent"
        }
        style={
          size === "lg"
            ? { padding: "1vh 1.5vh", gap: "0.1vh" }
            : { padding: "12px 8px 6px", gap: "2px" }
        }
      >
        <p
          className="font-semibold leading-tight text-white whitespace-nowrap"
          style={{ fontSize: size === "lg" ? "1.8vh" : "9px" }}
        >
          {person.name}
        </p>
        <p
          className="w-full truncate text-white/70 leading-none"
          style={{ fontSize: size === "lg" ? "1.2vh" : "8px" }}
        >
          {person.title}
        </p>
        {person.socials && person.socials.length > 0 && (
          <div
            className="flex gap-2"
            style={{ marginTop: size === "lg" ? "0.5vh" : "2px" }}
          >
            {person.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/40 transition-colors hover:text-[#a7ff04]"
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ExpandedCard({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = (-dy * 18).toFixed(2);
    const rotY = (dx * 18).toFixed(2);
    setTransform(
      `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`,
    );
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 0.15,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setGlare((g) => ({ ...g, opacity: 0 }));
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-[#0f005c]/60 backdrop-blur-md" />

      {/* 3D card container */}
      <div
        style={{ perspective: "1000px" }}
        className="relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform,
            transition: "transform 0.12s ease-out",
            transformStyle: "preserve-3d",
            boxShadow: "0 3vh 6vh -1.5vh #0f005c",
          }}
          className="relative flex h-[50vh] aspect-5/7 flex-col items-center bg-[#230761] text-center overflow-hidden"
        >
          <CardContent person={person} size="lg" />
          {/* Glare overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(167,255,4,${glare.opacity}) 0%, transparent 70%)`,
              transition: "opacity 0.12s ease-out",
            }}
          />
        </div>
      </div>

      {/* Hint */}
      <p
        className="absolute bottom-8 text-white/30"
        style={{ fontSize: "clamp(8px, 1.5vh, 12px)" }}
      >
        Click anywhere to go back
      </p>
    </div>,
    document.body,
  );
}

export default function PersonCard({ person }: { person: Person }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        onClick={() => setExpanded(true)}
        className="flex h-full cursor-pointer flex-col items-center justify-center gap-3 bg-[#230761] text-center transition-colors overflow-hidden p-0"
        style={{ boxShadow: "0 0 0 1px rgba(167,255,4,0.2)" }}
      >
        <CardContent person={person} size="sm" />
      </div>

      {expanded && (
        <ExpandedCard person={person} onClose={() => setExpanded(false)} />
      )}
    </>
  );
}
