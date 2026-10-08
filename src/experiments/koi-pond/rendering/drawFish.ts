import type { Fish } from "../engine/types";

const TAU = Math.PI * 2;

const PALETTES = {
  kohaku: {
    body: "#f3ebd7",
    patches: "#cb482b",
    fins: "#e7d9bd",
  },
  sanke: {
    body: "#f1e9d9",
    patches: "#d35336",
    fins: "#ddd5c6",
  },
  yamabuki: {
    body: "#e7b95e",
    patches: "#f3d38b",
    fins: "#d9a34d",
  },
};

export function drawFish(
  ctx: CanvasRenderingContext2D,
  fish: Fish,
  time: number
): void {
  const { position, velocity, size, pattern, phase } = fish;
  const palette = PALETTES[pattern];

  const angle = Math.atan2(velocity.y, velocity.x);
  const scale = size / 60;

  const tailSwing = Math.sin(phase) * 9;
  const finSwing = Math.sin(phase * 0.65) * 0.12;

  ctx.save();

  ctx.translate(position.x, position.y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  // Soft shadow beneath the fish.
  ctx.save();
  ctx.translate(5, 9);
  ctx.globalAlpha = 0.22;
  ctx.filter = "blur(7px)";
  ctx.fillStyle = "#071b19";
  ctx.beginPath();
  ctx.ellipse(0, 0, 43, 14, 0, 0, TAU);
  ctx.fill();
  ctx.restore();

  // Tail fin.
  ctx.save();
  ctx.translate(-35, 0);
  ctx.rotate(tailSwing * 0.025);

  ctx.fillStyle = palette.fins;
  ctx.globalAlpha = 0.85;

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(-17, -19, -33, -14);
  ctx.quadraticCurveTo(-25, 0, -33, 14);
  ctx.quadraticCurveTo(-17, 19, 0, 0);
  ctx.fill();

  ctx.restore();

  // Pectoral fins.
  for (const side of [-1, 1]) {
    ctx.save();
    ctx.translate(12, side * 9);
    ctx.rotate(side * (0.35 + finSwing));

    ctx.fillStyle = palette.fins;
    ctx.globalAlpha = 0.85;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-8, side * 18, -22, side * 23);
    ctx.quadraticCurveTo(-12, side * 6, 0, 0);
    ctx.fill();

    ctx.restore();
  }

  // Main body.
  const bodyGradient = ctx.createLinearGradient(0, -17, 0, 17);
  bodyGradient.addColorStop(0, "#ffffff");
  bodyGradient.addColorStop(0.22, palette.body);
  bodyGradient.addColorStop(0.75, palette.body);
  bodyGradient.addColorStop(1, "#b8ad94");

  ctx.fillStyle = bodyGradient;

  ctx.beginPath();
  ctx.moveTo(43, 0);
  ctx.bezierCurveTo(35, -15, 9, -20, -14, -13);
  ctx.bezierCurveTo(-28, -9, -35, -5, -39, 0);
  ctx.bezierCurveTo(-35, 5, -28, 9, -14, 13);
  ctx.bezierCurveTo(9, 20, 35, 15, 43, 0);
  ctx.closePath();
  ctx.fill();

  // Clip color patterns to the body.
  ctx.save();
  ctx.clip();

  ctx.fillStyle = palette.patches;

  if (pattern === "kohaku") {
    drawPatch(ctx, 20, -3, 12, 13, -0.3);
    drawPatch(ctx, -10, 4, 15, 11, 0.4);
    drawPatch(ctx, -28, -2, 7, 8, 0.2);
  }

  if (pattern === "sanke") {
    drawPatch(ctx, 23, 0, 12, 10, -0.2);
    drawPatch(ctx, -6, -5, 14, 12, 0.5);
    drawPatch(ctx, -25, 5, 8, 7, 0);

    ctx.fillStyle = "#272c2b";
    drawPatch(ctx, 4, 9, 6, 5, 0.4);
    drawPatch(ctx, -20, -8, 5, 6, -0.3);
  }

  if (pattern === "yamabuki") {
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = palette.patches;
    drawPatch(ctx, 5, -5, 24, 10, 0);
  }

  ctx.restore();

  // Dorsal fin.
  ctx.fillStyle = palette.fins;
  ctx.globalAlpha = 0.9;

  ctx.beginPath();
  ctx.moveTo(-8, -2);
  ctx.quadraticCurveTo(-18, -9, -17, -14);
  ctx.quadraticCurveTo(0, -9, 12, -3);
  ctx.closePath();
  ctx.fill();

  // Eyes.
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#19201d";

  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.arc(29, side * 8, 2.3, 0, TAU);
    ctx.fill();
  }

  // Subtle animated highlight.
  const shimmer = 0.06 + Math.sin(time * 1.8 + fish.id) * 0.03;

  ctx.globalAlpha = shimmer;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(8, -5, 24, 5, -0.1, 0, TAU);
  ctx.fill();

  ctx.restore();
}

function drawPatch(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rx: number,
  ry: number,
  rotation: number
): void {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rotation, 0, TAU);
  ctx.fill();
}