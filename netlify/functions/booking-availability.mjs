import { getStore } from '@netlify/blobs';
import { SLOTS, isWeekday, slotKey } from './_booking-core.mjs';

const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers:{ 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store' } });

export default async request => {
  if (request.method !== 'GET') return json({ error:'Method not allowed.' }, 405);
  const date = new URL(request.url).searchParams.get('date');
  if (!isWeekday(date)) return json({ error:'Choose a Monday through Friday date.' }, 400);
  const store = getStore({ name:'anchor-bookings', consistency:'strong' });
  const slots = await Promise.all(SLOTS.map(async ([value, label]) => ({ value, label, available:!(await store.get(slotKey(date, value), { consistency:'strong' })) })));
  return json({ date, slots });
};
