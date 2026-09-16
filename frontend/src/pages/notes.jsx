import { useState } from "react";
import NoteCard from "../components/notecard";
import { useStudy } from "../context/studycontext";

function Notes() {
  const { notes, addNote, deleteNote } = useStudy();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    addNote({
      title: title.trim(),
      subject: subject.trim(),
      content: content.trim(),
    });

    setTitle("");
    setSubject("");
    setContent("");
  }

  function handleDelete(id) {
    deleteNote(id);
  }

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Header */}
      <div className="relative z-10">
        <div className="tagline-badge inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900 text-xs font-medium text-zinc-400 mb-3 backdrop-blur-sm shadow-sm transition-colors">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Knowledge Base • {notes.length} notes saved</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Notes
        </h2>

        {/* Sliding Laser Accent */}
        <div className="mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
          <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
        </div>

        <p className="mt-3 text-zinc-400 text-base max-w-xl">
          Keep your key study insights, lecture takeaways, and revision materials neatly organized.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 relative z-10">
        <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Total Notes
              </p>
              <p className="text-3xl font-bold mt-1 text-white">
                {notes.length}
              </p>
              <p className="text-xs text-zinc-500 mt-1">Saved study notes</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
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
              <p className="text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Active Subjects
              </p>
              <p className="text-3xl font-bold mt-1 text-white">
                {new Set(
                  notes
                    .map((note) => note.subject)
                    .filter(Boolean)
                    .map((subject) => subject.toLowerCase())
                ).size}
              </p>
              <p className="text-xs text-zinc-500 mt-1">Categorized topics</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Add Note Form */}
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
                strokeLinejoin="round"
                d="M12 20h9"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.5a2.12 2.12 0 013 3L8 18l-4 1 1-4L16.5 3.5z"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              Create a note
            </h3>

            <p className="text-xs text-zinc-500">
              Save key concepts, formulas, and study reminders.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-zinc-600 focus:border-zinc-500 transition"
          />

          <input
            type="text"
            placeholder="Subject (e.g. Physics, History)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-zinc-600 focus:border-zinc-500 transition"
          />

          <textarea
            placeholder="Write your note contents..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            className="md:col-span-2 resize-none bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3.5 outline-none text-white placeholder:text-zinc-600 focus:border-zinc-500 transition"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-white text-black rounded-xl py-3.5 font-semibold hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span className="text-lg font-bold">+</span>
            <span>Add Note</span>
          </button>
        </div>
      </form>

      {/* Notes List */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-semibold">
              Your Notes
            </h3>

            <p className="text-sm text-zinc-500 mt-1">
              Your saved study material.
            </p>
          </div>

          <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
            {notes.length} total
          </span>
        </div>

        {notes.length === 0 ? (
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
                  d="M4 4h16v16H4z"
                />
                <path
                  strokeLinecap="round"
                  d="M8 9h8M8 13h6"
                />
              </svg>
            </div>

            <h3 className="font-semibold text-lg mt-4">
              No notes yet
            </h3>

            <p className="text-zinc-500 text-sm mt-1">
              Create your first note above to build your revision library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;