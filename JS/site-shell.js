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
    ['Partners.html', 'Partners'],
    ['Meet_Aurelius.html', 'Meet Aurelius'],
    ['site_form7.html', 'Begin a project', true]
  ];
  const horizontalFiles = new Set(['index.html','services.html','portfolio_next.html','design_process.html','ecosystem.html','ai_tools.html','blog_page_heading_animation.html','podcast.html','partners.html']);
  const routeFiles = {services:'services.html',portfolio:'portfolio_next.html',portfolio_next:'portfolio_next.html',studio:'about_us.html',about_us:'about_us.html','design-process':'design_process.html',design_process:'design_process.html',ecosystem:'ecosystem.html','ai-futures':'ai_tools.html',ai_tools:'ai_tools.html',insights:'blog_page_heading_animation.html',blog_page_heading_animation:'blog_page_heading_animation.html',partners:'partners.html','meet-aurelius':'meet_aurelius.html',meet_aurelius:'meet_aurelius.html','begin-project':'site_form7.html',site_form7:'site_form7.html',contact:'site_form7.html',podcast:'podcast.html'};
  const pathToken = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const file = routeFiles[pathToken] || pathToken;
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

  const addFilmNarration = () => {
    if (!document.body.classList.contains('process-page') || document.querySelector('.anchor-film-audio')) return;
    const host = document.querySelector('.process-hero-copy');
    if (!host) return;
    const wrap = document.createElement('div');
    wrap.className = 'anchor-film-audio';
    const button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = '<span aria-hidden="true">▶</span> Play film narration';
    const note = document.createElement('small');
    note.textContent = 'AI-generated voice · 00:18';
    const audio = document.createElement('audio');
    audio.preload = 'metadata';
    audio.src = 'AUDIO/design-process-narration.mp3';
    audio.addEventListener('ended', () => { button.innerHTML = '<span aria-hidden="true">▶</span> Play film narration'; button.setAttribute('aria-pressed', 'false'); });
    button.addEventListener('click', async () => {
      if (audio.paused) {
        try { await audio.play(); button.innerHTML = '<span aria-hidden="true">❚❚</span> Pause narration'; button.setAttribute('aria-pressed', 'true'); } catch { note.textContent = 'Narration could not start. Please try again.'; }
      } else { audio.pause(); button.innerHTML = '<span aria-hidden="true">▶</span> Play film narration'; button.setAttribute('aria-pressed', 'false'); }
    });
    wrap.append(button, note, audio);
    host.append(wrap);
  };

  const addNotesLinks = () => {
    if (!document.body.classList.contains('notes-page') || document.querySelector('script[data-anchor-notes-links]')) return;
    const script = document.createElement('script');
    script.src = 'JS/notes-links.js';
    script.dataset.anchorNotesLinks = 'true';
    document.body.append(script);
  };

  const addHorizontalJourney = () => {
    if (!horizontalFiles.has(file) || document.body.classList.contains('studio-page') || document.body.classList.contains('aurelius-page')) return;
    document.body.classList.add('horizontal-journey');
    if (!document.querySelector('link[data-anchor-journey]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet'; link.href = 'CSS/horizontal-journey.css'; link.dataset.anchorJourney = 'true';
      document.head.append(link);
    }
    const main = document.querySelector('main');
    if (!main || main.dataset.journeyReady) return;
    main.dataset.journeyReady = 'true';
    const frames = [...main.children].filter(node => /^(SECTION|ARTICLE)$/.test(node.tagName));
    if (frames.length > 1) {
      const rail = document.createElement('nav');
      rail.className = 'anchor-frame-nav'; rail.setAttribute('aria-label', 'Journey progress');
      rail.innerHTML = '<button type="button" class="anchor-frame-nav__previous" aria-label="Previous frame">←</button><span class="anchor-frame-nav__count"><b>01</b><i>/</i><em></em></span><button type="button" class="anchor-frame-nav__next" aria-label="Next frame">→</button>';
      rail.querySelector('em').textContent = String(frames.length).padStart(2,'0');
      const update = () => { const index = Math.min(frames.length - 1, Math.max(0, Math.round(main.scrollLeft / main.clientWidth))); rail.querySelector('b').textContent = String(index + 1).padStart(2,'0'); rail.querySelector('.anchor-frame-nav__previous').disabled = index === 0; rail.querySelector('.anchor-frame-nav__next').disabled = index === frames.length - 1; };
      rail.querySelector('.anchor-frame-nav__previous').addEventListener('click', () => main.scrollBy({left:-main.clientWidth,behavior:'smooth'}));
      rail.querySelector('.anchor-frame-nav__next').addEventListener('click', () => main.scrollBy({left:main.clientWidth,behavior:'smooth'}));
      main.addEventListener('scroll', update, {passive:true}); document.body.append(rail); update();
    }
    let lock = false;
    main.addEventListener('wheel', event => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX) || !event.deltaY) return;
      if (innerWidth < 761) return;
      event.preventDefault();
      if (lock) return;
      lock = true; main.scrollBy({left:Math.sign(event.deltaY) * main.clientWidth,behavior:'smooth'}); setTimeout(() => { lock=false; }, 520);
    }, {passive:false});
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
      if (window.innerWidth > 1180 && nav.classList.contains('is-open')) setOpen(false);
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
    addFilmNarration();
    addNotesLinks();
    addHorizontalJourney();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
