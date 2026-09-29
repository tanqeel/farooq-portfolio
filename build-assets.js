const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const full = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim(), 'utf8');
  console.log(`Saved: ${relPath}`);
}

// 1. Logo Farooq UI & Favicon
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
  <defs>
    <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f2f1ed" />
      <stop offset="50%" stop-color="#bba2cf" />
      <stop offset="100%" stop-color="#68899d" />
    </linearGradient>
    <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="100" height="100" rx="20" fill="#070709" stroke="rgba(242,241,237,0.15)" stroke-width="1.5"/>
  <path d="M28 26 H74 V38 H44 V46 H68 V58 H44 V74 H28 Z" fill="url(#logo-g)" filter="url(#logo-glow)" />
  <circle cx="72" cy="72" r="4.5" fill="#aa91c2" />
  <circle cx="72" cy="72" r="8" stroke="rgba(170,145,194,0.4)" stroke-width="1.5" stroke-dasharray="2 3" />
</svg>`;

save('assets/img/logo-farooq.svg', logoSvg);
save('assets/img/favicon.svg', logoSvg);

// 2. Smoke Volumetric Texture & Aperture Simulation
const smokeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="none">
  <defs>
    <radialGradient id="smoke1" cx="30%" cy="40%" r="55%">
      <stop offset="0%" stop-color="rgba(170,145,194,0.18)" />
      <stop offset="45%" stop-color="rgba(104,137,157,0.08)" />
      <stop offset="100%" stop-color="rgba(5,5,6,0)" />
    </radialGradient>
    <radialGradient id="smoke2" cx="70%" cy="60%" r="60%">
      <stop offset="0%" stop-color="rgba(187,162,207,0.15)" />
      <stop offset="50%" stop-color="rgba(117,100,127,0.06)" />
      <stop offset="100%" stop-color="rgba(5,5,6,0)" />
    </radialGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" />
      <feComposite in2="SourceGraphic" in="gl" operator="in" />
    </filter>
  </defs>
  <rect width="1600" height="900" fill="#040405" />
  <ellipse cx="480" cy="380" rx="550" ry="320" fill="url(#smoke1)" transform="rotate(-15 480 380)" />
  <ellipse cx="1120" cy="520" rx="600" ry="360" fill="url(#smoke2)" transform="rotate(20 1120 520)" />
  <circle cx="800" cy="450" r="400" fill="none" stroke="rgba(242,241,237,0.03)" stroke-width="1" />
  <circle cx="800" cy="450" r="650" fill="none" stroke="rgba(242,241,237,0.02)" stroke-width="1" />
  <line x1="0" y1="450" x2="1600" y2="450" stroke="rgba(242,241,237,0.025)" stroke-dasharray="4 8" />
  <line x1="800" y1="0" x2="800" y2="900" stroke="rgba(242,241,237,0.025)" stroke-dasharray="4 8" />
</svg>`;
save('assets/matter/smoke-volumetric.svg', smokeSvg);

