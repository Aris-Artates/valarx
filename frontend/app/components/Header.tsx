"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DISCORD_URL } from "@/app/data/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // { href: '/team', label: 'Team' },
  { href: "/event", label: "Events" },
  { href: "/connect", label: "Connect" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-deepest bg-background/90 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto w-full max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="VALARX home" onClick={closeMenu} className="flex items-center gap-2.5 hover:scale-105">
            <Image
              src="/valarx.png"
              alt=""
              width={36}
              height={37}
              priority
              className="object-contain"
            />
            <span className="text-sm font-semibold tracking-[0.18em] text-ink">
              VALARX
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 sm:flex">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative py-1 text-sm font-medium transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left after:rounded-full after:bg-accent after:transition-transform after:duration-200 after:ease-out ${
                      isActive
                        ? "text-ink after:scale-x-100"
                        : "text-ink/60 after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
              >
                Join Discord
              </a>
            </li>
          </ul>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink/70 transition-colors hover:bg-secondary hover:text-ink sm:hidden"
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile panel */}
        {menuOpen && (
          <ul id="mobile-nav" className="flex flex-col gap-1 border-t border-deepest py-4 sm:hidden">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={closeMenu}
                    className={`block rounded-lg px-3 py-2 text-base font-medium hover:translate-x-1 ${
                      isActive
                        ? "bg-secondary text-ink"
                        : "text-ink/60 hover:bg-secondary/60 hover:text-ink"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 px-3">
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift inline-flex rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
              >
                Join Discord
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
