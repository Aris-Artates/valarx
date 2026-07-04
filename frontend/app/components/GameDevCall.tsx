import { DISCORD_URL } from '@/app/data/site';

const roles = [
  {
    title: 'Make your game',
    description:
      'You have a game you want to build. Bring it to the program for structure, feedback, and people who keep you moving.',
  },
  {
    title: 'Help build one',
    description:
      'Programmers, artists, writers, testers — join a project that needs your skills and learn by shipping something real.',
  },
  {
    title: 'Share an idea',
    description:
      'Got a concept worth exploring? Pitch it to the community and see it picked up by people who can make it playable.',
  },
];

/** Standing spotlight for the ongoing game-development program. */
export default function GameDevCall() {
  return (
    <section id="open-call" aria-labelledby="open-call-heading" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-2xl border border-deepest bg-secondary p-8 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-brand-tint" />

        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-accent">Now running</span>
            <h2 id="open-call-heading" className="text-2xl font-bold text-ink sm:text-3xl">
              Game Dev Open Call
            </h2>
            <p className="max-w-2xl text-ink/60">
              We&apos;re building games together. Whether you want to develop
              your own game, lend your skills to a team, or share an idea
              you&apos;d love to see made &mdash; there&apos;s a place for you
              in the program.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {roles.map(({ title, description }) => (
              <a
                key={title}
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} — join the Game Dev Open Call on Discord (opens in a new tab)`}
                className="card-grow ease-snap group flex flex-col gap-4 rounded-xl border border-deepest bg-background-dark/50 p-7 hover:border-accent/40"
              >
                <div className="h-px w-14 origin-left scale-x-50 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
                <p className="font-semibold text-ink">{title}</p>
                <p className="text-sm leading-6 text-ink/55">{description}</p>
                <span className="mt-auto inline-block text-sm font-medium text-ink/40 transition-all group-hover:translate-x-1 group-hover:text-accent">
                  Join in &rarr;
                </span>
              </a>
            ))}
          </div>

          <p className="text-sm text-ink/40">
            Everything is coordinated on Discord &mdash; introduce yourself in
            the game-dev channel and we&apos;ll take it from there.
          </p>
        </div>
      </div>
    </section>
  );
}
