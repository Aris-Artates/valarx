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
        <span className="font-mono text-sm font-medium uppercase tracking-widest text-accent/70">
          &gt; Connect
        </span>
        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Find the party</h1>
        <p className="max-w-xl text-lg text-ink/60">
          VALARX lives across a few channels. Announcements, event registrations,
          and everyday chat all flow through these &mdash; pick whichever fits you.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {links.map(({ label, description, href, cta }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} — ${cta} (opens in a new tab)`}
            className="btn-menu group flex flex-col items-start justify-between gap-4 rounded-xl border border-deepest bg-secondary p-6 sm:flex-row sm:items-center hover:border-accent/50 hover:bg-background-dark"
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-ink">{label}</p>
              <p className="text-sm text-ink/60">{description}</p>
            </div>
            <span className="shrink-0 rounded-full border border-accent/40 px-4 py-1.5 text-sm font-medium text-ink/80 transition-colors group-hover:border-accent group-hover:text-accent sm:ml-4">
              {cta}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
