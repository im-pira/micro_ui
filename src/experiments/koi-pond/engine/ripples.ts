import type { Point, Ripple } from "./types";

const RIPPLE_DURATION = 1.8;
const RIPPLE_SPEED = 65;
const MAX_RIPPLES = 40;

export function createRipple(
  position: Point,
  intensity = 1
): Ripple {
  return {
    position: { ...position },
    radius: 4 * intensity,
    age: 0,
    duration: RIPPLE_DURATION * intensity,
  };
}

export function addRipple(
  ripples: Ripple[],
  position: Point,
  intensity = 1
): void {
  ripples.push(createRipple(position, intensity));

  if (ripples.length > MAX_RIPPLES) {
    ripples.splice(
      0,
      ripples.length - MAX_RIPPLES
    );
  }
}

export function updateRipples(
  ripples: Ripple[],
  deltaTime: number
): void {
  const dt = Math.max(
    0,
    Math.min(deltaTime, 0.05)
  );

  for (let i = ripples.length - 1; i >= 0; i--) {
    const ripple = ripples[i];

    ripple.age += dt;
    ripple.radius += RIPPLE_SPEED * dt;

    if (ripple.age >= ripple.duration) {
      ripples.splice(i, 1);
    }
  }
}

export function drawRipples(
  ctx: CanvasRenderingContext2D,
  ripples: Ripple[],
  time = 0
): void {
  ctx.save();

  for (const ripple of ripples) {
    const progress = Math.min(
      1,
      ripple.age / ripple.duration
    );

    const opacity = Math.pow(
      1 - progress,
      2
    );

    for (let ring = 0; ring < 3; ring++) {
      const radius = ripple.radius - ring * 11;

      if (radius <= 0) continue;

      ctx.beginPath();

      ctx.ellipse(
        ripple.position.x,
        ripple.position.y,
        radius,
        radius * (
          0.85 +
          0.03 * Math.sin(time + ring)
        ),
        0.1 * Math.sin(
          time * 0.7 + ripple.position.x
        ),
        0,
        Math.PI * 2
      );

      ctx.strokeStyle = `rgba(
        220,
        240,
        218,
        ${opacity * (0.15 - ring * 0.035)}
      )`;

      ctx.lineWidth = 1.1 - ring * 0.18;

      ctx.stroke();
    }
  }

  ctx.restore();
}