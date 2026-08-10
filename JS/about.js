/* ==========================================================================
   ABOUT US — PAGE-SPECIFIC JAVASCRIPT
   Nav, scroll, arrows, reveal, toggleMenu: see anchor-core.js
   This file contains only the page headings typing animation.
   ========================================================================== */

(function () {
  'use strict';

  /**
   * Page headings typing animation.
   * Cycles through words with a typing/deleting effect and blinking cursor.
   * @param {string[]} words  - Words to cycle through.
   * @param {string}   id     - Target element id.
   * @param {string[]} colors - Colors to cycle through.
   */
  function pageHeadingsAnimation(words, id, colors) {
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    // Build the animation structure
    targetElement.innerHTML =
      '<span id="' + id + '-text"></span>' +
      '<div class="console-underscore" id="' + id + '-console">&#95;</div>';

    // Inject scoped styles
    const style = document.createElement('style');
    style.innerHTML =
      '@import url("https://fonts.googleapis.com/css?family=Khula:700");' +
      '#' + id + '-text { font-family: Khula, sans-serif; font-size: 7.5vw; color: ' + colors[0] + '; }' +
      '#' + id + ' .console-underscore { display: inline-block !important; position: relative; top: -0.14em; left: 5px; font-size: 7.5vw; font-family: Khula, sans-serif; color: ' + colors[0] + '; }' +
      '#' + id + ' .hidden { opacity: 0; }';
    document.head.appendChild(style);

    let visible = true;
    const con = document.getElementById(id + '-console');
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    const target = document.getElementById(id + '-text');
    target.setAttribute('style', 'color:' + colors[0]);

    // Typing / deleting loop
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

    // Cursor blink
    window.setInterval(function () {
      if (visible === true) {
        con.className = 'console-underscore hidden';
        visible = false;
      } else {
        con.className = 'console-underscore';
        visible = true;
      }
    }, 400);
  }

  // Initialize animations for headings on the About page
  function init() {
    pageHeadingsAnimation(
      ['About Us'],
      'about2-heading',
      ['tomato', 'rebeccapurple', 'lightblue']
    );
    pageHeadingsAnimation(
      ['Contact Us'],
      'contact2-heading',
      ['tomato', 'rebeccapurple', 'lightblue']
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
