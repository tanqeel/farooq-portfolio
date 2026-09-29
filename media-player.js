/**
 * Media Player & Telemetry Dialog Controller
 * Manages modal interactive simulations and architecture inspect breakdown
 */
(() => {
  'use strict';

  const dialog = document.querySelector('#portfolio-film-dialog');
  if (!dialog) return;

  const titleElem = dialog.querySelector('[data-video-dialog-title]');
  const closeBtn = dialog.querySelector('[data-video-close]');
  const triggers = [...document.querySelectorAll('[aria-controls="portfolio-film-dialog"]')];

  let animId = null;
  let canvas = null;
  let ctx = null;

  function initCanvas() {
    canvas = dialog.querySelector('.video-dialog-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'video-dialog-canvas';
      const body = dialog.querySelector('.video-dialog-body') || dialog;
      body.appendChild(canvas);
    }
    ctx = canvas.getContext('2d');
  }

  function renderSimulation(systemName) {
    if (!ctx || !canvas) return;
    canvas.width = canvas.parentElement.clientWidth || 960;
    canvas.height = canvas.parentElement.clientHeight || 540;

    let frame = 0;
    function loop() {
      if (!dialog.open) return;
      frame++;
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = 'rgba(244, 244, 241, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Waveform / Telemetry Curve
      ctx.strokeStyle = '#aa91c2';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 4) {
        const angle = (i * 0.015) + (frame * 0.04);
        const y = (canvas.height * 0.5) + Math.sin(angle) * 70 + Math.cos(angle * 2.2) * 35;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // Secondary Pulse Wave
      ctx.strokeStyle = '#68899d';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 6) {
        const angle = (i * 0.02) - (frame * 0.03);
        const y = (canvas.height * 0.5) + Math.cos(angle * 1.5) * 50;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();

      // Orbiting Node Rings
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.strokeStyle = 'rgba(242, 241, 237, 0.2)';
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.stroke();

      // Nodes on circle
      for (let j = 0; j < 8; j++) {
        const theta = (j / 8) * Math.PI * 2 + (frame * 0.01);
        const nx = cx + Math.cos(theta) * 140;
        const ny = cy + Math.sin(theta) * 140;
        ctx.fillStyle = '#bba2cf';
        ctx.beginPath();
        ctx.arc(nx, ny, 6, 0, Math.PI * 2);
        ctx.fill();

        // Connector to center
        ctx.strokeStyle = 'rgba(187, 162, 207, 0.15)';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();
      }

      // HUD Text
      ctx.fillStyle = '#f2f1ed';
      ctx.font = '14px monospace';
      ctx.fillText(`FAROOQ // REAL-TIME TELEMETRY STREAM`, 40, 50);
      ctx.fillStyle = '#aa91c2';
      ctx.fillText(`TARGET ARCHITECTURE: ${systemName.toUpperCase()}`, 40, 75);
      ctx.fillStyle = 'rgba(242, 241, 237, 0.6)';
      ctx.fillText(`STATUS: 99.999% HEALTHY | P99: 0.84ms | CONCURRENCY: 1.8M OPS/S`, 40, 100);

      animId = requestAnimationFrame(loop);
    }
    loop();
  }

  function openDialog(title) {
    if (titleElem) titleElem.textContent = `SYSTEM TELEMETRY: ${title}`;
    initCanvas();
    dialog.showModal();
    renderSimulation(title);
  }

  function closeDialog() {
    if (animId) cancelAnimationFrame(animId);
    dialog.close();
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.dataset.videoTitle || 'FAROOQ // SYSTEM ARCHITECTURE';
      openDialog(title);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDialog);
  dialog.addEventListener('cancel', closeDialog);
})();
