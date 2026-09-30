import { BatteryMedium, Wifi } from "lucide-react";

export default function RetroRecorder() {
    return (
        <main className="grid min-h-screen place-items-center bg-[#ededed] p-6">
            <div className="w-[430px] rounded-[28px] border-[10px] border-white bg-[#e9e9e9] p-2 shadow-[0_28px_50px_rgba(0,0,0,.22)]">
                <section className="rounded-[18px] border-2 border-black bg-[#111] p-4 text-white shadow-inner">
                    <div className="flex items-center justify-between text-[11px] text-white/60">
                        <span>04.35 PM</span>
                        <span className="mr-auto ml-5 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                            NEW RECORDING
                        </span>
                        <span className="flex items-center gap-3">
                            <span>▶︎</span>
                            <Wifi className="size-4" />
                        </span>
                    </div>

                    <div className="relative mt-24 h-32">
                        <div className="absolute top-1/2 left-0 h-px w-full bg-white/10" />
                        <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-[4px]">
                            {[18, 42, 28, 58, 36, 46, 32, 26, 38, 24, 18, 22, 20, 18, 26, 44, 52, 32, 48, 74, 42, 54, 36, 64, 48, 30, 24, 22, 48, 36].map((h, i) => (
                                <span key={i} className="w-[2px] bg-white/80" style={{ height: h }} />
                            ))}
                        </div>
                        <div className="absolute top-5 left-[58%] h-[105px] w-[2px] bg-red-500">
                            <span className="absolute -top-1 -left-[4px] h-3 w-3 rounded-full bg-red-500" />
                        </div>
                        <div className="absolute top-1/2 left-[59%] right-0 flex gap-[5px]">
                            {Array.from({ length: 31 }).map((_, i) => <span key={i} className="h-[5px] w-px bg-white/25" />)}
                        </div>
                    </div>

                    <div className="mt-20 text-[58px] font-extralight tracking-[-4px]">00:12:10</div>
                </section>

                <div className="my-3 flex items-center gap-3">
                    <div className="flex items-center gap-1 rounded-md bg-black px-3 py-2 text-xs text-white">
                        <BatteryMedium className="size-4" />
                        <span>89%</span>
                    </div>
                    <div className="h-7 flex-1 opacity-70 [background-image:radial-gradient(#111_1px,transparent_1px)] [background-size:6px_6px]" />
                </div>

                <section className="grid h-[145px] grid-cols-3 overflow-hidden rounded-[17px] border-2 border-black">
                    <button className="grid place-items-center border-r-2 border-black text-3xl">
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/40 shadow-inner text-red-400">●</span>
                    </button>

                    <button className="grid place-items-center border-r-2 border-black text-2xl">
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/40 shadow-inner text-neutral-500">■</span>
                    </button>

                    <div className="grid grid-rows-2">
                        <button className="grid place-items-center border-b-2 border-black">
                            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/40 shadow-inner">
                                <Wifi className="size-5 text-neutral-500" />
                            </span>
                        </button>
                        <button className="grid place-items-center">
                            <span className="grid h-12 w-12 place-items-center rounded-full bg-white/40 shadow-inner">↻</span>
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}