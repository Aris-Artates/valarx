const SALT = 'valarx-event';

/**
 * Returns a deterministic, obfuscated hash of an event ID for use in URLs.
 * Uses FNV-1a (32-bit) encoded as base-36 to keep URLs short and opaque.
 */
export function hashEventId(id: string): string {
  const input = SALT + id;
  let hash = 2166136261; // FNV-1a offset basis
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619) >>> 0; // FNV prime, keep 32-bit unsigned
  }
  return hash.toString(36);
}

/**
 * Finds an event by its hashed URL param.
 * Hashes each event's raw ID and compares against the param.
 */
export function findEventByHash<T extends { id: string }>(
  events: T[],
  hash: string,
): T | undefined {
  return events.find((e) => hashEventId(e.id) === hash);
}
