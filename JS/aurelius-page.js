(() => {
  'use strict';
  const messages = document.querySelector('.aurelius-messages');
  const choices = document.querySelector('.aurelius-choices');
  const form = document.querySelector('.aurelius-form');
  const input = document.querySelector('#aurelius-input');
  const status = document.querySelector('#aurelius-status');
  const draftKey = 'anchor_aurelius_draft_v3';
  const state = { profile: {}, transcript: [], step: 'need', startedAt: new Date().toISOString(), metadata: { path: location.pathname, referrer: document.referrer || 'direct', campaign: Object.fromEntries(new URLSearchParams(location.search).entries()) } };
  const questions = {
    need: { prompt: 'Welcome. I’m Aurelius. I’ll shape a short starting brief, then give you a clear handoff to the Anchor team. What are you looking to advance?', choices: ['A new website', 'AI automation', 'Project operations', 'Team AI training'] },
    outcome: { prompt: 'Good. What would make this engagement undeniably successful?', choices: ['More qualified leads', 'A premium re-positioning', 'Operational clarity', 'AI adoption at scale'] },
    timing: { prompt: 'What is the timing for the first meaningful release?', choices: ['Within 30 days', 'This quarter', '3–6 months', 'Exploring options'] },
    budget: { prompt: 'What level of investment are you considering?', choices: ['$5k–$15k', '$15k–$40k', '$40k–$100k', '$100k+'] },
    email: { prompt: 'Where should the preliminary brief be sent? Please use a work email so the Anchor team can follow up thoughtfully.', choices: [] }
  };
  const say = (text, who = 'bot') => { const item = document.createElement('div'); item.className = `aurelius-message ${who === 'user' ? 'user' : ''}`; item.textContent = text; messages.append(item); messages.scrollTop = messages.scrollHeight; state.transcript.push({ who, text, at: new Date().toISOString() }); };
  const suggest = (items = []) => { choices.innerHTML = ''; items.forEach(item => { const button = document.createElement('button'); button.type = 'button'; button.textContent = item; button.addEventListener('click', () => respond(item)); choices.append(button); }); };
  const safelyRead = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || '') || fallback; } catch { return fallback; } };
  const saveDraft = () => { try { localStorage.setItem(draftKey, JSON.stringify(state)); } catch {} };
  const renderQuestion = () => { const question = questions[state.step]; say(question.prompt); suggest(question.choices); input.placeholder = state.step === 'email' ? 'name@company.com' : 'Write a concise reply...'; input.focus(); saveDraft(); };
  const finish = async () => {
    state.step = 'complete'; state.completedAt = new Date().toISOString();
    Object.entries({ ...state.profile, page: state.metadata.path }).forEach(([key, value]) => { const field = form.elements[key]; if (field) field.value = value || ''; });
    input.disabled = true;
    try {
      await window.AnchorLeadCapture.submit(form, { status, success: 'Your preliminary brief was submitted to Anchor.' });
      try { localStorage.removeItem(draftKey); } catch {}
      say('Your preliminary brief has been submitted to Anchor. A human will review it and follow up using the email you provided. You can add detail in the full project brief while the context is fresh.');
      suggest(['Continue to private brief', 'Explore services', 'Start over']); input.placeholder = 'Your brief was submitted — choose a next step above.';
    } catch (error) {
      state.step = 'email'; input.disabled = false; input.placeholder = 'name@company.com';
      say('I could not submit the brief just yet. Please check your connection and use “Retry submission” below.'); suggest(['Retry submission', 'Continue to private brief']);
    }
  };
  const moveTo = next => { state.step = next; window.setTimeout(renderQuestion, 300); };
  const respond = raw => {
    const text = String(raw || '').trim(); if (!text) return;
    if (state.step === 'complete') { if (/private brief/i.test(text)) location.href = 'site_form7.html?source=aurelius'; else if (/service/i.test(text)) location.href = 'Services.html'; else if (/start over/i.test(text)) location.reload(); return; }
    if (state.step === 'email' && /retry submission/i.test(text)) { finish(); return; }
    if (state.step === 'email' && /private brief/i.test(text)) { location.href = 'site_form7.html?source=aurelius'; return; }
    say(text, 'user'); choices.innerHTML = '';
    if (state.step === 'need') { state.profile.need = text; moveTo('outcome'); } else if (state.step === 'outcome') { state.profile.outcome = text; moveTo('timing'); } else if (state.step === 'timing') { state.profile.timing = text; moveTo('budget'); } else if (state.step === 'budget') { state.profile.budget = text; moveTo('email'); } else if (state.step === 'email') { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) { window.setTimeout(() => { say('That does not look like a complete email address. Please try again, or use the private brief if you would rather not share it here.'); suggest(['Continue to private brief']); input.focus(); }, 260); return; } state.profile.email = text.toLowerCase(); window.setTimeout(finish, 320); }
    saveDraft();
  };
  form.addEventListener('submit', event => { event.preventDefault(); if (input.disabled || form.elements['bot-field'].value) return; const value = input.value; input.value = ''; respond(value); });
  const previous = safelyRead(draftKey, null);
  if (previous && previous.step && previous.step !== 'complete' && previous.profile) { Object.assign(state, previous, { metadata: { ...state.metadata, ...(previous.metadata || {}), resumedAt: new Date().toISOString() } }); say('Welcome back. Your private draft is still here. We can continue exactly where we left off.'); renderQuestion(); } else renderQuestion();
})();
