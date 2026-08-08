/* Shared progressive enhancement for Netlify Forms lead capture. */
(() => {
  'use strict';
  const encode = form => new URLSearchParams(new FormData(form)).toString();
  const setBusy = (form, busy) => {
    const submit = form.querySelector('[type="submit"]');
    if (!submit) return;
    if (!submit.dataset.label) submit.dataset.label = submit.textContent;
    submit.disabled = busy;
    submit.setAttribute('aria-busy', String(busy));
    submit.textContent = busy ? 'Submitting…' : submit.dataset.label;
  };
  const submit = async (form, options = {}) => {
    const status = options.status || form.querySelector('[role="status"]');
    setBusy(form, true);
    if (status) status.textContent = 'Submitting your inquiry…';
    try {
      const response = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode(form) });
      if (!response.ok) throw new Error(`Submission failed (${response.status})`);
      if (status) status.textContent = options.success || 'Your inquiry was submitted successfully.';
      return response;
    } catch (error) {
      if (status) status.textContent = 'We could not submit your inquiry. Please check your connection and try again.';
      throw error;
    } finally { setBusy(form, false); }
  };
  window.AnchorLeadCapture = { submit };
})();
