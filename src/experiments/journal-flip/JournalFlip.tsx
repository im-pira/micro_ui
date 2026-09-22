"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { JournalScene } from "./JournalScene";
import { pages } from "./journal";

export default function JournalFlip() {
  const [page, setPage] = useState(0);

  const go = (n: number) =>
    setPage(Math.max(0, Math.min(pages.length, n)));

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#F4F0E8]">
      {/* full-screen dotted paper */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(105,85,62,.16) 0.7px, transparent 0.8px)",
          backgroundSize: "7px 7px",
        }}
      />

      {/* title */}
      <div className="absolute left-1/2 top-8 z-10 -translate-x-1/2 text-center">
        <p className="text-[10px] uppercase tracking-[.32em] text-[#8D7C68]">
          My Journal
        </p>

        <p className="mt-1 font-serif text-sm italic text-[#574B3F]">
          {pages.length} little memories
        </p>
      </div>

      {/* centered book */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            position: [0, 0.15, 9.5],
            fov: 42,
          }}
        >
          <JournalScene page={page} setPage={go} />
        </Canvas>
      </div>

      {/* controls */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-5">
        <button
          onClick={() => go(page - 1)}
          disabled={!page}
          className="grid size-11 place-items-center rounded-full border border-[#D8CCBC] bg-[#FFFDF8] text-[#574B3F] shadow-sm transition hover:scale-105 disabled:opacity-25"
        >
          ←
        </button>

        <div className="min-w-[70px] text-center font-serif text-[#574B3F]">
          <span className="text-lg">
            {Math.min(page + 1, pages.length)}
          </span>

          <span className="mx-1.5 text-xs opacity-40">/</span>

          <span className="text-xs opacity-60">{pages.length}</span>
        </div>

        <button
          onClick={() => go(page + 1)}
          disabled={page === pages.length}
          className="grid size-11 place-items-center rounded-full border border-[#D8CCBC] bg-[#FFFDF8] text-[#574B3F] shadow-sm transition hover:scale-105 disabled:opacity-25"
        >
          →
        </button>
      </div>
    </main>
  );
}