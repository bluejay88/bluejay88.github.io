(() => {
  'use strict';
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const header = $('.site-header');
  const menu = $('.menu');
  const nav = $('#nav');
  addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 30), { passive: true });
  menu?.addEventListener('click', () => { const isOpen = nav?.classList.toggle('open'); menu.setAttribute('aria-expanded', String(Boolean(isOpen))); });
  $$('#nav a').forEach(link => link.addEventListener('click', () => nav?.classList.remove('open')));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
  $$('.reveal').forEach(element => observer.observe(element));

  const panel = $('.agent');
  const messages = $('.messages');
  const quick = $('.quick-replies');
  const input = $('#agent-input');
  const launcher = $('.agent-launch');
  let opener = null;
  let state = { stage: 'intro', profile: {}, transcript: [] };
  if (!panel || !messages || !quick || !input) return;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.inert = true;
  const save = () => {
    localStorage.setItem('anchor_agent_state', JSON.stringify(state));
    const entries = JSON.parse(localStorage.getItem('anchor_conversations') || '[]').slice(-49);
    entries.push({ id: Date.now(), updated: new Date().toISOString(), ...state });
    localStorage.setItem('anchor_conversations', JSON.stringify(entries));
  };
  const say = (text, who = 'bot') => { const node = document.createElement('div'); node.className = `message ${who === 'user' ? 'user' : ''}`; node.textContent = text; messages.append(node); messages.scrollTop = messages.scrollHeight; state.transcript.push({ who, text, at: new Date().toISOString() }); };
  const chips = items => { quick.innerHTML = ''; items.forEach(label => { const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.addEventListener('click', () => respond(label)); quick.append(button); }); };
  function open(event) { opener = event?.currentTarget || launcher; panel.inert = false; panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); if (launcher) launcher.hidden = true; if (!messages.children.length) { say("Welcome. I’m Aurelius, Anchor’s digital concierge. I’ll help define the opportunity before we discuss the solution. What are you looking to advance?"); chips(['A new website', 'AI automation', 'Project operations', 'Team AI training']); } setTimeout(() => input.focus(), 350); }
  function close() { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); panel.inert = true; if (launcher) launcher.hidden = false; opener?.focus?.(); }
  $$('[data-open-agent]').forEach(button => button.addEventListener('click', open));
  $('[data-close-agent]')?.addEventListener('click', close);
  addEventListener('keydown', event => { if (event.key === 'Escape' && panel.classList.contains('open')) close(); });
  function respond(raw) {
    const text = raw.trim(); if (!text) return;
    say(text, 'user'); quick.innerHTML = ''; const low = text.toLowerCase();
    setTimeout(() => {
      if (!state.profile.need) { state.profile.need = text; state.stage = 'scope'; say('Understood. What outcome would make this engagement unquestionably successful?'); chips(['More qualified leads', 'Operational efficiency', 'A premium repositioning', 'AI adoption at scale']); }
      else if (!state.profile.outcome) { state.profile.outcome = text; state.stage = 'timing'; say('Good. Is there a target window for the first meaningful release?'); chips(['Within 30 days', 'This quarter', '3–6 months', 'Exploring options']); }
      else if (!state.profile.timing) { state.profile.timing = text; state.stage = 'budget'; say('To recommend the right level of architecture, what investment range are you considering?'); chips(['$5k–$15k', '$15k–$40k', '$40k–$100k', '$100k+']); }
      else if (!state.profile.budget) { state.profile.budget = text; state.stage = 'contact'; say('I have enough to shape an initial brief. Share your email and I’ll save this opportunity for Anchor’s strategy team.'); }
      else if (!state.profile.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) { state.profile.email = text; state.stage = 'qualified'; const lead = { id: `lead_${Date.now()}`, createdAt: new Date().toISOString(), source: 'Aurelius', status: 'New', score: low.includes('100k') ? 95 : 72, ...state.profile, transcript: state.transcript }; const leads = JSON.parse(localStorage.getItem('anchor_leads') || '[]'); leads.unshift(lead); localStorage.setItem('anchor_leads', JSON.stringify(leads)); say('Your opportunity brief is saved in this browser. Anchor will review it after you submit the private brief with your company details.'); chips(['Open strategy form', 'Review services']); }
      else if (state.stage === 'contact') say('That doesn’t look like a complete email address. Please try again, for example name@company.com.');
      else if (low.includes('form')) location.href = 'site_form7.html';
      else if (low.includes('service')) location.href = 'Services.html';
      else say('I’ve added that context to the brief. Is there anything else the strategy team should know?');
      save();
    }, 420);
  }
  $('.agent-form')?.addEventListener('submit', event => { event.preventDefault(); const value = input.value; input.value = ''; respond(value); });
})();
