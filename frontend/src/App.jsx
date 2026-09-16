import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Sidebar from "./components/sidebar";
import Tasks from "./components/task";

import Notes from "./pages/notes";
import Subjects from "./pages/subject";
import Schedule from "./pages/schedule";
import TimerPage from "./pages/timer";
import Progress from "./pages/progress";

import Settings from "./pages/settings";
import Feedback from "./pages/feedback";
import About from "./pages/about";
import PageAnimation from "./components/pageanimation";

function AppContent() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
        <PageAnimation>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/signup" element={<Navigate to="/dashboard" replace />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/progress" element={<Progress />} />

            <Route path="/settings" element={<Settings />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/contact" element={<Feedback />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </PageAnimation>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