// 3. Hero Chapters (1672x941)
function makeHeroChapter(chapterNum, title, subtitle, accentColor, patternType) {
  let innerGraphic = '';
  if (patternType === 'distributed') {
    innerGraphic = `
      <!-- Distributed Nodes & Mesh -->
      <g stroke="${accentColor}" stroke-opacity="0.35" stroke-width="1.2">
        <line x1="400" y1="300" x2="680" y2="220" />
        <line x1="680" y1="220" x2="980" y2="350" />
        <line x1="980" y1="350" x2="1240" y2="240" />
        <line x1="680" y1="220" x2="820" y2="520" />
        <line x1="980" y1="350" x2="820" y2="520" />
        <line x1="400" y1="300" x2="520" y2="580" />
        <line x1="520" y1="580" x2="820" y2="520" />
        <line x1="820" y1="520" x2="1140" y2="600" />
        <line x1="1240" y1="240" x2="1140" y2="600" />
        <line x1="1140" y1="600" x2="1400" y2="480" />
      </g>
      <g fill="#0b0e14" stroke="${accentColor}" stroke-width="2">
        <circle cx="400" cy="300" r="14" /><circle cx="400" cy="300" r="4" fill="${accentColor}" />
        <circle cx="680" cy="220" r="22" fill="#111520"/><circle cx="680" cy="220" r="7" fill="${accentColor}" />
        <circle cx="980" cy="350" r="26" fill="#111520"/><circle cx="980" cy="350" r="9" fill="${accentColor}" />
        <circle cx="1240" cy="240" r="18" /><circle cx="1240" cy="240" r="5" fill="${accentColor}" />
        <circle cx="520" cy="580" r="16" /><circle cx="520" cy="580" r="5" fill="${accentColor}" />
        <circle cx="820" cy="520" r="32" fill="#131724"/><circle cx="820" cy="520" r="12" fill="${accentColor}" />
        <circle cx="1140" cy="600" r="20" /><circle cx="1140" cy="600" r="6" fill="${accentColor}" />
        <circle cx="1400" cy="480" r="14" /><circle cx="1400" cy="480" r="4" fill="${accentColor}" />
      </g>
      <text x="820" y="585" fill="rgba(242,241,237,0.7)" font-family="monospace" font-size="12" text-anchor="middle" letter-spacing="2">ROOT // 99.999% CONSENSUS</text>
    `;
  } else if (patternType === 'neural') {
    innerGraphic = `
      <!-- Neural Latent Space & Multi-Agent Matrix -->
      <g stroke="${accentColor}" stroke-opacity="0.25" stroke-width="1">
        ${Array.from({length: 12}).map((_, i) => {
          const x = 500 + i * 70;
          return `<line x1="${x}" y1="180" x2="${x}" y2="720" stroke-dasharray="2 6"/>`;
        }).join('')}
      </g>
      <circle cx="880" cy="450" r="180" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.6"/>
      <circle cx="880" cy="450" r="280" fill="none" stroke="${accentColor}" stroke-width="1" opacity="0.3"/>
      <path d="M 540 450 Q 700 240, 880 450 T 1220 450" fill="none" stroke="#f2f1ed" stroke-width="2.5" opacity="0.85"/>
      <path d="M 540 450 Q 700 660, 880 450 T 1220 450" fill="none" stroke="${accentColor}" stroke-width="2" opacity="0.6"/>
      <circle cx="880" cy="450" r="36" fill="#070910" stroke="#f2f1ed" stroke-width="2"/>
      <circle cx="880" cy="450" r="12" fill="${accentColor}"/>
      <text x="880" y="520" fill="#f2f1ed" font-family="monospace" font-size="13" text-anchor="middle" letter-spacing="3">AGENTIC INFERENCE MESH · 4.8M T/S</text>
    `;
  } else if (patternType === 'spatial') {
    innerGraphic = `
      <!-- Spatial Isometric WebGL Matrix -->
      <g transform="translate(860, 450) scale(1.4)" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="1.2" fill="none">
        <polygon points="0,-160 160,-70 0,20 -160,-70" fill="rgba(170,145,194,0.06)"/>
        <polygon points="0,20 160,-70 160,110 0,200" fill="rgba(104,137,157,0.08)"/>
        <polygon points="0,20 -160,-70 -160,110 0,200" fill="rgba(5,5,6,0.6)"/>
        <line x1="0" y1="20" x2="0" y2="200" stroke="#f2f1ed" stroke-width="2"/>
        <line x1="0" y1="-160" x2="0" y2="20" stroke="#f2f1ed" stroke-dasharray="3 3"/>
        <circle cx="0" cy="-160" r="6" fill="#f2f1ed"/>
        <circle cx="160" cy="-70" r="6" fill="${accentColor}"/>
        <circle cx="-160" cy="-70" r="6" fill="${accentColor}"/>
        <circle cx="0" cy="200" r="6" fill="${accentColor}"/>
      </g>
      <text x="860" y="700" fill="rgba(242,241,237,0.75)" font-family="monospace" font-size="12" text-anchor="middle" letter-spacing="3">REAL-TIME WEBGPU / SPATIAL DIGITAL TWIN</text>
    `;
  } else {
    innerGraphic = `
      <!-- Global Cloud Infrastructure -->
      <g stroke="${accentColor}" stroke-opacity="0.3" stroke-width="1">
        <ellipse cx="880" cy="460" rx="380" ry="180" fill="none"/>
        <ellipse cx="880" cy="460" rx="440" ry="240" fill="none" stroke-dasharray="4 8"/>
        <line x1="440" y1="460" x2="1320" y2="460"/>
        <line x1="880" y1="220" x2="880" y2="700"/>
        ${Array.from({length: 8}).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x = 880 + Math.cos(a) * 360;
          const y = 460 + Math.sin(a) * 160;
          return `<circle cx="${x}" cy="${y}" r="8" fill="#070a0e" stroke="${accentColor}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="3" fill="#f2f1ed"/>`;
        }).join('')}
      </g>
      <text x="880" y="465" fill="#f2f1ed" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="3">GLOBAL BACKBONE // MULTI-REGION K8S</text>
    `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bg-${chapterNum}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#030305" />
        <stop offset="50%" stop-color="#07090e" />
        <stop offset="100%" stop-color="#020304" />
      </linearGradient>
      <radialGradient id="glow-${chapterNum}" cx="65%" cy="45%" r="60%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.22" />
        <stop offset="70%" stop-color="#050506" stop-opacity="0" />
      </radialGradient>
      <pattern id="grid-${chapterNum}" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(242,241,237,0.035)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1672" height="941" fill="url(#bg-${chapterNum})" />
    <rect width="1672" height="941" fill="url(#grid-${chapterNum})" />
    <rect width="1672" height="941" fill="url(#glow-${chapterNum})" />

    ${innerGraphic}

    <!-- UI Telemetry Overlays -->
    <g font-family="monospace" font-size="11" fill="rgba(242,241,237,0.5)" letter-spacing="2">
      <text x="70" y="80">FAROOQ // CORE CHAPTER ${chapterNum}</text>
      <text x="70" y="105" fill="#f2f1ed" font-size="16" font-weight="bold">${title.toUpperCase()}</text>
      <text x="70" y="130" fill="${accentColor}">${subtitle.toUpperCase()}</text>
      
      <text x="1602" y="80" text-anchor="end">STATUS: OPERATIONAL</text>
      <text x="1602" y="105" text-anchor="end" fill="${accentColor}">LATENCY: 1.2ms (P99)</text>
      <text x="1602" y="130" text-anchor="end">AVAILABILITY: 99.999%</text>

      <line x1="70" y1="145" x2="1602" y2="145" stroke="rgba(242,241,237,0.12)" stroke-width="1"/>
      <line x1="70" y1="840" x2="1602" y2="840" stroke="rgba(242,241,237,0.12)" stroke-width="1"/>
      <text x="70" y="870">SYS_ID: FQ-2026-X9</text>
      <text x="880" y="870" text-anchor="middle">FAROOQ // PRINCIPAL SYSTEMS ARCHITECT</text>
      <text x="1602" y="870" text-anchor="end">LOCATION: UTC+5 // GLOBAL REMOTE</text>
    </g>
  </svg>`;
}

