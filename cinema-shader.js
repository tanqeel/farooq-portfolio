/**
 * Cinema Shader — WebGL2 Volumetric Nebula/Smoke Canvas Simulation
 * Runs as the atmospheric background for Farooq Portfolio
 */
(() => {
  'use strict';

  const canvas = document.querySelector('[data-matter-canvas]');
  if (!canvas) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) return;

  const gl = canvas.getContext('webgl2', {
    alpha: true,
    antialias: false,
    depth: false,
    powerPreference: 'high-performance'
  });

  if (!gl) {
    console.warn('WebGL2 not available, using fallback atmosphere.');
    return;
  }

  const vsSource = `#version 300 es
    in vec2 position;
    out vec2 vUv;
    void main() {
      vUv = position * 0.5 + 0.5;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fsSource = `#version 300 es
    precision highp float;
    in vec2 vUv;
    out vec4 fragColor;

    uniform vec2 uResolution;
    uniform vec2 uPointer;
    uniform float uTime;

    // Simplex Noise Hash
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 st = gl_FragCoord.xy / uResolution.xy;
      st.x *= uResolution.x / uResolution.y;

      float t = uTime * 0.08;
      vec2 mouseOffset = (uPointer - 0.5) * 0.12;

      // Volumetric Noise Layer 1
      float n1 = snoise(st * 1.5 + vec2(t * 0.5, -t * 0.3) + mouseOffset);
      // Layer 2 with warp
      float n2 = snoise(st * 3.0 + vec2(-t * 0.7, t * 0.4) + n1 * 0.4);
      // Layer 3 fine filaments
      float n3 = snoise(st * 6.0 + n2 * 0.5);

      float density = (n1 * 0.55 + n2 * 0.35 + n3 * 0.1);
      density = smoothstep(-0.2, 0.7, density);

      // Cyber Colors
      vec3 deepInk = vec3(0.02, 0.025, 0.035);
      vec3 violetMist = vec3(0.73, 0.63, 0.82) * 0.28;
      vec3 cyanMist = vec3(0.41, 0.54, 0.62) * 0.22;

      vec3 color = mix(deepInk, violetMist, density);
      color = mix(color, cyanMist, n2 * 0.45);

      // Vignette
      vec2 uv = gl_FragCoord.xy / uResolution.xy;
      float vignette = 1.0 - length((uv - 0.5) * 1.4);
      color *= clamp(vignette, 0.1, 1.0);

      fragColor = vec4(color * 0.85, 0.75);
    }
  `;

  function createShader(gl, type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  const posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]), gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(program, 'position');
  const resLoc = gl.getUniformLocation(program, 'uResolution');
  const pointerLoc = gl.getUniformLocation(program, 'uPointer');
  const timeLoc = gl.getUniformLocation(program, 'uTime');

  let pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  window.addEventListener('pointermove', e => {
    pointer.tx = e.clientX / window.innerWidth;
    pointer.ty = 1.0 - (e.clientY / window.innerHeight);
  }, { passive: true });

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  let start = performance.now();
  function render(now) {
    if (document.documentElement.classList.contains('motion-paused')) {
      requestAnimationFrame(render);
      return;
    }

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;

    gl.useProgram(program);
    gl.enableVertexAttribArray(posLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.uniform2f(pointerLoc, pointer.x, pointer.y);
    gl.uniform1f(timeLoc, (now - start) * 0.001);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();
