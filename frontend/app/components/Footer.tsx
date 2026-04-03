import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-black">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} VALARX. All rights reserved.
        </p>

        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            About
          </Link>
          <Link
            href="/event"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            Events
          </Link>
          <Link
            href="/connect"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            Connect
          </Link>
          <a
            href="https://discord.gg/5Bq9Vu39"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            Discord
          </a>
        </nav>
      </div>
    </footer>
  );
}
