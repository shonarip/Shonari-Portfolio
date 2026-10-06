"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  base: number;
  speed: number;
  phase: number;
};

/**
 * A quiet backdrop: a near-black gradient with a sparse field of faint stars.
 * No clouds, shooting stars or cursor effects, so the artwork supplies the color.
 */
export function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(50, Math.min(Math.floor((width * height) / 14000), 140));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 0.8,
        base: 0.12 + Math.random() * 0.2,
        speed: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0, "#0d0d14");
      sky.addColorStop(1, "#08080b");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      for (const s of stars) {
        const a = reduceMotion ? s.base : s.base * (0.7 + 0.3 * Math.sin(t * s.speed + s.phase));
        ctx.globalAlpha = a;
        ctx.fillStyle = "#f2ece4";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      draw(now / 1000);
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduceMotion) {
      draw(0);
      const redraw = () => {
        resize();
        draw(0);
      };
      window.removeEventListener("resize", resize);
      window.addEventListener("resize", redraw);
      return () => window.removeEventListener("resize", redraw);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full bg-canvas"
    />
  );
}
