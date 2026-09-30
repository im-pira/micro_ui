import { useEffect, useRef, useState } from "react";

const BAR_COUNT = 34;
const idleWave = Array.from({ length: BAR_COUNT }, (_, i) =>
  18 + Math.round((Math.sin(i * 0.76) + 1) * 17)
);
const formatTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return [
    Math.floor(s / 60),
    s % 60,
    Math.floor((ms % 1000) / 10),
  ].map((n) => String(n).padStart(2, "0"));
};
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [bars, setBars] = useState(idleWave);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const audioCtx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const player = useRef<HTMLAudioElement | null>(null);
  const waveFrame = useRef<number | null>(null);
  const timerFrame = useRef<number | null>(null);
  const startedAt = useRef(0);
  const pausedAt = useRef(0);
  const totalPaused = useRef(0);
  const chunks = useRef<Blob[]>([]);
  const stopFrames = () => {
    if (waveFrame.current) cancelAnimationFrame(waveFrame.current);
    if (timerFrame.current) cancelAnimationFrame(timerFrame.current);
    waveFrame.current = timerFrame.current = null;
  };
  const stopStream = () => {
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    analyser.current?.disconnect();
    analyser.current = null;
    if (audioCtx.current?.state !== "closed") audioCtx.current?.close();
    audioCtx.current = null;
  };
  const animateTimer = () => {
    if (!paused)
      setElapsed(performance.now() - startedAt.current - totalPaused.current);
    timerFrame.current = requestAnimationFrame(animateTimer);
  };
  const animateWave = () => {
    if (!analyser.current || paused) {
      waveFrame.current = requestAnimationFrame(animateWave);
      return;
    }
    const data = new Uint8Array(analyser.current.frequencyBinCount);
    analyser.current.getByteTimeDomainData(data);
    setBars(
      Array.from({ length: BAR_COUNT }, (_, i) => {
        const start = Math.floor((i / BAR_COUNT) * data.length);
        const end = Math.max(
          start + 1,
          Math.floor(((i + 1) / BAR_COUNT) * data.length)
        );
        let peak = 0;
        for (let j = start; j < end; j++)
          peak = Math.max(peak, Math.abs(data[j] - 128));
        return Math.max(8, Math.min(92, 10 + peak * 1.55));
      })
    );
    waveFrame.current = requestAnimationFrame(animateWave);
  };
  const startRecording = async () => {
    if (recording) return;
    setError("");
    setPlaying(false);
    setPaused(false);
    try {
      const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = mic;
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext: typeof AudioContext;
        }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const meter = ctx.createAnalyser();
      meter.fftSize = 256;
      meter.smoothingTimeConstant = 0.72;
      ctx.createMediaStreamSource(mic).connect(meter);
      audioCtx.current = ctx;
      analyser.current = meter;
      const mediaRecorder = new MediaRecorder(mic);
      recorder.current = mediaRecorder;
      chunks.current = [];
      mediaRecorder.ondataavailable = ({ data }) => {
        if (data.size) chunks.current.push(data);
      };
      mediaRecorder.onstop = () => {
        const url = URL.createObjectURL(
          new Blob(chunks.current, {
            type: mediaRecorder.mimeType || "audio/webm",
          })
        );
        setAudioUrl((old) => {
          if (old) URL.revokeObjectURL(old);
          return url;
        });
      };
      mediaRecorder.start(100);
      startedAt.current = performance.now();
      totalPaused.current = 0;
      setElapsed(0);
      setRecording(true);
      animateTimer();
      animateWave();
    } catch {
      setError("Microphone access is required.");
      stopFrames();
      stopStream();
    }
  };

  const pauseRecording = () => {
    if (recorder.current?.state !== "recording") return;
    recorder.current.pause();
    pausedAt.current = performance.now();
    setPaused(true);
    setBars(idleWave);
  };
  const resumeRecording = () => {
    if (recorder.current?.state !== "paused") return;
    recorder.current.resume();
    totalPaused.current += performance.now() - pausedAt.current;
    setPaused(false);
  };

  const toggleRecordingPause = () => {
    if (!recording) return;
    paused ? resumeRecording() : pauseRecording();
  };
  const stopRecording = () => {
    if (!recording) return;
    if (recorder.current?.state !== "inactive") recorder.current?.stop();
    stopFrames();
    stopStream();
    setRecording(false);
    setPaused(false);
    setBars(idleWave);
  };
  const togglePlayback = async () => {
    if (!audioUrl || recording) return;
    if (!player.current) {
      player.current = new Audio(audioUrl);
      player.current.onended = () => setPlaying(false);
    }
    if (playing) {
      player.current.pause();
      setPlaying(false);
    } else {
      await player.current.play();
      setPlaying(true);
    }
  };
  const reset = () => {
    if (recording) stopRecording();
    player.current?.pause();
    player.current = null;
    setPlaying(false);
    setPaused(false);
    setElapsed(0);
    setBars(idleWave);
    setError("");
    setAudioUrl((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
  };
  useEffect(
    () => () => {
      stopFrames();
      stopStream();
      player.current?.pause();
    },
    []
  );
  return { recording, paused, playing, bars, error, audioUrl, time: formatTime(elapsed), startRecording, stopRecording, toggleRecordingPause, togglePlayback, reset };
}