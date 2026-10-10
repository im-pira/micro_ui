import type { Fish } from "../engine/types";

export const FISH_ASSETS = [
  { src: "/koi-pond/fish/koi-1.png", rotation: 0 },
  { src: "/koi-pond/fish/koi-2.png", rotation: 90 },
  { src: "/koi-pond/fish/koi-3.png", rotation: 180 },
  { src: "/koi-pond/fish/koi-4.png", rotation: -90 },
];

export function prepareFish(
  images: HTMLImageElement[]
): HTMLCanvasElement[] {
  return images.map((image, i) => {
    const canvas = document.createElement("canvas");
    const size = 512;

    canvas.width = canvas.height = size;

    const ctx = canvas.getContext("2d")!;
    const angle = (-FISH_ASSETS[i].rotation * Math.PI) / 180;
    const rotated = i > -1 && Math.abs(Math.sin(angle)) > 0.5;

    const availableW = rotated ? image.height : image.width;
    const availableH = rotated ? image.width : image.height;
    const scale = Math.min(440 / availableW, 440 / availableH);

    ctx.translate(size / 2, size / 2);
    ctx.rotate(angle);
    ctx.drawImage(
      image,
      (-image.width * scale) / 2,
      (-image.height * scale) / 2,
      image.width * scale,
      image.height * scale
    );

    return canvas;
  });
}

export function drawFish(
  ctx: CanvasRenderingContext2D,
  fish: Fish,
  sprites: HTMLCanvasElement[]
) {
  const sprite = sprites[fish.id % sprites.length];
  if (!sprite) return;

  const angle = Math.atan2(fish.velocity.y, fish.velocity.x);
  const speed = Math.hypot(fish.velocity.x, fish.velocity.y);
  const length = fish.size * 2.8;
  const scale = length / 512;
  const amplitude = 8 + Math.min(speed / 12, 10);
  const strips = 48;
  const stripWidth = 512 / strips;

  ctx.save();
  ctx.translate(fish.position.x, fish.position.y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);

  // Soft underwater shadow
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.filter = "blur(12px)";
  ctx.drawImage(sprite, -256 + 8, -256 + 12);
  ctx.restore();

  // Bend progressively from head (right) to tail (left).
  for (let i = 0; i < strips; i++) {
    const x = i * stripWidth;
    const bend = Math.pow(1 - x / 512, 2);
    const offset =
      Math.sin(fish.phase - x * 0.018) *
      amplitude *
      bend *
      4;

    ctx.drawImage(
      sprite,
      x, 0, stripWidth, 512,
      x - 256, offset - 256,
      stripWidth + 0.5, 512
    );
  }

  ctx.restore();
}