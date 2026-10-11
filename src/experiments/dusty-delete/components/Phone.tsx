import {
    BatteryFull, Camera, ChevronLeft, EllipsisVertical,
    Mic, PhoneCall, Plus, Signal, Wifi,
} from "lucide-react";
import type { ReactNode } from "react";

export default function Phone({ children }: { children: ReactNode }) {
    return (
        <div className="relative h-[620px] w-[300px] shrink-0">
            <div className="absolute -left-[3px] top-[95px] h-9 w-[3px] rounded-l-sm bg-gradient-to-r from-[#777] to-[#ddd]" />
            <div className="absolute -left-[3px] top-[155px] h-14 w-[3px] rounded-l-sm bg-gradient-to-r from-[#777] to-[#ddd]" />
            <div className="absolute -left-[3px] top-[225px] h-14 w-[3px] rounded-l-sm bg-gradient-to-r from-[#777] to-[#ddd]" />
            <div className="absolute -right-[3px] top-[180px] h-20 w-[3px] rounded-r-sm bg-gradient-to-r from-[#aaa] to-[#555]" />

            <div className="relative h-full rounded-[49px] bg-gradient-to-r from-[#777] via-[#f5f5f5] to-[#858585] p-[2px] shadow-[0_25px_65px_rgba(0,0,0,0.16)]">
                <div className="h-full rounded-[47px] bg-[#101010] p-[5px]">
                    <div className="relative flex h-full flex-col overflow-hidden rounded-[42px] bg-white">

                        <div className="relative flex h-11 shrink-0 items-center justify-between bg-white px-6 text-xs font-semibold text-[#1c1c1e]">
                            <span>9:40</span>

                            <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

                            <div className="flex items-center gap-1">
                                <Signal size={13} fill="currentColor" />
                                <Wifi size={13} strokeWidth={2.5} />
                                <BatteryFull size={17} />
                            </div>
                        </div>

                        <div className="flex h-[56px] shrink-0 items-center gap-2.5 bg-white px-3">
                            <ChevronLeft
                                size={21}
                                strokeWidth={1.8}
                                className="shrink-0 text-[#737373]"
                            />

                            <img
                                src="/dusty-delete/dp.png"
                                alt="Alex"
                                width={36}
                                height={36}
                                className="size-9 shrink-0 rounded-full object-cover"
                            />

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] font-semibold tracking-[-0.2px] text-[#1c1c1e]">
                                    ALex
                                </p>

                                <div className="mt-0.5 flex items-center gap-1.5">
                                    <span className="size-1.5 rounded-full bg-[#34c759]" />
                                    <span className="text-[10px] text-[#8e8e93]">
                                        Online
                                    </span>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-3 text-[#737373]">
                                <PhoneCall size={18} strokeWidth={1.8} />
                                <EllipsisVertical size={19} strokeWidth={1.8} />
                            </div>
                        </div>

                        <div className="relative min-h-0 flex-1">
                            {children}
                        </div>

                        <div className="flex h-[72px] shrink-0 flex-col justify-between bg-[#f5f5f7]">
                            <div className="flex items-center gap-3 px-4 pt-3">
                                <Plus size={21} strokeWidth={1.8} className="text-[#73737a]" />

                                <div className="flex h-9 flex-1 items-center justify-between rounded-full bg-white px-3">
                                    <span className="text-xs text-[#aaa]">Message</span>
                                    <Mic size={16} strokeWidth={1.8} className="text-[#999]" />
                                </div>

                                <Camera size={19} strokeWidth={1.8} className="text-[#73737a]" />
                            </div>

                            <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-black" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}