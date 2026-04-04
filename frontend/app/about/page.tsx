export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-20">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-widest text-[#a7ff04]/70">
          About
        </span>
        <h1 className="text-4xl font-bold text-white">What is VALARX?</h1>
      </div>

      <div className="flex flex-col gap-6 text-lg leading-8 text-white/60">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { label: 'Lorem', value: '0000' },
          { label: 'Ipsum', value: 'Dolor' },
          { label: 'Amet', value: '0+' },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl border border-[#0f005c] bg-[#42169b] p-6 text-center"
          >
            <p className="text-3xl font-bold text-[#a7ff04]">{value}</p>
            <p className="mt-1 text-sm text-white/50">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
