const TAU = Math.PI * 2;

export function drawPond(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
): void {
  ctx.clearRect(0, 0, width, height);

  // Deep, natural pond background.
  const background = ctx.createRadialGradient(
    width * 0.45,
    height * 0.4,
    0,
    width * 0.5,
    height * 0.5,
    Math.max(width, height) * 0.85
  );

  background.addColorStop(0, "#254b43");
  background.addColorStop(0.45, "#163b35");
  background.addColorStop(0.8, "#0c2826");
  background.addColorStop(1, "#071b1b");

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  drawCaustics(ctx, width, height, time);
  drawWaterTexture(ctx, width, height, time);
  drawVignette(ctx, width, height);
}

function drawCaustics(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
): void {
  ctx.save();

  ctx.globalCompositeOperation = "screen";
  ctx.lineWidth = 1;

  const spacing = 85;
  const rows = Math.ceil(height / spacing) + 2;
  const columns = Math.ceil(width / spacing) + 2;

  for (let row = -1; row < rows; row++) {
    for (let column = -1; column < columns; column++) {
      const baseX = column * spacing;
      const baseY = row * spacing;

      const phase = column * 1.7 + row * 2.3;

      const x =
        baseX +
        Math.sin(time * 0.35 + phase) * 18;

      const y =
        baseY +
        Math.cos(time * 0.28 + phase) * 16;

      const radius =
        28 + Math.sin(time * 0.45 + phase) * 8;

      const opacity =
        0.035 +
        (Math.sin(time * 0.6 + phase) + 1) * 0.012;

      ctx.strokeStyle = `rgba(155, 220, 193, ${opacity})`;

      ctx.beginPath();

      ctx.ellipse(
        x,
        y,
        radius * 1.4,
        radius * 0.65,
        Math.sin(time * 0.15 + phase) * 0.4,
        0,
        TAU
      );

      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawWaterTexture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
): void {
  ctx.save();

  const spacing = 48;
  const rows = Math.ceil(height / spacing);
  const columns = Math.ceil(width / spacing);

  ctx.lineWidth = 0.7;

  for (let row = 0; row <= rows; row++) {
    for (let column = 0; column <= columns; column++) {
      const x = column * spacing;
      const y = row * spacing;

      const phase = row * 1.4 + column * 0.9;

      const offset =
        Math.sin(time * 0.8 + phase) * 6;

      const opacity =
        0.018 +
        (Math.sin(time + phase) + 1) * 0.008;

      ctx.strokeStyle = `rgba(210, 240, 222, ${opacity})`;

      ctx.beginPath();

      ctx.moveTo(x - 12, y + offset);

      ctx.quadraticCurveTo(
        x,
        y - 4 + offset,
        x + 14,
        y + offset
      );

      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawVignette(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const vignette = ctx.createRadialGradient(
    width / 2,
    height / 2,
    Math.min(width, height) * 0.2,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.75
  );

  vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
  vignette.addColorStop(1, "rgba(0, 10, 9, 0.55)");

  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}