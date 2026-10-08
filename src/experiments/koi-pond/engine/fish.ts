import type { Fish, FishPattern, Point } from "./types";

const PATTERNS: FishPattern[] = [
  "kohaku",
  "sanke",
  "yamabuki",
];

const BASE_SPEED = 45;
const MAX_SPEED = 130;
const DETECTION_RADIUS = 160;

export function createFish(
  count: number,
  width: number,
  height: number
): Fish[] {
  return Array.from({ length: count }, (_, id) => {
    const angle = Math.random() * Math.PI * 2;
    const speed = BASE_SPEED * (0.7 + Math.random() * 0.6);

    return {
      id,
      position: {
        x: width * (0.15 + Math.random() * 0.7),
        y: height * (0.15 + Math.random() * 0.7),
      },
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      },
      size: 35 + Math.random() * 25,
      phase: Math.random() * Math.PI * 2,
      turnBias: Math.random() * Math.PI * 2,
      pattern: PATTERNS[id % PATTERNS.length],
    };
  });
}

export function updateFish(
  fish: Fish,
  pointer: Point | null,
  width: number,
  height: number,
  deltaTime: number,
  time: number
): void {
  const dt = Math.min(deltaTime, 0.05);

  const { position, velocity } = fish;

  // Smooth wandering instead of random abrupt turns.
  const wander =
    Math.sin(time * 0.65 + fish.turnBias) * 0.8 +
    Math.sin(time * 0.23 + fish.id * 3.7) * 0.5;

  const angle = wander * dt;

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const vx = velocity.x * cos - velocity.y * sin;
  const vy = velocity.x * sin + velocity.y * cos;

  velocity.x = vx;
  velocity.y = vy;

  // Steer back toward the pond when approaching edges.
  const margin = Math.min(100, width * 0.2, height * 0.2);

  if (position.x < margin) {
    velocity.x += (margin - position.x) * dt * 2;
  }

  if (position.x > width - margin) {
    velocity.x -= (position.x - (width - margin)) * dt * 2;
  }

  if (position.y < margin) {
    velocity.y += (margin - position.y) * dt * 2;
  }

  if (position.y > height - margin) {
    velocity.y -= (position.y - (height - margin)) * dt * 2;
  }

  // Flee from nearby cursor movements.
  if (pointer) {
    const dx = position.x - pointer.x;
    const dy = position.y - pointer.y;

    const distance = Math.hypot(dx, dy);

    if (distance < DETECTION_RADIUS && distance > 0.001) {
      const strength = 1 - distance / DETECTION_RADIUS;

      velocity.x += (dx / distance) * strength * 300 * dt;
      velocity.y += (dy / distance) * strength * 300 * dt;
    }
  }

  // Keep movement within natural swimming speeds.
  const speed = Math.hypot(velocity.x, velocity.y);

  if (speed > 0.001) {
    const targetSpeed = Math.max(
      BASE_SPEED * 0.6,
      Math.min(speed, MAX_SPEED)
    );

    const smoothing = Math.min(1, dt * 2);

    const nextSpeed =
      speed + (targetSpeed - speed) * smoothing;

    velocity.x = (velocity.x / speed) * nextSpeed;
    velocity.y = (velocity.y / speed) * nextSpeed;
  }

  // Integrate velocity using seconds, not frame count.
  position.x += velocity.x * dt;
  position.y += velocity.y * dt;

  // Keep fish inside the visible pond.
  position.x = Math.max(0, Math.min(width, position.x));
  position.y = Math.max(0, Math.min(height, position.y));

  // Controls the tail animation phase.
  fish.phase += dt * (3 + speed * 0.035);
}