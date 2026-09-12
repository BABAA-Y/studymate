import { useEffect, useState } from "react";
import { useStudy } from "../context/studycontext";

const modes = {
  focus: {
    label: "Focus Session",
    shortLabel: "Focus",
    minutes: 25,
    presets: [15, 25, 45, 60],
  },
  short: {
    label: "Short Break",
    shortLabel: "Short",
    minutes: 5,
    presets: [3, 5, 10],
  },
  long: {
    label: "Long Break",
    shortLabel: "Long",
    minutes: 15,
    presets: [15, 20, 30],
  },
};

const TIMER_KEY = "study-mate-timer";

function playChimeSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Harmonic bell chime tone 1 (D5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, now);
    gain1.gain.setValueAtTime(0.28, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.3);

    // Harmonic bell chime tone 2 (A5)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, now + 0.18);
    gain2.gain.setValueAtTime(0.32, now + 0.18);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.18);
    osc2.stop(now + 1.8);
  } catch {
    // AudioContext blocked or not supported
  }
}

function Timer() {
  const { sessions, completeSession } = useStudy();

  // Load saved timer from localStorage
  const [timerState] = useState(() => {
    const savedTimer = localStorage.getItem(TIMER_KEY);
    if (!savedTimer) return null;

    try {
      const parsed = JSON.parse(savedTimer);
      if (parsed.isRunning && parsed.lastSavedAt) {
        const elapsed = Math.floor((Date.now() - parsed.lastSavedAt) / 1000);
        const newSeconds = Math.max(0, parsed.seconds - elapsed);
        return {
          ...parsed,
          seconds: newSeconds,
          isRunning: newSeconds > 0,
        };
      }
      return parsed;
    } catch {
      return null;
    }
  });

  // Current mode
  const [mode, setMode] = useState(timerState?.mode || "focus");

  // Selected duration in minutes
  const [duration, setDuration] = useState(
    timerState?.duration ?? modes[timerState?.mode || "focus"].minutes
  );

  // Remaining seconds
  const [seconds, setSeconds] = useState(
    timerState?.seconds ?? modes[timerState?.mode || "focus"].minutes * 60
  );

  // Running state
  const [isRunning, setIsRunning] = useState(timerState?.isRunning || false);

  // Sound enabled
  const [soundEnabled, setSoundEnabled] = useState(
    () => localStorage.getItem("study-mate-sound") !== "false"
  );

  // Auto-start breaks setting
  const [autoBreaks, setAutoBreaks] = useState(
    () => localStorage.getItem("study-mate-auto-breaks") === "true"
  );

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculate elapsed progress percentage (0% to 100%)
  const totalSeconds = duration * 60;
  const progress =
    totalSeconds === 0
      ? 0
      : Math.min(
          100,
          Math.max(0, Math.round(((totalSeconds - seconds) / totalSeconds) * 100))
        );

  // Formatted display values
  const displayMinutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const displaySeconds = (seconds % 60).toString().padStart(2, "0");

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(
      TIMER_KEY,
      JSON.stringify({
        mode,
        duration,
        seconds,
        isRunning,
        lastSavedAt: isRunning ? Date.now() : null,
      })
    );
  }, [mode, duration, seconds, isRunning]);

  // Sync document title with timer countdown
  useEffect(() => {
    if (isRunning) {
      document.title = `(${displayMinutes}:${displaySeconds}) ${modes[mode].shortLabel} | Study Mate`;
    } else {
      document.title = "studymate";
    }

    return () => {
      document.title = "studymate";
    };
  }, [isRunning, displayMinutes, displaySeconds, mode]);

  // Main countdown timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);

          if (soundEnabled) {
            playChimeSound();
          }

          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 5000);

          if (mode === "focus") {
            completeSession();

            // Check auto-start breaks setting
            const autoBreaksSetting =
              localStorage.getItem("study-mate-auto-breaks") === "true";
            if (autoBreaksSetting) {
              setTimeout(() => {
                const nextDuration = modes.short.minutes;
                setMode("short");
                setDuration(nextDuration);
                setSeconds(nextDuration * 60);
                setIsRunning(true);
              }, 1200);
            }
          }

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode, completeSession, soundEnabled]);


  function changeMode(newMode) {
    const newDuration = modes[newMode].minutes;
    setMode(newMode);
    setDuration(newDuration);
    setSeconds(newDuration * 60);
    setIsRunning(false);
  }

  function setPreset(min) {
    if (isRunning) return;
    setDuration(min);
    setSeconds(min * 60);
  }

  function increaseTime() {
    if (isRunning) return;
    setDuration((prev) => {
      const newDuration = Math.min(prev + 1, 120);
      setSeconds(newDuration * 60);
      return newDuration;
    });
  }

  function decreaseTime() {
    if (isRunning) return;
    setDuration((prev) => {
      const newDuration = Math.max(prev - 1, 1);
      setSeconds(newDuration * 60);
      return newDuration;
    });
  }

  function resetTimer() {
    setIsRunning(false);
    setSeconds(duration * 60);
  }

  function toggleSound() {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    localStorage.setItem("study-mate-sound", String(nextVal));
  }

  function toggleAutoBreaks() {
    const nextVal = !autoBreaks;
    setAutoBreaks(nextVal);
    localStorage.setItem("study-mate-auto-breaks", String(nextVal));
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Celebration Toast */}
      {showCelebration && (
        <div className="fixed top-6 right-6 z-50 bg-white text-black px-6 py-3.5 rounded-2xl shadow-2xl font-bold text-sm flex items-center gap-3 border border-zinc-200 animate-bounce">
          <span className="text-xl">🎉</span>
          <div>
            <p className="leading-tight">
              {mode === "focus"
                ? "Session Complete! Focus block logged."
                : "Break finished! Ready for next session?"}
            </p>
            <p className="text-xs text-zinc-600 font-normal mt-0.5">
              Great work maintaining focus consistency.
            </p>
          </div>
        </div>
      )}

      {/* Main Studio Timer Card */}
      <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 lg:p-8 shadow-2xl transition-all">
        {/* Top Animated Laser Beam */}
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
          <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Ambient Hover Glow */}
        <div className="absolute -inset-16 bg-white/[0.02] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Card Top Utility Header */}
        <div className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
          {/* Status Badge */}
          <div className="tagline-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-xs font-medium text-zinc-400">
            <span
              className={`w-2 h-2 rounded-full ${
                isRunning ? "bg-green-500 animate-pulse" : "bg-zinc-600"
              }`}
            />
            <span>
              {isRunning
                ? `${modes[mode].shortLabel} in progress`
                : "Timer Ready"}
            </span>
          </div>

          {/* Quick Utility Toggles (Sound) */}
          <div className="flex items-center gap-2">
            {/* Sound Mute/Unmute */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? "Sound chime enabled" : "Sound chime muted"}
              aria-label="Toggle sound alerts"
              className="p-2.5 rounded-xl border transition-all timer-btn-deck"
            >
              {soundEnabled ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Studio Cockpit: Liquid Chamber & Control Suite */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
          
          {/* ================= COLUMN 1: THE LIQUID CHAMBER & HERO CONTROLS ================= */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center justify-center">
            {/* RISING WATER LIQUID CHAMBER */}
            <div className="timer-bezel relative w-72 h-72 sm:w-80 sm:h-80 xl:w-96 xl:h-96 aspect-square shrink-0 rounded-full p-2.5 sm:p-3 shadow-2xl border mx-auto select-none transition-all">
              {/* Hour marker notches */}
              <div className="absolute inset-0 rounded-full pointer-events-none">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-zinc-600 rounded-full" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-zinc-600 rounded-full" />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 h-0.5 w-2 bg-zinc-600 rounded-full" />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 h-0.5 w-2 bg-zinc-600 rounded-full" />
              </div>

              {/* Perimeter Progress Track */}
              <div
                className="absolute inset-2 sm:inset-2.5 rounded-full pointer-events-none transition-all duration-700"
                style={{
                  background: `conic-gradient(
                    var(--timer-progress, white) ${progress}%,
                    var(--timer-track, #27272a) ${progress}% 100%
                  )`,
                  maskImage: "radial-gradient(transparent 68%, black 70%)",
                  WebkitMaskImage: "radial-gradient(transparent 68%, black 70%)",
                }}
              />

              {/* Inner Water Sphere Vessel */}
              <div className="timer-vessel relative w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center border transition-colors duration-300">
                {/* Subtle glass refraction rim */}
                <div className="timer-refraction absolute inset-0 rounded-full pointer-events-none z-30" />

                {/* RISING WATER LIQUID COLUMN */}
                <div
                  className="absolute inset-x-0 bottom-0 transition-[height] duration-700 ease-out z-10 pointer-events-none"
                  style={{
                    height: `${progress}%`,
                    background: progress > 0 ? "var(--water-gradient)" : "transparent",
                  }}
                >
                  {/* Surface Wave Layer 1 (Back wave, mathematically periodic) */}
                  {progress > 0 && (
                    <div
                      className="absolute -top-5 left-0 w-[200%] h-8 pointer-events-none animate-water-wave-slow opacity-60"
                      style={{ fill: "var(--water-wave-back)" }}
                    >
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                      >
                        <path d="M 0 45 C 125 60 125 30 250 45 C 375 60 375 30 500 45 C 625 60 625 30 750 45 C 875 60 875 30 1000 45 L 1000 100 L 0 100 Z" />
                      </svg>
                    </div>
                  )}

                  {/* Surface Wave Layer 2 (Front wave, mathematically periodic) */}
                  {progress > 0 && (
                    <div
                      className="absolute -top-4 left-0 w-[200%] h-7 pointer-events-none animate-water-wave"
                      style={{ fill: "var(--water-wave-front)" }}
                    >
                      <svg
                        className="w-full h-full"
                        viewBox="0 0 1000 100"
                        preserveAspectRatio="none"
                      >
                        <path d="M 0 35 C 125 15 125 55 250 35 C 375 15 375 55 500 35 C 625 15 625 55 750 35 C 875 15 875 55 1000 35 L 1000 100 L 0 100 Z" />
                      </svg>
                    </div>
                  )}

                  {/* Surface Crest Glow Line */}
                  {progress > 0 && (
                    <div
                      className="absolute top-0 inset-x-0 h-0.5 pointer-events-none"
                      style={{
                        boxShadow: "var(--water-crest-glow)",
                        background: "var(--water-wave-front)",
                      }}
                    />
                  )}

                  {/* Rising Micro-Bubbles (active when running) */}
                  {isRunning && progress > 0 && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <span className="absolute bottom-2 left-1/4 w-1.5 h-1.5 rounded-full timer-bubble animate-bubble-1" />
                      <span className="absolute bottom-3 left-1/2 w-2 h-2 rounded-full timer-bubble animate-bubble-2" />
                      <span className="absolute bottom-1 left-3/4 w-1 h-1 rounded-full timer-bubble animate-bubble-3" />
                    </div>
                  )}
                </div>

                {/* Elevated Centerpiece (Spacious & Clean Time Display) */}
                <div className="relative z-20 flex flex-col items-center justify-center p-3 select-none pointer-events-none">
                  <div className="timer-center-capsule flex flex-col items-center justify-center px-6 py-3 rounded-3xl transition-all">
                    {/* Mode Tag */}
                    <div className="timer-badge-pill mb-1.5 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase">
                      {modes[mode].label}
                    </div>

                    {/* Main Digits (Hero Countdown Display) */}
                    <span
                      className="timer-digits text-6xl sm:text-7xl xl:text-8xl font-black tracking-tight tabular-nums block leading-none"
                      aria-live="polite"
                    >
                      {displayMinutes}:{displaySeconds}
                    </span>

                    {/* Liquid Status Indicator */}
                    <div className="timer-status-pill mt-2 flex items-center gap-2 px-3 py-1 rounded-full">
                      <span className="text-xs font-mono font-bold">
                        {progress}%
                      </span>
                      <span className="opacity-40 text-[10px]">•</span>
                      <span className="text-xs font-medium">
                        {isRunning ? "Liquid Rising" : "Chamber Ready"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Tactile Controls Deck */}
            <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              {/* Minus 1m Quick Adjust */}
              <button
                onClick={decreaseTime}
                disabled={isRunning || duration <= 1}
                title="Decrease duration by 1 minute"
                aria-label="Decrease time by 1 minute"
                className="h-11 sm:h-13 px-3.5 sm:px-4 rounded-2xl border timer-btn-deck hover:scale-105 active:scale-95 disabled:opacity-25 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all flex items-center gap-1 text-xs font-bold shadow-lg"
              >
                <span className="text-base sm:text-lg leading-none">−</span>
                <span>1m</span>
              </button>

              {/* Reset Button */}
              <button
                onClick={resetTimer}
                aria-label="Reset timer"
                title="Reset timer to duration start"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border timer-btn-deck hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg group/reset"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-500 group-hover/reset:-rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 1 0 2.34-5.66" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5" />
                </svg>
              </button>

              {/* Large Start / Pause Action Button */}
              <button
                onClick={() => setIsRunning((prev) => !prev)}
                aria-label={isRunning ? "Pause focus timer" : "Start focus timer"}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl timer-btn-play flex items-center justify-center hover:scale-105 active:scale-95 transition-all font-black group/play"
              >
                {isRunning ? (
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" rx="1.5" />
                    <rect x="14" y="5" width="4" height="14" rx="1.5" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 sm:w-9 sm:h-9 ml-0.5 sm:ml-1 transition-transform group-hover/play:scale-110" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Quick Skip / Complete Shortcut */}
              <button
                onClick={() => {
                  completeSession();
                  setIsRunning(false);
                  setSeconds(0);
                  if (soundEnabled) playChimeSound();
                  setShowCelebration(true);
                  setTimeout(() => setShowCelebration(false), 4500);
                }}
                aria-label="Finish session immediately"
                title="Mark session complete"
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl border timer-btn-deck hover:text-green-500 hover:border-green-500/50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center shadow-lg"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </button>

              {/* Plus 1m Quick Adjust */}
              <button
                onClick={increaseTime}
                disabled={isRunning || duration >= 120}
                title="Increase duration by 1 minute"
                aria-label="Increase time by 1 minute"
                className="h-11 sm:h-13 px-3.5 sm:px-4 rounded-2xl border timer-btn-deck hover:scale-105 active:scale-95 disabled:opacity-25 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all flex items-center gap-1 text-xs font-bold shadow-lg"
              >
                <span className="text-base sm:text-lg leading-none">+</span>
                <span>1m</span>
              </button>
            </div>

            <p className="text-xs text-zinc-500 font-medium tracking-wide mt-3 text-center">
              {isRunning ? "🌊 Water rising • Maintain focus" : "Tap play to start session"}
            </p>
          </div>

          {/* ================= COLUMN 2: STUDIO CONTROL SUITE ================= */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 pt-6 border-t lg:pt-0 lg:border-t-0 lg:pl-6 lg:border-l border-zinc-800/60">
            
            {/* Mode Selector Cards */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                Session Mode
              </span>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(modes).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => changeMode(key)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      mode === key
                        ? "timer-mode-btn-active shadow-lg scale-[1.01]"
                        : "timer-mode-btn-inactive"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold">{item.label}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Default {item.minutes} minutes
                      </p>
                    </div>
                    {mode === key && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Duration Presets for Active Mode */}
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Duration Presets
                </span>
                <span className="text-xs font-mono font-bold text-zinc-300">
                  {duration}m selected
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {modes[mode].presets.map((presetMin) => (
                  <button
                    key={presetMin}
                    onClick={() => setPreset(presetMin)}
                    disabled={isRunning}
                    className={`py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      duration === presetMin
                        ? "timer-preset-active shadow-md scale-105"
                        : "timer-preset-inactive border"
                    }`}
                  >
                    {presetMin}m
                  </button>
                ))}
              </div>
            </div>

            {/* Focus Settings & Toggles */}
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-4 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                Focus Settings
              </span>
              
              {/* Sound chime */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-zinc-200">Completion Chime</p>
                  <p className="text-[11px] text-zinc-500">Audio chime when session ends</p>
                </div>
                <button
                  onClick={toggleSound}
                  role="switch"
                  aria-checked={soundEnabled}
                  className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                    soundEnabled ? "bg-white" : "bg-zinc-800"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full transition-transform ${
                      soundEnabled ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-400"
                    }`}
                  />
                </button>
              </div>

              {/* Auto-start breaks */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60">
                <div>
                  <p className="text-xs font-semibold text-zinc-200">Auto-Start Breaks</p>
                  <p className="text-[11px] text-zinc-500">Automatically begin rest period</p>
                </div>
                <button
                  onClick={toggleAutoBreaks}
                  role="switch"
                  aria-checked={autoBreaks}
                  className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                    autoBreaks ? "bg-white" : "bg-zinc-800"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full transition-transform ${
                      autoBreaks ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-400"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ================= STATS CARDS ROW ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-800/60">
          {/* Completed Sessions */}
          <div className="study-card group relative overflow-hidden bg-zinc-950 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                  Completed Sessions
                </p>
                <p className="text-2xl font-bold mt-1 text-white">{sessions}</p>
                <p className="text-xs text-green-400 mt-0.5">✓ Logged focus blocks</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-green-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8 12 2.5 2.5L16 9" />
                </svg>
              </div>
            </div>
          </div>

          {/* Current Duration */}
          <div className="study-card group relative overflow-hidden bg-zinc-950 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                  Session Length
                </p>
                <p className="text-2xl font-bold mt-1 text-white">{duration}m</p>
                <p className="text-xs text-zinc-500 mt-0.5">{modes[mode].label}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Liquid Water Progress */}
          <div className="study-card group relative overflow-hidden bg-zinc-950 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                  Chamber Volume
                </p>
                <p className="text-2xl font-bold mt-1 font-mono text-white">{progress}%</p>
                <p className="text-xs text-blue-400 mt-0.5">🌊 Rising liquid level</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400 text-base">
                💧
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;