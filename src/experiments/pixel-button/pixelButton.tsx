"use client";

import { useRef, useState } from "react";

export default function PixelButton() {
  const [wave, setWave] = useState(-10);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const play = () => {
    if (timer.current) clearInterval(timer.current);

    let x = -4;
    setWave(x);

    timer.current = setInterval(() => {
      x++;
      setWave(x);

      if (x > 44) {
        clearInterval(timer.current!);
        timer.current = null;
        setWave(-10);
      }
    }, 20);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fcfdff]">
      <button
        onClick={play}
        className="relative h-[174px] w-[512px] overflow-hidden rounded-[44px]
        bg-[#4c83e6] shadow-[0_15px_28px_-8px_rgba(45,100,210,.38)]
        transition-transform duration-150 ease-[cubic-bezier(.23,1,.32,1)]
        active:scale-[.97]"
      >
        <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(13,1fr)]">
          {Array.from({ length: 520 }).map((_, i) => {
            const col = i % 40;
            const row = Math.floor(i / 40);

            // KEEP THIS — this is your good idle look
            const bright =
              (row * 7 + col * 3) % 11 < 4 ||
              (row + col * 2) % 17 < 3;

            const seed = (row * 31 + col * 17) % 100;
            const d = Math.abs(col - wave);

            let shine = "";

            // narrow shimmering front
            if (d === 0) {
              shine =
                seed < 8
                  ? "bg-white/90"
                  : seed < 28
                    ? "bg-sky-100/75"
                    : seed < 58
                      ? "bg-sky-200/55"
                      : "";
            } else if (d === 1) {
              shine =
                seed < 15
                  ? "bg-sky-100/65"
                  : seed < 50
                    ? "bg-sky-200/40"
                    : "";
            } else if (d === 2) {
              shine = seed < 40 ? "bg-sky-200/25" : "";
            }

            return (
              <span
                key={i}
                className={`
                  border-r border-b border-[#2563c9]/55
                  transition-colors duration-100
                  ease-[cubic-bezier(.23,1,.32,1)]
                  ${
                    shine ||
                    (bright
                      ? "bg-[#72a2ed]/40"
                      : "bg-transparent")
                  }
                `}
              />
            );
          })}
        </div>

        <span className="relative z-10 text-[38px] font-bold tracking-[-1.6px] text-white drop-shadow-[0_2px_2px_rgba(28,73,160,.5)]">
          Get started
        </span>
      </button>
    </div>
  );
}