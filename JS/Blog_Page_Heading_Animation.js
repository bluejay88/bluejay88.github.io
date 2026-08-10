/* ==========================================================================
   BLOG PAGE — Page-Specific JavaScript
   (Mobile nav, scroll reveal, page transitions in JS/anchor-core.js)
   ========================================================================== */

(function () {
    'use strict';

    /* ---------- BLOG ENTRIES DATA ----------
       Uses local images from the IMG/ folder instead of external placeholder.com
    */
    var blogEntries = [
        {
            title: 'Our Latest Web Design Trends',
            author: 'Jane Doe',
            content: 'Stay ahead of the curve with the latest web design trends. From bold typography and immersive animations to dark mode aesthetics and glassmorphism, discover what makes a modern website stand out in 2024.',
            imageUrl: 'IMG/24.png',
            date: 'August 25, 2024',
            readTime: '5 min read'
        },
        {
            title: 'How to Improve Your Website\'s UX',
            author: 'John Smith',
            content: 'User experience is the foundation of every great website. Learn practical strategies for improving navigation, reducing friction, optimizing page load speeds, and designing intuitive interfaces that keep visitors engaged.',
            imageUrl: 'IMG/25.png',
            date: 'August 20, 2024',
            readTime: '7 min read'
        },
        {
            title: 'The Power of Responsive Design',
            author: 'Sarah Johnson',
            content: 'Responsive design is no longer optional — it is essential. Explore how mobile-first thinking, fluid grids, and flexible images create seamless experiences across every device, from phones to desktops.',
            imageUrl: 'IMG/27.png',
            date: 'August 15, 2024',
            readTime: '6 min read'
        },
        {
            title: 'Building Brands with Custom Logos',
            author: 'Mike Chen',
            content: 'A logo is more than a symbol — it is the visual cornerstone of your brand identity. Discover our process for crafting memorable logos that capture a company\'s essence and resonate with their audience.',
            imageUrl: 'IMG/28.png',
            date: 'August 10, 2024',
            readTime: '4 min read'
        }
    ];

    /* ---------- RENDER BLOG ENTRIES ---------- */
    function renderEntries() {
        var container = document.getElementById('blog-entries');
        if (!container) return;

        container.innerHTML = blogEntries.map(function (entry, index) {
            return '' +
                '<article class="blog-entry reveal" data-delay="' + ((index % 4) + 1) + '">' +
                    '<div class="entry-image-wrapper">' +
                        '<img src="' + entry.imageUrl + '" alt="' + entry.title + '" loading="lazy">' +
                    '</div>' +
                    '<div class="entry-body">' +
                        '<h2 class="entry-title">' + entry.title + '</h2>' +
                        '<div class="entry-meta">' +
                            '<span class="entry-author">By ' + entry.author + '</span>' +
                            '<span class="meta-dot"></span>' +
                            '<span class="entry-read-time">' + entry.readTime + '</span>' +
                        '</div>' +
                        '<div class="entry-content">' +
                            '<p>' + entry.content + '</p>' +
                        '</div>' +
                        '<div class="entry-footer">' +
                            '<span class="entry-date">' + entry.date + '</span>' +
                            '<span class="entry-read-more">Read more →</span>' +
                        '</div>' +
                    '</div>' +
                '</article>';
        }).join('');

        // Re-initialize scroll reveal for newly added elements
        if (window.IntersectionObserver) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        e.target.classList.add('active');
                        observer.unobserve(e.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            container.querySelectorAll('.reveal:not(.active)').forEach(function (el) {
                observer.observe(el);
            });
        } else {
            // Fallback: show all
            container.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('active');
            });
        }
    }

    /* ---------- INIT ---------- */
    function init() {
        renderEntries();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
