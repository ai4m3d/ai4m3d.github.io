/* AI4M3D — Workshop Website JS */

(function () {
  'use strict';

  // ─── Sticky nav ───────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 60;

  function updateNav() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ─── Mobile menu ──────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ─── Active nav link on scroll ────────────────────────────
  const sections = document.querySelectorAll('section[id], footer[id="footer"]');
  const links    = navLinks.querySelectorAll('a[href^="#"]');

  function setActiveLink() {
    let current = '';
    const scrollY = window.scrollY + 100;

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollY) {
        current = sec.getAttribute('id');
      }
    });

    links.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // ─── Scroll reveal ────────────────────────────────────────
  const revealEls = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ─── Back to top button ───────────────────────────────────
  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    backToTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', updateBackToTop, { passive: true });
  updateBackToTop();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── Smooth scroll for anchor links (Safari fallback) ─────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ─── Staggered card reveal delay ─────────────────────────
  document.querySelectorAll('.topics-grid .topic-card, .organizers-grid .org-card').forEach((card, i) => {
    card.style.transitionDelay = `${(i % 3) * 0.08}s`;
  });

})();
