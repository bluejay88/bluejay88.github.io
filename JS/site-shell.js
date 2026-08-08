/* Progressive enhancement: a single, resilient route map for legacy and executive pages. */
(() => {
  'use strict';

  const routes = [
    ['index.html', 'Home'],
    ['Services.html', 'Services'],
    ['Portfolio_next.html', 'Work'],
    ['About_Us.html', 'Studio'],
    ['Design_Process.html', 'Process'],
    ['Ecosystem.html', 'Ecosystem'],
    ['AI_Tools.html', 'AI Futures'],
    ['Blog_Page_Heading_Animation.html', 'Insights'],
    ['Meet_Aurelius.html', 'Meet Aurelius'],
    ['site_form7.html', 'Begin a project', true]
  ];
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const currentFor = href => href.toLowerCase() === file || (file === '' && href === 'index.html');

  const createNav = () => {
    const nav = document.createElement('nav');
    nav.className = 'anchor-nav';
    nav.setAttribute('aria-label', 'Primary navigation');
    routes.forEach(([href, label, cta]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (cta) link.className = 'anchor-nav-cta';
      if (currentFor(href)) link.setAttribute('aria-current', 'page');
      nav.append(link);
    });
    return nav;
  };

  const ensureSkipLink = () => {
    if (document.querySelector('.skip,.anchor-skip')) return;
    const main = document.querySelector('main,[role="main"]');
    if (!main) return;
    if (!main.id) main.id = 'anchor-main-content';
    const skip = document.createElement('a');
    skip.className = 'anchor-skip';
    skip.href = `#${main.id}`;
    skip.textContent = 'Skip to content';
    document.body.prepend(skip);
  };

  const addWayfinding = () => {
    if (document.querySelector('.agent-launch,.anchor-wayfinding')) return;
    const link = document.createElement('a');
    link.className = 'anchor-wayfinding';
    link.href = 'Meet_Aurelius.html';
    link.setAttribute('aria-label', 'Meet Aurelius, the Anchor digital concierge');
    link.innerHTML = '<span class="anchor-wayfinding__sigil" aria-hidden="true">&#10022;</span><span class="anchor-wayfinding__copy">Ask Aurelius</span>';
    document.body.append(link);
  };

  const wireMenu = (nav, button) => {
    const setOpen = (open, moveFocus = false) => {
      nav.classList.toggle('is-open', open);
      nav.classList.toggle('open', open);
      button.setAttribute('aria-expanded', String(open));
      if (open && moveFocus) nav.querySelector('a')?.focus();
    };

    button.addEventListener('click', () => setOpen(!nav.classList.contains('is-open'), true));
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !nav.classList.contains('is-open')) return;
      setOpen(false);
      button.focus();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && nav.classList.contains('is-open')) setOpen(false);
    }, { passive: true });
  };

  const enhanceExecutiveHeader = header => {
    header.classList.add('anchor-shell-managed');
    const oldNav = header.querySelector('nav');
    const nav = createNav();
    if (oldNav) oldNav.replaceWith(nav); else header.append(nav);
    let button = header.querySelector('.menu');
    if (!button) {
      button = document.createElement('button');
      button.className = 'anchor-menu';
      button.type = 'button';
      button.textContent = 'Menu';
      header.append(button);
    }
    button.classList.add('anchor-menu');
    button.setAttribute('aria-controls', 'anchor-primary-nav');
    button.setAttribute('aria-expanded', 'false');
    nav.id = 'anchor-primary-nav';
    wireMenu(nav, button);
  };

  const addLegacyHeader = () => {
    const header = document.createElement('header');
    header.className = 'anchor-shell';
    header.innerHTML = '<a class="anchor-shell__mark" href="index.html" aria-label="Anchor home"><span class="anchor-shell__crest" aria-hidden="true"><b>A</b></span><span class="anchor-shell__wordmark">Anchor</span></a>';
    const nav = createNav();
    const button = document.createElement('button');
    button.className = 'anchor-menu';
    button.type = 'button';
    button.textContent = 'Menu';
    button.setAttribute('aria-controls', 'anchor-primary-nav');
    button.setAttribute('aria-expanded', 'false');
    nav.id = 'anchor-primary-nav';
    wireMenu(nav, button);
    header.append(nav, button);
    document.body.prepend(header);
    document.body.classList.add('has-anchor-shell');
  };

  const init = () => {
    if (document.body.dataset.anchorShell === 'ready') return;
    document.body.dataset.anchorShell = 'ready';
    ensureSkipLink();
    const executiveHeader = document.querySelector('.site-header');
    if (executiveHeader) enhanceExecutiveHeader(executiveHeader); else addLegacyHeader();
    addWayfinding();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