save('assets/matter/chapter-01.svg', makeHeroChapter('01', 'High-Scale Distributed Systems', 'Distributed consensus, fault tolerance & microsecond RPC', '#bba2cf', 'distributed'));
save('assets/matter/chapter-02.svg', makeHeroChapter('02', 'Autonomous AI & Agentic Meshes', 'Fine-tuned LLMs, neural graph reasoning & vector pipelines', '#aa91c2', 'neural'));
save('assets/matter/chapter-03.svg', makeHeroChapter('03', 'Real-Time Spatial & WebGL', 'Low-latency 3D simulation, WebGPU pipelines & UI shaders', '#68899d', 'spatial'));
save('assets/matter/chapter-04.svg', makeHeroChapter('04', 'Global Cloud Infrastructure', 'Zero-trust enterprise topologies, multi-cloud Kubernetes', '#9fb5b7', 'cloud'));

// 4. Selected Systems Landscape Previews (1600x900)
function makeSelectedSystem(code, title, tag, metric, desc, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="bg-${code}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#06070a" />
        <stop offset="60%" stop-color="#0b0e14" />
        <stop offset="100%" stop-color="#040507" />
      </linearGradient>
      <radialGradient id="glow-${code}" cx="80%" cy="30%" r="70%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.28" />
        <stop offset="80%" stop-color="#050506" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1600" height="900" fill="url(#bg-${code})" />
    <rect width="1600" height="900" fill="url(#glow-${code})" />

    <!-- Waveform / Data Curve Simulation -->
    <path d="M 0 550 Q 300 350, 600 520 T 1200 480 T 1600 380" fill="none" stroke="${accent}" stroke-width="3" stroke-opacity="0.75" />
    <path d="M 0 550 Q 300 350, 600 520 T 1200 480 T 1600 380 L 1600 900 L 0 900 Z" fill="${accent}" fill-opacity="0.04" />
    <path d="M 0 620 Q 400 480, 800 600 T 1600 500" fill="none" stroke="rgba(242,241,237,0.3)" stroke-width="1.5" stroke-dasharray="4 6" />

    <!-- Technical UI HUD Elements -->
    <g fill="none" stroke="rgba(242,241,237,0.12)" stroke-width="1">
      <rect x="80" y="80" width="1440" height="740" rx="4"/>
      <line x1="80" y1="160" x2="1520" y2="160"/>
      <line x1="1050" y1="160" x2="1050" y2="820"/>
    </g>

    <!-- Content Block -->
    <g font-family="monospace">
      <text x="120" y="130" font-size="13" fill="${accent}" letter-spacing="3">${code} // FLAGSHIP ARCHITECTURE</text>
      <text x="1480" y="130" font-size="13" fill="rgba(242,241,237,0.6)" text-anchor="end" letter-spacing="2">BENCHMARK: ${metric}</text>

      <text x="120" y="260" font-family="'Space Grotesk', sans-serif" font-size="56" font-weight="bold" fill="#f2f1ed">${title}</text>
      <text x="120" y="310" font-size="15" fill="${accent}" letter-spacing="2">${tag.toUpperCase()}</text>
      
      <text x="120" y="370" font-size="18" fill="rgba(242,241,237,0.75)" font-family="'Space Grotesk', sans-serif">${desc}</text>
    </g>

    <!-- Side Metrics Panel -->
    <g font-family="monospace" fill="rgba(242,241,237,0.7)" font-size="12" letter-spacing="1">
      <text x="1100" y="220" fill="#f2f1ed" font-size="15" font-weight="bold">SYSTEM METRICS</text>
      <text x="1100" y="270">THROUGHPUT: <tspan fill="${accent}">2.4M QPS</tspan></text>
      <text x="1100" y="310">REPLICATION: <tspan fill="#f2f1ed">MULTI-REGION ACTIVE</tspan></text>
      <text x="1100" y="350">SECURITY: <tspan fill="#f2f1ed">mTLS + ENCLAVE ZERO-TRUST</tspan></text>
      <text x="1100" y="390">FAULT TOLERANCE: <tspan fill="${accent}">BYZANTINE RESILIENT</tspan></text>
      <text x="1100" y="430">STACK: <tspan fill="#f2f1ed">Rust · Go · K8s · WebGL</tspan></text>

      <!-- Mini Chart -->
      <g stroke="${accent}" stroke-width="1.5" fill="none">
        <polyline points="1100,560 1150,520 1200,540 1250,470 1300,510 1350,440 1400,430 1450,390" />
      </g>
      <text x="1100" y="590" font-size="10" fill="rgba(242,241,237,0.4)">TELEMETRY REACTION TIME (LAST 24H)</text>
    </g>

    <!-- Play Symbol Pill -->
    <g transform="translate(120, 680)">
      <rect width="210" height="52" rx="26" fill="rgba(242,241,237,0.08)" stroke="${accent}" stroke-width="1.5"/>
      <circle cx="36" cy="26" r="14" fill="${accent}"/>
      <polygon points="32,20 44,26 32,32" fill="#050506"/>
      <text x="64" y="31" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="bold" fill="#f2f1ed" letter-spacing="1">INSPECT SYSTEM ▶</text>
    </g>
  </svg>`;
}

save('assets/matter/edition/p01-aura.svg', makeSelectedSystem('P01', 'AURA Engine', 'Algorithmic Financial Infrastructure', '0.48ms P99 Execution', 'Sub-millisecond high-frequency order matching and risk computation engine.', '#bba2cf'));
save('assets/matter/edition/p02-neura.svg', makeSelectedSystem('P02', 'NeuraMesh AI', 'Autonomous Multi-Agent Swarm', '1.2M Tokens/sec', 'Decentralized neural inference orchestration with adaptive context pruning.', '#aa91c2', 'Distributed Agent Consensus.'));
save('assets/matter/edition/p03-quantum.svg', makeSelectedSystem('P03', 'Quantum Vault', 'Post-Quantum Cryptographic Fabric', 'Kyber-1024 Enclave', 'Hardware-rooted zero-trust key distribution and privacy-preserving compute.', '#68899d', 'Zero-knowledge verification at enterprise scale.'));
save('assets/matter/edition/p04-chronos.svg', makeSelectedSystem('P04', 'Chronos Stream', 'Global Real-Time Observability', '10M Events/sec', 'Real-time telemetry aggregation and anomaly detection with sub-second alert loop.', '#9fb5b7', 'Distributed time-series engine with native anomaly models.'));

// 5. Engine Comparison Stages (1080x1920 portrait)
function makeEngineStage(num, label, desc, themeColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="eg-${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050608" />
        <stop offset="50%" stop-color="#090d14" />
        <stop offset="100%" stop-color="#020304" />
      </linearGradient>
      <radialGradient id="eg-glow-${num}" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${themeColor}" stop-opacity="0.32" />
        <stop offset="80%" stop-color="#050506" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1080" height="1920" fill="url(#eg-${num})" />
    <rect width="1080" height="1920" fill="url(#eg-glow-${num})" />

    <!-- Grid Lines -->
    <g stroke="rgba(242,241,237,0.05)" stroke-width="1">
      ${Array.from({length: 18}).map((_, i) => `<line x1="0" y1="${i*110}" x2="1080" y2="${i*110}" />`).join('')}
      ${Array.from({length: 10}).map((_, i) => `<line x1="${i*110}" y1="0" x2="${i*110}" y2="1920" />`).join('')}
    </g>

    <!-- Schematic Center Graphic -->
    <g transform="translate(540, 880)">
      <circle r="320" fill="none" stroke="${themeColor}" stroke-width="2" stroke-dasharray="6 8" opacity="0.6"/>
      <circle r="220" fill="none" stroke="#f2f1ed" stroke-width="1.5" opacity="0.4"/>
      <circle r="120" fill="rgba(11,14,20,0.8)" stroke="${themeColor}" stroke-width="3"/>
      
      <!-- Nodes in orbit -->
      ${Array.from({length: 6}).map((_, i) => {
        const rad = (i / 6) * Math.PI * 2;
        const x = Math.cos(rad) * 220;
        const y = Math.sin(rad) * 220;
        return `<circle cx="${x}" cy="${y}" r="14" fill="#070a0e" stroke="${themeColor}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="5" fill="#f2f1ed"/>`;
      }).join('')}

      <text y="8" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="bold" fill="#f2f1ed" text-anchor="middle">${label.toUpperCase()}</text>
      <text y="42" font-family="monospace" font-size="14" fill="${themeColor}" text-anchor="middle" letter-spacing="2">STAGE ${num} VERIFIED</text>
    </g>

    <!-- Top & Bottom Telemetry -->
    <g font-family="monospace" fill="rgba(242,241,237,0.7)" font-size="16" letter-spacing="2">
      <text x="80" y="140">FAROOQ ENGINE // SPECIFICATION</text>
      <text x="80" y="190" font-family="'Space Grotesk', sans-serif" font-size="44" font-weight="bold" fill="#f2f1ed">${label}</text>
      <text x="80" y="240" font-size="18" fill="${themeColor}">${desc}</text>

      <line x1="80" y1="280" x2="1000" y2="280" stroke="rgba(242,241,237,0.2)"/>

      <text x="80" y="1740">TELEMETRY STACK: DISTRIBUTED REPLICATION</text>
      <text x="80" y="1780">PIPELINE INTEGRITY: 100% SECURE</text>
      <text x="80" y="1820" fill="${themeColor}">EXECUTION PROFILE: HIGH-CONCURRENCY</text>
    </g>
  </svg>`;
}

save('assets/video/engine-stage-01.svg', makeEngineStage('01', 'Base Topology', 'Underlying microservice orchestration & kernel schematics', '#68899d'));
save('assets/video/engine-stage-02.svg', makeEngineStage('02', 'Neural Routing', 'Optimized tensor flows, RAG caches & vector indices', '#bba2cf'));
save('assets/video/engine-stage-03.svg', makeEngineStage('03', '4K Telemetry', 'Production metrics stream, low-latency live operations', '#aa91c2'));

// 6. Featured World Case Studies (2200x1468 landscape & 1080x1920 portrait)
function makeWorldGraphic(name, category, headline, subtitle, themeColor, isPortrait = false) {
  const w = isPortrait ? 1080 : 2200;
  const h = isPortrait ? 1920 : 1468;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="wg-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#040507" />
        <stop offset="50%" stop-color="#0a0e16" />
        <stop offset="100%" stop-color="#020305" />
      </linearGradient>
      <radialGradient id="wg-glow-${name}" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="${themeColor}" stop-opacity="0.3" />
        <stop offset="80%" stop-color="#050506" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#wg-${name})" />
    <rect width="${w}" height="${h}" fill="url(#wg-glow-${name})" />

    <!-- Isometric or Dimensional Wireframe Grid -->
    <g stroke="rgba(242,241,237,0.06)" stroke-width="1.5">
      ${Array.from({length: 16}).map((_, i) => `<line x1="0" y1="${i * (h/16)}" x2="${w}" y2="${i * (h/16)}" />`).join('')}
      ${Array.from({length: 20}).map((_, i) => `<line x1="${i * (w/20)}" y1="0" x2="${i * (w/20)}" y2="${h}" />`).join('')}
    </g>

    <!-- Cyber Matrix Center -->
    <g transform="translate(${w/2}, ${h/2})">
      <rect x="-260" y="-180" width="520" height="360" rx="16" fill="rgba(8,11,18,0.85)" stroke="${themeColor}" stroke-width="2"/>
      <line x1="-260" y1="-120" x2="260" y2="-120" stroke="rgba(242,241,237,0.15)"/>
      <circle cx="-230" cy="-150" r="5" fill="#f87171"/>
      <circle cx="-210" cy="-150" r="5" fill="#fbbf24"/>
      <circle cx="-190" cy="-150" r="5" fill="#34d399"/>
      
      <text x="0" y="-144" font-family="monospace" font-size="13" fill="rgba(242,241,237,0.6)" text-anchor="middle" letter-spacing="2">${name} // MISSION CRITICAL</text>
      
      <text x="0" y="-40" font-family="'Space Grotesk', sans-serif" font-size="34" font-weight="bold" fill="#f2f1ed" text-anchor="middle">${headline}</text>
      <text x="0" y="10" font-family="monospace" font-size="14" fill="${themeColor}" text-anchor="middle" letter-spacing="2">${subtitle.toUpperCase()}</text>

      <!-- HUD Telemetry items -->
      <g font-family="monospace" font-size="12" fill="rgba(242,241,237,0.8)">
        <text x="-210" y="80">P99 LATENCY: &lt;1.8ms</text>
        <text x="-210" y="110">RELIABILITY: 99.999% SLA</text>
        <text x="50" y="80">SCALE: 250M TX/DAY</text>
        <text x="50" y="110">REGIONS: 12 GLOBAL PODS</text>
      </g>
    </g>

    <!-- Cinematic Header Text in graphic -->
    <g font-family="monospace" fill="rgba(242,241,237,0.6)" font-size="16" letter-spacing="3">
      <text x="90" y="120">FLAGSHIP CASE STUDY // ${category.toUpperCase()}</text>
      <text x="${w-90}" y="120" text-anchor="end" fill="${themeColor}">ENGINEERED BY FAROOQ</text>
    </g>
  </svg>`;
}

