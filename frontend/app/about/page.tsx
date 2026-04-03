export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-20">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          About
        </span>
        <h1 className="text-4xl font-bold text-white">What is VALARX?</h1>
      </div>

      <div className="flex flex-col gap-6 text-lg leading-8 text-zinc-400">
        <p>
          VALARX is a community-first platform created to bring builders, learners, and
          leaders together. We host webinars, workshops, summits, and hackathons designed
          to help people grow, collaborate, and ship real work.
        </p>
        <p>
          We believe in open knowledge, honest feedback, and building in public. Whether
          you are just starting out or have years of experience, there is a place for you
          in the VALARX community.
        </p>
        <p>
          Our events are free to attend and run across Discord, Luma, and other online
          platforms to stay accessible to everyone, everywhere.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { label: 'Founded', value: '2025' },
          { label: 'Community', value: 'Global' },
          { label: 'Events', value: '5+' },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center"
          >
            <p className="text-3xl font-bold text-white">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
