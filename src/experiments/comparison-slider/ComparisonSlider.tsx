import { useState } from "react";

export default function ComparisonSlider() {
  const [pos, setPos] = useState(50);

  return (
    <main className="grid min-h-screen place-items-center bg-[#f3f0e9] p-6">
      <div className="w-[360px] rounded-[28px] border border-black/10 bg-[linear-gradient(180deg,#fff_0%,#f8f8f6_100%)] p-[10px] ring-1 ring-white/80 shadow-[0_2px_3px_rgba(0,0,0,.08),0_8px_18px_rgba(0,0,0,.10),0_24px_50px_rgba(0,0,0,.16),0_48px_100px_-24px_rgba(0,0,0,.30)]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border border-black/15 bg-neutral-200">
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

          <span className="absolute left-4 top-4 z-20 rounded-full bg-black/45 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-xl">
            Before
          </span>

          <span className="absolute right-4 top-4 z-20 rounded-full bg-black/45 px-3 py-1.5 text-[12px] font-medium text-white backdrop-blur-xl">
            After
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-white/75"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-9 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_3px_10px_rgba(0,0,0,.18)]">
              <svg
                viewBox="0 0 20 20"
                className="size-4 text-neutral-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m8 6-4 4 4 4" />
                <path d="m12 6 4 4-4 4" />
              </svg>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={pos}
            onChange={(e) => setPos(+e.target.value)}
            aria-label="Compare before and after"
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <div className="flex items-center justify-between px-3 pb-2 pt-4">
          <p className="font-mono text-[13px] font-normal uppercase tracking-[0.14em] text-neutral-900">
            Image
          </p>

          <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-500">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="size-3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m7 6-4 4 4 4" />
              <path d="m13 6 4 4-4 4" />
            </svg>
            Drag to compare
          </div>
        </div>
      </div>
    </main>
  );
}