save('assets/matter/edition/world-aura.svg', makeWorldGraphic('AURA', 'High-Frequency FinTech', 'Algorithmic Financial Infrastructure', 'Liquidity Engine & Zero-Loss Ledger', '#bba2cf', false));
save('assets/matter/edition/world-neura.svg', makeWorldGraphic('NEURA', 'Autonomous AI Swarm', 'Distributed Agentic Intelligence', 'Self-Healing Neural Consensus', '#aa91c2', true));
save('assets/matter/edition/world-hyperion.svg', makeWorldGraphic('HYPERION', 'Spatial Graphics & Cloud', 'WebGPU Real-Time Digital Twin', 'Ray-Traced Telemetry Visualizer', '#68899d', true));

// 7. Portfolio Sites Previews (1448x1086)
function makePortfolioSite(name, type, headline, themeColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1448 1086" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="ps-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050609" />
        <stop offset="50%" stop-color="#0a0e17" />
        <stop offset="100%" stop-color="#030406" />
      </linearGradient>
      <radialGradient id="ps-glow-${name}" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stop-color="${themeColor}" stop-opacity="0.32" />
        <stop offset="80%" stop-color="#050506" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1448" height="1086" fill="url(#ps-${name})" />
    <rect width="1448" height="1086" fill="url(#ps-glow-${name})" />

    <!-- Window frame mock -->
    <g stroke="rgba(242,241,237,0.15)" stroke-width="1.5" fill="none">
      <rect x="70" y="70" width="1308" height="946" rx="14" fill="rgba(8,11,18,0.75)"/>
      <line x1="70" y1="140" x2="1378" y2="140"/>
    </g>

    <!-- Browser Dots -->
    <circle cx="110" cy="105" r="6" fill="#f87171" opacity="0.8"/>
    <circle cx="132" cy="105" r="6" fill="#fbbf24" opacity="0.8"/>
    <circle cx="154" cy="105" r="6" fill="#34d399" opacity="0.8"/>
    
    <text x="724" y="112" font-family="monospace" font-size="14" fill="rgba(242,241,237,0.5)" text-anchor="middle" letter-spacing="1">https://${name.toLowerCase().replace(/\\s+/g, '')}.platform.internal</text>

    <!-- Mock UI Elements -->
    <g transform="translate(130, 220)">
      <text font-family="'Space Grotesk', sans-serif" font-size="52" font-weight="bold" fill="#f2f1ed">${name}</text>
      <text y="46" font-family="monospace" font-size="15" fill="${themeColor}" letter-spacing="2">${type.toUpperCase()}</text>
      <text y="90" font-family="'Space Grotesk', sans-serif" font-size="22" fill="rgba(242,241,237,0.75)">${headline}</text>

      <!-- Dashboard mockup cards -->
      <g transform="translate(0, 150)" stroke="rgba(242,241,237,0.1)" stroke-width="1" fill="rgba(15,20,30,0.6)">
        <rect width="360" height="240" rx="8" />
        <rect x="400" width="360" height="240" rx="8" />
        <rect x="800" width="360" height="240" rx="8" />
      </g>
      
      <!-- Chart line in card 1 -->
      <path d="M 30 480 Q 100 420, 180 440 T 330 380" fill="none" stroke="${themeColor}" stroke-width="3"/>
      <!-- Circular meter in card 2 -->
      <circle cx="580" cy="470" r="45" fill="none" stroke="rgba(242,241,237,0.2)" stroke-width="8"/>
      <circle cx="580" cy="470" r="45" fill="none" stroke="#f2f1ed" stroke-width="8" stroke-dasharray="180 280"/>
      <!-- Status lines in card 3 -->
      <line x1="830" y1="430" x2="1130" y2="430" stroke="rgba(242,241,237,0.2)" stroke-width="6" stroke-linecap="round"/>
      <line x1="830" y1="465" x2="1080" y2="465" stroke="${themeColor}" stroke-width="6" stroke-linecap="round"/>
      <line x1="830" y1="500" x2="1000" y2="500" stroke="rgba(242,241,237,0.2)" stroke-width="6" stroke-linecap="round"/>
    </g>
  </svg>`;
}

save('assets/portfolio-sites/nexo-cover.svg', makePortfolioSite('NEXO Studios', 'Autonomous Trading Workspace', 'Sub-millisecond order routing & dark pool analytics', '#bba2cf'));
save('assets/portfolio-sites/azimute-cover.svg', makePortfolioSite('Azimute AI', 'Real-Time Vector Search Engine', 'Multi-billion embedding retrieval under 4ms', '#aa91c2'));
save('assets/portfolio-sites/asl-cover.svg', makePortfolioSite('ASL Cloud Mesh', 'Enterprise Zero-Trust Platform', 'Decentralized service mesh with automated mTLS rotation', '#68899d'));
save('assets/portfolio-sites/aquila-cover.svg', makePortfolioSite('Aquila Spatial', 'WebGPU 3D Engine', 'Interactive spatial analytics with custom compute shaders', '#9fb5b7'));
save('assets/portfolio-sites/morada-cover.svg', makePortfolioSite('Morada Protocol', 'Cryptographic Identity Fabric', 'Decentralized authorization & zero-knowledge credentialing', '#bfa37c'));

// 8. Vertical Portfolio Rail Cards (720x1280)
function makeVerticalCard(code, title, category, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1280" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="vc-${code}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050608" />
        <stop offset="60%" stop-color="#0a0d14" />
        <stop offset="100%" stop-color="#030406" />
      </linearGradient>
      <radialGradient id="vc-glow-${code}" cx="50%" cy="30%" r="65%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.35" />
        <stop offset="80%" stop-color="#050506" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="720" height="1280" fill="url(#vc-${code})" />
    <rect width="720" height="1280" fill="url(#vc-glow-${code})" />

    <!-- Futuristic Cyber Frame -->
    <rect x="40" y="40" width="640" height="1200" rx="8" fill="none" stroke="rgba(242,241,237,0.12)" stroke-width="1.5"/>
    
    <!-- Central Geometric Hologram -->
    <g transform="translate(360, 540)">
      <polygon points="0,-180 160,-70 160,110 0,200 -160,110 -160,-70" fill="none" stroke="${accent}" stroke-width="2"/>
      <polygon points="0,-120 100,-45 100,75 0,140 -100,75 -100,-45" fill="rgba(11,15,24,0.7)" stroke="#f2f1ed" stroke-width="1.5"/>
      <circle r="40" fill="${accent}" fill-opacity="0.3"/>
      <circle r="8" fill="#f2f1ed"/>
    </g>

    <!-- Text Information -->
    <g font-family="monospace">
      <text x="70" y="90" font-size="13" fill="${accent}" letter-spacing="3">${code} // PROTOCOL</text>
      <text x="650" y="90" font-size="13" fill="rgba(242,241,237,0.5)" text-anchor="end">01:04 · 9:16</text>

      <text x="70" y="980" font-size="13" fill="${accent}" letter-spacing="2">${category.toUpperCase()}</text>
      <text x="70" y="1040" font-family="'Space Grotesk', sans-serif" font-size="44" font-weight="bold" fill="#f2f1ed">${title}</text>
      <text x="70" y="1100" font-size="15" fill="rgba(242,241,237,0.7)">Explore Architecture ▶</text>
    </g>
  </svg>`;
}

save('assets/video/v01-quantum.svg', makeVerticalCard('V01', 'Quantum Enclave', 'Hardware Rooted Cryptography', '#bba2cf'));
save('assets/video/v02-edge.svg', makeVerticalCard('V02', 'Edge Neural Kernel', 'Sub-1ms Embedded Inference', '#aa91c2'));
save('assets/video/v03-graph.svg', makeVerticalCard('V03', 'Graph Engine X', 'Billion-Edge Distributed Graph', '#68899d'));
save('assets/video/v04-stream.svg', makeVerticalCard('V04', 'Event Stream 4K', 'Distributed Telemetry Pipeline', '#9fb5b7'));
save('assets/video/v05-raft.svg', makeVerticalCard('V05', 'Consensus Raft', 'Byzantine-Tolerant State Machine', '#bfa37c'));
save('assets/video/v06a-mesh.svg', makeVerticalCard('V06.A', 'Mesh Consensus', 'Multi-Agent Autonomous Mesh', '#aa91c2'));
save('assets/video/v06b-kernel.svg', makeVerticalCard('V06.B', 'Kernel Shaper', 'Zero-Copy Linux eBPF Accelerator', '#bba2cf'));

// 9. Legacy Archive Cards (A01 - A05)
save('assets/video/a01-compiler.svg', makeVerticalCard('A01', 'AST Compiler', 'Bytecode JIT Optimizer', '#68899d'));
save('assets/video/a02-cache.svg', makeVerticalCard('A02', 'L1/L2 Vector Cache', 'NVMe Flash In-Memory Layer', '#bba2cf'));
save('assets/video/a03-pipeline.svg', makeVerticalCard('A03', 'Data Pipeline', 'Continuous Spark / Flink Flow', '#aa91c2'));
save('assets/video/a04-spatial.svg', makeVerticalCard('A04', 'Ray Tracer', 'WebGPU Spatial Lighting Engine', '#9fb5b7'));
save('assets/video/a05-telemetry.svg', makeVerticalCard('A05', 'Live Telemetry', 'Zero-Overhead Global Collector', '#bfa37c'));

// 10. Client & Tech Ecosystem Logos (Clean SVG vector marks)
function makeTechMark(name, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 100" fill="none">
    <rect width="300" height="100" rx="8" fill="rgba(255,255,255,0.02)"/>
    <text x="150" y="52" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#f2f1ed" text-anchor="middle" letter-spacing="4">${name.toUpperCase()}</text>
    <text x="150" y="74" font-family="monospace" font-size="10" fill="rgba(242,241,237,0.4)" text-anchor="middle" letter-spacing="2">${subtitle.toUpperCase()}</text>
  </svg>`;
}

save('assets/clients/nvidia.svg', makeTechMark('NVIDIA', 'CUDA · AI Compute'));
save('assets/clients/aws.svg', makeTechMark('AWS', 'Cloud Architecture'));
save('assets/clients/gcp.svg', makeTechMark('Google Cloud', 'Distributed Systems'));
save('assets/clients/kubernetes.svg', makeTechMark('Kubernetes', 'Container Orchestration'));
save('assets/clients/docker.svg', makeTechMark('Docker', 'Microservices Mesh'));
save('assets/clients/stripe.svg', makeTechMark('Stripe', 'FinTech Infrastructure'));
save('assets/clients/cloudflare.svg', makeTechMark('Cloudflare', 'Edge Networking'));
save('assets/clients/rust.svg', makeTechMark('Rust Lang', 'Systems Performance'));

console.log('All aesthetic portfolio SVG assets created successfully!');
