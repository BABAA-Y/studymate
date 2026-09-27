// API client service communicating with Python FastAPI + MongoDB Atlas backend

const API_BASE = import.meta.env.VITE_API_URL || "/api";

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`[StudyMate API] Offline or endpoint unreachable (${endpoint}):`, error.message);
    throw error;
  }
}

export const api = {
  // SYSTEM
  getHealth: () => request("/health"),

  // TASKS
  getTasks: () => request("/tasks"),
  createTask: (task) => request("/tasks", { method: "POST", body: JSON.stringify(task) }),
  updateTask: (id, updates) => request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(updates) }),
  toggleTask: (id) => request(`/tasks/${id}/toggle`, { method: "PATCH" }),
  deleteTask: (id) => request(`/tasks/${id}`, { method: "DELETE" }),

  // NOTES
  getNotes: () => request("/notes"),
  createNote: (note) => request("/notes", { method: "POST", body: JSON.stringify(note) }),
  updateNote: (id, updates) => request(`/notes/${id}`, { method: "PUT", body: JSON.stringify(updates) }),
  deleteNote: (id) => request(`/notes/${id}`, { method: "DELETE" }),

  // SUBJECTS
  getSubjects: () => request("/subjects"),
  createSubject: (sub) => request("/subjects", { method: "POST", body: JSON.stringify(sub) }),
  deleteSubject: (id) => request(`/subjects/${id}`, { method: "DELETE" }),

  // SCHEDULE
  getSchedule: () => request("/schedule"),
  createSchedule: (item) => request("/schedule", { method: "POST", body: JSON.stringify(item) }),
  updateSchedule: (id, updates) => request(`/schedule/${id}`, { method: "PUT", body: JSON.stringify(updates) }),
  deleteSchedule: (id) => request(`/schedule/${id}`, { method: "DELETE" }),

  // SESSIONS / TIMER
  getSessions: () => request("/sessions"),
  recordSession: () => request("/sessions", { method: "POST" }),

  // FEEDBACK
  getFeedback: () => request("/feedback"),
  sendFeedback: (item) => request("/feedback", { method: "POST", body: JSON.stringify(item) }),
};
