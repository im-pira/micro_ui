"use client";

import { useEffect, useRef } from "react";

import type { Point, PondState } from "../engine/types";
import { createFish, updateFish } from "../engine/fish";
import { addRipple, updateRipples, drawRipples } from "../engine/ripples";
import { drawPond } from "../rendering/drawPond";
import { drawFish } from "../rendering/drawFish";

const FISH_COUNT = 8;
const MAX_DPR = 2;
const POINTER_RIPPLE_INTERVAL = 80;

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

    let animationFrame = 0;
    let previousTime = 0;
    let lastRippleTime = 0;
    let previousPointer: Point | null = null;

    const resizeObserver = new ResizeObserver(() => {
      const bounds = canvas.getBoundingClientRect();

      const width = bounds.width;
      const height = bounds.height;

      if (!width || !height) return;

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      state.width = width;
      state.height = height;

      if (state.fish.length === 0) {
        state.fish = createFish(FISH_COUNT, width, height);
      } else {
        for (const fish of state.fish) {
          fish.position.x = Math.min(fish.position.x, width);
          fish.position.y = Math.min(fish.position.y, height);
        }
      }
    });

    resizeObserver.observe(canvas);

    function getPointerPosition(event: PointerEvent): Point {
      const bounds = canvas!.getBoundingClientRect();

      return {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };
    }

    function handlePointerMove(event: PointerEvent) {
      const position = getPointerPosition(event);

      state.pointer = position;

      const now = performance.now();

      if (previousPointer) {
        const distance = Math.hypot(
          position.x - previousPointer.x,
          position.y - previousPointer.y
        );

        if (
          distance > 8 &&
          now - lastRippleTime > POINTER_RIPPLE_INTERVAL
        ) {
          addRipple(state.ripples, position, 0.65);
          lastRippleTime = now;
        }
      }

      previousPointer = position;
    }

    function handlePointerDown(event: PointerEvent) {
      const position = getPointerPosition(event);

      state.pointer = position;
      previousPointer = position;

      addRipple(state.ripples, position, 1.4);
    }

    function handlePointerLeave() {
      state.pointer = null;
      previousPointer = null;
    }

    function animate(timestamp: number) {
      if (!previousTime) previousTime = timestamp;

      const deltaTime = Math.min(
        (timestamp - previousTime) / 1000,
        0.05
      );

      previousTime = timestamp;
      state.time += deltaTime;

      const { width, height, time } = state;

      if (width > 0 && height > 0) {
        ctx!.clearRect(0, 0, width, height);

        // 1. Draw water and lighting.
        drawPond(ctx!, width, height, time);

        // 2. Update swimming behavior.
        for (const fish of state.fish) {
          updateFish(
            fish,
            state.pointer,
            width,
            height,
            deltaTime,
            time
          );
        }

        // 3. Draw fish.
        for (const fish of state.fish) {
          drawFish(ctx!, fish, time);
        }

        // 4. Update and render water ripples.
        updateRipples(state.ripples, deltaTime);
        drawRipples(ctx!, state.ripples);
      }

      animationFrame = requestAnimationFrame(animate);
    }

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("pointercancel", handlePointerLeave);

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();

      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointercancel", handlePointerLeave);
    };
  }, []);

  return { canvasRef };
}