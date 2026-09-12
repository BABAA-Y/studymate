import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const StudyContext = createContext();

export function StudyProvider({ children }) {
  // =========================
  // TASKS
  // =========================
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("study-mate-tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: "1",
            title: "Study JavaScript",
            subject: "Programming",
            priority: "High",
            dueDate: "2026-09-10",
            completed: false,
          },
          {
            id: "2",
            title: "Complete React Module",
            subject: "React",
            priority: "Medium",
            dueDate: "2026-09-12",
            completed: true,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("study-mate-tasks", JSON.stringify(tasks));
  }, [tasks]);

  async function addTask(task) {
    const tempId = String(Date.now());
    const optimisticTask = { ...task, id: tempId, completed: false };
    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      const savedTask = await api.createTask({
        title: task.title,
        subject: task.subject || "General",
        priority: task.priority || "Medium",
        dueDate: task.dueDate || null,
        completed: false,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === tempId ? savedTask : t))
      );
    } catch {
      // Saved locally in state & localStorage fallback
    }
  }

  async function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    try {
      await api.toggleTask(id);
    } catch {
      // local fallback
    }
  }

  async function deleteTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    try {
      await api.deleteTask(id);
    } catch {
      // local fallback
    }
  }

  // =========================
  // NOTES
  // =========================
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("study-mate-notes");
    return savedNotes
      ? JSON.parse(savedNotes)
      : [
          {
            id: "1",
            title: "React Basics",
            subject: "React",
            content: "Components, props, state and hooks.",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("study-mate-notes", JSON.stringify(notes));
  }, [notes]);

  async function addNote(note) {
    const tempId = String(Date.now());
    const optimisticNote = { ...note, id: tempId };
    setNotes((prev) => [optimisticNote, ...prev]);

    try {
      const savedNote = await api.createNote({
        title: note.title,
        subject: note.subject || "General",
        content: note.content || "",
      });
      setNotes((prev) =>
        prev.map((n) => (n.id === tempId ? savedNote : n))
      );
    } catch {
      // local fallback
    }
  }

  async function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    try {
      await api.deleteNote(id);
    } catch {
      // local fallback
    }
  }

  // =========================
  // SUBJECTS
  // =========================
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("study-mate-subjects");
    return savedSubjects
      ? JSON.parse(savedSubjects)
      : [
          {
            id: "1",
            name: "JavaScript",
            tasks: 12,
            progress: 80,
          },
          {
            id: "2",
            name: "React",
            tasks: 8,
            progress: 60,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("study-mate-subjects", JSON.stringify(subjects));
  }, [subjects]);

  async function addSubject(name) {
    const tempId = String(Date.now());
    const optimisticSub = { id: tempId, name, tasks: 0, progress: 0 };
    setSubjects((prev) => [...prev, optimisticSub]);

    try {
      const savedSub = await api.createSubject({
        name,
        tasks: 0,
        progress: 0,
      });
      setSubjects((prev) =>
        prev.map((s) => (s.id === tempId ? savedSub : s))
      );
    } catch {
      // local fallback
    }
  }

  async function deleteSubject(id) {
    setSubjects((prev) => prev.filter((subject) => subject.id !== id));
    try {
      await api.deleteSubject(id);
    } catch {
      // local fallback
    }
  }

  // =========================
  // SCHEDULE
  // =========================
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem("study-mate-schedule");
    return savedSchedule
      ? JSON.parse(savedSchedule)
      : [
          {
            id: "1",
            title: "React Practice",
            subject: "React",
            date: "2026-09-08",
            startTime: "10:00",
            endTime: "11:30",
          },
          {
            id: "2",
            title: "DBMS Revision",
            subject: "DBMS",
            date: "2026-09-09",
            startTime: "15:00",
            endTime: "16:00",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("study-mate-schedule", JSON.stringify(schedule));
  }, [schedule]);

  async function addSchedule(item) {
    const tempId = String(Date.now());
    const optimisticItem = { ...item, id: tempId };
    setSchedule((prev) => [...prev, optimisticItem]);

    try {
      const savedItem = await api.createSchedule({
        title: item.title,
        subject: item.subject || "General",
        date: item.date,
        startTime: item.startTime,
        endTime: item.endTime,
      });
      setSchedule((prev) =>
        prev.map((s) => (s.id === tempId ? savedItem : s))
      );
    } catch {
      // local fallback
    }
  }

  async function deleteSchedule(id) {
    setSchedule((prev) => prev.filter((item) => item.id !== id));
    try {
      await api.deleteSchedule(id);
    } catch {
      // local fallback
    }
  }

  // =========================
  // STUDY SESSIONS
  // =========================
  const [sessions, setSessions] = useState(() => {
    const savedSessions = localStorage.getItem("study-mate-sessions");
    return savedSessions ? Number(savedSessions) : 0;
  });

  useEffect(() => {
    localStorage.setItem("study-mate-sessions", String(sessions));
  }, [sessions]);

  const completeSession = useCallback(async () => {
    setSessions((prev) => prev + 1);
    try {
      await api.recordSession();
    } catch {
      // local fallback
    }
  }, []);

  // =========================
  // CLOUD SYNC ON MOUNT
  // =========================
  useEffect(() => {
    let isMounted = true;

    async function syncFromCloud() {
      try {
        const [cloudTasks, cloudNotes, cloudSubjects, cloudSchedule, cloudSessions] =
          await Promise.all([
            api.getTasks().catch(() => null),
            api.getNotes().catch(() => null),
            api.getSubjects().catch(() => null),
            api.getSchedule().catch(() => null),
            api.getSessions().catch(() => null),
          ]);

        if (!isMounted) return;

        if (Array.isArray(cloudTasks) && cloudTasks.length > 0) {
          setTasks(cloudTasks);
        }
        if (Array.isArray(cloudNotes) && cloudNotes.length > 0) {
          setNotes(cloudNotes);
        }
        if (Array.isArray(cloudSubjects) && cloudSubjects.length > 0) {
          setSubjects(cloudSubjects);
        }
        if (Array.isArray(cloudSchedule) && cloudSchedule.length > 0) {
          setSchedule(cloudSchedule);
        }
        if (cloudSessions && typeof cloudSessions.sessions === "number") {
          setSessions(cloudSessions.sessions);
        }
      } catch (err) {
        console.warn("[StudyMate Cloud] Fallback to local storage:", err.message);
      }
    }

    syncFromCloud();
    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // THEME
  // =========================
  const [theme, setTheme] = useState(
    () => localStorage.getItem("study-mate-theme") || "dark"
  );

  useEffect(() => {
    localStorage.setItem("study-mate-theme", theme);
    const root = document.documentElement;

    function applyResolvedTheme(resolved) {
      if (resolved === "dark") {
        root.classList.remove("light");
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
      }
    }

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyResolvedTheme(mediaQuery.matches ? "dark" : "light");

      const listener = (e) => {
        applyResolvedTheme(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      applyResolvedTheme(theme);
    }
  }, [theme]);

  // =========================
  // PROVIDER
  // =========================
  return (
    <StudyContext.Provider
      value={{
        // Tasks
        tasks,
        addTask,
        toggleTask,
        deleteTask,

        // Notes
        notes,
        addNote,
        deleteNote,

        // Subjects
        subjects,
        addSubject,
        deleteSubject,

        // Schedule
        schedule,
        addSchedule,
        deleteSchedule,

        // Timer
        sessions,
        completeSession,

        // Theme
        theme,
        setTheme,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
}

// =========================
// CUSTOM HOOK
// =========================
// eslint-disable-next-line react-refresh/only-export-components
export function useStudy() {
  return useContext(StudyContext);
}