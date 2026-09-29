/**
 * Farooq Portfolio — Master System Controller
 * Handles Opening Sequence, Navigation, Carousel, Form, and Atmosphere
 */
(() => {
  'use strict';

  const root = document.documentElement;

  // 1. Opening Intro Sequence
  const intro = document.querySelector('[data-matter-intro]');
  const skipBtn = document.querySelector('[data-intro-skip]');
  const replayBtn = document.querySelector('[data-intro-replay]');
  const progressFill = document.querySelector('.matter-intro__progress-fill');
  let introTimer = null;
  let introProgress = 0;

  function endIntro() {
    if (introTimer) clearInterval(introTimer);
    if (intro) {
      intro.hidden = true;
      intro.setAttribute('aria-hidden', 'true');
    }
    root.classList.remove('intro-pending');
    root.classList.add('intro-complete', 'is-ready');
  }

  function startIntro() {
    if (!intro) return;
    intro.hidden = false;
    intro.removeAttribute('aria-hidden');
    introProgress = 0;
    root.classList.add('intro-pending');
    root.classList.remove('intro-complete');

    if (introTimer) clearInterval(introTimer);
    introTimer = setInterval(() => {
      introProgress += 2.5;
      if (progressFill) progressFill.style.width = `${Math.min(100, introProgress)}%`;
      if (introProgress >= 100) {
        clearInterval(introTimer);
        setTimeout(endIntro, 350);
      }
    }, 60);
  }

  if (skipBtn) skipBtn.addEventListener('click', endIntro);
  if (replayBtn) replayBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    startIntro();
  });

  // Start intro initially if not reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced && intro) {
    startIntro();
  } else {
    endIntro();
  }

  // 2. Compact Header on Scroll
  const header = document.querySelector('[data-header]');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('is-compact', window.scrollY > 80);
    }
  }, { passive: true });

  // 3. Mobile Navigation Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.innerHTML = isOpen ? 'Close <span aria-hidden="true">✕</span>' : 'Menu <span aria-hidden="true">＋</span>';
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = 'Menu <span aria-hidden="true">＋</span>';
      });
    });
  }

  // 4. Motion Control (Pause / Resume Animations)
  const motionToggles = [...document.querySelectorAll('[data-motion-toggle]')];
  motionToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isPaused = root.classList.toggle('motion-paused');
      toggle.setAttribute('aria-pressed', String(isPaused));
      toggle.textContent = isPaused ? '▶' : 'Ⅱ';
      toggle.title = isPaused ? 'Resume motion' : 'Reduce motion';
    });
  });

  // 5. Vertical Systems Rail Carousel
  const rail = document.querySelector('#portrait-rail');
  const prevBtn = document.querySelector('[data-rail-prev]');
  const nextBtn = document.querySelector('[data-rail-next]');
  const railStatus = document.querySelector('[data-rail-status]');

  if (rail) {
    const cards = [...rail.querySelectorAll('.motion-card')];
    const updateRailStatus = () => {
      if (!railStatus) return;
      const scrollLeft = rail.scrollLeft;
      const cardWidth = 300;
      const activeIdx = Math.min(cards.length, Math.max(1, Math.round(scrollLeft / cardWidth) + 1));
      railStatus.textContent = `0${activeIdx} / 0${cards.length}`;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        rail.scrollBy({ left: -320, behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        rail.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }
    rail.addEventListener('scroll', updateRailStatus, { passive: true });
    updateRailStatus();
  }

  // 6. Client Marquee Toggle
  const marqueeToggle = document.querySelector('[data-marquee-toggle]');
  const marqueeTrack = document.querySelector('.client-marquee__track');
  if (marqueeToggle && marqueeTrack) {
    marqueeToggle.addEventListener('click', () => {
      const isPaused = marqueeTrack.classList.toggle('is-paused');
      marqueeToggle.setAttribute('aria-pressed', String(isPaused));
      marqueeToggle.querySelector('span').textContent = isPaused ? 'Resume motion' : 'Pause motion';
      marqueeToggle.querySelector('i').textContent = isPaused ? '▶' : 'Ⅱ';
    });
  }

  // 7. Interactive Engagement Application Form
  const form = document.querySelector('#matter-form');
  const formStatus = document.querySelector('[data-form-status]');
  if (form) {
    // Enable form controls
    form.querySelectorAll('[data-form-control]').forEach(el => el.removeAttribute('disabled'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="nome"]')?.value.trim();
      const message = form.querySelector('[name="mensagem"]')?.value.trim();

      if (!name || !message) {
        if (formStatus) {
          formStatus.className = 'form-status form-wide is-error';
          formStatus.textContent = 'Please fill out required fields: Name and Project Scope.';
        }
        return;
      }

      const submitBtn = form.querySelector('.form-submit span');
      if (submitBtn) submitBtn.textContent = 'Transmitting brief to Farooq…';

      setTimeout(() => {
        if (formStatus) {
          formStatus.className = 'form-status form-wide is-success';
          formStatus.textContent = `Thank you, ${name}. Project brief received securely. Farooq will review your architectural requirements within 24 hours.`;
        }
        if (submitBtn) submitBtn.textContent = 'Brief Transmitted ✓';
        form.reset();
      }, 1000);
    });
  }

  // 8. IntersectionObserver for Reveal Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('[data-reveal-observer]').forEach(el => observer.observe(el));
})();
