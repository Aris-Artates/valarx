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
        <span className="text-sm font-medium uppercase tracking-widest text-accent/70">
          Team
        </span>
        <h1 className="text-4xl font-bold text-ink">Lorem ipsum dolor sit amet</h1>
        <p className="max-w-xl text-lg text-ink/60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex flex-col gap-4 rounded-xl border border-deepest bg-secondary p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-deepest text-sm font-bold text-accent">
              {member.initials}
            </div>
            <div>
              <p className="font-semibold text-ink">{member.name}</p>
              <p className="text-sm text-ink/50">{member.role}</p>
            </div>
            <p className="text-sm leading-6 text-ink/60">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
