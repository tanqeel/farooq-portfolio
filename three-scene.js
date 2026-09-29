/**
 * Farooq Portfolio — Three.js 3D WebGL Engine
 * Features:
 * 1. 3D Background Galaxy Particle Constellation
 * 2. Hero Interactive Holographic Cybernetic Core
 * 3. Engine Interactive 3D Architecture Viewport (Drag-to-rotate)
 * 4. Interactive 3D Tilt on Cards with cursor spotlight
 */
(() => {
  'use strict';

  if (typeof THREE === 'undefined') {
    console.warn('Three.js not loaded, skipping 3D initialization.');
    return;
  }

  // --- 1. Background 3D Galaxy & Constellation ---
  const bgCanvas = document.getElementById('bg-3d-canvas');
  if (bgCanvas) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050506, 0.0012);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({
      canvas: bgCanvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Particle Constellation Geometry
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xbba2cf); // Lavender
    const color2 = new THREE.Color(0x68899d); // Teal Cyan
    const color3 = new THREE.Color(0xaa91c2); // Violet

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1800;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1600;

      const mixed = color1.clone().lerp(Math.random() > 0.5 ? color2 : color3, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Circle Texture
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 16;
    canvasTexture.height = 16;
    const ctx = canvasTexture.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const pTexture = new THREE.CanvasTexture(canvasTexture);

    const material = new THREE.PointsMaterial({
      size: 4.5,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Tracking with Inertia
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    window.addEventListener('pointermove', (e) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.4;
      mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.4;
    }, { passive: true });

    function resizeBg() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', resizeBg);

    let clock = new THREE.Clock();
    function animateBg() {
      requestAnimationFrame(animateBg);
      if (document.documentElement.classList.contains('motion-paused')) return;

      const elapsed = clock.getElapsedTime();
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      camera.position.x = mouse.x;
      camera.position.y = -mouse.y;
      camera.lookAt(scene.position);

      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = elapsed * 0.01;

      renderer.render(scene, camera);
    }
    animateBg();
  }

  // --- 2. Hero Interactive Holographic Cybernetic Core ---
  const heroCanvas = document.getElementById('hero-3d-canvas');
  if (heroCanvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      canvas: heroCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function resizeHero() {
      const w = heroCanvas.parentElement.clientWidth;
      const h = heroCanvas.parentElement.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resizeHero);
    setTimeout(resizeHero, 100);

    // 3D Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer Geodesic Wireframe Sphere
    const geoIcosa = new THREE.IcosahedronGeometry(75, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xbba2cf,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const icosaMesh = new THREE.Mesh(geoIcosa, wireMat);
    coreGroup.add(icosaMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.IcosahedronGeometry(35, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x68899d,
      wireframe: false,
      transparent: true,
      opacity: 0.55
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Orbiting Telemetry Rings
    const ringMat = new THREE.LineBasicMaterial({
      color: 0xf2f1ed,
      transparent: true,
      opacity: 0.4
    });

    const createRing = (radius, rotX, rotY) => {
      const circleGeo = new THREE.BufferGeometry();
      const points = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      circleGeo.setFromPoints(points);
      const ring = new THREE.Line(circleGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = createRing(95, Math.PI / 4, 0);
    const ring2 = createRing(110, -Math.PI / 3, Math.PI / 6);
    const ring3 = createRing(125, Math.PI / 2.5, -Math.PI / 4);
    coreGroup.add(ring1);
    coreGroup.add(ring2);
    coreGroup.add(ring3);

    // Point Nodes on Orbit
    const nodeCount = 36;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      nodePos[i * 3] = Math.cos(angle) * 110;
      nodePos[i * 3 + 1] = Math.sin(angle) * 110;
      nodePos[i * 3 + 2] = (Math.sin(angle * 3)) * 25;
    }
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0xaa91c2,
      size: 4,
      transparent: true,
      opacity: 0.85
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    coreGroup.add(nodePoints);

    // Position in right hemisphere
    coreGroup.position.x = 45;

    let heroClock = new THREE.Clock();
    function animateHero() {
      requestAnimationFrame(animateHero);
      if (document.documentElement.classList.contains('motion-paused')) return;

      const elapsed = heroClock.getElapsedTime();

      // Continuous subtle orbital spin
      coreGroup.rotation.y = elapsed * 0.25;
      coreGroup.rotation.x = elapsed * 0.15;

      ring1.rotation.z = elapsed * 0.4;
      ring2.rotation.z = -elapsed * 0.3;
      ring3.rotation.z = elapsed * 0.5;

      // Pulse inner core
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.08;
      innerMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    }
    animateHero();

    // Hook into Genesis Scroll to Morph & Rotate Core
    const genesis = document.querySelector('[data-genesis]');
    if (genesis) {
      window.addEventListener('scroll', () => {
        const rect = genesis.getBoundingClientRect();
        const total = genesis.offsetHeight - window.innerHeight;
        if (total <= 0) return;
        const progress = Math.max(0, Math.min(1, -rect.top / total));

        // Scale and shift core as user scrubs chapters
        coreGroup.scale.setScalar(1 + progress * 0.4);
        coreGroup.rotation.z = progress * Math.PI * 2;

        // Color shifting based on active chapter
        if (progress < 0.25) {
          wireMat.color.setHex(0xbba2cf); // Lavender
          innerMat.color.setHex(0x68899d); // Cyan
        } else if (progress < 0.5) {
          wireMat.color.setHex(0xaa91c2); // Violet
          innerMat.color.setHex(0xb86b9f); // Magenta
        } else if (progress < 0.75) {
          wireMat.color.setHex(0x38bdf8); // Bright Cyan
          innerMat.color.setHex(0x34d399); // Emerald
        } else {
          wireMat.color.setHex(0xf59e0b); // Gold Amber
          innerMat.color.setHex(0xf2f1ed); // White Gold
        }
      }, { passive: true });
    }
  }

  // --- 3. Section 03 Interactive 3D Engine Viewport ---
  const engineCanvas = document.getElementById('engine-3d-canvas');
  if (engineCanvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, engineCanvas.clientWidth / engineCanvas.clientHeight, 0.1, 1000);
    camera.position.z = 200;

    const renderer = new THREE.WebGLRenderer({
      canvas: engineCanvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function resizeEngine() {
      const w = engineCanvas.parentElement.clientWidth;
      const h = engineCanvas.parentElement.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resizeEngine);
    setTimeout(resizeEngine, 100);

    // Models for 3 Stages
    // Stage 01: 3D Distributed Cube Topology
    const stage1Group = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(60, 60, 60);
    const boxWire = new THREE.MeshBasicMaterial({ color: 0x68899d, wireframe: true });
    stage1Group.add(new THREE.Mesh(boxGeo, boxWire));

    for (let x = -30; x <= 30; x += 30) {
      for (let y = -30; y <= 30; y += 30) {
        for (let z = -30; z <= 30; z += 30) {
          const sphere = new THREE.Mesh(new THREE.SphereGeometry(2.5, 8, 8), new THREE.MeshBasicMaterial({ color: 0xf2f1ed }));
          sphere.position.set(x, y, z);
          stage1Group.add(sphere);
        }
      }
    }
    scene.add(stage1Group);

    // Stage 02: 3D Neural Swarm
    const stage2Group = new THREE.Group();
    const torusKnot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(32, 6, 80, 16),
      new THREE.MeshBasicMaterial({ color: 0xbba2cf, wireframe: true })
    );
    stage2Group.add(torusKnot);
    stage2Group.visible = false;
    scene.add(stage2Group);

    // Stage 03: 3D Wave Spectrum Ring
    const stage3Group = new THREE.Group();
    const ringGeo = new THREE.RingGeometry(25, 48, 48);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xaa91c2, wireframe: true, side: THREE.DoubleSide });
    stage3Group.add(new THREE.Mesh(ringGeo, ringMat));
    stage3Group.visible = false;
    scene.add(stage3Group);

    // Drag to rotate interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    engineCanvas.addEventListener('pointerdown', (e) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('pointerup', () => { isDragging = false; });
    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouse.x;
      const deltaY = e.clientY - prevMouse.y;
      prevMouse = { x: e.clientX, y: e.clientY };

      stage1Group.rotation.y += deltaX * 0.01;
      stage1Group.rotation.x += deltaY * 0.01;
      stage2Group.rotation.y += deltaX * 0.01;
      stage2Group.rotation.x += deltaY * 0.01;
      stage3Group.rotation.y += deltaX * 0.01;
      stage3Group.rotation.x += deltaY * 0.01;
    });

    // Listen to Stage switches from production.js
    const timelineButtons = document.querySelectorAll('[data-production-step]');
    timelineButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        stage1Group.visible = idx === 0;
        stage2Group.visible = idx === 1;
        stage3Group.visible = idx === 2;
      });
    });

    let engineClock = new THREE.Clock();
    function animateEngine() {
      requestAnimationFrame(animateEngine);
      if (document.documentElement.classList.contains('motion-paused')) return;

      const elapsed = engineClock.getElapsedTime();
      if (!isDragging) {
        stage1Group.rotation.y += 0.008;
        stage1Group.rotation.x += 0.005;
        stage2Group.rotation.y += 0.012;
        stage2Group.rotation.z += 0.008;
        stage3Group.rotation.z += 0.015;
      }
      renderer.render(scene, camera);
    }
    animateEngine();
  }

  // --- 4. Interactive 3D Perspective Tilt on Cards ---
  const cards = document.querySelectorAll('.card-3d-tilt');
  cards.forEach(card => {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;

      // Dynamic cursor spotlight border
      card.style.setProperty('--mouse-x', `${(x / rect.width * 100).toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height * 100).toFixed(1)}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

})();
