import Link from 'next/link';
import FadeIn from '../components/FadeIn';
import { DISCORD_URL } from '@/app/data/site';

const programs = [
  {
    number: '01',
    title: 'Programming fundamentals',
    description:
      'Taught in context, not in isolation. Concepts land differently when there is something to build toward.',
  },
  {
    number: '02',
    title: 'Scripting in game environments',
    description:
      'Lua and similar tools applied to platforms you already know and care about.',
  },
  {
    number: '03',
    title: 'Project-based skill building',
    description:
      'Small, completable projects that build real confidence and compound over time.',
  },
];

const groups = [
  {
    label: 'Aspiring programmers',
    description:
      'People taking their first real steps. VALARX gives them a starting point grounded in games, so the subject matter is already interesting before the first line of code is written.',
  },
  {
    label: 'Game developers',
    description:
      'Hobbyists, solo devs, and small teams. People somewhere in the middle of the journey who want honest feedback and a place to keep moving forward.',
  },
  {
    label: 'Game enthusiasts',
    description:
      'Deep fans who follow development and want to understand why games work the way they do. Their perspective sharpens everyone around them.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 py-20">
      {/* Hero */}
      <FadeIn className="flex max-w-3xl flex-col gap-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-accent">
          About VALARX
        </span>
        <h1 className="text-4xl font-bold leading-tight text-ink sm:text-5xl">
          Sharing knowledge, not just storing it.
        </h1>
        <p className="text-lg leading-8 text-ink/60">
          VALARX is a community built around one idea: understanding games is
          just as rewarding as playing them. We bring together aspiring
          programmers, developers, and enthusiasts to share knowledge, build
          skills, and grow alongside each other.
        </p>
      </FadeIn>

      {/* Mission */}
      <FadeIn className="grid gap-10 border-t border-deepest pt-16 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
            Our mission
          </span>
          <h2 className="text-3xl font-bold text-ink">
            The moment something clicks.
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-base leading-7 text-ink/60">
          <p>
            There is a difference between reading about game development and
            actually sitting down, writing a script, and watching something
            move on screen because you made it happen.
          </p>
          <p>
            That moment is what VALARX is built around. We are here to help
            people collect more of those moments: the ones where a concept
            stops being abstract, where you realize you are not just a player
            anymore.
          </p>
        </div>
      </FadeIn>

      {/* Approach */}
      <FadeIn className="grid gap-10 border-t border-deepest pt-16 lg:grid-cols-[2fr_3fr]">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
            How we teach
          </span>
          <h2 className="text-3xl font-bold text-ink">
            Practical by design.
          </h2>
        </div>
        <div className="flex flex-col gap-5 text-base leading-7 text-ink/60">
          <p>Most people do not need another lecture. They need a reason to try.</p>
          <p>
            Our workshops use real tools, real environments, and real problems.
            That means breaking down programming fundamentals like Lua, not as
            an academic exercise, but as a means to actually script something
            inside a game you recognize. The theory follows the experience, not
            the other way around.
          </p>
          <p>
            Game platforms are among the best sandboxes that exist for learning
            to code. The feedback is immediate, the context is familiar, and
            the motivation is built in. When you can see your logic play out in
            a game world, debugging stops feeling like a chore and starts
            feeling like problem-solving.
          </p>
        </div>
      </FadeIn>

      {/* What we do */}
      <FadeIn className="flex flex-col gap-8 border-t border-deepest pt-16">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
            What we do
          </span>
          <h2 className="text-3xl font-bold text-ink">Three ways we learn.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {programs.map(({ number, title, description }) => (
            <div
              key={number}
              className="flex flex-col gap-4 rounded-xl border border-deepest bg-secondary p-8"
            >
              <span className="text-2xl font-bold text-accent/40">{number}</span>
              <p className="font-semibold text-ink">{title}</p>
              <p className="text-sm leading-6 text-ink/55">{description}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Who it's for */}
      <FadeIn className="flex flex-col gap-8 border-t border-deepest pt-16">
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
              Who it&apos;s for
            </span>
            <h2 className="text-3xl font-bold text-ink">
              Three groups. One space.
            </h2>
          </div>
          <p className="self-end text-base leading-7 text-ink/60">
            VALARX is made up of three groups, and the value comes from how
            they overlap. These are not separate tracks. They are the same
            space, and the mixing is intentional.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {groups.map(({ label, description }) => (
            <div
              key={label}
              className="flex flex-col gap-4 rounded-xl border border-deepest bg-secondary p-7"
            >
              <div className="h-px w-8 bg-accent" />
              <p className="font-semibold text-ink">{label}</p>
              <p className="text-sm leading-6 text-ink/55">{description}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Straight talk */}
      <FadeIn className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl border border-deepest bg-background-dark/60 p-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
            Straight talk
          </span>
          <h2 className="text-2xl font-bold text-ink">What we are not.</h2>
        </div>
        <p className="text-base leading-8 text-ink/60">
          VALARX is not a bootcamp with a certificate at the end. It is not a
          platform with a finish line. Progress here is real, which means it is
          sometimes slow. That is fine. We&apos;re here to leave you skills you
          can use, not credentials you have to stretch the truth to earn.
        </p>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-deepest bg-secondary p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-ink">
              Sound like your kind of place?
            </h2>
            <p className="max-w-md text-sm text-ink/55">
              Join the Discord, come to a session, and see how it fits.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent hover:bg-accent-hover"
            >
              Join Discord
            </a>
            <Link
              href="/event"
              className="btn-lift rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink/50"
            >
              View events
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
