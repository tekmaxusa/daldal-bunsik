/** Carrollton, TX — America/Chicago. Open Mon, Tue, Thu–Sun 11:00–20:30; closed Wed. */
const OPEN_DAYS = new Set(['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun']);

const OPEN_START_MIN = 11 * 60;
const OPEN_END_MIN = 20 * 60 + 30;

function chicagoTimeParts(date: Date): { weekday: string; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date);

  let weekday = '';
  let hour = 0;
  let minute = 0;
  for (const p of parts) {
    if (p.type === 'weekday') weekday = p.value;
    if (p.type === 'hour') hour = Number.parseInt(p.value, 10) || 0;
    if (p.type === 'minute') minute = Number.parseInt(p.value, 10) || 0;
  }
  return { weekday, minutes: hour * 60 + minute };
}

export function isCarrolltonStoreOpen(date = new Date()): boolean {
  const { weekday, minutes } = chicagoTimeParts(date);
  if (!OPEN_DAYS.has(weekday)) return false;
  return minutes >= OPEN_START_MIN && minutes < OPEN_END_MIN;
}

/**
 * Weekday label (e.g. "Mon") for a calendar YYYY-MM-DD in America/Chicago.
 * Uses a midday anchor in UTC so the date is not confused near zone offsets.
 */
export function chicagoWeekdayFromCalendarDate(ymd: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return null;
  const y = Number.parseInt(m[1], 10);
  const mo = Number.parseInt(m[2], 10);
  const d = Number.parseInt(m[3], 10);
  const instant = new Date(Date.UTC(y, mo - 1, d, 18, 0, 0));
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short',
  }).formatToParts(instant);
  const w = parts.find((p) => p.type === 'weekday')?.value;
  return w ?? null;
}

/** True if the store is open on this calendar date in Chicago (ignores time of day). */
export function isCarrolltonOpenOnCalendarDate(ymd: string): boolean {
  const w = chicagoWeekdayFromCalendarDate(ymd);
  return w != null && OPEN_DAYS.has(w);
}

/** Parsed HH:mm as minutes since midnight; null if invalid. */
export function parseClockHm(hm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hm.trim());
  if (!m) return null;
  const h = Number.parseInt(m[1], 10);
  const min = Number.parseInt(m[2], 10);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

/**
 * Whether a pickup/delivery slot falls within posted hours (interpreted in America/Chicago).
 */
export function isWithinCarrolltonPostedHours(ymd: string, hm: string): boolean {
  if (!isCarrolltonOpenOnCalendarDate(ymd)) return false;
  const mins = parseClockHm(hm);
  if (mins == null) return false;
  return mins >= OPEN_START_MIN && mins < OPEN_END_MIN;
}
