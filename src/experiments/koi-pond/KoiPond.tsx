"use client";

import { usePond } from "./hooks/usePond";

export default function KoiPond() {
  const { canvasRef } = usePond();

  return (
    <div className="relative h-full min-h-[500px] w-full overflow-hidden bg-[#071b1b]">
      <canvas
        ref={canvasRef}
        aria-label="Interactive koi pond with swimming fish and water ripples"
        className="absolute inset-0 h-full w-full touch-none"
      />

      {/* Subtle ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(180, 220, 190, 0.06), transparent 60%)",
        }}
      />

      {/* Bottom caption */}
      <div className="pointer-events-none absolute bottom-8 left-8 select-none">
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
          An interactive experience
        </p>

        <h1 className="mt-2 font-serif text-3xl font-light tracking-wide text-white/85">
          Koi Pond
        </h1>

        <p className="mt-2 text-xs tracking-wide text-white/40">
          Move your cursor across the water
        </p>
      </div>
    </div>
  );
}