import { useState } from "react";
import { useStudy } from "../context/studycontext";

function Settings() {
  const { theme, setTheme } = useStudy();

  // Settings State
  const [taskReminders, setTaskReminders] = useState(
    () => localStorage.getItem("study-mate-reminders") !== "false"
  );

  const [autoStartBreaks, setAutoStartBreaks] = useState(
    () => localStorage.getItem("study-mate-auto-breaks") === "true"
  );

  const [soundAlerts, setSoundAlerts] = useState(
    () => localStorage.getItem("study-mate-sound") !== "false"
  );

  // User Profile
  const [userName, setUserName] = useState(
    () => localStorage.getItem("study-mate-username") || "Student Operator"
  );
  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem("study-mate-user-email") || "student@studymate.edu"
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savedProfileToast, setSavedProfileToast] = useState(false);

  // Modals state
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  function showToast(msg) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  }

  function handleReminders(value) {
    setTaskReminders(value);
    localStorage.setItem("study-mate-reminders", value);
    showToast(`Task reminders ${value ? "enabled" : "disabled"}`);
  }

  function handleAutoBreaks(value) {
    setAutoStartBreaks(value);
    localStorage.setItem("study-mate-auto-breaks", value);
    showToast(`Auto-start breaks ${value ? "enabled" : "disabled"}`);
  }

  function handleSoundAlerts(value) {
    setSoundAlerts(value);
    localStorage.setItem("study-mate-sound", value);
    showToast(`Sound alerts ${value ? "enabled" : "disabled"}`);
  }

  function handleSaveProfile(e) {
    e.preventDefault();
    localStorage.setItem("study-mate-username", userName);
    localStorage.setItem("study-mate-user-email", userEmail);
    setIsEditingProfile(false);
    setSavedProfileToast(true);
    setTimeout(() => setSavedProfileToast(false), 2500);
  }

  function handleExportData() {
    const data = {
      user: { name: userName, email: userEmail },
      tasks: JSON.parse(localStorage.getItem("study-mate-tasks") || "[]"),
      notes: JSON.parse(localStorage.getItem("study-mate-notes") || "[]"),
      subjects: JSON.parse(localStorage.getItem("study-mate-subjects") || "[]"),
      schedule: JSON.parse(localStorage.getItem("study-mate-schedule") || "[]"),
      sessions: Number(localStorage.getItem("study-mate-sessions") || 0),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `study-mate-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Data exported successfully!");
  }

  function handleDeleteAccount() {
    if (deleteConfirmationText.trim().toUpperCase() !== "DELETE") {
      return;
    }

    // Completely wipe all local study mate records
    const keysToRemove = [
      "study-mate-user",
      "study-mate-username",
      "study-mate-user-email",
      "study-mate-tasks",
      "study-mate-notes",
      "study-mate-subjects",
      "study-mate-schedule",
      "study-mate-sessions",
      "study-mate-feedback",
      "study-mate-theme",
      "study-mate-reminders",
      "study-mate-confirm-delete",
      "study-mate-auto-breaks",
      "study-mate-sound",
      "study-mate-timer",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
    setShowDeleteAccountModal(false);

    window.location.href = "/";
  }

  return (
    <div className="max-w-5xl mx-auto pt-4 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-black px-5 py-3 rounded-2xl shadow-2xl font-medium text-sm flex items-center gap-2 border border-zinc-200 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <section className="relative mb-10 overflow-hidden">
        <div className="absolute -top-10 left-0 w-80 h-80 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold mb-2">
          <span>Preferences & Security</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Settings
        </h1>

        <div className="mt-4 w-28 h-px bg-zinc-800 overflow-hidden">
          <div className="w-10 h-px bg-white animate-[slide_2.5s_ease-in-out_infinite]" />
        </div>

        <p className="mt-4 text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed">
          Manage your personal study workspace, preferences, and account security.
        </p>
      </section>

      <div className="space-y-6">
        {/* ================= USER PROFILE CARD ================= */}
        <section className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-zinc-700 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/4 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-2xl shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-black flex items-center justify-center text-[10px] text-black font-black" title="Active Account">
                  ✓
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{userName}</h2>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    Pro
                  </span>
                </div>
                <p className="text-sm text-zinc-400 font-mono mt-0.5">{userEmail}</p>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                  Active Study Mate Session
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2 rounded-xl bg-black border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-950 text-sm font-medium text-white transition self-start sm:self-auto"
            >
              {isEditingProfile ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Inline Profile Editor */}
          {isEditingProfile && (
            <form
              onSubmit={handleSaveProfile}
              className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-[fadeIn_0.3s_ease]"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-zinc-500 transition"
                  required
                />
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-black rounded-xl font-semibold hover:bg-zinc-200 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {savedProfileToast && (
            <p className="text-xs text-green-400 mt-3">✓ Profile updated successfully</p>
          )}
        </section>

        {/* ================= APPEARANCE SECTION ================= */}
        <section className="study-card group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl transition-all">
          <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
            <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
          </div>

          <div className="mb-6">
            <div className="tagline-badge inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-zinc-800 bg-zinc-950 text-[11px] font-medium text-zinc-400 mb-2 backdrop-blur-sm shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>Visual Aesthetics • Workspace Theming</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Appearance
            </h2>

            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Customize how Study Mate renders across your display. Select a curated dark or light palette, or sync automatically with your system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. DARK MODE */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`group/card relative overflow-hidden rounded-2xl p-4 md:p-5 border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                theme === "dark"
                  ? "theme-card-active ring-2 ring-white/60 shadow-xl"
                  : "theme-card-idle hover:border-zinc-700 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              {/* Top Laser Beam on Card */}
              <div className="absolute top-0 left-0 w-full h-px overflow-hidden pointer-events-none">
                <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover/card:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Visual Window Mockup */}
              <div className="w-full h-28 rounded-xl bg-[#09090b] border border-zinc-800 p-2.5 overflow-hidden flex flex-col gap-2 transition-all duration-300 group-hover/card:scale-[1.02] shadow-inner">
                {/* Window Top Bar */}
                <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800/80">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="w-12 h-1 bg-zinc-800 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
                {/* Window Workspace */}
                <div className="flex gap-2 flex-1 min-h-0">
                  {/* Mini Sidebar */}
                  <div className="w-7 bg-zinc-900/90 border border-zinc-800/80 rounded-lg p-1 flex flex-col gap-1 shrink-0">
                    <div className="w-full h-2 bg-white/80 rounded-xs" />
                    <div className="w-full h-1.5 bg-zinc-800 rounded-xs mt-0.5" />
                    <div className="w-full h-1.5 bg-zinc-800/60 rounded-xs" />
                    <div className="w-full h-1.5 bg-zinc-800/60 rounded-xs" />
                  </div>
                  {/* Mini Main Workspace */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex gap-1.5">
                      <div className="flex-1 h-6 bg-zinc-900 border border-zinc-800 rounded-md p-1.5 flex items-center justify-between">
                        <div className="w-8 h-1.5 bg-zinc-700 rounded-xs" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      </div>
                      <div className="w-6 h-6 bg-zinc-900 border border-zinc-800 rounded-md p-1 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border border-white/60" />
                      </div>
                    </div>
                    <div className="flex-1 bg-zinc-900/70 border border-zinc-800/60 rounded-md p-1.5 flex flex-col justify-center gap-1">
                      <div className="w-16 h-1.5 bg-white/70 rounded-xs" />
                      <div className="w-10 h-1 bg-zinc-700 rounded-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Label & Active Check */}
              <div className="flex items-start justify-between gap-3 mt-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover/card:scale-110 shrink-0 ${
                      theme === "dark"
                        ? "bg-white text-black shadow-sm"
                        : "bg-zinc-950 border border-zinc-800 text-zinc-400"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-white truncate">
                      Dark Mode
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                      Deep obsidian contrast
                    </p>
                  </div>
                </div>

                {/* Radio indicator */}
                <div className="shrink-0 mt-1">
                  {theme === "dark" ? (
                    <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md animate-[checkPop_0.3s_ease]">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-700 group-hover/card:border-zinc-500 transition-colors" />
                  )}
                </div>
              </div>
            </button>

            {/* 2. LIGHT MODE */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`group/card relative overflow-hidden rounded-2xl p-4 md:p-5 border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                theme === "light"
                  ? "theme-card-active ring-2 ring-white/60 shadow-xl"
                  : "theme-card-idle hover:border-zinc-700 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              {/* Top Laser Beam on Card */}
              <div className="absolute top-0 left-0 w-full h-px overflow-hidden pointer-events-none">
                <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover/card:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Visual Window Mockup */}
              <div className="w-full h-28 rounded-xl bg-[#f8fafc] border border-slate-300 p-2.5 overflow-hidden flex flex-col gap-2 transition-all duration-300 group-hover/card:scale-[1.02] shadow-inner">
                {/* Window Top Bar */}
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="w-12 h-1 bg-slate-300 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-slate-300" />
                </div>
                {/* Window Workspace */}
                <div className="flex gap-2 flex-1 min-h-0">
                  {/* Mini Sidebar */}
                  <div className="w-7 bg-white border border-slate-200 rounded-lg p-1 flex flex-col gap-1 shrink-0 shadow-xs">
                    <div className="w-full h-2 bg-slate-900 rounded-xs" />
                    <div className="w-full h-1.5 bg-slate-200 rounded-xs mt-0.5" />
                    <div className="w-full h-1.5 bg-slate-100 rounded-xs" />
                    <div className="w-full h-1.5 bg-slate-100 rounded-xs" />
                  </div>
                  {/* Mini Main Workspace */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    <div className="flex gap-1.5">
                      <div className="flex-1 h-6 bg-white border border-slate-200 rounded-md p-1.5 flex items-center justify-between shadow-xs">
                        <div className="w-8 h-1.5 bg-slate-700 rounded-xs" />
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                      </div>
                      <div className="w-6 h-6 bg-white border border-slate-200 rounded-md p-1 flex items-center justify-center shadow-xs">
                        <div className="w-3 h-3 rounded-full border border-slate-800" />
                      </div>
                    </div>
                    <div className="flex-1 bg-white border border-slate-200 rounded-md p-1.5 flex flex-col justify-center gap-1 shadow-xs">
                      <div className="w-16 h-1.5 bg-slate-900 rounded-xs" />
                      <div className="w-10 h-1 bg-slate-400 rounded-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Label & Active Check */}
              <div className="flex items-start justify-between gap-3 mt-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover/card:scale-110 shrink-0 ${
                      theme === "light"
                        ? "bg-white text-black shadow-sm"
                        : "bg-zinc-950 border border-zinc-800 text-zinc-400"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="4" />
                      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-white truncate">
                      Light Mode
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                      Clean daylight canvas
                    </p>
                  </div>
                </div>

                {/* Radio indicator */}
                <div className="shrink-0 mt-1">
                  {theme === "light" ? (
                    <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md animate-[checkPop_0.3s_ease]">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-700 group-hover/card:border-zinc-500 transition-colors" />
                  )}
                </div>
              </div>
            </button>

            {/* 3. SYSTEM DEFAULT */}
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={`group/card relative overflow-hidden rounded-2xl p-4 md:p-5 border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                theme === "system"
                  ? "theme-card-active ring-2 ring-white/60 shadow-xl"
                  : "theme-card-idle hover:border-zinc-700 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              {/* Top Laser Beam on Card */}
              <div className="absolute top-0 left-0 w-full h-px overflow-hidden pointer-events-none">
                <div className="w-1/3 h-full bg-white/70 -translate-x-full group-hover/card:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              </div>

              {/* Visual Window Mockup: 50/50 Split */}
              <div className="relative w-full h-28 rounded-xl overflow-hidden border border-zinc-800 flex transition-all duration-300 group-hover/card:scale-[1.02] shadow-inner">
                {/* Left Half (Dark Workspace) */}
                <div className="w-1/2 h-full bg-[#09090b] p-2.5 flex flex-col gap-2 overflow-hidden">
                  <div className="flex items-center gap-1.5 pb-1.5 border-b border-zinc-800/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                  </div>
                  <div className="flex gap-1.5 flex-1 min-h-0">
                    <div className="w-5 bg-zinc-900 rounded p-1 flex flex-col gap-1 shrink-0">
                      <div className="w-full h-1.5 bg-white/80 rounded-xs" />
                      <div className="w-full h-1 bg-zinc-800 rounded-xs" />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-5 bg-zinc-900 border border-zinc-800 rounded p-1 flex items-center">
                        <div className="w-5 h-1 bg-zinc-700 rounded-xs" />
                      </div>
                      <div className="flex-1 bg-zinc-900/70 border border-zinc-800/60 rounded p-1">
                        <div className="w-8 h-1 bg-white/70 rounded-xs" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Split Divider & Badge */}
                <div className="absolute inset-y-0 left-1/2 w-0.5 bg-white/40 z-10 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-700 text-[9px] font-mono font-bold text-white shadow-xl flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                  <span>AUTO</span>
                </div>

                {/* Right Half (Light Workspace) */}
                <div className="w-1/2 h-full bg-[#f8fafc] p-2.5 flex flex-col gap-2 overflow-hidden">
                  <div className="flex items-center justify-end gap-1.5 pb-1.5 border-b border-slate-200">
                    <div className="w-8 h-1 bg-slate-300 rounded-full" />
                  </div>
                  <div className="flex gap-1.5 flex-1 min-h-0">
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="h-5 bg-white border border-slate-200 rounded p-1 flex items-center shadow-xs">
                        <div className="w-5 h-1 bg-slate-700 rounded-xs" />
                      </div>
                      <div className="flex-1 bg-white border border-slate-200 rounded p-1 shadow-xs">
                        <div className="w-8 h-1 bg-slate-900 rounded-xs" />
                      </div>
                    </div>
                    <div className="w-5 bg-white border border-slate-200 rounded p-1 flex flex-col gap-1 shrink-0 shadow-xs">
                      <div className="w-full h-1.5 bg-slate-900 rounded-xs" />
                      <div className="w-full h-1 bg-slate-200 rounded-xs" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Label & Active Check */}
              <div className="flex items-start justify-between gap-3 mt-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover/card:scale-110 shrink-0 ${
                      theme === "system"
                        ? "bg-white text-black shadow-sm"
                        : "bg-zinc-950 border border-zinc-800 text-zinc-400"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="13" rx="2" />
                      <path strokeLinecap="round" d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-white truncate">
                      System Sync
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5 truncate">
                      Matches device OS preference
                    </p>
                  </div>
                </div>

                {/* Radio indicator */}
                <div className="shrink-0 mt-1">
                  {theme === "system" ? (
                    <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md animate-[checkPop_0.3s_ease]">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-zinc-700 group-hover/card:border-zinc-500 transition-colors" />
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Theme Info & Live Status Strip */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>
                Active Display Engine:{" "}
                <strong className="text-white capitalize font-semibold">
                  {theme === "system"
                    ? "System Synchronized (OS Auto)"
                    : `${theme} Mode`}
                </strong>
              </span>
            </div>

            <p className="text-zinc-500">
              Theme transitions occur instantly across all study modules with zero delay.
            </p>
          </div>
        </section>

        {/* ================= STUDY PREFERENCES ================= */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Workflow
            </p>
            <h2 className="text-xl font-semibold mt-1">Study Experience</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Configure timer behaviors, confirmations, and reminders.
            </p>
          </div>

          <div className="divide-y divide-zinc-800/80">
            <SettingToggleRow
              title="Task Reminders"
              description="Notify you when tasks approach their scheduled due date."
              enabled={taskReminders}
              onChange={handleReminders}
              icon="⏰"
            />

            <SettingToggleRow
              title="Auto-Start Breaks"
              description="Automatically start the short break countdown when focus sessions conclude."
              enabled={autoStartBreaks}
              onChange={handleAutoBreaks}
              icon="☕"
            />

            <SettingToggleRow
              title="Sound Alerts"
              description="Play sound chime when the study timer completes a session."
              enabled={soundAlerts}
              onChange={handleSoundAlerts}
              icon="🔔"
            />
          </div>
        </section>

        {/* ================= DATA MANAGEMENT ================= */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Backup & Storage
            </p>
            <h2 className="text-xl font-semibold mt-1">Data Management</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Export and safeguard your academic data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-black border border-zinc-800">
            <div>
              <h3 className="font-semibold text-sm text-white">Export Study Data</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Download a JSON backup of all your tasks, notes, subjects, and study history.
              </p>
            </div>

            <button
              onClick={handleExportData}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-sm font-medium text-white transition flex items-center gap-2 hover:scale-105 active:scale-95 shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Export JSON</span>
            </button>
          </div>
        </section>

        {/* ================= ACCOUNT & SECURITY (LOGOUT & DELETE ACCOUNT) ================= */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              Data & Storage
            </p>
            <h2 className="text-xl font-semibold mt-1">Reset & Clear Data</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Clear your local tasks, notes, subjects, and study history.
            </p>
          </div>

          <div className="space-y-4">
            {/* Delete Account Danger Zone */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-red-950/15 border border-red-900/30 hover:border-red-900/50 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center text-red-400 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-red-400">Reset All Data</h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-900/40 text-red-300 border border-red-800/40">
                      Danger
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Permanently wipe all tasks, notes, subjects, and study history back to clean defaults.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setDeleteConfirmationText("");
                  setShowDeleteAccountModal(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-900/30 border border-red-800 text-red-300 hover:bg-red-900/60 hover:text-white text-sm font-semibold transition shrink-0"
              >
                Reset Data
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ================= DELETE ACCOUNT CONFIRMATION MODAL ================= */}
      {showDeleteAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
          <div className="relative w-full max-w-md bg-zinc-900 border border-red-900/60 rounded-3xl p-6 md:p-8 shadow-2xl modal-animation">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-800 flex items-center justify-center text-red-400 mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>

            <h3 className="text-xl font-bold text-red-400 mb-2">Delete Account & Wipe All Data</h3>
            <p className="text-sm text-zinc-300 leading-relaxed mb-4">
              This action is <strong className="text-white">permanent and irreversible</strong>. All study tasks, notes, subjects, schedules, and custom settings will be completely deleted from this device.
            </p>

            <div className="mb-6 p-4 rounded-xl bg-black border border-zinc-800">
              <p className="text-xs text-zinc-400 mb-2 font-medium">
                To confirm deletion, please type <span className="font-mono text-red-400 font-bold uppercase">DELETE</span> below:
              </p>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder="Type DELETE"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white font-mono text-sm outline-none focus:border-red-500 transition"
                autoFocus
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteAccountModal(false)}
                className="px-5 py-2.5 rounded-xl bg-black border border-zinc-800 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-950 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationText.trim().toUpperCase() !== "DELETE"}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingToggleRow({ title, description, enabled, onChange, icon }) {
  return (
    <div className="flex items-center justify-between py-4.5 group">
      <div className="flex items-center gap-3 pr-4">
        {icon && (
          <span className="text-lg opacity-80 group-hover:scale-110 transition-transform">
            {icon}
          </span>
        )}
        <div>
          <h3 className="font-medium text-sm text-white">{title}</h3>
          <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? "bg-white" : "bg-zinc-800"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg transition duration-200 ease-in-out ${
            enabled ? "translate-x-5 bg-black" : "translate-x-0 bg-zinc-400"
          }`}
        />
      </button>
    </div>
  );
}

export default Settings;