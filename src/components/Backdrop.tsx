"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lava-lamp background: soft liquid-metal blobs that rise, merge and split on their own.
 * A small WebGL shader draws seven metaballs with a chrome-style sheen in the Homage palette:
 * indigo, cerulean and deep ai, with one vermilion blob and a warm washi highlight.
 * Output brightness is capped so text on top keeps WCAG AA contrast.
 *
 * Without WebGL the page keeps the static CSS glow. Reduced-motion visitors get one still frame.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;

const int N = 7;
// Highest linear luminance any pixel may reach. Keeps muted text above 4.5:1.
const float Y_MAX = 0.06;

vec3 tintFor(int i) {
  if (i == 3) return vec3(1.00, 0.42, 0.28); // shu (vermilion), a single warm blob
  int k = i - (i / 3) * 3;
  if (k == 0) return vec3(0.22, 0.34, 0.98); // ai (indigo)
  if (k == 1) return vec3(0.28, 0.62, 0.92); // sora (cerulean)
  return vec3(0.40, 0.36, 0.90);             // kon (deep blue-violet)
}

void main() {
  float t = uTime;
  float asp = uRes.x / uRes.y;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  float F = 0.0;
  vec2 G = vec2(0.0);
  vec3 acc = vec3(0.0);

  for (int i = 0; i < N; i++) {
    float fi = float(i);
    // Slow vertical ebb and flow with a gentle sideways sway.
    vec2 c = vec2(
      sin(t * (0.07 + 0.023 * fi) + fi * 2.3) * 0.40 * asp + (fi - 3.0) * 0.05 * asp,
      sin(t * (0.11 + 0.037 * fi) + fi * 1.7 + sin(t * 0.05 + fi)) * 0.50
    );
    float r = 0.13 + 0.05 * fract(fi * 0.618) + 0.03 * sin(t * 0.2 + fi * 3.1);
    vec2 d = p - c;
    float d2 = dot(d, d) + 1e-4;
    float w = r * r / d2;
    F += w;
    G += -2.0 * w * d / d2;
    acc += w * tintFor(i);
  }

  vec3 tint = acc / max(F, 1e-4);

  // Outside the blobs: a faint colored haze that thickens near them.
  vec3 haze = vec3(0.025, 0.028, 0.045) + tint * pow(clamp(F, 0.0, 1.2), 2.0) * 0.30;

  // Inside: chrome. The field's slope gives each blob a domed, reflective surface.
  vec3 n = normalize(vec3(-G * 0.07, 1.0));
  vec3 rd = reflect(vec3(0.0, 0.0, -1.0), n);
  float a = rd.x * 0.5 + 0.5;
  float b = rd.y * 0.5 + 0.5;
  float band1 = smoothstep(0.55, 0.95, sin(b * 7.0 + a * 2.0 + t * 0.15) * 0.5 + 0.5);
  float band2 = smoothstep(0.72, 1.00, sin(a * 5.0 - b * 3.0 + 1.7) * 0.5 + 0.5);
  vec3 chrome = vec3(0.025, 0.028, 0.05)
    + tint * (0.50 * band1)
    + mix(vec3(0.86, 0.88, 0.94), tint, 0.4) * (0.55 * band2);
  float spec = pow(max(dot(n, normalize(vec3(-0.4, 0.6, 0.7))), 0.0), 36.0);
  float rim = pow(1.0 - n.z, 1.5);
  chrome += vec3(1.0, 0.94, 0.86) * spec * 0.8 + tint * rim * 0.35;

  float m = smoothstep(0.95, 1.25, F);
  vec3 col = mix(haze, chrome, m);

  // Cap luminance (soft knee) so the brightest highlight still sits behind readable text.
  vec3 lin = pow(max(col, vec3(0.0)), vec3(2.2));
  float Y = dot(lin, vec3(0.2126, 0.7152, 0.0722));
  float Y2 = Y / (1.0 + Y / Y_MAX);
  col *= pow(Y2 / max(Y, 1e-5), 1.0 / 2.2);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

/** Fraction of the CSS size to render at. The blobs are soft, so half resolution looks the same. */
const SCALE = 0.5;
const FRAME_MS = 1000 / 30;

export function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    const start = performance.now();

    const resize = () => {
      const w = Math.max(2, Math.floor(window.innerWidth * SCALE));
      const h = Math.max(2, Math.floor(window.innerHeight * SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const draw = (seconds: number) => {
      gl.uniform1f(uTime, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (now - last < FRAME_MS) return;
      last = now;
      draw(20 + (now - start) / 1000);
    };

    resize();
    draw(20);
    setReady(true);

    if (reduce) {
      const redraw = () => {
        resize();
        draw(20);
      };
      window.addEventListener("resize", redraw);
      return () => window.removeEventListener("resize", redraw);
    }

    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas ${ready ? "backdrop-ready" : ""}`}
    >
      {/* Static fallback, hidden once the shader is running. */}
      <div className="backdrop-orb backdrop-orb-ai" />
      <div className="backdrop-orb backdrop-orb-sora" />
      <div className="backdrop-orb backdrop-orb-shu" />
      <canvas ref={canvasRef} className="backdrop-canvas" />
      <div className="backdrop-grain" />
      <div className="backdrop-vignette" />
    </div>
  );
}
