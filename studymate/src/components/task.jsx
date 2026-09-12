import { useState } from "react";
import TaskCard from "./taskcard";
import { useStudy } from "../context/studycontext";

function Tasks() {
  const { tasks, addTask, toggleTask, deleteTask } = useStudy();

  const [newTask, setNewTask] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newTask.trim()) return;

    addTask({
      title: newTask.trim(),
      subject: subject.trim(),
      priority,
      dueDate,
    });

    setNewTask("");
    setSubject("");
    setPriority("Medium");
    setDueDate("");
  }

  function handleDelete(id) {
    deleteTask(id);
  }

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 relative z-10">
        <div>
          <div className="tagline-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 mb-3 backdrop-blur-sm shadow-sm transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Workspace Active • {completedTasks} of {tasks.length} tasks completed</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Tasks
          </h2>

          {/* Sliding Laser Accent */}
          <div className="mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
            <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
          </div>

          <p className="mt-3 text-zinc-400 text-base max-w-xl">
            Organize your work, prioritize study sessions, and stay on top of your deadlines.
          </p>
        </div>

        {/* Completion Progress Card */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4.5 min-w-[210px] shadow-lg transition-all">
          {/* Laser scan line */}
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          {/* Diagonal sheen sweep */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Completion
            </span>

            <span className="font-mono font-bold text-lg">
              {progress}%
            </span>
          </div>

          <div className="relative z-10 w-full h-2 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                progress === 100
                  ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
                  : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 relative z-10">
        {/* Total */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                Total Tasks
              </p>
              <p className="text-3xl font-bold mt-1 text-white">
                {tasks.length}
              </p>
              <p className="text-xs text-zinc-500 mt-1">All workspace items</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path strokeLinecap="round" d="M8 8h8M8 12h8M8 16h5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                Pending
              </p>
              <p className="text-3xl font-bold mt-1 text-white">
                {pendingTasks}
              </p>
              <p className="text-xs text-amber-500 mt-1">⏳ Awaiting completion</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-amber-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 7v5l3 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                Completed
              </p>
              <p className="text-3xl font-bold mt-1 text-white">
                {completedTasks}
              </p>
              <p className="text-xs text-green-400 mt-1">✓ Logged accomplished</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-green-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m8 12 2.5 2.5L16 9" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ADD TASK FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-7 mt-7 shadow-xl transition-all"
      >
        {/* Top animated laser */}
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
          <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                d="M12 5v14M5 12h14"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-semibold">
              Create a task
            </h3>

            <p className="text-xs text-gray-600">
              Add something you want to accomplish.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Task */}
          <input
            type="text"
            placeholder="What do you need to do?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="md:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-gray-700 focus:border-zinc-600 transition"
          />

          {/* Subject */}
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-gray-700 focus:border-zinc-600 transition"
          />

          {/* Priority */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white focus:border-zinc-600 transition"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          {/* Due Date */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white focus:border-zinc-600 transition"
          />

          {/* Add Button */}
          <button
            type="submit"
            className="bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 h-12"
          >
            <span className="text-lg font-bold">+</span>
            <span>Add Task</span>
          </button>

        </div>
      </form>

      {/* ================= TASK LIST ================= */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold">
              Your Tasks
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              {pendingTasks} tasks waiting for you
            </p>
          </div>

          <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
            {tasks.length} total
          </span>
        </div>

        {tasks.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-3xl p-12 text-center bg-zinc-900/40 backdrop-blur-sm">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center float-animation shadow-lg">
              <svg
                className="w-6 h-6 text-zinc-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
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

            <h3 className="font-semibold text-lg mt-4">
              No tasks yet
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Create your first task above to kickstart your study session.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default Tasks;