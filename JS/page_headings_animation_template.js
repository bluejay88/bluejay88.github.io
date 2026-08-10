/* ==========================================================================
   INTRO / TRANSITION PAGE — Console Text Animation
   Redirects to target page (via URL param) after animation completes
   or when the skip button is clicked.
   ========================================================================== */

(function () {
  'use strict';

  // Retrieve the target URL from query parameters
  var urlParams = new URLSearchParams(window.location.search);
  var targetUrl = urlParams.get('target') || 'index.html';

  var words = [
    'Website Design',
    'UI/UX Design',
    'Digital Marketing',
    'Branding',
    'Logo Design',
    'Hosting Options',
    '&lt;a&gt; Anchor Web Design Studio'
  ];

  var colors = ['#6366F1', '#EC4899', '#06B6D4', '#818CF8', '#F472B6', '#22D3EE', '#F4F4F8'];

  var target = document.getElementById('text');
  var con = document.getElementById('console');
  var skipButton = document.getElementById('skipButton');

  if (!target || !con || !skipButton) return;

  var visible = true;
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var totalWords = words.length;
  var currentWordIndex = 0;
  var animationComplete = false;
  var animationInterval = null;
  var underscoreBlinkInterval = null;
  var redirectTimeout = null;

  // Respect reduced motion — skip directly to target
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.location.href = targetUrl;
    return;
  }

  // Show skip button after 3 seconds
  setTimeout(function () {
    skipButton.classList.add('visible');
  }, 3000);

  target.setAttribute('style', 'color:' + colors[0]);

  function animateText() {
    var currentWord = words[currentWordIndex];

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = currentWord.substring(0, letterCount);
      setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        currentWordIndex = (currentWordIndex + 1) % totalWords;
        x = 1;
        target.setAttribute('style', 'color:' + colors[0]);
        letterCount += x;
        waiting = false;

        // Check if we've cycled through all words
        if (currentWordIndex === 0 && !animationComplete) {
          animationComplete = true;
          // Stop the animation and redirect
          clearInterval(animationInterval);
          clearInterval(underscoreBlinkInterval);
          redirectTimeout = setTimeout(function () {
            window.location.href = targetUrl;
          }, 2000);
        }
      }, 1000);
    } else if (letterCount === currentWord.length + 1 && waiting === false) {
      waiting = true;
      setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = currentWord.substring(0, letterCount);
      letterCount += x;
    }
  }

  animationInterval = setInterval(animateText, 120);

  underscoreBlinkInterval = setInterval(function () {
    if (visible === true) {
      con.className = 'console-underscore hidden';
      visible = false;
    } else {
      con.className = 'console-underscore';
      visible = true;
    }
  }, 400);

  // Skip button click — clear all timers and redirect immediately
  skipButton.addEventListener('click', function () {
    clearInterval(animationInterval);
    clearInterval(underscoreBlinkInterval);
    if (redirectTimeout) clearTimeout(redirectTimeout);
    skipButton.classList.remove('visible');
    window.location.href = targetUrl;
  });
})();
