"use client";

import { useState } from "react";

export default function SwitchButton() {
  const [on, setOn] = useState(true);
  const [pressed, setPressed] = useState(false);

  return (
    <main className="grid min-h-screen place-items-center bg-[#dedede]">
      <div
        role="switch"
        aria-checked={on}
        className="relative h-[160px] w-[320px] rounded-[73px]
                   bg-gradient-to-br from-[#f0ede8] to-[#d8d4ce]
                   shadow-[0_2px_3px_rgba(255,255,255,.9),0_5px_7px_rgba(62,56,50,.18),0_14px_24px_-12px_rgba(43,38,33,.38)]"
      >
        <span
          className="pointer-events-none absolute inset-[4px] rounded-[69px]
                     bg-[#77736e]
                     shadow-[inset_1px_1px_2px_rgba(25,22,20,.5)]"
        />

        <span
          className="pointer-events-none absolute inset-[5px] rounded-[68px]
                     bg-[#ebe7e1]
                     shadow-[inset_5px_6px_9px_rgba(55,50,45,.32),inset_11px_13px_20px_rgba(55,49,43,.25),inset_18px_20px_30px_-18px_rgba(30,27,24,.48),inset_-7px_-7px_12px_rgba(255,255,255,.95)]"
        />

        <span
          className={`absolute left-[7px] top-[7px] h-[146px] w-[146px]
                      will-change-transform
                      transition-transform duration-[650ms]
                      ease-[cubic-bezier(.45,0,.2,1)]
                      ${on ? "translate-x-[160px]" : "translate-x-0"}`}
        >
          <button
            type="button"
            aria-label={on ? "Turn off" : "Turn on"}
            onPointerDown={() => setPressed(true)}
            onPointerUp={() => setPressed(false)}
            onPointerCancel={() => setPressed(false)}
            onPointerLeave={() => setPressed(false)}
            onClick={() => setOn((v) => !v)}
            className={`absolute inset-0 cursor-pointer rounded-[64px]
              bg-[linear-gradient(145deg,#f5f2ed_0%,#ece8e2_52%,#dfdcd6_100%)]
              shadow-[inset_3px_3px_5px_rgba(255,255,255,.98),inset_-2px_-3px_4px_rgba(90,83,76,.08),0_2px_2px_rgba(55,49,43,.25),2px_4px_4px_rgba(48,42,37,.28),4px_6px_7px_-2px_rgba(39,34,29,.34),6px_9px_10px_-5px_rgba(31,27,23,.36)]
              transition-[filter] duration-100 ease-out
              ${pressed ? "brightness-[.97]" : "brightness-100"}`}
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-[64px]
               bg-[radial-gradient(circle_at_24%_14%,rgba(255,255,255,.5),transparent_44%)]"
            />
          </button>
        </span>
      </div>
    </main>
  );
}