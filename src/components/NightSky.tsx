"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  twinkle: number;
  phase: number;
  glow: number;
};

type ShootingStar = {
  x: number;
  y: number;
  /** Unit direction toward bottom-right */
  ux: number;
  uy: number;
  speed: number;
  len: number;
  life: number;
  maxLife: number;
};

type CloudLayer = {
  speed: number;
  alpha: number;
  scale: number;
  offsetY: number;
  offsetX: number;
  drift: number;
};

export function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let shooting: ShootingStar[] = [];
    let nextShootAt = 0.4 + Math.random() * 1.2;
    let layers: CloudLayer[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;
    let t0 = performance.now();
    let cloudImg: HTMLImageElement | null = null;
    let imgReady = false;
    let tileW = 1;
    let tileH = 1;

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      cloudImg = img;
      imgReady = true;
      resize();
    };
    img.src = "/clouds/cumulus-seamless.png?v=seam3";

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 3800);
      stars = Array.from(
        { length: Math.max(160, Math.min(count, 520)) },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.9 + Math.random() * 2.8,
          base: 0.4 + Math.random() * 0.5,
          twinkle: 0.55 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          glow: 2.2 + Math.random() * 2.4,
        }),
      );

      // Tile sized to fill width; seamless vertical scroll
      const aspect =
        imgReady && cloudImg ? cloudImg.width / cloudImg.height : 1.5;
      tileW = width * 1.15;
      tileH = tileW / aspect;

      // Keep existing offsets when resizing so motion doesn’t jump
      const prev = layers;
      layers = [
        {
          speed: 0.22,
          alpha: 0.28,
          scale: 1.05,
          offsetY: prev[0]?.offsetY ?? 0,
          offsetX: prev[0]?.offsetX ?? -width * 0.05,
          drift: 0.04,
        },
        {
          speed: 0.38,
          alpha: 0.36,
          scale: 1.0,
          offsetY: prev[1]?.offsetY ?? tileH * 0.33,
          offsetX: prev[1]?.offsetX ?? -width * 0.02,
          drift: -0.03,
        },
        {
          speed: 0.55,
          alpha: 0.42,
          scale: 0.95,
          offsetY: prev[2]?.offsetY ?? tileH * 0.66,
          offsetX: prev[2]?.offsetX ?? 0,
          drift: 0.02,
        },
      ];
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    /** Draw one seamless field covering the viewport (pattern tile + scroll) */
    const drawSeamlessLayer = (layer: CloudLayer, t: number) => {
      if (!cloudImg || !imgReady) return;
      const tw = tileW * layer.scale;
      const th = tileH * layer.scale;
      const sway = Math.sin(t * 0.1 + layer.speed) * 8;
      const ox = layer.offsetX + sway + layer.drift * t * 4;
      // offsetY decreases each frame → pattern scrolls bottom → top
      const oy = layer.offsetY;

      ctx.save();
      ctx.globalAlpha = layer.alpha;

      let usedPattern = false;
      try {
        const pattern = ctx.createPattern(cloudImg, "repeat");
        if (pattern) {
          // Scale native pixels → tileW×tileH, then scroll with ox/oy
          const mat = new DOMMatrix()
            .translateSelf(ox, oy)
            .scaleSelf(tw / cloudImg.width, th / cloudImg.height);
          pattern.setTransform(mat);
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
          usedPattern = true;
        }
      } catch {
        usedPattern = false;
      }

      if (!usedPattern) {
        // Fallback: heavy overlap so soft edges hide joins
        const stepY = th * 0.55;
        const stepX = tw * 0.55;
        const oy2 = ((layer.offsetY % stepY) + stepY) % stepY;
        const startY = -th + oy2;
        const startX = ((ox % stepX) + stepX) % stepX - tw;
        for (let y = startY; y < height + th; y += stepY) {
          for (let x = startX; x < width + tw; x += stepX) {
            ctx.drawImage(cloudImg, x, y, tw, th);
          }
        }
      }
      ctx.restore();
    };

    const frame = (now: number) => {
      const t = (now - t0) / 1000;

      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#4a0612");
      sky.addColorStop(0.35, "#1a050a");
      sky.addColorStop(0.7, "#0a0406");
      sky.addColorStop(1, "#000000");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      const haze = ctx.createRadialGradient(
        width * 0.5,
        height * 0.05,
        0,
        width * 0.5,
        height * 0.05,
        Math.max(width, height) * 0.65,
      );
      haze.addColorStop(0, "rgba(180, 30, 55, 0.22)");
      haze.addColorStop(0.5, "rgba(90, 10, 25, 0.1)");
      haze.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      for (const s of stars) {
        const dx = s.x - mouseX;
        const dy = s.y - mouseY;
        const dist = Math.hypot(dx, dy);
        const hover = Math.max(0, 1 - dist / 120);

        const pulse = reduceMotion
          ? 0.75
          : 0.15 + 0.85 * (0.5 + 0.5 * Math.sin(t * s.twinkle + s.phase));
        const tw = s.base * pulse;
        const r = s.r * (1 + hover * 2.2);
        const a = Math.min(1, tw + hover * 0.45);

        const glowA = Math.min(0.45, a * 0.28 + hover * 0.12);
        const glowR = r * s.glow * (0.85 + pulse * 0.35);
        const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
        halo.addColorStop(0, `rgba(210, 220, 255, ${glowA})`);
        halo.addColorStop(0.45, `rgba(150, 170, 255, ${glowA * 0.35})`);
        halo.addColorStop(1, "rgba(100, 120, 200, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `rgba(240, 244, 255, ${a})`;
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Sparse shooting stars: top-left → bottom-right, fade as they travel
      if (!reduceMotion) {
        if (t >= nextShootAt && shooting.length < 4) {
          const startX = -40 + Math.random() * width * 0.45;
          const startY = -30 + Math.random() * height * 0.35;
          // Slight jitter around pure SE diagonal
          const ang = Math.PI / 4 + (Math.random() - 0.5) * 0.22;
          shooting.push({
            x: startX,
            y: startY,
            ux: Math.cos(ang),
            uy: Math.sin(ang),
            speed: 560 + Math.random() * 420,
            len: 112 + Math.random() * 144,
            life: 0,
            maxLife: 0.55 + Math.random() * 0.45,
          });
          nextShootAt = t + 1.2 + Math.random() * 2.8;
        }

        for (let i = shooting.length - 1; i >= 0; i--) {
          const s = shooting[i];
          const dt = 1 / 60;
          s.life += dt;
          s.x += s.ux * s.speed * dt;
          s.y += s.uy * s.speed * dt;
          const p = Math.min(1, s.life / s.maxLife);
          const fade = (1 - p) * (1 - p);
          if (p >= 1 || s.x > width + 80 || s.y > height + 80) {
            shooting.splice(i, 1);
            continue;
          }
          const tx = s.x - s.ux * s.len;
          const ty = s.y - s.uy * s.len;
          const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
          grad.addColorStop(0, "rgba(220, 230, 255, 0)");
          grad.addColorStop(0.55, `rgba(210, 220, 255, ${0.22 * fade})`);
          grad.addColorStop(1, `rgba(255, 255, 255, ${0.85 * fade})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.25;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(s.x, s.y);
          ctx.stroke();
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * fade})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Seamless continuous scroll bottom → top
      for (const layer of layers) {
        if (!reduceMotion) {
          layer.offsetY -= layer.speed;
        }
        drawSeamlessLayer(layer, t);
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
