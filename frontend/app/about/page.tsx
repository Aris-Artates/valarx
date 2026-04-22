import FadeIn from '../components/FadeIn';
import StickyFadeSection from '../components/StickyFadeSection';

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col px-24 py-24">

      {/* Hero */}
      <FadeIn className="flex min-h-screen flex-col items-center justify-start gap-6 mb-24 pt-24 text-center">
        <div className="flex flex-col items-center gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a7ff04]">
            About Valarx
          </span>
          <h1 className="whitespace-nowrap text-5xl font-bold italic leading-tight text-white">
            Sharing knowledge, not just storing it.
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-x-8 w-full">
          {/* Mission — left */}
          <StickyFadeSection>
              <div className="flex flex-col gap-4 text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a7ff04]/60">
                  Mission
                </span>
                <h2 className="text-3xl font-bold text-white">
                  The moment something clicks.
                </h2>
              </div>
              <div className="mt-24 flex flex-col gap-5 text-base leading-5 text-white/60 w-full">
                <p>
                  There is a difference between reading about game development and
                  actually sitting down, writing a script, and watching something move
                  on screen because you made it happen.
                </p>
                <p>
                  That moment is what Valarx is built around. We are here to help
                  people collect more of those moments: the ones where a concept stops
                  being abstract, where you realize you are not just a player anymore.
                </p>
              </div>
          </StickyFadeSection>

          {/* Center */}
          <div className="relative min-h-[200vh]">
            <p className="text-lg leading-8 text-white/60">
              Valarx is a community built around one idea: understanding games is just
              as rewarding as playing them. We bring together aspiring programmers,
              developers, and enthusiasts to share knowledge, build skills, and grow
              alongside each other.
            </p>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-transparent to-[#300a86]" />
          </div>

          {/* Education — right */}
          <StickyFadeSection>
            <div className="flex flex-col gap-4 text-right">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a7ff04]/60">
                Education
              </span>
              <h2 className="text-3xl font-bold text-white">
                How we approach learning.
              </h2>
            </div>
            <div className="mt-24 flex flex-col gap-5 text-base leading-5 text-white/60 w-full">
              <p>
                Most people do not need another lecture. They need a reason to try.
              </p>
              <p>
                At Valarx, education is built around doing. Our workshops are
                practical by design. We pick real tools, real environments, and real
                problems. That means breaking down programming fundamentals like Lua,
                not as an academic exercise, but as a means to actually script
                something inside a game you recognize. The theory follows the
                experience, not the other way around.
              </p>
              <p>
                Game platforms are among the best sandboxes that exist for learning
                to code. The feedback is immediate, the context is familiar, and the
                motivation is built in. When you can see your logic play out in a
                game world, debugging stops feeling like a chore and starts feeling
                like problem-solving.
              </p>
            </div>
          </StickyFadeSection>
        </div>
      </FadeIn>

      {/* How We Learn cards */}
      <StickyFadeSection>
        <div className="mb-24 flex flex-col gap-12">
        <div className="grid gap-px overflow-hidden rounded-xl border border-[#0f005c] sm:grid-cols-3">
          {[
            {
              number: '01',
              title: 'Programming Fundamentals',
              desc: 'Taught in context, not in isolation. Concepts land differently when there is something to build toward.',
            },
            {
              number: '02',
              title: 'Scripting in Game Environments',
              desc: 'Lua and similar tools applied to platforms you already know and care about.',
            },
            {
              number: '03',
              title: 'Project-Based Skill Building',
              desc: 'Small, completable projects that build real confidence and compound over time.',
            },
          ].map(({ number, title, desc }) => (
            <div key={number} className="flex flex-col gap-4 bg-[#1a0660]/60 p-8">
              <span className="text-2xl font-bold text-[#a7ff04]/30">{number}</span>
              <p className="font-semibold text-white">{title}</p>
              <p className="text-sm leading-6 text-white/50">{desc}</p>
            </div>
          ))}
        </div>
        </div>
      </StickyFadeSection>

      {/* Community */}
      <div className="relative">
      <div className="-mx-24 h-px bg-[#0f005c]" />
      <FadeIn className="mb-24 flex flex-col gap-12 pt-12 shadow-[0_40px_60px_20px_#300a86]">
        <div className="grid gap-12 sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a7ff04]/60">
              Community
            </span>
            <h2 className="text-3xl font-bold text-white">
              Three groups. One space.
            </h2>
          </div>
          <p className="self-end text-base leading-8 text-white/60">
            Valarx is made up of three groups, and the value comes from how they
            overlap. These are not separate tracks. They are the same space, and
            the mixing is intentional.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              label: 'Aspiring Programmers',
              desc: 'People taking their first real steps. Valarx gives them a starting point grounded in games, so the subject matter is already interesting before the first line of code is written.',
            },
            {
              label: 'Game Developers',
              desc: 'Hobbyists, solo devs, and small teams. People somewhere in the middle of the journey who want honest feedback and a place to keep moving forward.',
            },
            {
              label: 'Game Enthusiasts',
              desc: 'Deep fans who follow development and want to understand why games work the way they do. Their perspective sharpens everyone around them.',
            },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="flex flex-col gap-4 rounded-xl border border-[#0f005c] bg-[#42169b]/50 p-7"
            >
              <div className="h-px w-8 bg-[#a7ff04]" />
              <p className="font-semibold text-white">{label}</p>
              <p className="text-sm leading-6 text-white/55">{desc}</p>
            </div>
          ))}
        </div>


      </FadeIn>
      </div>

      {/* What We Are Not */}
      <FadeIn className="mx-auto max-w-3xl flex flex-col gap-8 rounded-2xl border border-[#0f005c] bg-[#1a0660]/40 p-10">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a7ff04]/60">
            Honest
          </span>
          <h2 className="text-2xl font-bold text-white">What we are not.</h2>
        </div>
        <p className="self-center text-base leading-8 text-white/60">
          Valarx is not a bootcamp with a certificate at the end. It is not a
          platform with a finish line. Progress here is real, which means it is
          sometimes slow. That is fine. We&apos;re here to leave you skills you can use,
          not credentials you have to stretch the truth to earn.
        </p>
      </FadeIn>

    </div>
  );
}
