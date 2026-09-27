# 📘 STUDY MATE — PROJECT NOTES & COMPREHENSIVE MASTER GUIDE

> **Academic Project Reference & Technical Handbook**  
> **Course:** BCA (Semester III) • 2026–2027  
> **Institution:** USCS, Uttaranchal University  
> **Student Developer:** Ayush Bhandari (Roll No: UU2509000107)  
> **Faculty Supervisor:** Mr. Sohrab Ali (USCS)  

---

## 📑 TABLE OF CONTENTS

1. [Project Overview: What is Study Mate?](#1-project-overview-what-is-study-mate)
2. [Tech Stack: What is What?](#2-tech-stack-what-is-what)
3. [Project Directory Structure: Where is What?](#3-project-directory-structure-where-is-what)
4. [The 6 Core Modules Explained](#4-the-6-core-modules-explained)
5. [Data Flow: Frontend ⇄ Backend ⇄ Cloud](#5-data-flow-frontend--backend--cloud)
6. [Complete REST API Reference](#6-complete-rest-api-reference)
7. [Project Planning & SDLC (Gantt & PERT Notes)](#7-project-planning--sdlc-gantt--pert-notes)
8. [Developer Setup & Run Commands](#8-developer-setup--run-commands)
9. [Troubleshooting & FAQs](#9-troubleshooting--faqs)

---

## 1. PROJECT OVERVIEW: WHAT IS STUDY MATE?

### 📌 The Problem
Most college students juggle academic life using disconnected tools:
- Handwritten notes or random notepad apps for study summaries.
- Mobile reminders for homework deadlines.
- Separate phone timer apps for Pomodoro sessions.
- Paper timetable schedules taped to desks.

When revision period or exam week arrives, information is fragmented, deadlines get missed, and study sessions lack discipline.

### 💡 The Solution
**Study Mate** is a full-stack, single-page web application designed as an **all-in-one student productivity and academic schedule management hub**. It unifies:
1. **Priority Task Queue** (Deadlines, pending homework, completed tasks)
2. **Revision Notes Vault** (Searchable subject-wise revision notes)
3. **Course Syllabus Manager** (Subject cards with completion progress)
4. **Timetable & Schedule Planner** (Daily/weekly lectures and exam slots)
5. **Pomodoro Focus Timer** (Built-in Web Audio notification chimes)
6. **Unified Analytics Dashboard** (Streak tracker, study hours, active tasks)

### 🛡️ Core Architectural Philosophy: Offline-First Resilience
Study Mate uses a **Dual-Layer Persistence Strategy**:
- **Optimistic UI + `localStorage`:** Every action updates the screen immediately and persists to browser memory. If the backend or WiFi drops, the app remains 100% operational without freezing.
- **FastAPI + MongoDB Atlas Cloud:** Data seamlessly syncs to the cloud asynchronously in the background.

---

## 2. TECH STACK: WHAT IS WHAT?

Here is a breakdown of every tool and library used in the project, explaining **what it is** and **why it was chosen**:

### 🌐 Frontend (User Interface)

| Technology | What is it? | Why We Use It |
| :--- | :--- | :--- |
| **React 18** | Declarative Component-Based JavaScript Library | Lets us build reusable UI blocks (`<TaskCard />`, `<Sidebar />`) with fast virtual DOM updates and seamless reactive state. |
| **Vite 5** | Next-Generation Frontend Build Tool | Replaces slow Webpack setups. Provides near-instant Hot Module Replacement (HMR) during development and minified production bundles. |
| **Tailwind CSS v3.4** | Utility-First CSS Framework | Allows rapid responsive layout styling using inline utility classes (`flex`, `grid`, `rounded-xl`, `bg-slate-900`) without bloated external stylesheets. |
| **Lucide React** | Feather-Inspired Modern Icon System | Supplies crisp, lightweight SVG icons for navigation (`CheckSquare`, `BookOpen`, `Clock`, `Calendar`, `BarChart3`). |
| **Web Audio API** | HTML5 Native Audio Synthesizer | Generates pleasant frequency tones/chimes directly through browser audio hardware when a focus session ends—zero external MP3 files required! |

### ⚙️ Backend (API Server & Logic)

| Technology | What is it? | Why We Use It |
| :--- | :--- | :--- |
| **Python 3.10+** | Core Programming Language | Clean, legible syntax, rich ecosystem, and native coroutine support (`async` / `await`). |
| **FastAPI** | High-Performance ASGI Web Microframework | One of the fastest Python frameworks available. Automatically parses JSON, validates inputs, and generates interactive Swagger documentation at `/docs`. |
| **Uvicorn** | Asynchronous Server Gateway Interface (ASGI) | The high-speed web server engine that runs the FastAPI application and handles incoming HTTP requests. |
| **Motor** | Asynchronous MongoDB Driver | Built on `asyncio` and `PyMongo`. Lets FastAPI query the cloud database non-blockingly without choking concurrent threads. |
| **Pydantic v2** | Data Validation & Schema Library | Acts as the **security guard** for every endpoint. If the frontend sends an invalid string or missing field, Pydantic catches it before it touches the database. |
| **DNSPython** | Python DNS Toolkit | Handles MongoDB Atlas SRV (`mongodb+srv://`) connection resolution using public Google (`8.8.8.8`) and Cloudflare (`1.1.1.1`) DNS resolvers. |
| **Certifi** | Verified Mozilla SSL/TLS Root Certificates | Ensures encrypted, secure TLS connections between the local Windows machine and MongoDB Atlas cloud clusters. |

### 🗄️ Database (Cloud Storage)

| Technology | What is it? | Why We Use It |
| :--- | :--- | :--- |
| **MongoDB Atlas** | Distributed Cloud NoSQL Document Database | Stores all student records as flexible, JSON-like BSON documents. Offers automated backups, high availability, and zero local database installation overhead. |
| **BSON & ObjectId** | Binary JSON & 24-Hex Character Identifiers | Every document stored in MongoDB automatically gets a unique `_id` (e.g. `66f...`), which our backend maps to clean string IDs for React. |

---

## 3. PROJECT DIRECTORY STRUCTURE: WHERE IS WHAT?

```text
studymate/
├── Backend/                       # Python FastAPI Backend Service
│   ├── .env                      # Cloud credentials (MONGODB_URL, DATABASE_NAME)
│   ├── .env.example              # Sample environment template for setup
│   ├── .gitignore                # Ignores venv/, __pycache__/, .env
│   ├── main.py                   # Master FastAPI application & all REST route handlers
│   ├── requirements.txt          # Python dependencies (fastapi, uvicorn, motor, etc.)
│   └── venv/                     # Python isolated virtual environment
│
├── frontend/                      # React 18 Single-Page Application (Vite)
│   ├── public/                   # Public static assets & favicon
│   ├── src/
│   │   ├── components/           # Reusable UI building blocks
│   │   │   ├── dashboard.jsx     # Overview statistics & recent activities view
│   │   │   ├── notecard.jsx      # Note preview card with delete/edit triggers
│   │   │   ├── pageanimation.jsx # Smooth page transition wrapper
│   │   │   ├── schedulecard.jsx  # Lecture / exam time slot display card
│   │   │   ├── sidebar.jsx       # Left navigation menu with route highlights
│   │   │   ├── subjectcard.jsx   # Subject course card with syllabus progress bar
│   │   │   ├── task.jsx          # Task listing component
│   │   │   ├── taskcard.jsx      # Individual task card (checkbox, priority tag)
│   │   │   └── timer.jsx         # Pomodoro circular countdown timer
│   │   ├── context/
│   │   │   └── studycontext.jsx  # Central React Context state provider & cloud sync
│   │   ├── pages/                # Top-level route pages
│   │   │   ├── about.jsx         # About the project & author credentials
│   │   │   ├── feedback.jsx      # Feedback form sending entries to MongoDB
│   │   │   ├── notes.jsx         # Full revision notes management interface
│   │   │   ├── progress.jsx      # Academic performance & streak analytics
│   │   │   ├── schedule.jsx      # Timetable & calendar agenda interface
│   │   │   ├── settings.jsx      # Theme preferences & storage sanitization
│   │   │   ├── subject.jsx       # Subject catalog & syllabus tracker page
│   │   │   └── timer.jsx         # Dedicated focus timer page with session logs
│   │   ├── services/
│   │   │   └── api.js            # Central API client communicating with backend
│   │   ├── style/
│   │   │   └── animations.css    # Custom CSS keyframe animations
│   │   ├── App.jsx               # Main application layout & active page router
│   │   ├── index.css             # Tailwind CSS base imports & dark theme variables
│   │   └── main.jsx              # React DOM root entry point
│   ├── index.html                # HTML5 template container
│   ├── package.json              # Frontend npm dependencies and scripts
│   ├── vercel.json               # Production deployment rewrite rules
│   └── vite.config.js            # Vite build configuration & /api reverse proxy
│
├── .gitignore                    # Root git ignore rules
└── README.md                     # Master documentation & developer notes
```

---

## 4. THE 6 CORE MODULES EXPLAINED

### 1️⃣ Overview Dashboard (`/`)
- Aggregates live counts of pending tasks, notes, active subjects, and study streak count.
- Displays quick-action shortcuts to jump straight into a Pomodoro session or add a revision note.

### 2️⃣ Academic Task Queue (`/tasks`)
- **Fields:** `title`, `subject`, `priority` (`Low` / `Medium` / `High`), `dueDate`, `completed`.
- **Functionality:** 
  - One-click task completion toggle (`PATCH /api/tasks/{id}/toggle`).
  - Color-coded priority badges (Red for High, Amber for Medium, Green for Low).
  - Subject filtering tabs and overdue date alerts.

### 3️⃣ Revision Notes Vault (`/notes`)
- **Fields:** `title`, `subject`, `content`, `createdAt`.
- **Functionality:**
  - Fast search query filtering by keywords and subject.
  - Multi-line revision summaries for exam preparation.
  - Instant edit modal and cloud-synchronized deletion.

### 4️⃣ Subject & Syllabus Tracker (`/subjects`)
- **Fields:** `name`, `tasks`, `progress` (0–100%).
- **Functionality:**
  - Visual completion percentage bar for course syllabus monitoring.
  - Automatically correlates pending tasks to specific academic subjects.

### 5️⃣ Timetable & Schedule Planner (`/schedule`)
- **Fields:** `title`, `subject`, `date`, `startTime`, `endTime`.
- **Functionality:**
  - Organizes university lecture schedules, practical labs, and exam slots.
  - Chronological agenda ordering preventing overlapping time conflicts.

### 6️⃣ Pomodoro Focus Timer (`/timer`)
- **Functionality:**
  - Standard 25-minute study intervals followed by 5-minute restorative breaks.
  - Animated SVG circular progress ring visualizing elapsed time.
  - Custom browser synthesizer tone plays automatically upon session completion.
  - Records session history to MongoDB Atlas to compute total focus hours.

---

## 5. DATA FLOW: FRONTEND ⇄ BACKEND ⇄ CLOUD

```text
┌─────────────────────────────────────────────────────────────┐
│                 REACT FRONTEND (PORT 5173)                  │
│  User clicks "Add Task" ➔ Updates Local State & Storage     │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ HTTP Request (JSON)
                               │ Vite Proxy forwards /api/tasks
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 FASTAPI BACKEND (PORT 8000)                 │
│  1. Pydantic validates payload (TaskModel)                  │
│  2. Timestamp added: createdAt = datetime.now(timezone.utc) │
│  3. Motor async driver sends non-blocking BSON query        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ Async TLS Connection (Port 27017)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                MONGODB ATLAS CLOUD DATABASE                 │
│  Cluster: studymate.kqdkjqn.mongodb.net                     │
│  Database: studymate ➔ Collection: tasks                    │
│  Saves document & returns generated ObjectId                │
└─────────────────────────────────────────────────────────────┘
```

### Why Optimistic UI Updates Matter
1. When you add or toggle a task, React **instantly** updates the screen in 0 milliseconds.
2. An asynchronous API request is sent in the background.
3. If the backend is running, the item receives its official MongoDB `ObjectId`.
4. If the user is offline, the task stays securely saved in browser `localStorage` and never blocks the user.

---

## 6. COMPLETE REST API REFERENCE

All endpoints are served from base path: `http://localhost:8000/api`

### 🩺 System
| Method | Endpoint | Description | Response Example |
| :---: | :--- | :--- | :--- |
| `GET` | `/health` | Check API & MongoDB connection status | `{"status": "healthy", "database": "connected"}` |

### 📝 Tasks Module
| Method | Endpoint | Description | Payload / Query |
| :---: | :--- | :--- | :--- |
| `GET` | `/tasks` | List all tasks sorted by creation date | None |
| `POST` | `/tasks` | Create a new academic task | `{"title":"Read Ch. 4","subject":"CS","priority":"High"}` |
| `PUT` | `/tasks/{id}` | Update task title, date, or priority | `{"title":"Read Ch. 4 & 5"}` |
| `PATCH`| `/tasks/{id}/toggle` | Toggle `completed` state true/false | None |
| `DELETE`| `/tasks/{id}` | Permanently delete task from database | None |

### 📚 Notes Module
| Method | Endpoint | Description | Payload |
| :---: | :--- | :--- | :--- |
| `GET` | `/notes` | Fetch all revision notes | None |
| `POST` | `/notes` | Save a new revision note | `{"title":"OS Deadlocks","subject":"OS","content":"..."}` |
| `PUT` | `/notes/{id}` | Edit an existing note's content | `{"content":"Updated deadlock prevention methods..."}` |
| `DELETE`| `/notes/{id}` | Delete revision note | None |

### 🎓 Subjects Module
| Method | Endpoint | Description | Payload |
| :---: | :--- | :--- | :--- |
| `GET` | `/subjects` | Fetch all subject progress cards | None |
| `POST` | `/subjects` | Create a new subject | `{"name":"Computer Networks","progress":45}` |
| `DELETE`| `/subjects/{id}` | Delete subject card | None |

### 📅 Schedule Module
| Method | Endpoint | Description | Payload |
| :---: | :--- | :--- | :--- |
| `GET` | `/schedule` | Fetch timetable schedule entries | None |
| `POST` | `/schedule` | Add a class / study block | `{"title":"DBMS Lab","date":"2026-09-15","startTime":"10:00","endTime":"12:00"}` |
| `PUT` | `/schedule/{id}` | Update schedule timings or title | `{"startTime":"11:00"}` |
| `DELETE`| `/schedule/{id}` | Remove schedule entry | None |

### ⏱️ Sessions (Focus Timer) Module
| Method | Endpoint | Description | Payload |
| :---: | :--- | :--- | :--- |
| `GET` | `/sessions` | Get total study streak & completed hours | None |
| `POST` | `/sessions` | Log a completed Pomodoro study session | Empty body (auto-logs current UTC timestamp) |

---

## 7. PROJECT PLANNING & SDLC (GANTT & PERT NOTES)

The development lifecycle for Study Mate is governed by standard Software Engineering project management methodologies: **Gantt Scheduling** and **PERT / CPM (Critical Path Method)**.

- **Total Project Duration:** **59 Calendar Days / 9 Academic Weeks**
- **Schedule Window:** **01-August-2026 to 28-September-2026**
- **Engineering Path:** Critical Path with zero slack time ($TF = 0\text{d}$) determines the minimum delivery schedule.

### Unified 10-Activity SDLC Breakdown

| ID | SDLC Activity Description | Duration | Planned Dates | Predecessors | Node Arc | Total Float | Status |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **T01** | Requirement Analysis & Feasibility Study | 6 Days | 01-Aug – 06-Aug | — | $1 \rightarrow 2$ | 0d | **Critical** |
| **T02** | System Architecture & Wireframing | 7 Days | 07-Aug – 13-Aug | T01 | $2 \rightarrow 3$ | 0d | **Critical** |
| **T03** | MongoDB Schema & Data Modeling | 6 Days | 14-Aug – 19-Aug | T02 | $3 \rightarrow 4$ | 0d | **Critical** |
| **T04** | FastAPI Backend Core & REST APIs | 12 Days | 20-Aug – 31-Aug | T03 | $4 \rightarrow 6$ | 0d | **Critical** |
| **T05** | React UI Foundation & Theming | 9 Days | 14-Aug – 22-Aug | T02 | $3 \rightarrow 5$ | 2d | Parallel |
| **T06** | Academic Tasks & Notes Vault | 7 Days | 23-Aug – 29-Aug | T05 | $5 \rightarrow 6$ | 2d | Parallel |
| **T07** | Focus Timer & Schedule Planner | 8 Days | 20-Aug – 27-Aug | T03 | $4 \rightarrow 6$ | 4d | Parallel |
| **T08** | Full-Stack Integration & Cloud Sync | 9 Days | 01-Sep – 09-Sep | T04, T06, T07 | $6 \rightarrow 7$ | 0d | **Critical** |
| **T09** | System Testing, Security & QA | 9 Days | 10-Sep – 18-Sep | T08 | $7 \rightarrow 8$ | 0d | **Critical** |
| **T10** | Documentation & Project Release | 10 Days | 19-Sep – 28-Sep | T09 | $8 \rightarrow 9$ | 0d | **Critical** |

> **Critical Path:** $\text{Node } 1 \rightarrow 2 \rightarrow 3 \rightarrow 4 \rightarrow 6 \rightarrow 7 \rightarrow 8 \rightarrow 9$  
> **Mathematical Verification:** $6 + 7 + 6 + 12 + 9 + 9 + 10 = \mathbf{59\text{ Days}}$

Both the official **Gantt Chart** and the vector-precision **PERT Network Diagram** are saved in your `webdev/` folder and embedded inside the project synopsis document (`PROJECT.docx`).

---

## 8. DEVELOPER SETUP & RUN COMMANDS

### Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.10, v3.11, or v3.12)
- Free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

### Step 1: Start the Backend (Terminal 1)

Open PowerShell and run:

```powershell
# Navigate into the Backend directory
cd "C:\Users\Ayush Bhandari\webdev\studymate\Backend"

# Activate the existing virtual environment
.\venv\Scripts\activate

# Launch the FastAPI server with auto-reload
uvicorn main:app --reload --port 8000
```

> **API Server URL:** `http://localhost:8000`  
> **Interactive Swagger Docs:** `http://localhost:8000/docs`  
> *(Test and execute any API call directly from Swagger without writing any code!)*

---

### Step 2: Start the Frontend (Terminal 2)

Open a second PowerShell window and run:

```powershell
# Navigate into the frontend directory
cd "C:\Users\Ayush Bhandari\webdev\studymate\frontend"

# Launch Vite development server
npm run dev
```

> **Web Application URL:** `http://localhost:5173`

---

## 9. TROUBLESHOOTING & FAQS

### Q1: The backend says `MongoDB Atlas Cloud is currently unreachable`
- **Root Cause:** MongoDB Atlas has an IP Access List firewall. If your home or mobile hotspot WiFi assigned you a new public IP address, Atlas blocks the connection.
- **Fix:** 
  1. Open [cloud.mongodb.com](https://cloud.mongodb.com).
  2. Navigate to **Security ➔ Network Access**.
  3. Click **Add IP Address** and select **Allow Access from Anywhere (`0.0.0.0/0`)**.
  4. Save changes. Within 60 seconds, the backend will reconnect automatically!

### Q2: What if MongoDB is down? Does the app stop working?
- **No!** Study Mate is built with **resilient offline fallback**. If MongoDB is unreachable, the backend enters resilient mode and the frontend automatically preserves and updates your data inside browser `localStorage`.

### Q3: Why does Vite proxy `/api` requests to port `8000`?
- By proxying `/api` in `vite.config.js`, the React app talks directly to `/api/...` as if it were on the same origin. This completely avoids browser CORS (Cross-Origin Resource Sharing) blocks during development.

---

*Authored by Ayush Bhandari • Study Mate Development Team • Uttaranchal University (USCS)*
