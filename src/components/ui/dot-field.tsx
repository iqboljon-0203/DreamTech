"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Halftone dot field: grayscale dots whose size follows slowly drifting light blobs.
export function DotField({ className, spacing = 12 }: { className?: string; spacing?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      const blobs = [
        { x: width * (0.68 + 0.08 * Math.sin(t * 0.13)), y: height * (0.4 + 0.1 * Math.cos(t * 0.17)), r: Math.max(width, height) * 0.38 },
        { x: width * (0.3 + 0.1 * Math.cos(t * 0.09)), y: height * (0.75 + 0.06 * Math.sin(t * 0.11)), r: Math.max(width, height) * 0.25 },
      ];

      const max = spacing * 0.42;
      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          let v = 0;
          for (const b of blobs) {
            const d = Math.hypot(x - b.x, y - b.y) / b.r;
            v += Math.max(0, 1 - d * d);
          }
          // Fine ripple so the field feels alive
          v *= 0.85 + 0.15 * Math.sin(x * 0.02 + y * 0.015 + t * 0.6);
          if (v < 0.04) continue;
          const size = Math.min(max, max * v);
          ctx.fillStyle = `rgba(255,255,255,${Math.min(0.55, 0.12 + v * 0.45)})`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    };

    const loop = (time: number) => {
      // ~30fps is plenty for slow drift
      if (visible && time - last > 33) {
        draw(time);
        last = time;
      }
      frame = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    if (reduceMotion) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [spacing]);

  return <canvas ref={canvasRef} className={cn("absolute inset-0 w-full h-full", className)} aria-hidden />;
}
