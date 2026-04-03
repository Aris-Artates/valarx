import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#0f005c] bg-[#230761]">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-white/40">
          &copy; {new Date().getFullYear()} VALARX. All rights reserved.
        </p>

        <nav className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-sm text-white/40 transition-colors hover:text-[#a7ff04]"
          >
            About
          </Link>
          <Link
            href="/event"
            className="text-sm text-white/40 transition-colors hover:text-[#a7ff04]"
          >
            Events
          </Link>
          <Link
            href="/connect"
            className="text-sm text-white/40 transition-colors hover:text-[#a7ff04]"
          >
            Connect
          </Link>
          <a
            href="https://discord.gg/5Bq9Vu39"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-white/40 transition-colors hover:text-[#a7ff04]"
          >
            Discord
          </a>
        </nav>
      </div>
    </footer>
  );
}
