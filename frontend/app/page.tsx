import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Layered backdrop: top glow + faint arcade grid, faded at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-arcade-grid mask-[radial-gradient(ellipse_at_center,black_35%,transparent_78%)]"
      />

      <div className="relative flex max-w-2xl flex-col items-center gap-8 text-center">
        <Image
          src="/valarx.png"
          alt="VALARX"
          width={140}
          height={35}
          priority
          className="object-contain"
        />

        <p className="font-mono text-xs uppercase tracking-widest text-accent/70 sm:text-sm">
          &gt; press start<span className="animate-pulse">_</span>
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-display">
          Welcome to VALARX
        </h1>

        <p className="max-w-xl text-ink/60">
          A community for people who want to understand games, not just play
          them &mdash; workshops, events, and builders learning side by side.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/event"
            className="btn-menu rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
          >
            View Events
          </Link>
          <a
            href="https://discord.gg/c5bBxaUN7D"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-menu rounded-full border border-accent/40 px-6 py-2.5 text-sm font-semibold text-ink hover:border-accent hover:bg-background-dark"
          >
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}
