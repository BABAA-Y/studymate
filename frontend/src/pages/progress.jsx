import { useStudy } from "../context/studycontext";

function Progress() {
  const {
    tasks,
    subjects,
    sessions,
  } = useStudy();

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const taskProgress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks / tasks.length) * 100
        );

  // Calculate subject progress from real tasks
  const subjectStats = subjects.map((subject) => {
    const subjectTasks = tasks.filter(
      (task) =>
        task.subject?.toLowerCase() ===
        subject.name.toLowerCase()
    );

    const total = subjectTasks.length;

    const completed = subjectTasks.filter(
      (task) => task.completed
    ).length;

    const progress =
      total === 0
        ? 0
        : Math.round((completed / total) * 100);

    return {
      ...subject,
      total,
      completed,
      progress,
    };
  });

  const overallProgress = taskProgress;

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 relative z-10">
        <div>
          <div className="tagline-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 mb-3 backdrop-blur-sm shadow-sm transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Analytics • Real-Time Mastery Tracking</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Progress
          </h2>

          {/* Sliding Laser Accent */}
          <div className="mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
            <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
          </div>

          <p className="mt-3 text-zinc-400 text-base max-w-xl">
            See how consistently you're moving toward your study goals.
          </p>
        </div>

        {/* Main percentage */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4.5 min-w-[210px] shadow-lg transition-all">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Overall
            </span>

            <span className="font-mono font-bold text-lg">
              {overallProgress}%
            </span>
          </div>

          <div className="relative z-10 w-full h-2 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                overallProgress === 100
                  ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                  : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              }`}
              style={{
                width: `${overallProgress}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 relative z-10">
        {/* Total Tasks */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Total Tasks
              </p>

              <p className="text-3xl font-bold mt-2 font-mono">
                {tasks.length}
              </p>

              <p className="text-xs text-zinc-500 mt-1">Recorded tasks</p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-transform group-hover:scale-110">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect
                  x="4"
                  y="3"
                  width="16"
                  height="18"
                  rx="2"
                />
                <path
                  strokeLinecap="round"
                  d="M8 8h8M8 12h5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Completed
              </p>

              <p className="text-3xl font-bold mt-2 font-mono text-green-400">
                {completedTasks}
              </p>

              <p className="text-xs text-green-400 mt-1">✓ Accomplished</p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-green-400 transition-transform group-hover:scale-110">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8 12 2.5 2.5L16 9"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Pending
              </p>

              <p className="text-3xl font-bold mt-2 font-mono text-amber-400">
                {pendingTasks}
              </p>

              <p className="text-xs text-amber-400 mt-1">● In queue</p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400 transition-transform group-hover:scale-110">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />
                <path
                  strokeLinecap="round"
                  d="M12 7v5l3 2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Study Sessions
              </p>

              <p className="text-3xl font-bold mt-2 font-mono text-blue-400">
                {sessions}
              </p>

              <p className="text-xs text-blue-400 mt-1">⚡ Focus rounds</p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400 transition-transform group-hover:scale-110">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />
                <path
                  strokeLinecap="round"
                  d="M12 7v5l3 2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Progress Hero Card */}
      <div className="mt-8 study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
          <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
          {/* Circle */}
          <div className="relative w-44 h-44 shrink-0 mx-auto md:mx-0 group/circle">
            <div
              className="absolute inset-0 rounded-full transition-all duration-1000 shadow-inner"
              style={{
                background: `conic-gradient(
                  ${
                    overallProgress === 100
                      ? "#22c55e"
                      : "var(--timer-progress, white)"
                  } ${overallProgress}%,
                  var(--timer-track, #27272a) ${overallProgress}% 100%
                )`,
              }}
            />

            <div className="absolute inset-[8px] rounded-full bg-zinc-950 flex flex-col items-center justify-center transition-all group-hover/circle:scale-[0.98]">
              <span className="text-4xl font-bold font-mono tracking-tight">
                {overallProgress}%
              </span>

              <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">
                Complete
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">
              Your study journey
            </p>

            <h3 className="text-2xl font-bold mt-2 tracking-tight">
              {overallProgress === 100
                ? "Everything is complete!"
                : overallProgress >= 75
                ? "You're almost there!"
                : overallProgress >= 50
                ? "Great progress so far!"
                : overallProgress > 0
                ? "Keep building momentum."
                : "Your journey starts here."}
            </h3>

            <p className="text-zinc-400 mt-2 max-w-xl text-sm leading-relaxed">
              You've completed <span className="font-semibold text-white">{completedTasks}</span> out of{" "}
              <span className="font-semibold text-white">{tasks.length}</span> tasks. Keep completing your
              tasks and using the study timer to build consistent progress.
            </p>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-zinc-500 font-medium">
                  Task completion
                </span>

                <span className="font-mono text-zinc-400 font-semibold">
                  {completedTasks}/{tasks.length}
                </span>
              </div>

              <div className="h-2.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/50">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    overallProgress === 100
                      ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                      : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                  }`}
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="mt-9 relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              Subject Breakdown
            </h3>

            <p className="text-xs text-zinc-500 mt-1">
              Your progress across individual subjects.
            </p>
          </div>

          <span className="text-xs font-mono font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            {subjectStats.length} {subjectStats.length === 1 ? "Subject" : "Subjects"}
          </span>
        </div>

        {subjectStats.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-zinc-900/40">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center float-animation">
              <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="font-semibold text-zinc-300 mt-4">No subjects available yet</h4>
            <p className="text-zinc-500 text-sm mt-1">
              Add subjects in the Subjects tab to track curriculum mastery.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjectStats.map((subject) => (
              <div
                key={subject.id}
                className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
                  <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
                </div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-300 group-hover:scale-110 group-hover:border-zinc-700 transition-all shrink-0">
                      {subject.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-semibold truncate text-white">
                        {subject.name}
                      </h4>

                      <p className="text-xs text-zinc-500 mt-0.5">
                        {subject.completed} of {subject.total} tasks completed
                      </p>
                    </div>
                  </div>

                  <span className="text-lg font-bold font-mono ml-4 shrink-0">
                    {subject.progress}%
                  </span>
                </div>

                <div className="relative z-10 w-full h-2 bg-zinc-950 rounded-full mt-5 overflow-hidden border border-zinc-800/40">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      subject.progress === 100
                        ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                        : "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    }`}
                    style={{
                      width: `${subject.progress}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 relative z-10">
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
            Subjects
          </p>

          <p className="text-3xl font-bold mt-2 font-mono">
            {subjects.length}
          </p>

          <p className="text-xs text-zinc-500 mt-2">
            Active curriculum modules
          </p>
        </div>

        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
            Completion Rate
          </p>

          <p className="text-3xl font-bold mt-2 font-mono">
            {taskProgress}%
          </p>

          <p className="text-xs text-zinc-500 mt-2">
            Based on completed tasks
          </p>
        </div>

        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
            Focus Sessions
          </p>

          <p className="text-3xl font-bold mt-2 font-mono">
            {sessions}
          </p>

          <p className="text-xs text-zinc-500 mt-2">
            Completed with the timer
          </p>
        </div>
      </div>
    </div>
  );
}

export default Progress;