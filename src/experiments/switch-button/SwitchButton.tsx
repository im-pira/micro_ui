"use client";

import { useState } from "react";

export default function SwitchButton() {
  const [on, setOn] = useState(true);
  const [pressed, setPressed] = useState(false);

  return (
    <main className="grid min-h-screen place-items-center bg-[#dedede]">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => {
          setPressed(false);
          setOn((v) => !v);
        }}
        onPointerLeave={() => setPressed(false)}
        className="relative h-[160px] w-[340px] rounded-[73px]
                   bg-gradient-to-br from-[#f0ede8] to-[#d8d4ce]
                   shadow-[0_2px_3px_rgba(255,255,255,.9),0_5px_7px_rgba(62,56,50,.18),0_14px_24px_-12px_rgba(43,38,33,.38)]
                   outline-none"
      >
        <span
          className="absolute inset-[4px] rounded-[69px]
                     bg-[#77736e]
                     shadow-[inset_1px_1px_2px_rgba(25,22,20,.5)]"
        />

        <span
          className="absolute inset-[5px] rounded-[68px]
                     bg-[#ebe7e1]
                     shadow-[inset_5px_6px_9px_rgba(55,50,45,.32),inset_11px_13px_20px_rgba(55,49,43,.25),inset_18px_20px_30px_-18px_rgba(30,27,24,.48),inset_-7px_-7px_12px_rgba(255,255,255,.95)]"
        />

        <span
          className={`absolute left-[7px] top-[7px]
                      h-[146px] w-[146px]
                      rounded-[64px]
                      bg-[linear-gradient(145deg,#f5f2ed_0%,#ece8e2_52%,#dfdcd6_100%)]
                      will-change-transform
                      transition-[transform,box-shadow] duration-[560ms]
                      ease-[cubic-bezier(.4,0,.2,1)]
                      ${
                        pressed
                          ? "shadow-[inset_2px_2px_4px_rgba(255,255,255,.9),0_1px_2px_rgba(55,49,43,.22),2px_3px_5px_rgba(48,42,37,.24)]"
                          : "shadow-[inset_3px_3px_5px_rgba(255,255,255,.98),inset_-2px_-3px_4px_rgba(90,83,76,.08),0_2px_3px_rgba(55,49,43,.22),3px_5px_7px_rgba(48,42,37,.25),7px_10px_14px_-4px_rgba(39,34,29,.38),12px_17px_24px_-10px_rgba(31,27,23,.48)]"
                      }
                      ${
                        on
                          ? pressed
                            ? "translate-x-[180px] scale-[.985]"
                            : "translate-x-[180px]"
                          : pressed
                            ? "translate-x-0 scale-[.985]"
                            : "translate-x-0"
                      }`}
        >
          <span
            className="absolute inset-0 rounded-[64px]
                       bg-[radial-gradient(circle_at_24%_14%,rgba(255,255,255,.5),transparent_44%)]"
          />
        </span>
      </button>
    </main>
  );
}