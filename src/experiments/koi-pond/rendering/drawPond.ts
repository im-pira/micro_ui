export function drawPond(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement
) {
  const scale = Math.max(width / image.width, height / image.height);
  const w = image.width * scale;
  const h = image.height * scale;

  ctx.drawImage(image, (width - w) / 2, (height - h) / 2, w, h);
}