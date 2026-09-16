"use client";

import { useEffect, useState } from "react";

export function useCameraControls() {
    const [meterIndex, setMeterIndex] = useState(6);
    const [dialValue, setDialValue] = useState(50);
    const [mode, setMode] = useState<"M" | "S" | "A">("S");
    const [aeLocked, setAeLocked] = useState(false);
    const [recording, setRecording] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setMeterIndex((current) => {
                const movement = Math.floor(Math.random() * 3) - 1;
                return Math.max(2, Math.min(12, current + movement));
            });
        }, 450);

        return () => clearInterval(interval);
    }, []);

    const rotateDial = (direction: "left" | "right") => {
        setDialValue((value) =>
            Math.max(0, Math.min(100, value + (direction === "right" ? 5 : -5))),
        );
    };

    const cycleMode = () => {
        setMode((current) => {
            if (current === "M") return "S";
            if (current === "S") return "A";
            return "M";
        });
    };

    return {
        meterIndex,
        dialValue,
        mode,
        aeLocked,
        recording,

        rotateDial,
        cycleMode,
        toggleAeLock: () => setAeLocked((value) => !value),
        toggleRecording: () => setRecording((value) => !value),
    };
}
export function ExposureMeter() {
    const bars = [
        8, 16, 22, 14, 10, 18, 28, 12, 20, 9, 14, 26, 18, 7, 24, 16, 11, 21,
        13, 30, 17, 9, 20, 25, 12, 18, 8, 14, 23, 19, 10, 27, 15, 11, 22, 16,
    ];

    return (
        <div className="relative h-[34px] w-[112px] overflow-hidden rounded-[10px] border border-white/10 bg-[#141414]">
            <div className="absolute left-1/2 top-[4px] z-20 h-[26px] w-px -translate-x-1/2 bg-[#e74848]" />

            <div className="absolute inset-y-[4px] left-0 flex animate-[meterScroll_8s_linear_infinite] items-center">
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        className="flex shrink-0 items-center gap-[4px] pr-[4px]"
                    >
                        {bars.map((height, index) => (
                            <span
                                key={`${copy}-${index}`}
                                className="w-[2px] shrink-0 rounded-full bg-white/55"
                                style={{ height }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[14px] bg-gradient-to-r from-[#141414] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[14px] bg-gradient-to-l from-[#141414] to-transparent" />

            <style>{`
        @keyframes meterScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
        </div>
    );
}

export function ModeControl({
    mode,
    onChange,
}: {
    mode: "M" | "S" | "A";
    onChange: () => void;
}) {
    const [shifting, setShifting] = useState(false);

    const modes: Array<"M" | "S" | "A"> = ["M", "S", "A"];
    const index = modes.indexOf(mode);

    const prev = modes[(index - 1 + modes.length) % modes.length];
    const next = modes[(index + 1) % modes.length];
    const afterNext = modes[(index + 2) % modes.length];

    const items = [
        { value: prev, from: -38, to: -76, role: "prev" },
        { value: mode, from: 0, to: -38, role: "current" },
        { value: next, from: 38, to: 0, role: "next" },
        { value: afterNext, from: 76, to: 38, role: "after" },
    ];

    const shift = () => {
        if (!shifting) setShifting(true);
    };

    return (
        <button
            onClick={shift}
            className="relative h-[108px] w-[50px] overflow-hidden rounded-[25px] bg-[#101010] shadow-[inset_0_1px_2px_rgba(255,255,255,0.04),0_5px_12px_rgba(0,0,0,0.2)]"
        >
            <div className="absolute left-1/2 top-1/2 size-[34px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f04a32] shadow-[0_4px_14px_rgba(240,74,50,0.3)]" />

            {items.map((item) => {
                const focused = shifting
                    ? item.role === "next"
                    : item.role === "current";

                return (
                    <span
                        key={`${item.role}-${item.value}`}
                        onTransitionEnd={() => {
                            if (item.role !== "current" || !shifting) return;
                            onChange();
                            setShifting(false);
                        }}
                        className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex size-[34px] items-center justify-center transition-[transform,opacity,color,font-size] duration-[650ms] ease-[cubic-bezier(.22,.8,.2,1)]"
                        style={{
                            transform: `translate(-50%, calc(-50% + ${shifting ? item.to : item.from
                                }px)) scale(${focused ? 1 : 0.82})`,
                            opacity: focused
                                ? 1
                                : item.role === "after" && !shifting
                                    ? 0
                                    : 0.32,
                            color: focused
                                ? "#161616"
                                : "rgba(255,255,255,0.65)",
                            fontSize: focused ? "16px" : "11px",
                            fontWeight: focused ? 600 : 500,
                        }}
                    >
                        {item.value}
                    </span>
                );
            })}
        </button>
    );
}

export function AELockButton({
    active,
    onClick,
}: {
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex h-[42px] w-[88px] items-center justify-center rounded-[13px] border transition-all duration-200 ${active
                ? "border-[#f04a32]/50 bg-[#f04a32]/15"
                : "border-white/10 bg-white/[0.055]"
                }`}
        >
            <span
                className={`text-[11px] font-medium tracking-[2px] ${active ? "text-[#f04a32]" : "text-white/55"
                    }`}
            >
                AE-L
            </span>
        </button>
    );
}

export function ShutterButton({
    recording,
    onClick,
}: {
    recording: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex size-[30px] items-center justify-center rounded-[10px] transition-all duration-200 ${recording
                ? "scale-95 bg-[#f04a32]"
                : "bg-[#81382f]"
                }`}
        >
            <svg
                viewBox="0 0 24 24"
                className="size-[15px] fill-[#f4d7ce]"
            >
                <path d="M8.5 6.5 9.7 4.8h4.6l1.2 1.7H18A2 2 0 0 1 20 8.5v7A2 2 0 0 1 18 17.5H6A2 2 0 0 1 4 15.5v-7A2 2 0 0 1 6 6.5h2.5Zm3.5 8.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
            </svg>
        </button>
    );
}