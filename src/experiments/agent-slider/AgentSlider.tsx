import { useState } from "react";

export default function AgentSlider() {
    const [step, setStep] = useState(0);
    const labels = ["Low", "Medium", "High", "Extra High"];
    const position = 6.6 + step * 28.93;
    const label = labels[Math.round(step)];
    const rating = (4.7 + step * 0.1).toFixed(1);

    function updateStep(e) {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const percent = ((e.clientX - left) / width) * 100;
        setStep(Math.max(0, Math.min(3, Math.round((percent - 6.6) / 28.93))));
    }

    return (
        <div className="grid min-h-screen place-items-center bg-[#09090b]">
            <div
                role="slider"
                aria-label="Agent slider"
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={step + 1}
                aria-valuetext={label}
                tabIndex={0}
                onPointerDown={(e) => {
                    e.currentTarget.setPointerCapture(e.pointerId);
                    updateStep(e);
                }}
                onPointerMove={(e) => {
                    if (e.currentTarget.hasPointerCapture(e.pointerId)) updateStep(e);
                }}
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                        e.preventDefault();
                        setStep((s) => Math.min(3, s + 1));
                    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                        e.preventDefault();
                        setStep((s) => Math.max(0, s - 1));
                    } else if (e.key === "Home") setStep(0);
                    else if (e.key === "End") setStep(3);
                }}
                className="relative h-12 w-[340px] max-w-[calc(100vw-48px)] cursor-pointer touch-none select-none rounded-full border border-[#303135] bg-[#222326] outline-none"
            >
                <div
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 ${step === 0 ? "" : "transition-[width] duration-300 ease-out"}`}
                    style={{ width: step === 0 ? "0%" : step === 3 ? "100%" : `${position}%` }}
                />

                <div className="absolute inset-x-[6.6%] inset-y-0 flex items-center justify-between">
                    {labels.map((label) => (
                        <span key={label} className="z-10 h-3 w-[2px] rounded bg-[#66686d]" />
                    ))}
                </div>

                <div
                    className="absolute bottom-[calc(100%+2px)] flex items-baseline gap-1 whitespace-nowrap rounded-t-xl border border-b-0 border-[#303135] bg-[#222326] px-2 py-0.5 text-xs leading-4"
                    style={{
                        left: `${position}%`,
                        transform: step === 0 ? "translateX(0)" : step === 3 ? "translateX(-100%)" : "translateX(-50%)",
                    }}
                >
                    <span className="font-medium text-[#f6f7f8]">{rating}</span>
                    <span className="text-[#909297]">{labels[step]}</span>
                </div>

                <div
                    className="absolute bottom-1 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-2 border-blue-600 bg-[#fafafa] transition-[left] duration-300 ease-out"
                    style={{ left: `${position}%` }}
                >
                    <span className="h-3 w-[2px] rounded bg-[#8d8e92]" />
                </div>
            </div>
        </div>
    );
}