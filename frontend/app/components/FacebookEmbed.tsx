'use client';

import { ArchiveItem } from '@/app/data/events';

/**
 * Embeds a public Facebook post or video directly from facebook.com via
 * Facebook's iframe plugin endpoints — no SDK, no access token, and the
 * media is never re-uploaded; it streams from Facebook itself.
 */
export default function FacebookEmbed({ item }: { item: ArchiveItem }) {
  const video = item.type === 'video';
  const src =
    `https://www.facebook.com/plugins/${video ? 'video' : 'post'}.php` +
    `?href=${encodeURIComponent(item.url)}&show_text=true&width=500`;

  return (
    <figure className="flex w-full max-w-[500px] flex-col gap-2">
      <div
        className={`overflow-hidden rounded-xl border border-deepest bg-background-dark ${
          video ? 'aspect-video' : 'h-[560px]'
        }`}
      >
        <iframe
          src={src}
          title={item.caption ?? `Facebook ${item.type} from the VALARX page`}
          className="h-full w-full"
          style={{ border: 'none', overflow: 'hidden' }}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      {item.caption && (
        <figcaption className="text-xs text-ink/40">{item.caption}</figcaption>
      )}
    </figure>
  );
}
