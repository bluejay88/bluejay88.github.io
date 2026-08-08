import assert from 'node:assert/strict';
import { SLOTS, isWeekday, slotKey, validBooking } from '../netlify/functions/_booking-core.mjs';
const good = { date:'2026-08-10', time:'17:30', name:'Test Client', email:'test@example.com', topic:'AI systems', notes:'A sufficiently detailed request for a focused strategy conversation.', consent:true };
assert.equal(SLOTS.length, 7); assert.deepEqual(SLOTS.map(([value]) => value), ['14:00','14:30','17:30','18:00','18:30','19:00','19:30']);
assert.equal(isWeekday('2026-08-10'), true); assert.equal(isWeekday('2026-08-08'), false); assert.equal(validBooking(good), null); assert.match(validBooking({ ...good, time:'16:00' }), /available/); assert.match(validBooking({ ...good, date:'2026-08-08' }), /Monday/); assert.equal(slotKey('2026-08-10','17:30'), 'slot:2026-08-10:17:30');
console.log('booking-core: 7 checks passed');
