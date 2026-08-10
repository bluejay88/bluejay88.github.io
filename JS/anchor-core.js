/* ==========================================================================
   ANCHOR WEB DESIGN STUDIOS — CORE JAVASCRIPT
   Navigation, Scroll Animations, Intersection Observer, Shared Interactions
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- MOBILE NAV TOGGLE ---------- */
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.anchor-nav ul, .nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      navLinks.classList.toggle('show');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.classList.remove('show');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navLinks.classList.remove('show');
      }
    });
  }

  /* ---------- HEADER SCROLL EFFECT ---------- */
  function initHeaderScroll() {
    const header = document.querySelector('.anchor-header, header');
    if (!header) return;

    let ticking = false;

    function updateHeader() {
      if (window.scrollY > 20 || document.querySelector('.horizontal-scroll')?.scrollLeft > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });

    const scrollContainer = document.querySelector('.horizontal-scroll');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', function () {
        if (!ticking) {
          requestAnimationFrame(updateHeader);
          ticking = true;
        }
      });
    }
  }

  /* ---------- SCROLL REVEAL (Intersection Observer) ---------- */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (reveals.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('active'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- HORIZONTAL SCROLL NAVIGATION ---------- */
  function initHorizontalScroll() {
    const scrollContainer = document.querySelector('.horizontal-scroll');
    if (!scrollContainer) return;

    const sections = scrollContainer.querySelectorAll('.scroll-section');
    if (sections.length === 0) return;

    // Arrow navigation
    document.querySelectorAll('.right-con .round, #cta').forEach(function (arrow) {
      const container = arrow.closest('.right-con') || arrow.closest('.left-con');
      if (!container) return;

      const isNext = container.classList.contains('right-con');
      const isPrev = container.classList.contains('left-con');

      arrow.addEventListener('click', function () {
        const currentSection = arrow.closest('.scroll-section');
        if (!currentSection) return;

        let targetSection;
        if (isNext) {
          targetSection = currentSection.nextElementSibling;
        } else if (isPrev) {
          targetSection = currentSection.previousElementSibling;
        }

        if (targetSection && targetSection.classList.contains('scroll-section')) {
          targetSection.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
      });
    });

    // Separate prev/next arrows
    document.querySelectorAll('.left-con .round').forEach(function (arrow) {
      arrow.addEventListener('click', function () {
        const currentSection = arrow.closest('.scroll-section');
        if (!currentSection) return;
        const prev = currentSection.previousElementSibling;
        if (prev && prev.classList.contains('scroll-section')) {
          prev.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        }
      });
    });

    // Keyboard navigation
    scrollContainer.setAttribute('tabindex', '0');
    scrollContainer.addEventListener('keydown', function (e) {
      const current = Array.from(sections).find(function (s) {
        const rect = s.getBoundingClientRect();
        return rect.left >= -10 && rect.left < window.innerWidth / 2;
      });
      if (!current) return;

      let target = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        target = current.nextElementSibling;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        target = current.previousElementSibling;
      }

      if (target && target.classList.contains('scroll-section')) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      }
    });

    // Scroll indicator dots
    createScrollIndicators(scrollContainer, sections);
  }

  function createScrollIndicators(container, sections) {
    // Remove existing indicators
    const existing = document.querySelector('.scroll-indicators');
    if (existing) existing.remove();

    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'scroll-indicators';
    indicatorContainer.setAttribute('aria-label', 'Section navigation');

    sections.forEach(function (section, index) {
      const dot = document.createElement('button');
      dot.className = 'scroll-dot';
      dot.setAttribute('aria-label', 'Go to section ' + (index + 1));
      if (index === 0) dot.classList.add('active');

      dot.addEventListener('click', function () {
        section.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      });

      indicatorContainer.appendChild(dot);
    });

    document.body.appendChild(indicatorContainer);

    // Update active dot on scroll
    const dots = indicatorContainer.querySelectorAll('.scroll-dot');
    container.addEventListener('scroll', function () {
      let activeIndex = 0;
      sections.forEach(function (section, index) {
        const rect = section.getBoundingClientRect();
        if (rect.left >= -10 && rect.left < window.innerWidth / 2) {
          activeIndex = index;
        }
      });

      dots.forEach(function (dot, index) {
        dot.classList.toggle('active', index === activeIndex);
      });
    });
  }

  /* ---------- PARALLAX EFFECT ---------- */
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (parallaxElements.length === 0) return;

    const scrollContainer = document.querySelector('.horizontal-scroll');

    function updateParallax() {
      parallaxElements.forEach(function (el) {
        const speed = parseFloat(el.dataset.parallax) || 0.3;
        const section = el.closest('.scroll-section');
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const offset = rect.left * speed;

        el.style.transform = 'translateX(' + (-offset * 0.3) + 'px)';
      });
    }

    if (scrollContainer) {
      let ticking = false;
      scrollContainer.addEventListener('scroll', function () {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      });
    }
  }

  /* ---------- CONSOLE TYPING ANIMATION ---------- */
  window.AnchorConsole = function (elementId, texts, options) {
    options = options || {};
    const speed = options.speed || 150;
    const deleteSpeed = options.deleteSpeed || 75;
    const pauseTime = options.pauseTime || 2000;
    const target = document.getElementById(elementId);
    if (!target) return;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const fullText = texts[textIndex];

      if (isDeleting) {
        target.textContent = fullText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        target.textContent = fullText.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? deleteSpeed : speed;

      if (!isDeleting && charIndex === fullText.length) {
        typeSpeed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
      }

      setTimeout(type, typeSpeed);
    }

    type();
  };

  /* ---------- PAGE TRANSITION ---------- */
  function initPageTransitions() {
    // Create transition overlay if it doesn't exist
    if (!document.querySelector('.page-transition')) {
      const overlay = document.createElement('div');
      overlay.className = 'page-transition';
      overlay.innerHTML = '<div class="spinner"></div>';
      document.body.appendChild(overlay);
    }

    // Add transition on internal link clicks
    document.querySelectorAll('a[href]').forEach(function (link) {
      const href = link.getAttribute('href');

      // Skip external links, hash links, and non-page links
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      link.addEventListener('click', function (e) {
        // Skip if cmd/ctrl click (open in new tab)
        if (e.metaKey || e.ctrlKey) return;

        const overlay = document.querySelector('.page-transition');
        if (overlay) {
          overlay.classList.add('active');
        }
      });
    });
  }

  /* ---------- IMAGE LAZY LOADING ---------- */
  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if (images.length === 0) return;

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(function (img) { imageObserver.observe(img); });
    }
  }

  /* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ---------- INIT ---------- */
  function init() {
    initMobileNav();
    initHeaderScroll();
    initScrollReveal();
    initHorizontalScroll();
    initParallax();
    initPageTransitions();
    initLazyLoading();
    initSmoothScroll();

    // Keep toggleMenu global for backwards compatibility
    window.toggleMenu = function () {
      const hamburger = document.querySelector('.hamburger-icon');
      const navLinks = document.querySelector('.anchor-nav ul, .nav-links');
      if (hamburger && navLinks) {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navLinks.classList.toggle('show');
      }
    };

    // Keep goBack global
    window.goBack = function () {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'index.html';
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
