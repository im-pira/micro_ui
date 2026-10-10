"use client";

import { useEffect, useRef } from "react";
import type { Point, PondState } from "../engine/types";
import { createFish, updateFish } from "../engine/fish";
import { addRipple, updateRipples, drawRipples } from "../engine/ripples";
import { drawPond } from "../rendering/drawPond";
import { drawFish, prepareFish, FISH_ASSETS } from "../rendering/drawFish";

export function usePond() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state: PondState = {
      fish: [],
      ripples: [],
      pointer: null,
      width: 0,
      height: 0,
      time: 0,
    };

    const load = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
      });

    let frame = 0;
    let disposed = false;
    let lastTime = 0;
    let lastRipple = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;

      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      state.width = width;
      state.height = height;

      if (!state.fish.length) {
        state.fish = createFish(8, width, height);
      } else {
        state.fish.forEach((fish) => {
          fish.position.x = Math.min(fish.position.x, width);
          fish.position.y = Math.min(fish.position.y, height);
        });
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const pointerPosition = (e: PointerEvent): Point => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMove = (e: PointerEvent) => {
      const next = pointerPosition(e);
      const previous = state.pointer;
      state.pointer = next;

      if (
        previous &&
        Math.hypot(next.x - previous.x, next.y - previous.y) > 5 &&
        performance.now() - lastRipple > 100
      ) {
        addRipple(state.ripples, next, 0.65);
        lastRipple = performance.now();
      }
    };

    const onDown = (e: PointerEvent) => {
      state.pointer = pointerPosition(e);
      addRipple(state.ripples, state.pointer, 1.4);
    };

    const onLeave = () => {
      state.pointer = null;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);

    Promise.all([
      load("/koi-pond/background/pond.webp"),
      ...FISH_ASSETS.map((asset) => load(asset.src)),
    ]).then(([background, ...images]) => {
      if (disposed) return;

      const sprites = prepareFish(images);

      const animate = (timestamp: number) => {
        const dt = lastTime
          ? Math.min((timestamp - lastTime) / 1000, 0.05)
          : 0;

        lastTime = timestamp;
        state.time += dt;

        const { width, height, time } = state;

        if (width && height) {
          drawPond(ctx, width, height, background);

          state.fish.forEach((fish) => {
            updateFish(fish, state.pointer, width, height, dt, time);
            drawFish(ctx, fish, sprites);
          });

          updateRipples(state.ripples, dt);
          drawRipples(ctx, state.ripples);
        }

        frame = requestAnimationFrame(animate);
      };

      frame = requestAnimationFrame(animate);
    }).catch((error) => {
      if (!disposed) console.error("Failed to load koi assets:", error);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return { canvasRef };
}