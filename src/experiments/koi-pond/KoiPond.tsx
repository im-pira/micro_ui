"use client";

import { usePond } from "./hooks/usePond";

export default function KoiPond() {
  const { canvasRef } = usePond();

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="relative aspect-[3/2] w-full max-w-[580px] overflow-hidden rounded-xl">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          aria-label="Interactive koi pond"
        />
      </div>

      <p className="mt-6 text-xs tracking-[0.2em] text-neutral-400">
        MOVE YOUR CURSOR TO INTERACT
      </p>
    </section>
  );
}