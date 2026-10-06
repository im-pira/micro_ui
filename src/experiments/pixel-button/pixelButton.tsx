"use client";

import { useRef, useState } from "react";

export default function PixelButton() {
    const [wave, setWave] = useState<number | null>(null);
    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    const play = () => {
        if (timer.current) clearInterval(timer.current);

        let x = -3;
        setWave(x);

        timer.current = setInterval(() => {
            x += 0.55;
            setWave(x);

            if (x > 48) {
                clearInterval(timer.current!);
                timer.current = null;
                setWave(null);
            }
        }, 20);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#fcfdff]">
            <button
                onClick={play}
                className="
        relative h-[130px] w-[400px] overflow-hidden rounded-[30px]
        bg-[#4c83e6]
        shadow-[0_30px_60px_-24px_rgba(0,0,0,.35),0_12px_24px_-16px_rgba(0,0,0,.28),inset_0_1px_0_rgba(255,255,255,.35),inset_0_-2px_4px_rgba(0,0,0,.12)]
        transition-transform duration-150
        ease-[cubic-bezier(.23,1,.32,1)]
        active:scale-[.97]
      "
            >
                <div className="pointer-events-none absolute inset-[1px] rounded-[39px] ring-1 ring-white/15" />

                <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(13,1fr)]">
                    {Array.from({ length: 520 }).map((_, i) => {
                        const col = i % 40;
                        const row = Math.floor(i / 40);

                        const bright =
                            (row * 7 + col * 3) % 11 < 4 ||
                            (row + col * 2) % 17 < 3;

                        const seed = (row * 37 + col * 19) % 100;
                        let shine = "";

                        if (wave !== null) {
                            const jitter =
                                ((row * 13 + col * 7) % 9) * 0.65 - 2.6;

                            const d = col + jitter - wave;

                            if (d > 4 && d < 8) {
                                shine = seed < 45 ? "bg-[#79a6ed]/30" : "";
                            } else if (d > 0 && d <= 4) {
                                shine =
                                    seed < 15
                                        ? "bg-sky-100/45"
                                        : seed < 55
                                            ? "bg-sky-200/40"
                                            : "bg-[#79a6ed]/35";
                            } else if (d > -4 && d <= 0) {
                                shine =
                                    seed < 6
                                        ? "bg-white/75"
                                        : seed < 25
                                            ? "bg-sky-100/65"
                                            : seed < 65
                                                ? "bg-sky-200/50"
                                                : "bg-[#79a6ed]/40";
                            } else if (d > -9 && d <= -4) {
                                shine =
                                    seed < 12
                                        ? "bg-sky-100/45"
                                        : seed < 55
                                            ? "bg-sky-200/35"
                                            : "bg-[#76a2eb]/30";
                            } else if (d > -15 && d <= -9) {
                                shine = seed < 60 ? "bg-[#76a2eb]/25" : "";
                            }
                        }

                        const idle = bright
                            ? "bg-[#72a2ed]/40"
                            : "bg-transparent";

                        return (
                            <span
                                key={i}
                                className={`
                border-r border-b border-[#2563c9]/55
                transition-colors duration-150
                ease-[cubic-bezier(.23,1,.32,1)]
                ${shine || idle}
              `}
                            />
                        );
                    })}
                </div>

                <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-white/30" />

                <span className="relative z-10 text-[34px] font-bold tracking-[-1.4px] text-white drop-shadow-[0_2px_2px_rgba(28,73,160,.5)]">
                    Get started
                </span>
            </button>
        </div>
    );
}