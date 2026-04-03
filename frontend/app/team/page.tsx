interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

const team: TeamMember[] = [
  {
    name: 'Aris Artates',
    role: 'Founder & Lead',
    bio: 'Driving the vision and direction of VALARX. Passionate about building communities and creating opportunities for everyone.',
    initials: 'AA',
  },
  {
    name: 'Core Team',
    role: 'Operations & Events',
    bio: 'The backbone of every VALARX event — managing logistics, content, and community engagement behind the scenes.',
    initials: 'CT',
  },
  {
    name: 'Community Leads',
    role: 'Discord & Outreach',
    bio: 'Moderating our spaces, welcoming new members, and keeping conversations productive and inclusive.',
    initials: 'CL',
  },
];

export default function TeamPage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-20">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Team
        </span>
        <h1 className="text-4xl font-bold text-white">The people behind VALARX</h1>
        <p className="max-w-xl text-lg text-zinc-400">
          A small but dedicated group of builders, organizers, and community leaders
          who make everything happen.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700 text-sm font-bold text-white">
              {member.initials}
            </div>
            <div>
              <p className="font-semibold text-white">{member.name}</p>
              <p className="text-sm text-zinc-500">{member.role}</p>
            </div>
            <p className="text-sm leading-6 text-zinc-400">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
