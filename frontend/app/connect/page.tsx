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
        <span className="text-sm font-medium uppercase tracking-widest text-[#a7ff04]/70">
          Connect
        </span>
        <h1 className="text-4xl font-bold text-white">Get in touch</h1>
        <p className="max-w-xl text-lg text-white/60">
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
            className="group flex items-center justify-between rounded-xl border border-[#0f005c] bg-[#42169b] p-6 transition-colors hover:border-[#a7ff04]/50 hover:bg-[#230761]"
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-white">{label}</p>
              <p className="text-sm text-white/60">{description}</p>
            </div>
            <span className="ml-4 shrink-0 rounded-full border border-[#a7ff04]/40 px-4 py-1.5 text-sm font-medium text-white/80 transition-colors group-hover:border-[#a7ff04] group-hover:text-[#a7ff04]">
              {cta}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
