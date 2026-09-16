import { useState } from "react";
import SubjectCard from "../components/subjectcard";
import { useStudy } from "../context/studycontext";

function Subjects() {
  const {
    subjects,
    addSubject,
    deleteSubject,
    tasks,
  } = useStudy();

  const [newSubject, setNewSubject] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!newSubject.trim()) return;

    addSubject(newSubject.trim());
    setNewSubject("");
  }

  function handleDelete(id) {
    deleteSubject(id);
  }

  // Calculate real progress from tasks
  const subjectStats = subjects.map((subject) => {
    const subjectTasks = tasks.filter(
      (task) =>
        task.subject?.toLowerCase() === subject.name.toLowerCase()
    );

    const completed = subjectTasks.filter(
      (task) => task.completed
    ).length;

    const total = subjectTasks.length;

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

  const totalSubjects = subjects.length;

  const totalTasks = subjectStats.reduce(
    (sum, subject) => sum + subject.total,
    0
  );

  const completedTasks = subjectStats.reduce(
    (sum, subject) => sum + subject.completed,
    0
  );

  const overallProgress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 relative z-10">
        <div>
          <div className="tagline-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 mb-3 backdrop-blur-sm shadow-sm transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Curriculum Workspace • {totalSubjects} subjects enrolled</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Subjects
          </h2>

          {/* Sliding Laser Accent */}
          <div className="mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
            <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
          </div>

          <p className="mt-3 text-zinc-400 text-base max-w-xl">
            Track your subjects, monitor task completion, and gauge mastery across each discipline.
          </p>
        </div>

        {/* Overall Progress Card */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4.5 min-w-[210px] shadow-lg transition-all">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Overall Progress
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
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 relative z-10">
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                Subjects
              </p>
              <p className="text-3xl font-bold mt-1 text-white">
                {totalSubjects}
              </p>
              <p className="text-xs text-zinc-500 mt-1">Active disciplines</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

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
                {totalTasks}
              </p>
              <p className="text-xs text-zinc-500 mt-1">Across all subjects</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path strokeLinecap="round" d="M8 8h8M8 12h8M8 16h5" />
              </svg>
            </div>
          </div>
        </div>

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
              <p className="text-xs text-green-400 mt-1">✓ Accomplished goals</p>
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

      {/* Add Subject Form */}
      <form
        onSubmit={handleSubmit}
        className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-7 mt-7 shadow-xl transition-all"
      >
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
          <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center transition-transform group-hover:rotate-6">
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
            <h3 className="font-semibold text-lg">
              Add a subject
            </h3>

            <p className="text-xs text-zinc-500">
              Create a subject module to group tasks, notes, and milestones.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter subject name (e.g. Mathematics, Machine Learning)..."
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-zinc-600 focus:border-zinc-500 transition"
          />

          <button
            type="submit"
            className="px-7 py-3.5 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <span className="text-lg font-bold">+</span>
            <span>Add Subject</span>
          </button>
        </div>
      </form>

      {/* Subjects List */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold">
              Your Subjects
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              Keep track of your learning progress across modules.
            </p>
          </div>

          <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
            {subjects.length} total
          </span>
        </div>

        {subjects.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-3xl p-12 text-center bg-zinc-900/40 backdrop-blur-sm">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center float-animation shadow-lg">
              <svg
                className="w-6 h-6 text-zinc-500"
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

            <h3 className="font-semibold text-lg mt-4">
              No subjects yet
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Add your first subject above to organize your learning curriculum.
            </p>
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {subjectStats.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onDelete={handleDelete}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Subjects;