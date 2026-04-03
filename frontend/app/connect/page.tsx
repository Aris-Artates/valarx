interface LinkItem {
  label: string;
  description: string;
  href: string;
  cta: string;
}

const links: LinkItem[] = [
  {
    label: 'Discord',
    description: 'Chat with the community, get updates, and join voice events.',
    href: 'https://discord.gg/5Bq9Vu39',
    cta: 'Join Discord',
  },
  {
    label: 'Facebook',
    description: 'Follow our page for announcements and event highlights.',
    href: 'https://www.facebook.com/profile.php?id=61586341747138',
    cta: 'Follow on Facebook',
  },
  {
    label: 'Luma',
    description: 'Register for upcoming webinars and live events on Luma.',
    href: 'https://luma.com/create',
    cta: 'View on Luma',
  },
];

export default function ConnectPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-20">
      <div className="flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Connect
        </span>
        <h1 className="text-4xl font-bold text-white">Get in touch</h1>
        <p className="max-w-xl text-lg text-zinc-400">
          Find us on the platforms where we are most active. All events are free and open
          to anyone interested.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {links.map(({ label, description, href, cta }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-600 hover:bg-zinc-800"
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-white">{label}</p>
              <p className="text-sm text-zinc-400">{description}</p>
            </div>
            <span className="ml-4 flex-shrink-0 rounded-full border border-zinc-700 px-4 py-1.5 text-sm font-medium text-zinc-300 transition-colors group-hover:border-zinc-500 group-hover:text-white">
              {cta}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
