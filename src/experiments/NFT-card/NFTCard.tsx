"use client";

import { useRef } from "react";

export default function NFTCard() {
    const cardRef = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = (x / rect.width - 0.5) * 7;
        const rotateX = (y / rect.height - 0.5) * -7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
    };

    const resetCard = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#4a0c12] text-white">
            {/* background */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8c1b25]/15 blur-[150px]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[410px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/[0.025]" />

            <div className="absolute left-8 top-7 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/35">
                    Private Market
                </span>
            </div>

            <span className="absolute right-8 top-7 text-[8px] uppercase tracking-[0.18em] text-white/25">
                Series 01
            </span>

            {/* card */}
            <article
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetCard}
                className="
                relative grid h-[320px] w-[640px] grid-cols-[300px_1fr]
                overflow-hidden rounded-[26px]
                border border-white/[0.08]
                bg-[#0b0b0d]
                shadow-[0_45px_100px_rgba(0,0,0,0.48),0_12px_30px_rgba(0,0,0,0.32),0_0_0_1px_rgba(255,255,255,0.025)]
                transition-[transform,box-shadow] duration-200 ease-out
                hover:shadow-[0_55px_130px_rgba(0,0,0,0.58),0_18px_40px_rgba(0,0,0,0.35),0_0_45px_rgba(130,20,30,0.12)]
                "
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
                {/* artwork */}
                <div className="group relative m-[7px] mr-0 flex items-center justify-center overflow-hidden rounded-[20px] bg-[#23090c]">
                    <img
                        src="/NFT-card/nft.png"
                        alt="HAPE #67"
                        className="h-full w-full object-contain"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

                    {/* edition */}
                    <div className="group/edition absolute left-1/2 top-4 -translate-x-1/2">
                        <div className="relative flex h-[24px] items-center justify-center overflow-hidden rounded-full border border-white/15 bg-black/60 px-4 backdrop-blur-md">

                            {/* full shine */}
                            <div className="pointer-events-none absolute inset-y-0 -left-[70%] w-[55%] -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 ease-out group-hover/edition:left-[120%]" />

                            <span className="relative z-10 whitespace-nowrap text-[7px] font-medium uppercase tracking-[0.18em] text-white/65">
                                Edition 067
                            </span>
                        </div>
                    </div>

                    {/* image footer */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-[110%] opacity-0 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform group-hover:translate-y-0 group-hover:opacity-100">
                        {/* black fade */}
                        <div className="absolute inset-x-0 bottom-0 h-[90px] bg-gradient-to-t from-black/80 via-black/45 to-transparent" />

                        {/* same content */}
                        <div className="relative flex items-end justify-between px-4 pb-4 pt-10">
                            <div>
                                <p className="text-[6px] uppercase tracking-[0.18em] text-white/35">
                                    Collection
                                </p>

                                <p className="mt-0.5 text-[9px] font-medium text-white/75">
                                    Hape Prime
                                </p>
                            </div>

                            <button
                                type="button"
                                className="flex h-[24px] items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 text-[7px] font-medium uppercase tracking-[0.1em] text-white/60 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white"
                            >
                                View asset <span>↗</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* content */}
                <div className="relative flex h-full flex-col justify-center overflow-hidden px-7 py-6">

                    {/* subtle depth */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.025] via-transparent to-transparent" />

                    {/* F1-style speed lines */}
                    <div className="pointer-events-none absolute right-0 top-[30px] flex flex-col items-end gap-[5px] opacity-70">
                        <div className="h-px w-[74px] bg-gradient-to-l from-[#c52c38]/70 to-transparent" />
                        <div className="h-px w-[42px] bg-gradient-to-l from-[#c52c38]/35 to-transparent" />
                    </div>

                    <div className="relative z-10">

                        {/* header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="h-[3px] w-[16px] rounded-full bg-[#c52c38]" />

                                    <p className="text-[7px] font-medium uppercase tracking-[0.2em] text-white/35">
                                        Hape Prime Collection
                                    </p>
                                </div>

                                <h2 className="mt-2.5 text-[22px] font-semibold tracking-[-0.045em]">
                                    HAPE #67
                                </h2>

                                <p className="mt-1 text-[9px] text-white/35">
                                    Rare digital collectible
                                </p>
                            </div>

                            <div className="flex items-center gap-2 border-l border-[#c52c38]/60 pl-2.5">
                                <span className="font-mono text-[8px] font-medium tracking-[0.16em] text-white/45">
                                    0-67
                                </span>
                            </div>
                        </div>

                        {/* value */}
                        <div className="mt-6">
                            <p className="text-[7px] font-medium uppercase tracking-[0.17em] text-white/30">
                                Current market value
                            </p>

                            <div className="mt-1.5 flex items-end gap-2">
                                <span className="text-[27px] font-medium tracking-[-0.055em]">
                                    0.50
                                </span>

                                <span className="mb-[4px] text-[9px] text-white/35">
                                    ETH
                                </span>

                                <span className="mb-[4px] rounded-full border border-emerald-400/10 bg-emerald-400/[0.07] px-2 py-0.5 text-[7px] font-medium text-emerald-400">
                                    +2.4% today
                                </span>
                            </div>
                        </div>

                        {/* stats */}
                        <div className="relative mt-5 grid grid-cols-2 border-y border-white/[0.07] bg-white/[0.012]">

                            {/* red accent */}
                            <div className="absolute left-0 top-0 h-px w-[44px] bg-[#c52c38]/70" />

                            <div className="border-r border-white/[0.07] py-4 pr-5">
                                <p className="text-[7px] uppercase tracking-[0.14em] text-white/30">
                                    Hourly earnings
                                </p>

                                <div className="mt-2 flex items-baseline gap-1">
                                    <span className="text-[14px] font-medium text-white/85">
                                        $5.00
                                    </span>

                                    <span className="text-[7px] text-white/25">
                                        / hour
                                    </span>
                                </div>
                            </div>

                            <div className="py-4 pl-5">
                                <p className="text-[7px] uppercase tracking-[0.14em] text-white/30">
                                    Ownership split
                                </p>

                                <div className="mt-2.5 flex items-center gap-2">
                                    <span className="text-[9px] text-white/70">80%</span>

                                    <div className="flex h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                                        <div className="w-4/5 bg-emerald-400/75" />
                                        <div className="w-1/5 bg-violet-400/45" />
                                    </div>

                                    <span className="text-[9px] text-white/35">20%</span>
                                </div>
                            </div>
                        </div>

                        {/* footer */}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />

                                <span className="text-[7px] uppercase tracking-[0.15em] text-white/30">
                                    Ethereum network
                                </span>
                            </div>

                            <span className="font-mono text-[7px] tracking-[0.04em] text-white/25">
                                Updated now
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}