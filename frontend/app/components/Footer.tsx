import Link from 'next/link';
import { DISCORD_URL } from '@/app/data/site';

export default function Footer() {
  return (
    <footer className="w-full border-t border-deepest bg-background-dark">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-ink/40">
          &copy; {new Date().getFullYear()} VALARX. All rights reserved.
        </p>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/about"
            className="text-sm text-ink/40 transition-colors hover:text-accent"
          >
            About
          </Link>
          <Link
            href="/event"
            className="text-sm text-ink/40 transition-colors hover:text-accent"
          >
            Events
          </Link>
          <Link
            href="/connect"
            className="text-sm text-ink/40 transition-colors hover:text-accent"
          >
            Connect
          </Link>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink/40 transition-colors hover:text-accent"
          >
            Discord
          </a>
        </nav>
      </div>
    </footer>
  );
}
