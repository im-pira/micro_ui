"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import JournalScene from "./JournalScene";
import { images, LAST_PAGE } from "./journal";

export default function JournalFlip() {
  const [page, setPage] = useState(0);
  const [target, setTarget] = useState<number | null>(null);

  const go = (next: number) => {
    if (target !== null) return;
    if (next < 0 || next > LAST_PAGE || next === page) return;

    setTarget(next);
  };

  const complete = () => {
    if (target === null) return;

    setPage(target);
    setTarget(null);
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-[#F4F0E8]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(105,85,62,.16) .7px,transparent .8px)",
          backgroundSize: "7px 7px",
        }}
      />

      <div className="absolute left-1/2 top-8 z-10 -translate-x-1/2 text-center">
        <p className="text-[10px] uppercase tracking-[.32em] text-[#8D7C68]">
          My Journal
        </p>

        <p className="mt-1 font-serif text-sm italic text-[#574B3F]">
          {images.length} little memories
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-24 top-24">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            position: [0, 0.08, 5.15],
            fov: 38,
          }}
        >
          <Suspense fallback={null}>
            <JournalScene
              page={page}
              target={target}
              onComplete={complete}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-5">
        <button
          disabled={page === 0 || target !== null}
          onClick={() => go(page - 1)}
          className="grid size-11 place-items-center rounded-full border border-[#D8CCBC] bg-[#FFFDF8] text-xl text-[#574B3F] shadow-sm disabled:opacity-25"
        >
          ←
        </button>

        <div className="min-w-[52px] text-center font-serif text-sm text-[#574B3F]">
          {page + 1}
          <span className="mx-1 text-[#B6A995]">/</span>
          {images.length}
        </div>

        <button
          disabled={page === LAST_PAGE || target !== null}
          onClick={() => go(page + 1)}
          className="grid size-11 place-items-center rounded-full border border-[#D8CCBC] bg-[#FFFDF8] text-xl text-[#574B3F] shadow-sm disabled:opacity-25"
        >
          →
        </button>
      </div>
    </main>
  );
}