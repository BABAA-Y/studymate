import Timer from "../components/timer";

function TimerPage() {
  return (
    <div className="max-w-6xl mx-auto pt-4 pb-12 relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 mb-2.5 backdrop-blur-sm tagline-badge">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Pomodoro & Focus Session</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Study Timer
        </h1>

        <div className="mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
          <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
        </div>

        <p className="mt-3 text-zinc-400 max-w-xl text-base">
          Fill your focus chamber as you study. Stay consistent, take structured breaks, and build deep momentum.
        </p>
      </div>

      <Timer />
    </div>
  );
}

export default TimerPage;