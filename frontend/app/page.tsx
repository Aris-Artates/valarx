import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <Image
          src="/valarx.png"
          alt="VALARX"
          width={140}
          height={35}
          priority
          className="object-contain"
        />

        <h1 className="text-5xl font-bold tracking-tight text-white">
          Welcome to VALARX
        </h1>

        <p className="max-w-lg text-lg leading-8 text-white/60">
          A community built for builders. Join our webinars, workshops, and summits —
          or follow along on Discord and Facebook.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/event"
            className="rounded-full bg-[#a7ff04] px-6 py-2.5 text-sm font-semibold text-[#0f005c] transition-colors hover:bg-[#91db03]"
          >
            View Events
          </Link>
          <a
            href="https://discord.gg/5Bq9Vu39"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-[#a7ff04]/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#a7ff04] hover:bg-[#230761]"
          >
            Join Discord
          </a>
        </div>
      </div>
    </div>
  );
}
