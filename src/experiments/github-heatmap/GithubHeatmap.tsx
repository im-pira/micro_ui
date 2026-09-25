"use client";

import { useMemo, useState } from "react";

const tabs = ["Pira", "Me"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const colors = ["bg-[#111315]", "bg-[#0d293b]", "bg-[#0c4569]", "bg-[#0878b8]", "bg-[#35b2ff]"];

function rng(seed: number) {
    return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}

export default function GithubHeatmap() {
    const [tab, setTab] = useState("Pira");
    const [year, setYear] = useState(2026);

    const years = tab === "Pira"
        ? [2026, 2025, 2024, 2023]
        : [2026, 2025];

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

                        <div className="mt-4 flex gap-2">
                            {tabs.map(x => (
                                <button
                                    key={x}
                                    onClick={() => changeTab(x)}
                                    className={`rounded-md border px-4 py-1.5 text-[11px] transition ${tab === x
                                        ? "border-zinc-600 bg-zinc-800/80 text-zinc-200"
                                        : "border-zinc-900 text-zinc-600 hover:text-zinc-400"
                                        }`}
                                >
                                    {x}
                                </button>
                            ))}
                        </div>
                    </div>

                    <span className="text-[10px] tracking-[.25em] text-zinc-700">
                        VIEW GITHUB ↗
                    </span>
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
                                            className={`aspect-square rounded-[2px] ${colors[level]} cursor-pointer`}
                                        />

                                        <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-[10px] text-white opacity-0 shadow-lg transition group-hover:opacity-100">
                                            {[0, 1, 3, 6, 10][level]} commits
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-400">
                                <span>{total} contributions in {year}</span>

                                <div className="flex items-center gap-1">
                                    <span className="mr-1">Less</span>

                                    {colors.map((x, i) => (
                                        <span
                                            key={i}
                                            className={`h-3 w-3 rounded-[2px] ${x}`}
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