/* ==========================================================================
   FAQ PAGE — Page-Specific JavaScript
   (Mobile nav, scroll reveal, page transitions in JS/anchor-core.js)
   ========================================================================== */

(function () {
    'use strict';

    /* ---------- ACCORDION: SMOOTH EXPAND/COLLAPSE ---------- */
    function initAccordion() {
        var questions = document.querySelectorAll('.faq-question');

        questions.forEach(function (question) {
            question.addEventListener('click', function () {
                var item = question.closest('.faq-item');
                var answerId = question.getAttribute('aria-controls');
                var answer = document.getElementById(answerId);
                var isActive = item.classList.contains('active');

                // Close all other items (single-open accordion)
                document.querySelectorAll('.faq-item.active').forEach(function (activeItem) {
                    if (activeItem !== item) {
                        activeItem.classList.remove('active');
                        var activeBtn = activeItem.querySelector('.faq-question');
                        if (activeBtn) activeBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });

            // Keyboard support
            question.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }

    /* ---------- SEARCH / FILTER ---------- */
    function initSearch() {
        var searchInput = document.getElementById('faq-search');
        var noResults = document.getElementById('faq-no-results');
        if (!searchInput) return;

        searchInput.addEventListener('input', function () {
            var query = searchInput.value.toLowerCase().trim();
            var items = document.querySelectorAll('.faq-item');
            var visibleCount = 0;

            items.forEach(function (item) {
                var questionText = item.querySelector('.faq-question-text');
                var answerText = item.querySelector('.faq-answer p');
                var searchText = '';

                if (questionText) searchText += questionText.textContent.toLowerCase();
                if (answerText) searchText += ' ' + answerText.textContent.toLowerCase();

                if (query === '' || searchText.indexOf(query) !== -1) {
                    item.style.display = '';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                    // Close if it was open
                    item.classList.remove('active');
                    var btn = item.querySelector('.faq-question');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                }
            });

            // Show/hide no-results message
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    }

    /* ---------- INIT ---------- */
    function init() {
        initAccordion();
        initSearch();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
