function SubjectCard({ subject, onDelete }) {
  const progress = subject.progress || 0;

  return (
    <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:-translate-y-1 hover:border-zinc-700 transition-all duration-300 shadow-sm hover:shadow-xl">
      {/* Top animated laser beam */}
      <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
        <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Diagonal sheen sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
      </div>

      {/* Top Section */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {/* Subject icon */}
          <div className="w-12 h-12 shrink-0 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-700 transition-transform group-hover:scale-105 shadow-sm">
            <svg
              className="w-5 h-5 text-zinc-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5h16M4 10h16M4 15h10"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-lg truncate text-white group-hover:translate-x-0.5 transition-transform duration-300">
              {subject.name}
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              {subject.total}{" "}
              {subject.total === 1 ? "task" : "tasks"}
            </p>
          </div>
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(subject.id)}
          aria-label={`Delete ${subject.name}`}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-500/10 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6"
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

      {/* Progress */}
      <div className="relative z-10 mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
            Progress
          </span>

          <span className="text-sm font-bold font-mono">
            {progress}%
          </span>
        </div>

        <div className="w-full h-2 bg-zinc-950 border border-zinc-800/40 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              progress === 100
                ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom stats */}
      <div className="relative z-10 flex items-center gap-6 mt-5 pt-4 border-t border-zinc-800/80">
        <div>
          <p className="text-xs text-zinc-500">
            Completed
          </p>

          <p className="font-bold text-white mt-1">
            {subject.completed}
          </p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            Remaining
          </p>

          <p className="font-bold text-white mt-1">
            {Math.max(subject.total - subject.completed, 0)}
          </p>
        </div>

        {progress === 100 && (
          <div className="ml-auto flex items-center gap-1.5 text-green-500 text-xs font-bold bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/20 animate-[checkPop_0.35s_ease-out]">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12l4 4L19 6"
              />
            </svg>
            Complete
          </div>
        )}
      </div>
    </div>
  );
}

export default SubjectCard;