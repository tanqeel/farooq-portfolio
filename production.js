/**
 * Production Engine — Interactive 3-Stage Architecture Comparison Scrubber
 */
(() => {
  'use strict';

  const engine = document.querySelector('#engine');
  if (!engine) return;

  const timelineBtns = [...engine.querySelectorAll('[data-production-step]')];
  const numDisplay = engine.querySelector('[data-production-number]');
  const titleDisplay = engine.querySelector('[data-production-title]');
  const descDisplay = engine.querySelector('[data-production-description]');
  const materialDisplay = engine.querySelector('[data-production-material]');

  const renderImg = engine.querySelector('.production-render');
  const photoImg = engine.querySelector('.production-photo');
  const posterImg = engine.querySelector('.production-film-poster');

  const stages = [
    {
      num: '01 / 03',
      title: 'The Base Topology',
      desc: 'First-principles system design establishing microservice boundaries, gRPC contracts, and low-latency replication rings. Compare against neural routing.',
      material: 'System Core / Base Topology',
      activeLayer: 'render'
    },
    {
      num: '02 / 03',
      title: 'Neural Routing & Tensor Caches',
      desc: 'Real-time contextual embedding graphs and hardware-accelerated memory layers routing millions of semantic vectors across distributed nodes.',
      material: 'Optimized / Neural Routing',
      activeLayer: 'photo'
    },
    {
      num: '03 / 03',
      title: '4K Live Cluster Telemetry',
      desc: 'Sub-millisecond observability matrix tracking P99 latency, Byzantine consensus health, and self-healing automated cluster scaling.',
      material: 'Production / Live Stream',
      activeLayer: 'poster'
    }
  ];

  function setStage(index) {
    const stage = stages[index];
    if (!stage) return;

    // Update Buttons
    timelineBtns.forEach((btn, i) => {
      btn.setAttribute('aria-current', i === index ? 'step' : 'false');
    });

    // Update Text
    if (numDisplay) numDisplay.textContent = stage.num;
    if (titleDisplay) titleDisplay.textContent = stage.title;
    if (descDisplay) descDisplay.textContent = stage.desc;
    if (materialDisplay) materialDisplay.textContent = stage.material;

    // Update Visuals
    if (renderImg) renderImg.style.opacity = index >= 0 ? '1' : '0';
    if (photoImg) photoImg.style.opacity = index >= 1 ? '1' : '0';
    if (posterImg) posterImg.style.opacity = index >= 2 ? '1' : '0';
  }

  // Click listeners
  timelineBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      setStage(idx);
    });
  });

  // Default to step 0
  setStage(0);
})();
