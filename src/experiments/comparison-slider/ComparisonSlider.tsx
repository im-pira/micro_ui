import { useState } from "react";

export default function ComparisonSlider() {
  const [pos, setPos] = useState(50);

  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f0e9] p-6">
      <div className="w-[360px] rounded-[38px] border border-black/10 bg-[linear-gradient(180deg,#fff_0%,#f8f8f6_100%)] p-[10px] shadow-[0_2px_3px_rgba(0,0,0,.08),0_18px_40px_rgba(0,0,0,.14),0_40px_90px_-20px_rgba(0,0,0,.28)] ring-1 ring-white/80">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[29px] border border-black/15 bg-neutral-200 shadow-[inset_0_1px_0_rgba(255,255,255,.55),inset_0_-1px_0_rgba(0,0,0,.08)]">
          <img
            src="/comparison-slider/comparisonSlider.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />

          <img
            src="/comparison-slider/comparisonSlider.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          />

          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/25" />

          <span className="absolute left-4 top-4 z-20 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[12px] font-medium tracking-[-0.01em] text-white shadow-[0_2px_8px_rgba(0,0,0,.22)] backdrop-blur-xl">
            Before
          </span>

          <span className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[12px] font-medium tracking-[-0.01em] text-white shadow-[0_2px_8px_rgba(0,0,0,.22)] backdrop-blur-xl">
            After
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,.08),0_0_10px_rgba(0,0,0,.16)]"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white shadow-[0_3px_6px_rgba(0,0,0,.14),0_10px_24px_rgba(0,0,0,.24),inset_0_1px_0_rgba(255,255,255,.9)] ring-1 ring-white">
              <span className="text-[18px] font-semibold tracking-[-4px] text-neutral-700">
                ‹ ›
              </span>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={pos}
            onChange={(e) => setPos(+e.target.value)}
            aria-label="Compare image treatment"
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <div className="flex items-center justify-between px-2 pb-2 pt-4">
          <div>
            <p className="text-[15px] font-semibold tracking-[-0.02em] text-neutral-950">
              Before & after
            </p>
            <p className="mt-0.5 text-[13px] leading-5 text-neutral-500">
              Slide to compare the treatment
            </p>
          </div>

          <span className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-medium text-neutral-500 shadow-[0_1px_2px_rgba(0,0,0,.05)]">
            Drag to compare
          </span>
        </div>
      </div>
    </main>
  );
}