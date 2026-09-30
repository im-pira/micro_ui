import { useEffect, useRef, useState } from "react";

const BAR_COUNT = 34;

const idleWave = Array.from({ length: BAR_COUNT }, (_, i) =>
  18 + Math.round((Math.sin(i * 0.76) + 1) * 17)
);

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);

  return [
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
    String(centiseconds).padStart(2, "0"),
  ];
}

export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [bars, setBars] = useState(idleWave);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const playerRef = useRef<HTMLAudioElement | null>(null);

  const waveFrameRef = useRef<number | null>(null);
  const timerFrameRef = useRef<number | null>(null);

  const startedAtRef = useRef(0);
  const pausedAtRef = useRef(0);
  const accumulatedPauseRef = useRef(0);

  const chunksRef = useRef<Blob[]>([]);

  const stopFrames = () => {
    if (waveFrameRef.current) cancelAnimationFrame(waveFrameRef.current);
    if (timerFrameRef.current) cancelAnimationFrame(timerFrameRef.current);

    waveFrameRef.current = null;
    timerFrameRef.current = null;
  };

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    analyserRef.current?.disconnect();
    analyserRef.current = null;

    if (
      audioContextRef.current &&
      audioContextRef.current.state !== "closed"
    ) {
      audioContextRef.current.close();
    }

    audioContextRef.current = null;
  };

  const animateTimer = () => {
    if (!paused) {
      const now = performance.now();

      setElapsed(
        now -
          startedAtRef.current -
          accumulatedPauseRef.current
      );
    }

    timerFrameRef.current = requestAnimationFrame(animateTimer);
  };

  const animateWave = () => {
    const analyser = analyserRef.current;

    if (!analyser || paused) {
      waveFrameRef.current = requestAnimationFrame(animateWave);
      return;
    }

    const data = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteTimeDomainData(data);

    const next = Array.from({ length: BAR_COUNT }, (_, i) => {
      const start = Math.floor((i / BAR_COUNT) * data.length);
      const end = Math.max(
        start + 1,
        Math.floor(((i + 1) / BAR_COUNT) * data.length)
      );

      let peak = 0;

      for (let j = start; j < end; j++) {
        peak = Math.max(
          peak,
          Math.abs(data[j] - 128)
        );
      }

      return Math.max(
        8,
        Math.min(92, 10 + peak * 1.55)
      );
    });

    setBars(next);

    waveFrameRef.current =
      requestAnimationFrame(animateWave);
  };

  const startRecording = async () => {
    if (recording) return;

    setError("");
    setPlaying(false);
    setPaused(false);

    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      streamRef.current = stream;

      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext: typeof AudioContext;
          }
        ).webkitAudioContext;

      const context = new AudioContextClass();
      const analyser = context.createAnalyser();

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.72;

      context
        .createMediaStreamSource(stream)
        .connect(analyser);

      audioContextRef.current = context;
      analyserRef.current = analyser;

      const recorder = new MediaRecorder(stream);

      recorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type:
            recorder.mimeType || "audio/webm",
        });

        const url = URL.createObjectURL(blob);

        setAudioUrl((oldUrl) => {
          if (oldUrl) URL.revokeObjectURL(oldUrl);

          return url;
        });
      };

      recorder.start(100);

      setRecording(true);
      setElapsed(0);

      startedAtRef.current = performance.now();
      accumulatedPauseRef.current = 0;

      animateTimer();
      animateWave();
    } catch {
      setError("Microphone access is required.");
      stopFrames();
      stopStream();
    }
  };

  const pauseRecording = () => {
    const recorder = recorderRef.current;

    if (!recorder || recorder.state !== "recording")
      return;

    recorder.pause();

    pausedAtRef.current = performance.now();

    setPaused(true);
    setBars(idleWave);
  };

  const resumeRecording = () => {
    const recorder = recorderRef.current;

    if (!recorder || recorder.state !== "paused")
      return;

    recorder.resume();

    accumulatedPauseRef.current +=
      performance.now() - pausedAtRef.current;

    setPaused(false);
  };

  const toggleRecordingPause = () => {
    if (!recording) return;

    if (paused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
  };

  const stopRecording = () => {
    if (!recording) return;

    const recorder = recorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    stopFrames();
    stopStream();

    setRecording(false);
    setPaused(false);
    setBars(idleWave);
  };

  const togglePlayback = async () => {
    if (!audioUrl || recording) return;

    if (!playerRef.current) {
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setPlaying(false);
      };

      playerRef.current = audio;
    }

    const player = playerRef.current;

    if (playing) {
      player.pause();
      setPlaying(false);
      return;
    }

    await player.play();
    setPlaying(true);
  };

  const reset = () => {
    if (recording) {
      stopRecording();
    }

    playerRef.current?.pause();
    playerRef.current = null;

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

  useEffect(() => {
    return () => {
      stopFrames();
      stopStream();

      playerRef.current?.pause();
    };
  }, []);

  return {
    recording,
    paused,
    playing,
    bars,
    error,
    audioUrl,

    time: formatTime(elapsed),

    startRecording,
    stopRecording,
    toggleRecordingPause,
    togglePlayback,
    reset,
  };
}