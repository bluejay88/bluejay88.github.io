import { getStore } from '@netlify/blobs';
import { clean, displayDate, slotKey, slotLabel, validBooking } from './_booking-core.mjs';

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers:{ 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store' } });

export default async request => {
  if (request.method !== 'POST') return json({ error:'Method not allowed.' }, 405);
  let body; try { body = await request.json(); } catch { return json({ error:'Invalid request.' }, 400); }
  const booking = Object.fromEntries(Object.entries(body || {}).map(([key, value]) => [key, clean(value)]));
  booking.consent = Boolean(body?.consent);
  const validation = validBooking(booking); if (validation) return json({ error:validation }, 400);
  booking.id = crypto.randomUUID(); booking.createdAt = new Date().toISOString(); booking.timeLabel = slotLabel(booking.time); booking.dateLabel = displayDate(booking.date); booking.timeZone = 'America/Chicago';
  const store = getStore({ name:'anchor-bookings', consistency:'strong' });
  const claim = await store.setJSON(slotKey(booking.date, booking.time), booking, { onlyIfNew:true });
  if (!claim.modified) return json({ error:'That time is no longer available.', code:'SLOT_TAKEN' }, 409);
  return json({ booking:{ dateLabel:booking.dateLabel, timeLabel:booking.timeLabel } }, 201);
};
