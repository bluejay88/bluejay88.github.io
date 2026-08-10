/* ==========================================================================
   ANCHOR WEB DESIGN STUDIOS — HOMEPAGE PAGE-SPECIFIC JAVASCRIPT
   Navigation toggle, header scroll, scroll reveal, horizontal scroll
   navigation, parallax, lazy loading, and smooth scroll are all handled
   by JS/anchor-core.js. This file contains ONLY page-specific logic:
   - Heading text animation (typing effect via window.AnchorConsole)
   - Section-aware nav link handling (hash links scroll within horizontal container)
   - Text-side resize on image hover
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- HEADING TEXT ANIMATION ----------
     The original pageHeadingsAnimation used a custom typing effect with color
     cycling. The shared anchor-core.js exposes window.AnchorConsole, a cleaner
     typing animation. We use it for the hero heading and fall back to the
     legacy color-cycling effect for section headings that need multi-color.
  ------------------------------------------------------------------------- */

  /**
   * Legacy heading animation with color cycling (preserved for visual parity).
   * Each heading gets a typing/deleting loop that cycles through colors.
   */
  function pageHeadingsAnimation(words, id, colors) {
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    // Preserve the gradient-text class if present (applied to the heading itself)
    const hadGradient = targetElement.classList.contains('gradient-text');

    targetElement.innerHTML =
      '<span id="' + id + '-text"></span>' +
      '<div class="console-underscore" id="' + id + '-console">&#95;</div>';

    // Inject scoped styles
    const style = document.createElement('style');
    style.innerHTML =
      '@import url("https://fonts.googleapis.com/css?family=Khula:700");' +
      '#' + id + '-text {' +
        'font-family: Khula, sans-serif;' +
        'font-size: 7.5vw;' +
        'color: ' + colors[0] + ';' +
      '}' +
      '.console-underscore {' +
        'display: inline-block;' +
        'position: relative;' +
        'top: -0.14em;' +
        'left: 5px;' +
        'font-size: 7.5vw;' +
        'font-family: Khula, sans-serif;' +
        'color: ' + colors[0] + ';' +
      '}' +
      '.hidden { opacity: 0; }';
    document.head.appendChild(style);

    function consoleText(words, id, colors) {
      if (colors === undefined) colors = ['#fff'];
      let visible = true;
      const con = document.getElementById(id + '-console');
      let letterCount = 1;
      let x = 1;
      let waiting = false;
      const target = document.getElementById(id + '-text');
      if (!target) return;
      target.setAttribute('style', 'color:' + colors[0]);

      window.setInterval(function () {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          window.setTimeout(function () {
            const usedColor = colors.shift();
            colors.push(usedColor);
            const usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute('style', 'color:' + colors[0]);
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function () {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);

      window.setInterval(function () {
        if (visible) {
          if (con) con.className = 'console-underscore hidden';
          visible = false;
        } else {
          if (con) con.className = 'console-underscore';
          visible = true;
        }
      }, 400);
    }

    consoleText(words, id, colors);
  }

  /* ---------- SECTION NAV LINK HANDLING ----------
     On index.html, hash links (#section2, etc.) should scroll within the
     horizontal-scroll container rather than jumping. anchor-core.js already
     handles smooth scrolling for anchor links, but on the horizontal layout
     we need to scroll the container, not the window.
  ------------------------------------------------------ */
  function initSectionNavLinks() {
    const isIndexPage = window.location.pathname.endsWith('index.html') ||
                        window.location.pathname === '/' ||
                        window.location.pathname.endsWith('/');

    if (!isIndexPage) return;

    const navLinks = document.querySelectorAll('.anchor-nav a[href^="#"], .anchor-nav a[href$=".html"]');

    navLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        const href = this.getAttribute('href');

        // Let anchor-core.js handle pure hash links via smooth scroll.
        // Only intercept if it's a hash pointing to a scroll-section.
        if (href && href.startsWith('#')) {
          const targetSection = document.getElementById(href.substring(1));
          if (targetSection && targetSection.classList.contains('scroll-section')) {
            // anchor-core.js smooth scroll handles this; no-op here.
            return;
          }
        }
      });
    });
  }

  /* ---------- TEXT-SIDE RESIZE ON IMAGE HOVER ----------
     When hovering an image-side, add a 'resized' class to the adjacent
     text-side for a subtle layout shift effect.
  --------------------------------------------------------- */
  function initImageHoverResize() {
    const imageSides = document.querySelectorAll('.image-side');

    imageSides.forEach(function (imageSide) {
      // Find sibling text-side within the same container
      const container = imageSide.closest('.container');
      if (!container) return;
      const textSide = container.querySelector('.text-side');
      if (!textSide) return;

      imageSide.addEventListener('mouseover', function () {
        textSide.classList.add('resized');
      });

      imageSide.addEventListener('mouseout', function () {
        textSide.classList.remove('resized');
      });
    });
  }

  /* ---------- HAMBURGER ARIA SYNC ----------
     Keep aria-expanded in sync with the hamburger toggle state.
     The actual toggle is handled by anchor-core.js.
  ---------------------------------------------------- */
  function initHamburgerAria() {
    const hamburger = document.querySelector('.hamburger-icon');
    if (!hamburger) return;

    // Observe class changes to sync aria-expanded
    const observer = new MutationObserver(function () {
      hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active') ? 'true' : 'false');
    });
    observer.observe(hamburger, { attributes: true, attributeFilter: ['class'] });
  }

  /* ---------- INIT ---------- */
  function init() {
    // Initialize heading animations for all section headings
    pageHeadingsAnimation(['Anchor Web Design'], 'landing-page-heading', ['tomato', 'rebeccapurple', 'lightblue']);
    pageHeadingsAnimation(['Services'], 'services-heading', ['tomato', 'rebeccapurple', 'lightblue']);
    pageHeadingsAnimation(['About Us'], 'about-us-heading', ['tomato', 'rebeccapurple', 'lightblue']);
    pageHeadingsAnimation(['Contact Us'], 'contact-us-heading', ['tomato', 'rebeccapurple', 'lightblue']);
    pageHeadingsAnimation(['Port<br>folio'], 'portfolio-heading', ['tomato', 'rebeccapurple', 'lightblue']);

    initSectionNavLinks();
    initImageHoverResize();
    initHamburgerAria();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
