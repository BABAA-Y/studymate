import { useState } from "react";
import { Link } from "react-router-dom";
import { useStudy } from "../context/studycontext";

function Dashboard() {
  const {
    tasks,
    notes,
    subjects,
    schedule,
    sessions,
    toggleTask,
  } = useStudy();

  const [userName] = useState(
    () => localStorage.getItem("study-mate-username") || "Student"
  );

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  const upcomingTasks = tasks
    .filter((task) => !task.completed)
    .slice(0, 4);

  const upcomingSchedule = [...schedule]
    .sort((a, b) => {
      const first = `${a.date} ${a.startTime}`;
      const second = `${b.date} ${b.startTime}`;
      return first.localeCompare(second);
    })
    .slice(0, 4);

  const subjectStats = subjects.map((subject) => {
    const subjectTasks = tasks.filter(
      (task) =>
        task.subject?.toLowerCase() === subject.name.toLowerCase()
    );
    const completed = subjectTasks.filter((task) => task.completed).length;
    const total = subjectTasks.length;
    const subjectProgress =
      total === 0 ? 0 : Math.round((completed / total) * 100);

    return {
      ...subject,
      total,
      completed,
      progress: subjectProgress,
    };
  });

  return (
    <div className="max-w-7xl mx-auto pb-16 relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* ================= HEADER SECTION ================= */}
      <section className="relative mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            {/* Live Status Pill */}
            <div className="tagline-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 mb-3 backdrop-blur-sm shadow-sm transition-colors">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Workspace Active • {completedTasks} of {tasks.length} tasks completed</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {greeting}, {userName} 👋
            </h1>

            {/* Sliding Laser Accent */}
            <div className="mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
              <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
            </div>

            <p className="mt-3 text-zinc-400 text-base max-w-2xl leading-relaxed">
              Track your daily progress, manage upcoming deadlines, and keep your focus on track.
            </p>
          </div>

          <Link
            to="/tasks"
            className="group relative overflow-hidden bg-white text-black px-6 py-3.5 rounded-2xl font-semibold hover:bg-zinc-200 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2.5 w-fit shrink-0"
          >
            <span className="text-lg font-bold transition-transform duration-300 group-hover:rotate-90">
              +
            </span>
            <span>Add New Task</span>
          </Link>
        </div>
      </section>

      {/* ================= STATS COUNTERS GRID ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {/* Stat 1: Total Tasks */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute -inset-10 bg-white/[0.025] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Total Tasks
            </span>
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:scale-110 group-hover:border-zinc-700 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 mt-3">
            <p className="text-3xl md:text-4xl font-bold tracking-tight">
              {tasks.length}
            </p>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {pendingTasks} pending completion
            </p>
          </div>
        </div>

        {/* Stat 2: Completed Tasks */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute -inset-10 bg-white/[0.025] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Completed
            </span>
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-green-400 group-hover:scale-110 group-hover:border-zinc-700 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m8 12 2.5 2.5L16 9" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 mt-3">
            <p className="text-3xl md:text-4xl font-bold tracking-tight">
              {completedTasks}
            </p>
            <p className="text-xs text-green-400 mt-1 flex items-center gap-1.5 font-medium">
              <span>✓</span>
              {progress}% completion rate
            </p>
          </div>
        </div>

        {/* Stat 3: Saved Notes */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute -inset-10 bg-white/[0.025] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Saved Notes
            </span>
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:scale-110 group-hover:border-zinc-700 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 mt-3">
            <p className="text-3xl md:text-4xl font-bold tracking-tight">
              {notes.length}
            </p>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
              <span>📝</span>
              Knowledge archive
            </p>
          </div>
        </div>

        {/* Stat 4: Study Sessions */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute -inset-10 bg-white/[0.025] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
              Study Sessions
            </span>
            <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:border-zinc-700 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 mt-3">
            <p className="text-3xl md:text-4xl font-bold tracking-tight">
              {sessions}
            </p>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
              <span>🔥</span>
              Focus blocks logged
            </p>
          </div>
        </div>
      </section>

      {/* ================= MAIN PROGRESS & SUBJECTS GRID ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-7">
        {/* Progress Card (Spans 2 columns) */}
        <div className="lg:col-span-2 group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute -inset-16 bg-white/[0.025] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                  Analytics & Output
                </p>
                <h2 className="text-2xl font-bold mt-1">Task Completion</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Real-time synchronization across your study workload.
                </p>
              </div>

              <div className="text-right">
                <span className="text-4xl font-extrabold tracking-tight">
                  {progress}%
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">Overall Goal</p>
              </div>
            </div>

            {/* Large Progress Bar with Head Indicator */}
            <div className="mt-8 relative">
              <div className="h-3.5 bg-zinc-950 border border-zinc-800/80 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    progress === 100 ? "bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]" : "bg-white"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center mt-3 text-xs text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {completedTasks} completed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-600" />
                  {pendingTasks} remaining
                </span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-800/80">
            <Link
              to="/progress"
              className="group/link flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/60 transition-all duration-300"
            >
              <div>
                <p className="text-xs text-zinc-500">Deep Insights</p>
                <p className="text-sm font-semibold mt-0.5">Detailed Analytics</p>
              </div>
              <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:border-zinc-700 transition-all">
                →
              </span>
            </Link>

            <Link
              to="/timer"
              className="group/link flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/60 transition-all duration-300"
            >
              <div>
                <p className="text-xs text-zinc-500">Pomodoro Focus</p>
                <p className="text-sm font-semibold mt-0.5">Start Study Timer</p>
              </div>
              <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:border-zinc-700 transition-all">
                ⏱️
              </span>
            </Link>
          </div>
        </div>

        {/* Subjects Card */}
        <div className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute -inset-16 bg-white/[0.025] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                  Curriculum
                </p>
                <h2 className="text-xl font-bold mt-1">Subjects</h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400">
                {subjects.length} Total
              </span>
            </div>

            {/* Subject List */}
            <div className="mt-6 space-y-3">
              {subjectStats.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-2xl p-6 text-center">
                  <p className="text-zinc-500 text-xs">No subjects added yet.</p>
                  <Link
                    to="/subjects"
                    className="inline-block mt-3 text-xs text-white font-medium hover:underline"
                  >
                    + Add your first subject
                  </Link>
                </div>
              ) : (
                subjectStats.slice(0, 4).map((subject) => (
                  <div
                    key={subject.id}
                    className="group/sub bg-zinc-950 border border-zinc-800/90 rounded-xl p-3.5 hover:border-zinc-700 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate group-hover/sub:text-white transition-colors">
                          {subject.name}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          {subject.completed} of {subject.total} tasks
                        </p>
                      </div>
                      <span className="text-xs font-bold text-zinc-300 shrink-0 font-mono">
                        {subject.progress}%
                      </span>
                    </div>

                    <div className="h-1.5 bg-zinc-900 rounded-full mt-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          subject.progress === 100 ? "bg-green-500" : "bg-white"
                        }`}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            to="/subjects"
            className="group/all inline-flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-white font-medium mt-6 pt-4 border-t border-zinc-800/80 transition-all"
          >
            <span>Manage all subjects</span>
            <span className="transition-transform duration-200 group-hover/all:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* ================= UP NEXT & SCHEDULE SECTION ================= */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
        {/* Up Next Tasks */}
        <div className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute -inset-16 bg-white/[0.025] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                  Queue
                </p>
                <h2 className="text-xl font-bold mt-1">Up Next Tasks</h2>
              </div>
              <Link
                to="/tasks"
                className="group/link text-xs text-zinc-400 hover:text-white transition flex items-center gap-1"
              >
                <span>View all</span>
                <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingTasks.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-2xl p-8 text-center">
                  <div className="text-2xl mb-2">🎉</div>
                  <p className="text-sm font-semibold text-zinc-300">All caught up!</p>
                  <p className="text-xs text-zinc-500 mt-1">No pending tasks on your plate.</p>
                  <Link
                    to="/tasks"
                    className="inline-block mt-4 text-xs font-semibold px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition"
                  >
                    + Create Task
                  </Link>
                </div>
              ) : (
                upcomingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group/task flex items-center justify-between gap-3 bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Interactive check toggle */}
                      <button
                        onClick={() => toggleTask(task.id)}
                        aria-label="Complete task"
                        className="w-5 h-5 rounded-full border border-zinc-600 flex items-center justify-center hover:border-white hover:scale-110 active:scale-90 transition shrink-0 text-transparent hover:text-white"
                      >
                        ✓
                      </button>

                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate group-hover/task:text-white transition-colors">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-zinc-500">
                          <span>{task.subject || "General"}</span>
                          {task.dueDate && (
                            <>
                              <span>•</span>
                              <span>Due {task.dueDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full ${
                        task.priority === "High"
                          ? "bg-white text-black font-semibold"
                          : task.priority === "Medium"
                          ? "bg-zinc-800 text-zinc-300"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-500"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute -inset-16 bg-white/[0.025] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                  Timetable
                </p>
                <h2 className="text-xl font-bold mt-1">Upcoming Sessions</h2>
              </div>
              <Link
                to="/schedule"
                className="group/link text-xs text-zinc-400 hover:text-white transition flex items-center gap-1"
              >
                <span>View all</span>
                <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingSchedule.length === 0 ? (
                <div className="border border-dashed border-zinc-800 rounded-2xl p-8 text-center">
                  <div className="text-2xl mb-2">📅</div>
                  <p className="text-sm font-semibold text-zinc-300">No scheduled sessions</p>
                  <p className="text-xs text-zinc-500 mt-1">Plan your study blocks ahead of time.</p>
                  <Link
                    to="/schedule"
                    className="inline-block mt-4 text-xs font-semibold px-4 py-2 rounded-xl bg-white text-black hover:bg-zinc-200 transition"
                  >
                    + Plan Session
                  </Link>
                </div>
              ) : (
                upcomingSchedule.map((item) => (
                  <div
                    key={item.id}
                    className="group/sched flex items-center justify-between gap-4 bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover/sched:scale-110 group-hover/sched:text-white transition-all shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate group-hover/sched:text-white transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {item.subject || "Study Session"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold font-mono text-zinc-300 block">
                        {item.startTime}
                      </span>
                      <span className="text-[11px] text-zinc-500">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ACTIONS DOCK ================= */}
      <section>
        <div className="mb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
            Shortcuts
          </p>
          <h2 className="text-lg font-bold mt-1">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {[
            {
              title: "Add Task",
              sub: "New study todo",
              link: "/tasks",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              ),
            },
            {
              title: "Create Note",
              sub: "Capture notes",
              link: "/notes",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ),
            },
            {
              title: "Plan Session",
              sub: "Schedule blocks",
              link: "/schedule",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              ),
            },
            {
              title: "Focus Timer",
              sub: "Pomodoro session",
              link: "/timer",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                </svg>
              ),
            },
          ].map((act) => (
            <Link
              key={act.title}
              to={act.link}
              className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-4.5 hover:border-zinc-600 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
                <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:scale-110 group-hover:border-zinc-700 transition-all">
                  {act.icon}
                </div>
                <span className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 transition-all text-sm">
                  ↗
                </span>
              </div>

              <div>
                <p className="font-semibold text-sm group-hover:text-white transition-colors">
                  {act.title}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">{act.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;