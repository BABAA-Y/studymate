function ScheduleCard({ session, onDelete }) {
  const isToday =
    session.date === new Date().toLocaleDateString("en-CA");

  return (
    <div
      className={`study-card group relative overflow-hidden bg-zinc-900 border rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl ${
        isToday
          ? "border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.08)]"
          : "border-zinc-800 hover:border-zinc-700"
      }`}
    >
      {/* Laser Scan Beam */}
      <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
        <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Diagonal Sheen Sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
      </div>

      {/* Today indicator accent bar */}
      {isToday && (
        <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
      )}

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Left */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Time block */}
          <div className="w-16 h-16 shrink-0 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-zinc-700 shadow-inner">
            <span className="text-sm font-bold font-mono text-white">
              {session.startTime}
            </span>

            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">
              Start
            </span>
          </div>

          {/* Session info */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="font-semibold text-lg truncate text-white">
                {session.title}
              </h3>

              {isToday && (
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Today
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {session.subject && (
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-zinc-400 font-medium">
                  {session.subject}
                </span>
              )}

              {session.subject && (
                <span className="text-zinc-600">
                  •
                </span>
              )}

              <span className="text-xs text-zinc-500 font-mono">
                {session.date}
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Time range */}
          <div className="hidden sm:block text-right">
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
              Duration
            </p>

            <p className="text-sm font-semibold font-mono mt-1 text-white">
              {session.startTime} — {session.endTime}
            </p>
          </div>

          {/* Delete */}
          <button
            onClick={() => onDelete(session.id)}
            aria-label="Delete study session"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent hover:scale-110 active:scale-95 transition-all duration-200"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;