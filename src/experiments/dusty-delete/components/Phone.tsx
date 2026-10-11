import {
  BatteryFull, Camera, ChevronLeft, Mic,
  MoreVertical, PhoneCall, Plus, Signal, Wifi,
} from "lucide-react";
import type { ReactNode } from "react";

export default function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[620px] w-[300px] shrink-0">
      <div className="absolute -left-[3px] top-[95px] h-9 w-[3px] rounded-l-sm bg-gradient-to-r from-[#777] to-[#ddd]" />
      <div className="absolute -left-[3px] top-[155px] h-14 w-[3px] rounded-l-sm bg-gradient-to-r from-[#777] to-[#ddd]" />
      <div className="absolute -left-[3px] top-[225px] h-14 w-[3px] rounded-l-sm bg-gradient-to-r from-[#777] to-[#ddd]" />
      <div className="absolute -right-[3px] top-[180px] h-20 w-[3px] rounded-r-sm bg-gradient-to-r from-[#aaa] to-[#555]" />

      <div className="relative h-full w-full rounded-[49px] bg-gradient-to-r from-[#777] via-[#f5f5f5] to-[#858585] p-[2px] shadow-[0_25px_65px_rgba(0,0,0,0.16)]">
        <div className="h-full w-full rounded-[47px] bg-[#101010] p-[5px]">
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[42px] bg-white">

            <div className="relative flex h-11 shrink-0 items-center justify-between px-6 text-xs font-semibold text-black">
              <span>9:40</span>

              <div className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

              <div className="flex items-center gap-1">
                <Signal size={13} fill="currentColor" />
                <Wifi size={13} strokeWidth={2.5} />
                <BatteryFull size={17} />
              </div>
            </div>

            <div className="flex h-14 shrink-0 items-center gap-2.5 bg-[#f5f5f7] px-3">
              <ChevronLeft size={20} className="text-[#666]" />

              <div className="flex size-8 items-center justify-center rounded-full bg-[#dce5e1] text-xs font-semibold text-[#456257]">
                AT
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-[#222]">
                  Elon
                </p>
                <p className="text-[10px] text-[#888]">Online</p>
              </div>

              <PhoneCall size={17} className="text-[#666]" />
              <MoreVertical size={18} className="ml-1 text-[#666]" />
            </div>

            <div className="relative min-h-0 flex-1 overflow-y-auto pb-4">
              {children}
            </div>

            <div className="flex h-[72px] shrink-0 flex-col justify-between bg-[#f5f5f7]">
              <div className="flex items-center gap-3 px-4 pt-3">
                <Plus size={21} className="text-[#73737a]" />

                <div className="flex h-9 flex-1 items-center justify-between rounded-full bg-white px-3">
                  <span className="text-xs text-[#aaa]">Message</span>
                  <Mic size={16} className="text-[#999]" />
                </div>

                <Camera size={19} className="text-[#73737a]" />
              </div>

              <div className="mx-auto mb-2 h-1 w-24 rounded-full bg-black" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}