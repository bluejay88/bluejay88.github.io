/* ==========================================================================
   PORTFOLIO PAGE — Page-Specific JavaScript
   (Mobile nav, scroll reveal, horizontal scroll, parallax, page transitions
    are in JS/anchor-core.js)
   ========================================================================== */

(function () {
    'use strict';

    /* ---------- HORIZONTAL SCROLL — MOUSE WHEEL SUPPORT ----------
       anchor-core.js handles arrow clicks and keyboard nav.
       This adds mouse-wheel-to-horizontal translation for the portfolio.
    */
    function initWheelScroll() {
        var horizontalScroll = document.querySelector('.horizontal-scroll');
        if (!horizontalScroll) return;

        horizontalScroll.addEventListener('wheel', function (event) {
            if (event.deltaY !== 0) {
                event.preventDefault();
                horizontalScroll.scrollBy({
                    left: event.deltaY < 0 ? -window.innerWidth : window.innerWidth,
                    behavior: 'smooth'
                });
            }
        }, { passive: false });
    }

    /* ---------- INIT ---------- */
    function init() {
        initWheelScroll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
