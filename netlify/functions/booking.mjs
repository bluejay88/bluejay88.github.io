import { getStore } from '@netlify/blobs';
import { Resend } from 'resend';
import { clean, displayDate, slotKey, slotLabel, validBooking } from './_booking-core.mjs';

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers:{ 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store' } });
const emailHtml = booking => `<h1>New Anchor strategy meeting</h1><p><strong>${booking.dateLabel}</strong> at <strong>${booking.timeLabel} Central Time</strong></p><p><strong>Name:</strong> ${booking.name}<br><strong>Email:</strong> ${booking.email}<br><strong>Organization:</strong> ${booking.company || '—'}<br><strong>Phone:</strong> ${booking.phone || '—'}<br><strong>Focus:</strong> ${booking.topic}</p><p><strong>Context</strong><br>${booking.notes.replace(/\n/g, '<br>')}</p>`;

export default async request => {
  if (request.method !== 'POST') return json({ error:'Method not allowed.' }, 405);
  let body; try { body = await request.json(); } catch { return json({ error:'Invalid request.' }, 400); }
  const booking = Object.fromEntries(Object.entries(body || {}).map(([key, value]) => [key, clean(value)]));
  booking.consent = Boolean(body?.consent);
  const validation = validBooking(booking); if (validation) return json({ error:validation }, 400);
  if (!process.env.RESEND_API_KEY || !process.env.BOOKING_FROM_EMAIL) return json({ error:'Scheduling is being configured. Please contact Anchor directly for a meeting.', code:'SCHEDULING_SETUP_REQUIRED' }, 503);
  booking.id = crypto.randomUUID(); booking.createdAt = new Date().toISOString(); booking.timeLabel = slotLabel(booking.time); booking.dateLabel = displayDate(booking.date); booking.timeZone = 'America/Chicago';
  const store = getStore({ name:'anchor-bookings', consistency:'strong' });
  const claim = await store.setJSON(slotKey(booking.date, booking.time), booking, { onlyIfNew:true });
  if (!claim.modified) return json({ error:'That time is no longer available.', code:'SLOT_TAKEN' }, 409);
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const destination = process.env.BOOKING_NOTIFICATION_EMAIL || 'anchorwebdesigner@gmail.com';
    await resend.emails.send({ from:process.env.BOOKING_FROM_EMAIL, to:[destination], replyTo:booking.email, subject:`Meeting reserved — ${booking.dateLabel}, ${booking.timeLabel} CT`, html:emailHtml(booking) });
    await resend.emails.send({ from:process.env.BOOKING_FROM_EMAIL, to:[booking.email], subject:'Your Anchor strategy meeting is reserved', html:`<h1>Your time is reserved.</h1><p>${booking.dateLabel} at ${booking.timeLabel} Central Time.</p><p>An Anchor representative will follow up with the meeting details.</p>` });
  } catch (error) {
    console.error('Booking notification failed', error);
    return json({ error:'Your time is held, but confirmation delivery needs attention. Please email anchorwebdesigner@gmail.com with your name and time.', code:'NOTIFICATION_PENDING' }, 202);
  }
  return json({ booking:{ dateLabel:booking.dateLabel, timeLabel:booking.timeLabel } }, 201);
};
