import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Team' },
  { href: '/event', label: 'Events' },
  { href: '/connect', label: 'Connect' },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/90 backdrop-blur">
      <nav className="relative flex w-full items-center px-6 py-4">
        {/* Logo — pinned left */}
        <Link href="/" className="flex items-center">
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
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
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
