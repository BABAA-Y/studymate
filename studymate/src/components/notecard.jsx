function NoteCard({ note, onDelete }) {
  return (
    <div className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:-translate-y-1 hover:border-zinc-700 transition-all duration-300 shadow-sm hover:shadow-xl">
      {/* Top animated laser line */}
      <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
        <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Diagonal sheen sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/2 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[500%] transition-all duration-1000 ease-in-out" />
      </div>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-lg truncate text-white group-hover:translate-x-0.5 transition-transform duration-300">
            {note.title}
          </h3>

          {note.subject && (
            <span className="tagline-badge inline-block mt-2 text-xs px-3 py-0.5 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 font-medium">
              {note.subject}
            </span>
          )}
        </div>

        <button
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
          className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center text-zinc-500 hover:text-red-400 hover:bg-red-500/10 hover:scale-110 active:scale-95 transition-all duration-200"
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

      <div className="relative z-10 mt-4 pt-4 border-t border-zinc-800/80">
        <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap line-clamp-5">
          {note.content}
        </p>
      </div>
    </div>
  );
}

export default NoteCard;