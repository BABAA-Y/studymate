import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useStudy } from "../context/studycontext";

function Sidebar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("study-mate-sidebar-collapsed") === "true"
  );
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    tasks = [],
    schedule = [],
    notes = [],
    subjects = [],
    sessions = 0,
    theme,
    setTheme,
  } = useStudy();

  const userName =
    localStorage.getItem("study-mate-username") || "Student Operator";
  const userEmail =
    localStorage.getItem("study-mate-user-email") || "student@studymate.edu";

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const taskProgress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  const today = new Date().toLocaleDateString("en-CA");
  const todaySessions = schedule.filter((s) => s.date === today).length;

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("study-mate-sidebar-collapsed", String(next));
      return next;
    });
  }

  const links = [
    {
      name: "Dashboard",
      path: "/dashboard",
      badge: null,
      icon: (
        <svg
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      name: "Tasks",
      path: "/tasks",
      badge:
        pendingTasks > 0 ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            {pendingTasks}
          </span>
        ) : tasks.length > 0 ? (
          <span
            className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.7)]"
            title="All tasks completed!"
          />
        ) : null,
      icon: (
        <svg
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path strokeLinecap="round" d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      ),
    },
    {
      name: "Notes",
      path: "/notes",
      badge:
        notes.length > 0 ? (
          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            {notes.length}
          </span>
        ) : null,
      icon: (
        <svg
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 20h4L19 9l-4-4L4 16v4z"
          />
          <path d="M13.5 6.5l4 4" />
        </svg>
      ),
    },
    {
      name: "Subjects",
      path: "/subjects",
      badge:
        subjects.length > 0 ? (
          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            {subjects.length}
          </span>
        ) : null,
      icon: (
        <svg
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5.5A2.5 2.5 0 016.5 3H20v16H6.5A2.5 2.5 0 014 16.5v-11z"
          />
          <path strokeLinecap="round" d="M8 7h8M8 11h8" />
        </svg>
      ),
    },
    {
      name: "Schedule",
      path: "/schedule",
      badge:
        todaySessions > 0 ? (
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-green-500/15 text-green-400 border border-green-500/30 animate-pulse">
            Today ({todaySessions})
          </span>
        ) : schedule.length > 0 ? (
          <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            {schedule.length}
          </span>
        ) : null,
      icon: (
        <svg
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
        </svg>
      ),
    },
    {
      name: "Study Timer",
      path: "/timer",
      badge:
        sessions > 0 ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-sky-400 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            {sessions}
          </span>
        ) : null,
      icon: (
        <svg
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="13" r="8" />
          <path
            strokeLinecap="round"
            d="M12 9v4l2.5 1.5M9 3h6M12 3v2"
          />
        </svg>
      ),
    },
    {
      name: "Progress",
      path: "/progress",
      badge: (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-300">
          {taskProgress}%
        </span>
      ),
      icon: (
        <svg
          className="w-5 h-5 transition-transform group-hover:scale-110 duration-200"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 19V9M10 19V5M16 19v-7M22 19H2"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <header className="md:hidden flex items-center justify-between px-5 py-3.5 bg-[#050505] border-b border-zinc-800 sticky top-0 z-40">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer group"
          title="Study Mate Workspace"
        >
          <div className="w-9 h-9 clip-hexagon bg-white text-black flex items-center justify-center font-black text-base shadow-sm group-hover:scale-105 transition-transform">
            Ω
          </div>

          <div>
            <h1 className="text-base font-bold tracking-tight text-white">Study Mate</h1>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition"
        >
          {mobileOpen ? (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[61px] bottom-0 bg-[#050505]/95 backdrop-blur-xl z-40 p-5 overflow-y-auto flex flex-col justify-between animate-[fadeIn_0.2s_ease]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold px-2 mb-3">
              Workspace Modules
            </p>

            <div className="space-y-1.5">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-white text-black font-semibold shadow-md"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span className="text-sm font-medium">{link.name}</span>
                  </div>
                  {link.badge}
                </NavLink>
              ))}
            </div>

            {/* Quick Timer Streak Card in Mobile */}
            <div className="mt-5 p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-sm">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Daily Focus</p>
                  <p className="text-[11px] text-zinc-400">{sessions} sessions completed</p>
                </div>
              </div>
              <NavLink
                to="/timer"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition"
              >
                Focus Now
              </NavLink>
            </div>

            <div className="border-t border-zinc-800 pt-5 mt-5 space-y-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-semibold px-2 mb-2">
                Preferences & Info
              </p>

              <button
                onClick={() => {
                  navigate("/settings");
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition text-left text-sm"
              >
                <span className="text-base">⚙</span>
                <span>Settings</span>
              </button>

              <button
                onClick={() => {
                  navigate("/contact");
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition text-left text-sm"
              >
                <span className="text-base">✉</span>
                <span>Contact & Feedback</span>
              </button>

              <button
                onClick={() => {
                  navigate("/about");
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition text-left text-sm"
              >
                <span className="text-base">ⓘ</span>
                <span>About Study Mate</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-800/80 text-center">
            <p className="text-xs text-zinc-500">
              Study Mate • Pro Academic Suite
            </p>
          </div>
        </div>
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`hidden md:flex ${
          collapsed ? "w-[84px]" : "w-[290px]"
        } min-h-screen bg-[#050505] border-r border-zinc-800 flex-col sticky top-0 h-screen transition-all duration-300 ease-in-out select-none relative z-30`}
      >
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className={`px-4 pt-6 pb-5 relative ${collapsed ? "text-center" : ""}`}>
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-3 cursor-pointer group/logo ${
                collapsed ? "mx-auto" : ""
              }`}
              onClick={() => navigate("/dashboard")}
              title="Study Mate Workspace"
            >
              {/* High-Tech Logo Emblem */}
              <div className="relative">
                <div className="w-10 h-10 clip-hexagon bg-white text-black flex items-center justify-center font-black text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover/logo:scale-105 group-hover/logo:rotate-6 overflow-hidden relative">
                  <span>Ω</span>
                  {/* Top Laser Line on Logo */}
                  <div className="absolute top-0 left-0 w-full h-px overflow-hidden pointer-events-none">
                    <div className="w-1/2 h-full bg-white/70 -translate-x-full group-hover/logo:translate-x-[300%] transition-transform duration-700 ease-in-out" />
                  </div>
                </div>
              </div>

              {!collapsed && (
                <div className="min-w-0 animate-[fadeIn_0.2s_ease]">
                  <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                    <span>Study Mate</span>
                  </h1>
                  <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span>FOCUS OS • PRO</span>
                  </div>
                </div>
              )}
            </div>

            {/* Collapse Toggle Button */}
            {!collapsed && (
              <button
                onClick={toggleCollapsed}
                title="Collapse sidebar"
                className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            )}
          </div>

          {/* If collapsed, centered expand button */}
          {collapsed && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={toggleCollapsed}
                title="Expand sidebar"
                className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-3.5 h-3.5 rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* Sliding Laser Separator */}
          <div className="mt-4 w-full h-px bg-zinc-800/80 overflow-hidden">
            <div className="sliding-laser-beam w-16 h-px bg-white/60 animate-[slide_3s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Navigation List */}
        <nav className="px-3 flex-1 overflow-y-auto overflow-x-hidden space-y-1 scrollbar-none py-1">
          {!collapsed && (
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold px-3 pt-1 pb-2 flex items-center justify-between">
              <span>Workspace</span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            </p>
          )}

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              title={collapsed ? link.name : undefined}
              className={({ isActive }) =>
                `group relative flex items-center ${
                  collapsed ? "justify-center px-0 py-3" : "justify-between px-3 py-2.5"
                } rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-md scale-[1.01]"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/80 hover:translate-x-0.5"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active Illuminated Left Edge Pill */}
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-sky-500 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                  )}

                  {/* Left: Icon & Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">{link.icon}</div>

                    {!collapsed && (
                      <span className="text-sm font-medium tracking-tight truncate">
                        {link.name}
                      </span>
                    )}
                  </div>

                  {/* Right: Dynamic Live Badge & Animated Chevron */}
                  {!collapsed && (
                    <div className="flex items-center gap-2 shrink-0">
                      {link.badge}
                      <svg
                        className="w-3.5 h-3.5 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-zinc-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  )}

                  {/* Collapsed Tooltip */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-50 pointer-events-none flex items-center gap-2">
                      <span>{link.name}</span>
                      {link.badge}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Focus Round Quick Widget (Expanded mode only) */}
        {!collapsed && (
          <div className="focus-engine-card mx-3 my-2 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 group/widget relative overflow-hidden transition-all hover:border-zinc-700 hover:shadow-lg">
            <div className="absolute top-0 left-0 w-full h-px overflow-hidden pointer-events-none">
              <div className="sliding-laser-beam w-1/3 h-full bg-white/70 -translate-x-full group-hover/widget:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
            </div>

            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">⚡</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  Focus Engine
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-1.5 py-0.5 rounded-full">
                {sessions} rounds
              </span>
            </div>

            <p className="text-xs text-zinc-300 font-medium">Ready to concentrate?</p>

            <NavLink
              to="/timer"
              className="focus-engine-btn mt-2.5 w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs"
            >
              <span>Start Session</span>
              <span className="transition-transform group-hover/widget:translate-x-0.5">→</span>
            </NavLink>
          </div>
        )}

        {/* Backdrop for closing profile popover when open */}
        {profileOpen && (
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setProfileOpen(false)}
          />
        )}

        {/* Profile Card & Interactive Popover */}
        <div className="relative group/profile px-3 pb-4 pt-1">
          {/* Profile Menu Popup */}
          <div
            className={`absolute z-50 transition-all duration-300 ${
              collapsed
                ? "left-full bottom-1 ml-3 w-72 sm:w-80"
                : "left-3 right-3 bottom-[calc(100%+8px)]"
            } ${
              profileOpen
                ? "opacity-100 visible translate-y-0 pointer-events-auto"
                : "opacity-0 invisible translate-y-2 pointer-events-none group-hover/profile:opacity-100 group-hover/profile:visible group-hover/profile:translate-y-0 group-hover/profile:pointer-events-auto"
            }`}
          >
            {/* Transparent hover bridge to prevent cursor gap drop */}
            {collapsed ? (
              <div className="absolute -left-4 inset-y-0 w-4 pointer-events-auto" />
            ) : (
              <div className="absolute -bottom-3 inset-x-0 h-3 pointer-events-auto" />
            )}

            <div className="profile-popover-card bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/80 rounded-2xl overflow-hidden shadow-2xl shadow-black/80 study-card">
              {/* Top Laser Line on Popup */}
              <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
                <div className="sliding-laser-beam w-1/3 h-full bg-white/70 -translate-x-full group-hover/profile:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* User preview */}
              <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold text-base shadow-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-sm text-white truncate">{userName}</p>
                      <span className="popover-pro-badge text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                        PRO
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">{userEmail}</p>
                  </div>
                </div>
              </div>

              {/* Quick Theme Switcher */}
              <div className="p-3 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                    Theme
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono capitalize">
                    {theme}
                  </span>
                </div>
                <div className="popover-theme-track grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800">
                  {/* Dark */}
                  <button
                    onClick={() => setTheme("dark")}
                    className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold transition-all ${
                      theme === "dark"
                        ? "popover-theme-btn-active bg-white text-black shadow-sm"
                        : "popover-theme-btn-idle text-zinc-400 hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    <span>Dark</span>
                  </button>

                  {/* Light */}
                  <button
                    onClick={() => setTheme("light")}
                    className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold transition-all ${
                      theme === "light"
                        ? "popover-theme-btn-active bg-white text-black shadow-sm"
                        : "popover-theme-btn-idle text-zinc-400 hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="4" />
                      <path
                        strokeLinecap="round"
                        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                      />
                    </svg>
                    <span>Light</span>
                  </button>

                  {/* System */}
                  <button
                    onClick={() => setTheme("system")}
                    className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 text-xs font-semibold transition-all ${
                      theme === "system"
                        ? "popover-theme-btn-active bg-white text-black shadow-sm"
                        : "popover-theme-btn-idle text-zinc-400 hover:text-white"
                    }`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="13" rx="2" />
                      <path strokeLinecap="round" d="M8 21h8M12 17v4" />
                    </svg>
                    <span>Auto</span>
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="p-2 space-y-0.5">
                <button
                  onClick={() => {
                    navigate("/settings");
                    setProfileOpen(false);
                  }}
                  className="popover-nav-item w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all text-sm group/btn"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm group-hover/btn:rotate-45 transition-transform">⚙</span>
                    <span>Settings & Preferences</span>
                  </div>
                  <span className="text-zinc-500 group-hover/btn:translate-x-0.5 transition-transform">›</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/contact");
                    setProfileOpen(false);
                  }}
                  className="popover-nav-item w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all text-sm group/btn"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm group-hover/btn:scale-110 transition-transform">✉</span>
                    <span>Contact & Feedback</span>
                  </div>
                  <span className="text-zinc-500 group-hover/btn:translate-x-0.5 transition-transform">›</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/about");
                    setProfileOpen(false);
                  }}
                  className="popover-nav-item w-full flex items-center justify-between px-3 py-2 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all text-sm group/btn"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm group-hover/btn:scale-110 transition-transform">ⓘ</span>
                    <span>About Study Mate</span>
                  </div>
                  <span className="text-zinc-500 group-hover/btn:translate-x-0.5 transition-transform">›</span>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Trigger Button */}
          <div
            onClick={() => setProfileOpen((prev) => !prev)}
            className={`profile-trigger-card bg-zinc-900/70 border border-zinc-800 rounded-2xl p-2.5 cursor-pointer hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 group-hover/profile:border-zinc-600 shadow-sm flex items-center ${
              collapsed ? "justify-center" : "justify-between"
            }`}
            title={collapsed ? userName : undefined}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs shadow-sm">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 border border-black shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
              </div>

              {!collapsed && (
                <div className="min-w-0">
                  <p className="font-bold text-xs text-white truncate leading-tight">
                    {userName}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                    Pro Learner
                  </p>
                </div>
              )}
            </div>

            {!collapsed && (
              <svg
                className={`w-3.5 h-3.5 text-zinc-500 group-hover/profile:text-white transition-transform duration-200 shrink-0 ${
                  profileOpen ? "rotate-90 text-white" : "group-hover/profile:rotate-90"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;