import { Event } from '@/app/data/events';

export type EventStatus = 'upcoming' | 'ongoing' | 'completed';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/**
 * Parses an ISO value. Date-only strings ("YYYY-MM-DD") are treated as LOCAL
 * dates so an event's status flips at local midnight, not UTC midnight.
 */
function parseIso(value: string, endOfDay: boolean): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split('-').map(Number);
    return endOfDay ? new Date(y, m - 1, d, 23, 59, 59, 999) : new Date(y, m - 1, d);
  }
  return new Date(value);
}

/** Parses the display string "April, 2026" into that month's date range. */
function parseMonthRange(dateStr: string): { start: Date; end: Date } | null {
  const [month, year] = dateStr.split(', ');
  const monthIndex = MONTHS.indexOf(month);
  if (monthIndex === -1 || !year) return null;
  return {
    start: new Date(parseInt(year), monthIndex, 1),
    end: new Date(parseInt(year), monthIndex + 1, 0, 23, 59, 59, 999),
  };
}

/**
 * Derives an event's status from its dates.
 *
 * With ISO `startDate`/`endDate`: precise upcoming → ongoing → completed.
 * Fallback (only the "Month, YYYY" display string): completed after the
 * month's last day, otherwise upcoming — `ongoing` is only reachable with
 * ISO dates, so an event never shows as "LIVE" for a whole month.
 */
export function getEventStatus(event: Event, now: Date = new Date()): EventStatus {
  if (event.startDate) {
    const start = parseIso(event.startDate, false);
    const end = event.endDate ? parseIso(event.endDate, true) : parseIso(event.startDate, true);
    if (now < start) return 'upcoming';
    if (now <= end) return 'ongoing';
    return 'completed';
  }

  const range = parseMonthRange(event.date);
  if (!range) return 'upcoming';
  return now > range.end ? 'completed' : 'upcoming';
}

/** Best-known start date for sorting; falls back to the display month. */
export function getEventSortDate(event: Event): number {
  if (event.startDate) return parseIso(event.startDate, false).getTime();
  const range = parseMonthRange(event.date);
  return range ? range.start.getTime() : 0;
}

/** Whole days until the event starts (needs an ISO startDate). */
export function daysUntil(event: Event, now: Date = new Date()): number | null {
  if (!event.startDate) return null;
  const start = parseIso(event.startDate, false);
  const ms = start.getTime() - now.getTime();
  if (ms <= 0) return null;
  return Math.ceil(ms / 86_400_000);
}

/** Epoch ms of the event's precise start — only when an ISO startDate exists. */
export function getEventStartTime(event: Event): number | null {
  if (!event.startDate) return null;
  return parseIso(event.startDate, false).getTime();
}

/**
 * The single most relevant event to spotlight:
 * happening now → soonest upcoming → most recently completed.
 */
export function pickFeaturedEvent(
  events: Event[],
  now: Date = new Date(),
): { event: Event; status: EventStatus } | null {
  const withStatus = events.map((event) => ({
    event,
    status: getEventStatus(event, now),
  }));

  const soonestFirst = (a: { event: Event }, b: { event: Event }) =>
    getEventSortDate(a.event) - getEventSortDate(b.event);

  const ongoing = withStatus.filter((x) => x.status === 'ongoing').sort(soonestFirst);
  if (ongoing.length > 0) return ongoing[0];

  const upcoming = withStatus.filter((x) => x.status === 'upcoming').sort(soonestFirst);
  if (upcoming.length > 0) return upcoming[0];

  const completed = withStatus
    .filter((x) => x.status === 'completed')
    .sort((a, b) => getEventSortDate(b.event) - getEventSortDate(a.event));
  return completed[0] ?? null;
}
