import { useState } from "react";

export default function ToggleButton() {
    const [on, setOn] = useState(true);

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#e9e9e9]">
            {/* Track */}
            <button
                role="switch"
                aria-checked={on}
                onClick={() => setOn(!on)}
                className={`relative h-32 w-64 rounded-full p-1 transition-colors duration-500 shadow-[inset_0_10px_20px_rgba(0,0,0,0.35),inset_0_-2px_4px_rgba(255,255,255,0.4),0_0_0_10px_rgba(255,255,255,0.55),0_0_0_11px_rgba(0,0,0,0.04),0_14px_28px_rgba(0,0,0,0.1)] ${
                    on ? "bg-blue-600" : "bg-neutral-500"
                }`}
            >
                {/* Knob */}
                <span
                    className={`relative block h-full w-44 overflow-hidden rounded-full border bg-[#f1f1f1] transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                        on
                            ? "translate-x-[72px] border-blue-700 shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),inset_0_-4px_8px_rgba(0,0,0,0.08),-6px_8px_16px_rgba(0,0,0,0.3)]"
                            : "translate-x-0 border-neutral-600 shadow-[inset_0_2px_3px_rgba(255,255,255,0.9),inset_0_-4px_8px_rgba(0,0,0,0.08),6px_8px_16px_rgba(0,0,0,0.3)]"
                    }`}
                >
                    {/* Diagonal cross-hatch texture (ON) */}
                    <span
                        className={`absolute inset-0 transition-opacity duration-500 bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.1)_0_1px,transparent_1px_4px),repeating-linear-gradient(-45deg,rgba(0,0,0,0.1)_0_1px,transparent_1px_4px)] ${
                            on ? "opacity-100" : "opacity-0"
                        }`}
                    />
                    {/* Vertical line texture (OFF) */}
                    <span
                        className={`absolute inset-0 transition-opacity duration-500 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.12)_0_1px,transparent_1px_3px)] ${
                            on ? "opacity-0" : "opacity-100"
                        }`}
                    />
                </span>
            </button>
        </div>
    );
}