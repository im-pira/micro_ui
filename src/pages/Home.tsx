import { useNavigate } from "react-router-dom";

const experiments = [
  ["01", "mac doc", "/experiments/mac-doc"],
  ["02", "profile popup", "/experiments/profile-popup"],
  ["03", "black card stack", "/experiments/blackcard-stack"],
  ["04", "voice chat expand", "/experiments/voice-chat-expand"],
  ["05", "search box", "/experiments/search-box"],
  ["06", "calendar", "/experiments/calender"],
  ["07", "love toggle", "/experiments/love-toggle"],
  ["08", "music player", "/experiments/music-player"],
  ["09", "knob rotator", "/experiments/knob"],
  ["10", "wallet holder", "/experiments/wallet-holder"],
  ["11", "folder", "/experiments/folder"],
  ["12", "profilecard", "/experiments/profile-card"],
  ["13", "shapes", "/experiments/shapes"],
  ["14", "gradient framework", "/experiments/gradient-framework"],
  ["15", "ASCII lab", "/experiments/ascii-lab"],
  ["16", "Camera control panel", "/experiments/camera-control-panel"],
  ["17", "Camera lens", "/experiments/camera-lens"],
  ["18", "Feature card", "/experiments/feature-card"],
  ["19", "Delete button", "/experiments/delete-button"],
  ["20", "Matrix Orb", "/experiments/matrix-orb"],
  ["21", "Solana dashBoard", "/experiments/solana-dashboard"],
  ["22", "NFT Card", "/experiments/NFT-card"],
  ["23", "Switch button", "/experiments/switch-button"],
  ["24", "Journal Flip", "/experiments/journal-flip"],
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#070707] px-6 py-12 text-white md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-14 flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <p className="mb-2 text-[11px] tracking-[.28em] text-white/35">
              UI EXPERIMENTS
            </p>

            <h1 className="text-4xl font-medium tracking-[-2px] md:text-5xl">
              playground.
            </h1>
          </div>

          <span className="text-sm text-white/30">
            {experiments.length} experiments
          </span>
        </header>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {experiments.map(([number, name, path]) => (
            <button
              key={path}
              type="button"
              onClick={() => navigate(path)}
              className="
                group relative min-h-[180px] w-full overflow-hidden rounded-2xl
                border border-white/[0.08]
                bg-[linear-gradient(145deg,#111111,#0b0b0b)]
                p-6 text-left
                shadow-[inset_0_1px_0_rgba(255,255,255,.035),0_12px_30px_rgba(0,0,0,.28)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-white/[0.14]
                hover:bg-[#141414]
                hover:shadow-[inset_0_1px_0_rgba(255,255,255,.05),0_18px_40px_rgba(0,0,0,.42)]
              "
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.035),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-[.15em] text-white/25">
                    {number}
                  </span>

                  <span className="-translate-x-1 text-lg text-white/25 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    ↗
                  </span>
                </div>

                <div>
                  <p className="mb-2 text-[11px] uppercase tracking-[.2em] text-white/20">
                    experiment
                  </p>

                  <h2 className="text-xl font-medium tracking-[-.6px] text-white/75 transition-colors duration-300 group-hover:text-white">
                    {name}
                  </h2>
                </div>
              </div>
            </button>
          ))}
        </div>

        <footer className="mt-12 flex justify-between border-t border-white/10 pt-6 text-xs text-white/25">
          <span>built for fun</span>
          <span>2026</span>
        </footer>
      </div>
    </main>
  );
}