import { useState } from "react";
import ScheduleCard from "../components/schedulecard";
import { useStudy } from "../context/studycontext";

function Schedule() {
  const { schedule, addSchedule, deleteSchedule } = useStudy();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !date || !startTime || !endTime) return;

    addSchedule({
      title: title.trim(),
      subject: subject.trim(),
      date,
      startTime,
      endTime,
    });

    setTitle("");
    setSubject("");
    setDate("");
    setStartTime("");
    setEndTime("");
  }

  function handleDelete(id) {
    deleteSchedule(id);
  }

  // Sort schedule by date and time
  const sortedSchedule = [...schedule].sort((a, b) => {
    const first = `${a.date} ${a.startTime}`;
    const second = `${b.date} ${b.startTime}`;

    return first.localeCompare(second);
  });

  const today = new Date().toLocaleDateString("en-CA");

  const todaySessions = schedule.filter(
    (item) => item.date === today
  ).length;

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 relative z-10">
        <div>
          <div className="tagline-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 mb-3 backdrop-blur-sm shadow-sm transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Planner • Structured Study Timetable</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Schedule
          </h2>

          {/* Sliding Laser Accent */}
          <div className="mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
            <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
          </div>

          <p className="mt-3 text-zinc-400 text-base max-w-xl">
            Plan your study sessions, stay consistent, and allocate dedicated focus blocks.
          </p>
        </div>

        {/* Schedule count */}
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4.5 min-w-[210px] shadow-lg transition-all">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Today's Sessions
            </span>

            <span className="font-mono font-bold text-lg">
              {todaySessions}
            </span>
          </div>

          <div className="relative z-10 w-full h-2 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              style={{
                width: `${Math.min(todaySessions * 25, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 relative z-10">
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                Total Sessions
              </p>
              <p className="text-3xl font-bold mt-1 font-mono text-white">
                {schedule.length}
              </p>
              <p className="text-xs text-zinc-500 mt-1">Scheduled blocks</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path strokeLinecap="round" d="M8 2v4M16 2v4M3 9h18" />
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
                Today
              </p>
              <p className="text-3xl font-bold mt-1 font-mono text-green-400">
                {todaySessions}
              </p>
              <p className="text-xs text-green-400 mt-1">✓ On today's agenda</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-green-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m8 12 2.5 2.5L16 9" />
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
                Planned
              </p>
              <p className="text-3xl font-bold mt-1 font-mono text-blue-400">
                {schedule.length - todaySessions}
              </p>
              <p className="text-xs text-blue-400 mt-1">Upcoming future blocks</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-blue-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path strokeLinecap="round" d="M12 7v5l3 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Add Schedule */}
      <form
        onSubmit={handleSubmit}
        className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-7 mt-8 shadow-xl transition-all relative z-10"
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
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Plan a study session
            </h3>

            <p className="text-xs text-zinc-500">
              Add a focused session to your timetable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Session title (e.g., Quantum Physics Review)..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="md:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-zinc-600 focus:border-zinc-500 transition shadow-inner"
          />

          <input
            type="text"
            placeholder="Subject (e.g., Physics)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-zinc-600 focus:border-zinc-500 transition shadow-inner"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white focus:border-zinc-500 transition shadow-inner cursor-pointer"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 outline-none text-white focus:border-zinc-500 transition shadow-inner cursor-pointer"
              />
            </div>

            <div className="relative">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 outline-none text-white focus:border-zinc-500 transition shadow-inner cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full h-[46px] bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Add Session</span>
            </button>
          </div>
        </div>
      </form>

      {/* Schedule list */}
      <div className="mt-9 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight">
              Your Schedule
            </h3>

            <p className="text-xs text-zinc-500 mt-1">
              Your upcoming study sessions.
            </p>
          </div>

          <span className="text-xs font-mono font-medium text-zinc-500 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
            {schedule.length} {schedule.length === 1 ? "Session" : "Sessions"}
          </span>
        </div>

        {schedule.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-2xl p-12 text-center bg-zinc-900/40">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center float-animation">
              <svg
                className="w-6 h-6 text-zinc-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="17"
                  rx="2"
                />
                <path
                  strokeLinecap="round"
                  d="M8 2v4M16 2v4M3 9h18"
                />
              </svg>
            </div>

            <h3 className="font-semibold text-zinc-300 mt-4">
              No sessions planned
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Create your first study session above to populate your timetable.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedSchedule.map((session) => (
              <ScheduleCard
                key={session.id}
                session={session}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;