'use client';

import { Event } from '@/app/data/events';

interface TimelineBarProps {
  events: Event[];
  activeId: string | null;
  onSelect: (event: Event) => void;
}

export default function TimelineBar({ events, activeId, onSelect }: TimelineBarProps) {
  return (
    <div className="relative flex flex-col items-center py-8">
      {/* Vertical line — only rendered when there are multiple events to connect */}
      {events.length > 1 && (
        <div className="absolute top-8 bottom-8 left-1/2 w-px -translate-x-1/2 bg-zinc-700" />
      )}

      <div className="relative flex flex-col gap-12">
        {events.map((event) => {
          const isActive = event.id === activeId;
          return (
            <button
              key={event.id}
              onClick={() => onSelect(event)}
              title={event.title}
              className="group relative flex flex-col items-center"
            >
              {/* Circle marker */}
              <span
                className={`
                  relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-200
                  ${isActive
                    ? 'scale-125 border-white bg-white'
                    : 'border-zinc-500 bg-zinc-900 group-hover:border-white group-hover:bg-zinc-700'
                  }
                `}
              />
              {/* Month label */}
              <span className="mt-1 text-[10px] text-zinc-600 group-hover:text-zinc-400">
                {event.month}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
