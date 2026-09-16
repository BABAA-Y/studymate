function TaskCard({ task, onToggle, onDelete }) {
  const isCompleted = task.completed;

  const priorityStyle =
    task.priority === "High"
      ? "bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400"
      : task.priority === "Medium"
      ? "bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400"
      : "bg-zinc-200/60 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400";

  return (
    <div
      className={`study-card group relative overflow-hidden bg-zinc-900 border rounded-2xl p-5 hover:-translate-y-0.5 transition-all duration-300 shadow-sm hover:shadow-xl ${
        isCompleted
          ? "border-green-500/30 bg-green-500/[0.02]"
          : "border-zinc-800 hover:border-zinc-700"
      }`}
    >
      {/* Moving hover light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
      </div>

      {/* Top animated line */}
      <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
        <div className="w-1/4 h-full bg-white/70 -translate-x-full group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Soft glow */}
      <div className="absolute -inset-10 bg-white/[0.02] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Completed indicator */}
      <div
        className={`absolute left-0 top-5 bottom-5 w-1 rounded-r-full transition-all duration-500 ${
          isCompleted
            ? "bg-green-500 opacity-100 scale-y-100"
            : "bg-transparent opacity-0 scale-y-50"
        }`}
      />

      <div className="relative z-10 flex items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-4 min-w-0">

          {/* Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            aria-label={
              isCompleted
                ? "Mark task incomplete"
                : "Mark task complete"
            }
            className={`relative w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              isCompleted
                ? "bg-green-500 border-green-500 text-black scale-105"
                : "border-zinc-600 text-transparent hover:border-white hover:scale-110"
            }`}
          >
            {/* Checkbox pulse */}
            {isCompleted && (
              <span className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-30" />
            )}

            {isCompleted && (
              <svg
                className="relative w-3.5 h-3.5 animate-[checkPop_0.35s_ease-out]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12l4 4L19 6"
                />
              </svg>
            )}
          </button>

          {/* Task information */}
          <div className="min-w-0">

            <h3
              className={`font-semibold truncate transition-all duration-300 ${
                isCompleted
                  ? "line-through text-gray-600"
                  : "text-white group-hover:translate-x-1"
              }`}
            >
              {task.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-2 transition-all duration-300">
              {task.subject && (
                <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  {task.subject}
                </span>
              )}

              {task.dueDate && (
                <>
                  <span className="text-gray-700">
                    •
                  </span>

                  <span className="text-xs text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                    Due {task.dueDate}
                  </span>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">

          {/* Priority */}
          <span
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 group-hover:scale-105 ${priorityStyle}`}
          >
            {task.priority}
          </span>

          {/* Delete */}
          <button
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
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
      </div>
    </div>
  );
}

export default TaskCard;