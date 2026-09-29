import type { LucideIcon } from "lucide-react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, FastForward, Mic, Moon, Play, Rewind, Search, Sun, Volume1, Volume2, VolumeX, } from "lucide-react"

const Key = ({
    children, w = "w-[72px]", left = false, rounded = "rounded-[11px]", }: {
        children?: React.ReactNode
        w?: string
        left?: boolean
        rounded?: string
    }) => (
    <div
        className={`${w} ${rounded} h-[72px] shrink-0 border border-zinc-300 bg-[#f7f7f8]
    shadow-[0_3px_5px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.95)]
    flex ${left ? "items-end justify-start p-3" : "items-center justify-center"}
    text-[16px] text-zinc-700`}
    >{children}</div>
)

const Pair = ({ a, b }: { a: React.ReactNode; b: React.ReactNode }) => (
    <div className="flex h-full flex-col items-center justify-center gap-2">
        <span>{a}</span>
        <span>{b}</span>
    </div>
)

const IconKey = ({ icon: Icon, n }: { icon: LucideIcon; n: string }) => (
    <Key>
        <div className="flex flex-col items-center gap-2">
            <Icon size={18} strokeWidth={2} />
            <span>{n}</span>
        </div>
    </Key>
)

export default function Keyboard() {
    return (
        <div className="min-h-screen grid place-items-center overflow-hidden bg-white">
            <div className="w-max scale-[0.85] origin-center space-y-2 rounded-[30px] bg-[#e7e7e7] p-[17px] shadow-[0_10px_18px_#0002]">

                <div className="flex gap-2">
                    <Key w="w-[120px]" left rounded="rounded-tl-[18px] rounded-tr-[11px] rounded-bl-[11px] rounded-br-[11px]">
                        esc
                    </Key>
                    <IconKey icon={Sun} n="F1" />
                    <IconKey icon={Sun} n="F2" />
                    <Key>
                        <div className="flex flex-col items-center gap-2">
                            <svg
                                viewBox="0 0 24 20"
                                className="h-[18px] w-[20px]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="3.5" y="2.5" width="17" height="15" rx="2.2" />
                                <path d="M10 2.5v15" />
                                <path d="M3.5 9.4h17" />
                            </svg>

                            <span>F3</span>
                        </div>
                    </Key>
                    <IconKey icon={Search} n="F4" />
                    <IconKey icon={Mic} n="F5" />
                    <IconKey icon={Moon} n="F6" />
                    <IconKey icon={Rewind} n="F7" />
                    <IconKey icon={Play} n="F8" />
                    <IconKey icon={FastForward} n="F9" />
                    <IconKey icon={VolumeX} n="F10" />
                    <IconKey icon={Volume1} n="F11" />
                    <IconKey icon={Volume2} n="F12" />
                    <Key rounded="rounded-tl-[11px] rounded-tr-[18px] rounded-bl-[11px] rounded-br-[11px]">
                        <div className="size-11 rounded-full border-[3px] border-zinc-300" />
                    </Key>
                </div>

                <div className="flex gap-2">
                    {[
                        ["~", "`"], ["!", "1"], ["@", "2"], ["#", "3"], ["$", "4"], ["%", "5"],
                        ["^", "6"], ["&", "7"], ["*", "8"], ["(", "9"], [")", "0"], ["—", "-"], ["+", "="],
                    ].map(([a, b]) => <Key key={b}><Pair a={a} b={b} /></Key>)}

                    <Key w="w-[120px]" left rounded="rounded-l-[11px] rounded-r-[17px]">
                        delete
                    </Key>
                </div>

                <div className="flex gap-2">
                    <Key w="w-[120px]" left>tab</Key>
                    {"QWERTYUIOP".split("").map(k => <Key key={k}>{k}</Key>)}
                    <Key><Pair a="{" b="[" /></Key>
                    <Key><Pair a="}" b="]" /></Key>
                    <Key rounded="rounded-l-[11px] rounded-r-[17px]">
                        <Pair a="|" b="\" />
                    </Key>
                </div>

                <div className="flex gap-2">
                    <Key w="w-[136px]" left>caps lock</Key>
                    {"ASDFGHJKL".split("").map(k => <Key key={k}>{k}</Key>)}
                    <Key><Pair a=":" b=";" /></Key>
                    <Key><Pair a={'"'} b="'" /></Key>

                    <Key w="w-[136px]" left rounded="rounded-l-[11px] rounded-r-[17px]">
                        return
                    </Key>
                </div>

                <div className="flex gap-2">
                    <Key w="w-[176px]" left>shift</Key>
                    {"ZXCVBNM".split("").map(k => <Key key={k}>{k}</Key>)}
                    <Key><Pair a="<" b="," /></Key>
                    <Key><Pair a=">" b="." /></Key>
                    <Key><Pair a="?" b="/" /></Key>

                    <Key w="w-[176px]" left rounded="rounded-l-[11px] rounded-r-[17px]">
                        shift
                    </Key>
                </div>

                <div className="flex gap-2">
                    <Key rounded="rounded-tl-[11px] rounded-tr-[11px] rounded-bl-[18px] rounded-br-[11px]">
                        <div className="relative h-full w-full">
                            <span className="absolute left-[11px] top-[10px] text-[15px] leading-none">
                                fn
                            </span>

                            <svg
                                viewBox="0 0 24 24"
                                className="absolute bottom-[8px] left-[11px] size-[18px]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="8.2" />
                                <path d="M4.8 8.5h14.4M4.8 15.5h14.4" />
                                <path d="M12 3.8c2 2.2 3 5 3 8.2s-1 6-3 8.2M12 3.8c-2 2.2-3 5-3 8.2s1 6 3 8.2" />
                            </svg>
                        </div>
                    </Key>

                    <Key><Pair a="⌃" b="control" /></Key>
                    <Key><Pair a="⌥" b="option" /></Key>
                    <Key w="w-[88px]"><Pair a="⌘" b="command" /></Key>

                    <Key w="w-[408px]" />

                    <Key w="w-[88px]"><Pair a="⌘" b="command" /></Key>
                    <Key><Pair a="⌥" b="option" /></Key>

                    <Key>
                        <ChevronLeft size={18} strokeWidth={2.2} />
                    </Key>

                    <div className="flex w-[72px] flex-col gap-1">
                        <div className="grid h-[34px] place-items-center rounded-[9px] border border-zinc-300 bg-[#f7f7f8] shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
                            <ChevronUp size={17} strokeWidth={2.3} />
                        </div>
                        <div className="grid h-[34px] place-items-center rounded-[9px] border border-zinc-300 bg-[#f7f7f8] shadow-[0_2px_3px_rgba(0,0,0,0.2)]">
                            <ChevronDown size={17} strokeWidth={2.3} />
                        </div>
                    </div>

                    <Key rounded="rounded-tl-[11px] rounded-tr-[11px] rounded-bl-[11px] rounded-br-[18px]">
                        <ChevronRight size={18} strokeWidth={2.2} />
                    </Key>
                </div>

            </div>
        </div>
    )
}