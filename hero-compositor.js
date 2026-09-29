/**
 * Hero Compositor — Synchronizes Sticky Scroll, Multi-Chapter Frames, and Rail Telemetry
 */
(() => {
  'use strict';

  const genesis = document.querySelector('[data-genesis]');
  if (!genesis) return;

  const frames = [...document.querySelectorAll('[data-genesis-frame]')];
  const railSteps = [...document.querySelectorAll('[data-genesis-step]')];
  const railButtons = [...document.querySelectorAll('[data-hero-chapter]')];
  const progressLine = document.querySelector('[data-genesis-progress]');
  const indexDisplay = document.querySelector('[data-genesis-index]');
  const labelDisplay = document.querySelector('[data-genesis-label]');

  const chapters = [
    { title: 'DISTRIBUTED SYSTEMS', subtitle: 'CONSENSUS → RESILIENCE' },
    { title: 'AUTONOMOUS AI', subtitle: 'NEURAL → CONTEXT MESH' },
    { title: 'SPATIAL & WEBGPU', subtitle: 'COMPUTE → RAY-TRACING' },
    { title: 'CLOUD INFRASTRUCTURE', subtitle: 'ZERO-TRUST → GLOBAL SCALE' }
  ];

  let currentChapter = -1;

  function update() {
    const rect = genesis.getBoundingClientRect();
    const totalDist = genesis.offsetHeight - window.innerHeight;
    if (totalDist <= 0) return;

    // Progress within genesis (0 to 1)
    const rawProgress = Math.max(0, Math.min(1, -rect.top / totalDist));
    genesis.style.setProperty('--hero-progress', rawProgress.toFixed(4));

    if (progressLine) {
      progressLine.style.transform = `scaleX(${Math.max(0.02, rawProgress)})`;
    }

    // Determine chapter index (0, 1, 2, 3)
    const chapterIndex = Math.min(3, Math.floor(rawProgress * 4));

    if (chapterIndex !== currentChapter) {
      currentChapter = chapterIndex;

      // Update Frames
      frames.forEach((frame, idx) => {
        frame.classList.toggle('is-active', idx === currentChapter);
      });

      // Update Rail
      railSteps.forEach((step, idx) => {
        step.classList.toggle('is-active', idx === currentChapter);
      });

      // Update Telemetry Display
      if (indexDisplay) {
        indexDisplay.textContent = `0${currentChapter + 1}`;
      }
      if (labelDisplay && chapters[currentChapter]) {
        labelDisplay.textContent = `${chapters[currentChapter].title} // ${chapters[currentChapter].subtitle}`;
      }
    }
  }

  // Smooth click navigation for chapter rail buttons
  railButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIdx = parseInt(btn.dataset.heroChapter, 10);
      const totalDist = genesis.offsetHeight - window.innerHeight;
      const targetScroll = genesis.offsetTop + (totalDist * (targetIdx / 3.2));
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    });
  });

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();
