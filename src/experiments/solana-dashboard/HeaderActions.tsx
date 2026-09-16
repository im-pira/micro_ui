"use client";

import { Bell, Check, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function HeaderActions() {
    const [walletOpen, setWalletOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) {
                setNotificationsOpen(false);
                setWalletOpen(false);
            }
        };

        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    const copyAddress = async () => {
        await navigator.clipboard.writeText("7Fks92mQ");
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    };

    return (
        <div ref={ref} className="relative flex items-center gap-2">
            <div className="relative">
                <button
                    onClick={() => {
                        setNotificationsOpen(!notificationsOpen);
                        setWalletOpen(false);
                    }}
                    className={`relative flex size-8 items-center justify-center rounded-lg border border-white/[0.06] bg-[#121212] transition ${notificationsOpen ? "text-orange-300" : "text-zinc-600 hover:text-zinc-300"
                        }`}
                >
                    <Bell size={14} />
                    <span className="absolute right-[7px] top-[7px] size-1 rounded-full bg-orange-400 ring-2 ring-[#121212]" />
                </button>

                <div
                    className={`absolute right-0 top-10 z-50 w-[260px] origin-top-right rounded-xl border border-white/[0.07] bg-[#111111] p-2 shadow-2xl transition-all duration-200 ${notificationsOpen
                        ? "visible scale-100 opacity-100"
                        : "invisible scale-95 opacity-0"
                        }`}
                >
                    <div className="px-2 py-2">
                        <p className="text-[11px] font-medium">Notifications</p>
                        <p className="text-[8px] text-zinc-600">3 recent updates</p>
                    </div>

                    <Notification title="SOL moved +5.12%" text="SOL reached $144.20" time="2m" />
                    <Notification title="Staking reward received" text="+0.084 SOL added" time="1h" />
                    <Notification title="Swap completed" text="12.4 SOL → USDC" time="3h" />
                </div>
            </div>

            <div className="relative">
                <button
                    onClick={() => {
                        setWalletOpen(!walletOpen);
                        setNotificationsOpen(false);
                    }}
                    className={`flex h-8 items-center gap-2 rounded-lg border border-white/[0.06] bg-[#121212] px-3 text-[9px] transition ${walletOpen ? "text-orange-200" : "text-zinc-400 hover:text-zinc-200"
                        }`}
                >
                    7Fks...92mQ

                    <ChevronDown
                        size={11}
                        className={`transition-transform duration-200 ${walletOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {walletOpen && (
                    <div className="absolute right-0 top-10 z-50 w-[210px] rounded-xl border border-white/[0.07] bg-[#111111] p-2 shadow-2xl">
                        <div className="mb-1 px-2 py-2">
                            <p className="text-[9px] text-zinc-300">7Fks...92mQ</p>
                            <p className="mt-0.5 text-[8px] text-zinc-600">$18,420.52</p>
                        </div>

                        <button
                            onClick={copyAddress}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[9px] text-zinc-500 transition hover:bg-white/[0.035] hover:text-zinc-200"
                        >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            {copied ? "Copied" : "Copy address"}
                        </button>

                        <button
                            onClick={() => window.open("https://explorer.solana.com", "_blank")}
                            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[9px] text-zinc-500 transition hover:bg-white/[0.035] hover:text-zinc-200"
                        >
                            <ExternalLink size={12} />
                            View on explorer
                        </button>

                        <div className="my-1 h-px bg-white/[0.05]" />

                        <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-[9px] text-red-400 transition hover:bg-red-400/[0.06]">
                            <LogOut size={12} />
                            Disconnect
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function Notification({ title, text, time }: { title: string; text: string; time: string }) {
    return (
        <button className="flex w-full items-start justify-between rounded-lg px-2 py-2.5 text-left hover:bg-white/[0.035]">
            <div>
                <p className="text-[9px] text-zinc-300">{title}</p>
                <p className="mt-0.5 text-[8px] text-zinc-600">{text}</p>
            </div>
            <span className="text-[7px] text-zinc-700">{time}</span>
        </button>
    );
}