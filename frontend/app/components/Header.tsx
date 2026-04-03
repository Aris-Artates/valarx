'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/event', label: 'Events' },
  { href: '/connect', label: 'Connect' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#0f005c] bg-[#300a86]/95 backdrop-blur">
      <nav className="relative flex w-full min-h-16 items-center px-6 py-4">
        {/* Logo — pinned left, hidden on small screens */}
        <Link href="/" className="hidden sm:flex items-center">
          <Image
            src="/valarx.png"
            alt="VALARX"
            width={64}
            height={16}
            priority
            className="object-contain"
          />
        </Link>

        {/* Nav links — absolutely centred in the full header width */}
        <ul className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm sm:text-base font-medium transition-colors hover:text-[#a7ff04] ${
                  pathname === href ? 'text-[#a7ff04]' : 'text-white/70'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
