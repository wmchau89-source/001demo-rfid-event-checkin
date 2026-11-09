export const STORAGE_KEYS = {
  attendees: "attendeesState",
  scan: "scanEvent",
  draw: "drawEvent",
};

const SEED_ATTENDEES = [
  { tagId: "001", name: "Alex Wong", tier: "VIP", routing: "Table 4, Seat B", checkedIn: false },
  { tagId: "002", name: "Chris Evans", tier: "General", routing: "Booth 102 (AI Tech Zone)", checkedIn: false },
  { tagId: "003", name: "Sarah Jenkins", tier: "Speaker", routing: "Main Stage VIP Greenroom", checkedIn: false },
];

export function loadAttendees() {
  const raw = localStorage.getItem(STORAGE_KEYS.attendees);
  if (raw === null) return structuredClone(SEED_ATTENDEES);
  const parsed = parseEvent(raw);
  return Array.isArray(parsed) ? parsed : structuredClone(SEED_ATTENDEES);
}

export const attendees = loadAttendees();

export function saveAttendees() {
  localStorage.setItem(STORAGE_KEYS.attendees, JSON.stringify(attendees));
}

export function findAttendee(list, tagId) {
  return list.find((attendee) => attendee.tagId === tagId) ?? null;
}

export function entrantsOf(list) {
  return list.filter((attendee) => attendee.checkedIn === true);
}

export function addWalkIn({ name, tagId, routing }) {
  if (findAttendee(attendees, tagId)) return false;
  attendees.push({ tagId, name, tier: "General", routing, checkedIn: false });
  saveAttendees();
  return true;
}

export function checkIn(tagId) {
  const attendee = findAttendee(attendees, tagId);
  if (!attendee) return null;
  attendee.checkedIn = true;
  saveAttendees();
  return attendee;
}

export function resetCheckIn(tagId) {
  const attendee = findAttendee(attendees, tagId);
  if (!attendee) return;
  attendee.checkedIn = false;
  saveAttendees();
}

export function writeScanEvent(tagId) {
  localStorage.setItem(STORAGE_KEYS.scan, JSON.stringify({ tagId, firedAt: Date.now() }));
}

export function writeDrawEvent({ winnerName, winnerTagId }) {
  localStorage.setItem(
    STORAGE_KEYS.draw,
    JSON.stringify({ winnerName, winnerTagId, drawnAt: Date.now() }),
  );
}

export function clearDrawEvent() {
  localStorage.removeItem(STORAGE_KEYS.draw);
}

export function parseEvent(raw) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
