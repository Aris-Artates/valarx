interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

const team: TeamMember[] = [
  {
    name: 'Lorem Ipsum',
    role: 'Dolor Sit Amet',
    bio: 'Arjay was here.',
    initials: 'LI',
  },
  {
    name: 'Consectetur',
    role: 'Adipiscing Elit',
    bio: 'Arjay was here.',
    initials: 'CE',
  },
  {
    name: 'Duis Aute',
    role: 'Irure Dolor',
    bio: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    initials: 'DA',
  },
];

export default function TeamPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-20">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-widest text-[#a7ff04]/70">
          Team
        </span>
        <h1 className="text-4xl font-bold text-white">Lorem ipsum dolor sit amet</h1>
        <p className="max-w-xl text-lg text-white/60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex flex-col gap-4 rounded-xl border border-[#0f005c] bg-[#42169b] p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0f005c] text-sm font-bold text-[#a7ff04]">
              {member.initials}
            </div>
            <div>
              <p className="font-semibold text-white">{member.name}</p>
              <p className="text-sm text-white/50">{member.role}</p>
            </div>
            <p className="text-sm leading-6 text-white/60">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
