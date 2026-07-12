'use client';

import { ArchiveItem } from '@/app/data/events';

/**
 * Embeds a public Facebook post or video directly from facebook.com via
 * Facebook's iframe plugin endpoints — no SDK, no access token, and the
 * media is never re-uploaded; it streams from Facebook itself.
 *
 * Videos render as a bare player (no post chrome) so they sit cleanly in
 * the event modal; photo/text posts keep Facebook's frame since the post
 * body IS the content.
 */
export default function FacebookEmbed({ item }: { item: ArchiveItem }) {
  const video = item.type === 'video';
  const portrait = video && item.portrait;
  const src = video
    ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.url)}&show_text=false&width=${portrait ? 360 : 720}`
    : `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(item.url)}&show_text=true&width=500`;

  return (
    <figure
      className={`flex w-full flex-col gap-2 ${
        portrait ? 'max-w-[360px]' : video ? 'max-w-[720px]' : 'max-w-[500px]'
      }`}
    >
      <div
        className={`overflow-hidden rounded-xl border border-deepest bg-background-dark ${
          portrait ? 'aspect-[9/16]' : video ? 'aspect-video' : 'h-[560px]'
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
        <figcaption className="flex items-center gap-2 text-xs text-ink/40">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent/60" />
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}
