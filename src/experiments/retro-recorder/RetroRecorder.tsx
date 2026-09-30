import { BatteryMedium, Wifi } from "lucide-react";
import { useRecorder } from "./useRecorder";

const buttonShadow = `
  4px 4px 7px rgba(0,0,0,.14),
  -4px -4px 7px rgba(255,255,255,.88),
  inset 0 0 0 1px rgba(255,255,255,.35)
`;

const largeWell = `
  inset 7px 7px 12px rgba(0,0,0,.13),
  inset -7px -7px 12px rgba(255,255,255,.85)
`;

const smallWell = `
  inset 6px 6px 10px rgba(0,0,0,.12),
  inset -6px -6px 10px rgba(255,255,255,.85)
`;

export default function RetroRecorder() {
  const {
    recording,
    paused,
    playing,
    bars,
    audioUrl,
    error,
    time,
    startRecording,
    stopRecording,
    toggleRecordingPause,
    togglePlayback,
    reset,
  } = useRecorder();

  const [minutes, seconds, centiseconds] = time;

  return (
    <main className="grid min-h-screen place-items-center bg-[#ededed] p-6">
      <div className="relative w-[430px] scale-[0.78]">
        {/* BOTTOM CHASSIS */}
        <div
          className="pointer-events-none absolute -bottom-[12px] left-[5px] right-[5px] h-[25px] rounded-b-[25px]"
          style={{
            background: `
              linear-gradient(
                180deg,
                #d7d7d7 0%,
                #cacaca 18%,
                #b8b8b8 55%,
                #9f9f9f 100%
              )
            `,
            boxShadow: `
              inset 0 2px 1px rgba(255,255,255,.75),
              inset 0 -2px 3px rgba(0,0,0,.10),
              0 19px 28px rgba(0,0,0,.25)
            `,
          }}
        />

        {/* FRONT BODY */}
        <div
          className="relative z-10 rounded-[28px] border-[10px] border-white bg-[#e9e9e9] p-2 outline outline-1 outline-[#d5d5d5]"
          style={{
            boxShadow: `
              0 5px 9px rgba(0,0,0,.08),
              inset 0 -1px 0 rgba(0,0,0,.04)
            `,
          }}
        >
          {/* DISPLAY */}
          <section
            className="relative overflow-hidden rounded-[18px] border border-black p-4 text-white"
            style={{
              background: `
                repeating-linear-gradient(
                  to bottom,
                  rgba(255,255,255,.026) 0,
                  rgba(255,255,255,.026) 1px,
                  rgba(0,0,0,.085) 1px,
                  rgba(0,0,0,.085) 3px
                ),
                radial-gradient(
                  ellipse at 50% 42%,
                  #1b1b1b 0%,
                  #151515 48%,
                  #0c0c0c 100%
                )
              `,
              boxShadow: `
                inset 0 1px 0 rgba(255,255,255,.08),
                inset 0 0 24px rgba(255,255,255,.025),
                inset 0 -20px 34px rgba(0,0,0,.38),
                0 1px 2px rgba(0,0,0,.35)
              `,
            }}
          >
            {/* TOP STATUS */}
            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span>04.35 PM</span>

              <span className="mr-auto ml-5 flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    recording
                      ? paused
                        ? "bg-yellow-400"
                        : "animate-pulse bg-red-500"
                      : "bg-red-500/45"
                  }`}
                />

                {recording
                  ? paused
                    ? "PAUSED"
                    : "RECORDING"
                  : audioUrl
                    ? "RECORDED"
                    : "NEW RECORDING"}
              </span>

              <span className="flex items-center gap-3">
                <span className={playing ? "text-white" : ""}>
                  {playing ? "Ⅱ" : "▶︎"}
                </span>

                <Wifi className="size-4" />
              </span>
            </div>

            {/* WAVEFORM */}
            <div className="relative mt-24 h-32">
              <div className="absolute top-1/2 left-0 h-px w-full bg-white/10" />

              <div className="absolute top-1/2 left-4 flex -translate-y-1/2 items-center gap-[4px]">
                {bars.map((height, index) => (
                  <span
                    key={index}
                    className="w-[2px] bg-white/80"
                    style={{
                      height,
                      transition: "height 55ms linear",
                    }}
                  />
                ))}
              </div>

              {/* RECORD HEAD */}
              <div
                className={`absolute top-5 left-[58%] h-[105px] w-[2px] ${
                  recording && !paused
                    ? "bg-red-500"
                    : "bg-red-500/55"
                }`}
              >
                <span
                  className={`absolute -top-1 -left-[4px] h-3 w-3 rounded-full ${
                    recording && !paused
                      ? "bg-red-500"
                      : "bg-red-500/70"
                  }`}
                />
              </div>

              {/* FUTURE TIMELINE */}
              <div className="absolute top-1/2 right-0 left-[59%] flex gap-[5px]">
                {Array.from({ length: 31 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-[5px] w-px bg-white/25"
                  />
                ))}
              </div>
            </div>

            {/* TIMER */}
            <div className="mt-20 flex items-end gap-[3px] font-mono text-[48px] font-medium leading-none tracking-[-3px] text-white tabular-nums">
              <span>{minutes}</span>

              <span className="relative -top-[2px] text-white/45">
                :
              </span>

              <span>{seconds}</span>

              <span className="relative -top-[2px] text-white/45">
                :
              </span>

              <span>{centiseconds}</span>
            </div>

            {error && (
              <div className="mt-3 text-[10px] text-red-300">
                {error}
              </div>
            )}
          </section>

          {/* BATTERY + SPEAKER */}
          <div className="my-3 flex items-center gap-3">
            <div
              className="flex h-8 items-center gap-1.5 rounded-[9px] px-3 text-[12px] font-medium text-white"
              style={{
                background:
                  "linear-gradient(180deg,#2a2a2a 0%,#171717 55%,#101010 100%)",
                boxShadow: `
                  0 2px 5px rgba(0,0,0,.28),
                  inset 0 1px 0 rgba(255,255,255,.12),
                  inset 0 -1px 0 rgba(0,0,0,.5)
                `,
                border: "1px solid rgba(0,0,0,.7)",
              }}
            >
              <BatteryMedium
                className="size-[15px] text-white/90"
                strokeWidth={1.8}
              />

              <span className="tracking-[.02em] text-white/95">
                89%
              </span>
            </div>

            <div className="h-7 flex-1 opacity-70 [background-image:radial-gradient(#111_1px,transparent_1px)] [background-size:6px_6px]" />
          </div>

          {/* CONTROLS */}
          <section className="grid h-[145px] grid-cols-3 gap-[14px] bg-transparent p-0">
            {/* RECORD */}
            <button
              type="button"
              onClick={startRecording}
              disabled={recording}
              aria-label="Start recording"
              className="grid place-items-center rounded-[16px] border border-black/15 bg-[#dcdcdc] transition-transform active:translate-y-[1px] disabled:cursor-default"
              style={{ boxShadow: buttonShadow }}
            >
              <span
                className="grid h-[62px] w-[62px] place-items-center rounded-full bg-[#dcdcdc]"
                style={{ boxShadow: largeWell }}
              >
                <span
                  className={`h-[21px] w-[21px] rounded-full ${
                    recording
                      ? "animate-pulse bg-red-500"
                      : "bg-[#cb706d]"
                  }`}
                />
              </span>
            </button>

            {/* STOP */}
            <button
              type="button"
              onClick={stopRecording}
              disabled={!recording}
              aria-label="Stop recording"
              className="grid place-items-center rounded-[16px] border border-black/15 bg-[#dcdcdc] transition-transform active:translate-y-[1px] disabled:cursor-default disabled:opacity-70"
              style={{ boxShadow: buttonShadow }}
            >
              <span
                className="grid h-[62px] w-[62px] place-items-center rounded-full bg-[#dcdcdc]"
                style={{ boxShadow: largeWell }}
              >
                <span className="h-[18px] w-[18px] rounded-[2px] bg-[#868686]" />
              </span>
            </button>

            {/* RIGHT CONTROLS */}
            <div className="grid grid-rows-2 gap-[14px]">
              {/* PLAY / PAUSE */}
              <button
                type="button"
                onClick={togglePlayback}
                disabled={!audioUrl || recording}
                aria-label={
                  playing
                    ? "Pause recording playback"
                    : "Play recording"
                }
                className="grid place-items-center rounded-[14px] border border-black/15 bg-[#dcdcdc] transition-transform active:translate-y-[1px] disabled:cursor-default disabled:opacity-60"
                style={{ boxShadow: buttonShadow }}
              >
                <span
                  className="grid h-[50px] w-[50px] place-items-center rounded-full bg-[#dcdcdc]"
                  style={{ boxShadow: smallWell }}
                >
                  <span className="translate-x-[1px] text-[20px] font-semibold leading-none text-[#666]">
                    {playing ? "Ⅱ" : "▶"}
                  </span>
                </span>
              </button>

              {/* PAUSE RECORDING / RESET */}
              <button
                type="button"
                onClick={
                  recording
                    ? toggleRecordingPause
                    : reset
                }
                aria-label={
                  recording
                    ? paused
                      ? "Resume recording"
                      : "Pause recording"
                    : "Reset recorder"
                }
                className="grid place-items-center rounded-[14px] border border-black/15 bg-[#dcdcdc] transition-transform active:translate-y-[1px]"
                style={{ boxShadow: buttonShadow }}
              >
                <span
                  className="grid h-[50px] w-[50px] place-items-center rounded-full bg-[#dcdcdc]"
                  style={{ boxShadow: smallWell }}
                >
                  {recording ? (
                    <span className="text-[20px] font-semibold leading-none text-[#666]">
                      {paused ? "▶" : "Ⅱ"}
                    </span>
                  ) : (
                    <span className="text-[24px] leading-none text-[#666]">
                      ↻
                    </span>
                  )}
                </span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}