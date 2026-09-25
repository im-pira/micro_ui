"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Palette } from "lucide-react";

const tabs = ["Pira", "Me"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const palettes = {
    red: ["#160b0b", "#3a1010", "#6b1717", "#a92323", "#ef4444"],
    orange: ["#160f08", "#3a1d0b", "#6b2d0c", "#b45309", "#f97316"],
    yellow: ["#171405", "#3f3505", "#6b5908", "#a88a0a", "#facc15"],
    green: ["#0b140d", "#12351a", "#176b2c", "#16a34a", "#4ade80"],
    blue: ["#08131a", "#0d293b", "#0c4569", "#0878b8", "#35b2ff"],
    darkBlue: ["#070d18", "#0b1b38", "#102f63", "#1d4ed8", "#3b82f6"],
    purple: ["#120b17", "#2d123b", "#511a6b", "#7e22ce", "#c084fc"],
    pink: ["#170b12", "#3b1029", "#6b1748", "#be185d", "#f472b6"],
    brown: ["#140e0a", "#352116", "#5c3825", "#8b5e3c", "#c08457"],
    white: ["#111111", "#2a2a2a", "#555555", "#9ca3af", "#f4f4f5"],
    turquoise: ["#071514", "#0b3633", "#0f5f59", "#0d9488", "#2dd4bf"],
};

const colorOptions = Object.keys(palettes) as (keyof typeof palettes)[];

function rng(seed: number) {
    return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

export default function GithubHeatmap() {
    const [tab, setTab] = useState("Pira");
    const [year, setYear] = useState(2026);
    const [color, setColor] = useState<keyof typeof palettes>("blue");
    const [showPalette, setShowPalette] = useState(false);

    const years = tab === "Pira" ? [2026, 2025, 2024, 2023] : [2026, 2025];
    const colors = palettes[color];
    const paletteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                paletteRef.current &&
                !paletteRef.current.contains(e.target as Node)
            ) {
                setShowPalette(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const changeTab = (next: string) => {
        setTab(next);
        setYear(2026);
    };

    const data = useMemo(() => {
        const r = rng(year + (tab === "Pira" ? 1200 : 9000));
        return Array.from({ length: 371 }, () => {
            const x = r();
            return x < .42 ? 0 : x < .62 ? 1 : x < .79 ? 2 : x < .93 ? 3 : 4;
        });
    }, [year, tab]);

    const weights = [0, 1, 3, 6, 10];
    const total = data.reduce((sum: number, level) => sum + weights[level], 0);

    return (
        <section className="flex min-h-screen w-full items-center justify-center bg-[#050505] px-6 py-16 text-white">
            <div className="w-full max-w-[920px]">

                <div className="mb-5 flex items-end justify-between">
                    <div>
                        <p className="text-[11px] font-medium tracking-[.3em] text-zinc-600">
                            GITHUB CONTRIBUTIONS
                        </p>

                        <p className="mt-2 text-xs text-zinc-700">
                            {tab === "Pira" ? "github.com/im_pira" : "github.com/user"}
                        </p>

                        <div className="relative mt-4 inline-flex rounded-lg border border-white/[.06] bg-white/[.02] p-0.5">
                            <div
                                className={`absolute inset-y-0.5 w-[calc(50%-2px)] rounded-md bg-white/[.08] transition-transform duration-300 ${tab === "Me" ? "translate-x-full" : ""
                                    }`}
                            />
                            {tabs.map(x => (
                                <button
                                    key={x}
                                    onClick={() => changeTab(x)}
                                    className={`relative z-10 px-3 py-1 text-[11px] font-medium transition-colors ${tab === x ? "text-zinc-200" : "text-zinc-600"
                                        }`}
                                >
                                    {x}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div ref={paletteRef} className="relative flex items-center">
                            <button
                                onClick={() => setShowPalette(v => !v)}
                                className={`flex h-7 w-7 items-center justify-center rounded-md border transition ${showPalette
                                    ? "border-white/15 bg-white/[.07] text-zinc-300"
                                    : "border-white/[.06] text-zinc-600 hover:bg-white/[.04] hover:text-zinc-400"
                                    }`}
                                aria-label="Change heatmap color"
                            >
                                <Palette size={13} />
                            </button>

                            {showPalette && (
                                <div className="absolute right-9 flex items-center gap-1.5 rounded-lg border border-white/[.08] bg-[#0b0b0b] px-2 py-1.5 shadow-xl">
                                    {colorOptions.map(option => (
                                        <button
                                            key={option}
                                            onClick={() => setColor(option)}
                                            title={option}
                                            className={`h-3 w-3 rounded-full transition hover:scale-125 ${color === option
                                                ? "ring-1 ring-white/80 ring-offset-1 ring-offset-[#0b0b0b]"
                                                : "opacity-70 hover:opacity-100"
                                                }`}
                                            style={{ backgroundColor: palettes[option][4] }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <span className="text-[10px] tracking-[.25em] text-zinc-700">
                            VIEW GITHUB ↗
                        </span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="min-w-0 flex-1 overflow-x-auto rounded-2xl border border-white/[.06] bg-[#090909] p-4 shadow-[0_20px_80px_rgba(0,0,0,.55)]">
                        <div className="min-w-[740px]">

                            <div className="mb-3 grid grid-cols-12 text-[10px] text-zinc-400">
                                {months.map(x => <span key={x}>{x}</span>)}
                            </div>

                            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
                                {data.map((level, i) => (
                                    <div key={i} className="group relative">
                                        <div
                                            className="aspect-square cursor-pointer rounded-[2px] transition-colors duration-300"
                                            style={{ backgroundColor: colors[level] }}
                                        />
                                        <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-[10px] opacity-0 shadow-lg transition group-hover:opacity-100">
                                            {weights[level]} commits
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400">
                                <span>{total} contributions in {year}</span>

                                <div className="flex items-center gap-1">
                                    <span className="mr-1">Less</span>

                                    {colors.map((shade, i) => (
                                        <span
                                            key={i}
                                            className="h-3 w-3 rounded-[2px]"
                                            style={{ backgroundColor: shade }}
                                        />
                                    ))}

                                    <span className="ml-1">More</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex w-20 flex-col gap-2">
                        {years.map(x => (
                            <button
                                key={x}
                                onClick={() => setYear(x)}
                                className={`h-9 rounded-lg border text-[11px] transition ${year === x
                                    ? "border-zinc-600 bg-zinc-800/80 text-zinc-200"
                                    : "border-white/[.05] bg-[#080808] text-zinc-700 hover:text-zinc-500"
                                    }`}
                            >
                                {x}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}