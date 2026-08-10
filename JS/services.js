/* ==========================================================================
   SERVICES — PAGE-SPECIFIC JAVASCRIPT
   Nav, scroll, arrows, reveal, toggleMenu: see anchor-core.js
   This file contains the console typing animation and the theme switcher.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- CONSOLE TYPING ANIMATION ---------- */
  // Cycles through service keywords with a typing/deleting effect.
  function consoleText(words, id, colors) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);

    if (!target || !con) return;

    target.setAttribute('style', 'color:' + colors[0]);

    // Typing / deleting loop
    window.setInterval(function () {
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount);
        window.setTimeout(function () {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
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

  /* ---------- THEME SWITCHER ---------- */
  // Changes the picture, text, description, and associated element color
  // when a theme color dot is clicked or activated via keyboard.
  function initThemeSwitcher() {
    if (typeof jQuery === 'undefined') return;

    var $dots = $('.product-colors span');

    function applyTheme($dot) {
      var id = $dot.attr('id').split('-')[1];
      var colorPrimary = $dot.attr('data-color-primary');
      var colorSecondary = $dot.attr('data-color-sec');
      var imagePath = $dot.attr('data-pic');
      var hoverImagePath = $dot.attr('data-hover-pic');
      var text = $dot.attr('data-text');
      var desc = $dot.attr('data-desc');

      // Update active state across the current card's dots only
      $dot.siblings('span').removeClass('active');
      $dot.addClass('active');

      // Apply theme to the associated card elements with smooth transitions
      $('#product-title' + id).css('color', colorSecondary);
      $('#product-price' + id).css('color', colorSecondary);
      $('#imgBx' + id).css('background', colorSecondary);
      $('#contact-button' + id).css('background', colorSecondary);
      $('#product-image' + id).attr('src', imagePath);
      $('#product-title' + id).text(text);

      // Show only the matching description
      $('.product-description[id^="description-theme"]').hide();
      $(desc).show();

      // Rebind hover effect scoped to this image
      $('#product-image' + id).off('mouseenter mouseleave').hover(
        function () {
          $(this).attr('src', hoverImagePath);
        },
        function () {
          $(this).attr('src', imagePath);
        }
      );
    }

    // Click handler
    $dots.on('click', function () {
      applyTheme($(this));
    });

    // Keyboard handler (Enter / Space) for accessibility
    $dots.on('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        applyTheme($(this));
      }
    });

    // Initial hover effect on the default product images
    $('.product-image').hover(
      function () {
        $(this).attr('src', 'IMG/25.png');
      },
      function () {
        $(this).attr('src', 'IMG/24.png');
      }
    );
  }

  /* ---------- INIT ---------- */
  function init() {
    // Start the console typing animation
    consoleText(
      [
        'Website Design',
        'UI/UX Design',
        'Digital Marketing',
        'Branding',
        'Logo Design',
        'Hosting Options',
        '&lt;a&gt; Anchor Website Design Studio'
      ],
      'text',
      ['tomato', 'palegoldenrod', 'rebeccapurple', 'lightblue', 'lightcoral', 'rebeccapurple', 'white']
    );

    // Initialize the theme color switcher
    initThemeSwitcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
