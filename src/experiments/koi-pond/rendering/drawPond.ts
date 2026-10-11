export function drawPond(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement,
  time = 0,
  reducedMotion = false
) {
  ctx.clearRect(0, 0, width, height);

  const scale = Math.max(
    width / image.width,
    height / image.height
  );

  const sourceWidth = width / scale;
  const sourceHeight = height / scale;

  const sourceX = (image.width - sourceWidth) / 2;
  const sourceY = (image.height - sourceHeight) / 2;

  if (reducedMotion) {
    ctx.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      width,
      height
    );
    return;
  }

  const stripHeight = 3;

  for (let y = 0; y < height; y += stripHeight) {
    const band = Math.min(stripHeight, height - y);

    // Continuous overlapping water currents.
    const wave1 =
      Math.sin(y * 0.025 + time * 1.2) * 6;

    const wave2 =
      Math.sin(y * 0.055 - time * 0.8) * 3;

    const wave3 =
      Math.sin(y * 0.012 + time * 0.45) * 4;

    const offset = wave1 + wave2 + wave3;

    const sourceBandY = sourceY + y / scale;
    const sourceBandHeight = band / scale;

    ctx.drawImage(
      image,
      sourceX + offset / scale,
      sourceBandY,
      sourceWidth,
      sourceBandHeight,
      0,
      y,
      width,
      band + 0.5
    );
  }
}