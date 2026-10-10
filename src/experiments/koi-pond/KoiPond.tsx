"use client";

import { usePond } from "./hooks/usePond";

export default function KoiPond() {
  const { canvasRef } = usePond();

  return (
    <section className="flex w-full flex-col items-center">
      <div
        className="relative aspect-[3/2] w-full max-w-[1100px]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 65% at center, black 48%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 65% at center, black 48%, transparent 100%)",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          aria-label="Interactive koi pond"
        />
      </div>

      <p className="mt-4 text-xs tracking-[0.2em] text-neutral-400">
        MOVE YOUR CURSOR TO INTERACT
      </p>
    </section>
  );
}