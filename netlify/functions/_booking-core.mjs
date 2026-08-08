export const SLOTS = [
  ['14:00', '2:00 PM'], ['14:30', '2:30 PM'], ['17:30', '5:30 PM'], ['18:00', '6:00 PM'], ['18:30', '6:30 PM'], ['19:00', '7:00 PM'], ['19:30', '7:30 PM']
];

export const slotLabel = value => SLOTS.find(([time]) => time === value)?.[1] || '';
export const slotKey = (date, time) => `slot:${date}:${time}`;
export const isWeekday = date => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.getUTCDay() > 0 && parsed.getUTCDay() < 6;
};
export const validBooking = booking => {
  const required = ['date', 'time', 'name', 'email', 'topic', 'notes'];
  if (!booking || required.some(key => !String(booking[key] || '').trim())) return 'Please complete every required field.';
  if (!isWeekday(booking.date)) return 'Meetings are available Monday through Friday only.';
  if (!slotLabel(booking.time)) return 'Choose one of the available 30-minute times.';
  if (!/^\S+@\S+\.\S+$/.test(String(booking.email))) return 'Enter a valid email address.';
  if (!booking.consent) return 'Consent is required to schedule a meeting.';
  if (String(booking.notes).trim().length < 20) return 'Please provide a little more context for the meeting.';
  return null;
};
export const displayDate = value => new Intl.DateTimeFormat('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric', timeZone:'America/Chicago' }).format(new Date(`${value}T12:00:00Z`));
export const clean = value => String(value || '').trim().slice(0, 4000);
