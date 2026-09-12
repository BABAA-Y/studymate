import os
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from typing import Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection variables
MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME", "studymate")

# Global database connection objects
db_client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_client, db
    print("Connecting to MongoDB Atlas...")
    db_client = AsyncIOMotorClient(MONGODB_URL)
    db = db_client[DATABASE_NAME]
    # Test connection
    await db_client.admin.command('ping')
    print("[OK] Connected to MongoDB Atlas Cloud!")
    yield
    if db_client:
        db_client.close()
        print("MongoDB connection closed.")

app = FastAPI(title="Study Mate API", lifespan=lifespan)

# Allow requests from React frontend (local and production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# DATA MODELS & HELPERS
# ==========================================

# 1. TASKS
class TaskModel(BaseModel):
    title: str = Field(..., min_length=1)
    subject: str = "General"
    priority: str = "Medium"
    dueDate: Optional[str] = None
    completed: bool = False

def task_helper(task) -> dict:
    return {
        "id": str(task["_id"]),
        "title": task.get("title", ""),
        "subject": task.get("subject", "General"),
        "priority": task.get("priority", "Medium"),
        "dueDate": task.get("dueDate"),
        "completed": task.get("completed", False),
    }

# 2. NOTES
class NoteModel(BaseModel):
    title: str = Field(..., min_length=1)
    subject: str = "General"
    content: str = ""

def note_helper(note) -> dict:
    return {
        "id": str(note["_id"]),
        "title": note.get("title", ""),
        "subject": note.get("subject", "General"),
        "content": note.get("content", ""),
    }

# 3. SUBJECTS
class SubjectModel(BaseModel):
    name: str = Field(..., min_length=1)
    tasks: int = 0
    progress: int = 0

def subject_helper(subject) -> dict:
    return {
        "id": str(subject["_id"]),
        "name": subject.get("name", ""),
        "tasks": subject.get("tasks", 0),
        "progress": subject.get("progress", 0),
    }

# 4. SCHEDULE
class ScheduleModel(BaseModel):
    title: str = Field(..., min_length=1)
    subject: str = "General"
    date: str
    startTime: str
    endTime: str

def schedule_helper(item) -> dict:
    return {
        "id": str(item["_id"]),
        "title": item.get("title", ""),
        "subject": item.get("subject", "General"),
        "date": item.get("date", ""),
        "startTime": item.get("startTime", ""),
        "endTime": item.get("endTime", ""),
    }

# ==========================================
# SYSTEM ROUTES
# ==========================================
@app.get("/")
async def root():
    return {"status": "online", "system": "Study Mate API", "database": "MongoDB Atlas"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# ==========================================
# 1. TASKS CRUD ROUTES
# ==========================================
@app.get("/api/tasks", tags=["Tasks"])
async def get_tasks():
    tasks = []
    cursor = db["tasks"].find().sort("createdAt", -1)
    async for document in cursor:
        tasks.append(task_helper(document))
    return tasks

@app.post("/api/tasks", status_code=status.HTTP_201_CREATED, tags=["Tasks"])
async def create_task(task: TaskModel):
    task_dict = task.model_dump()
    task_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["tasks"].insert_one(task_dict)
    created = await db["tasks"].find_one({"_id": result.inserted_id})
    return task_helper(created)

@app.patch("/api/tasks/{task_id}/toggle", tags=["Tasks"])
async def toggle_task(task_id: str):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid Task ID")
    task = await db["tasks"].find_one({"_id": ObjectId(task_id)})
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    new_status = not task.get("completed", False)
    await db["tasks"].update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"completed": new_status}}
    )
    return {"id": task_id, "completed": new_status}

@app.delete("/api/tasks/{task_id}", tags=["Tasks"])
async def delete_task(task_id: str):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid Task ID")
    result = await db["tasks"].delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully", "id": task_id}

# ==========================================
# 2. NOTES CRUD ROUTES
# ==========================================
@app.get("/api/notes", tags=["Notes"])
async def get_notes():
    notes = []
    cursor = db["notes"].find().sort("createdAt", -1)
    async for document in cursor:
        notes.append(note_helper(document))
    return notes

@app.post("/api/notes", status_code=status.HTTP_201_CREATED, tags=["Notes"])
async def create_note(note: NoteModel):
    note_dict = note.model_dump()
    note_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["notes"].insert_one(note_dict)
    created = await db["notes"].find_one({"_id": result.inserted_id})
    return note_helper(created)

@app.delete("/api/notes/{note_id}", tags=["Notes"])
async def delete_note(note_id: str):
    if not ObjectId.is_valid(note_id):
        raise HTTPException(status_code=400, detail="Invalid Note ID")
    result = await db["notes"].delete_one({"_id": ObjectId(note_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted successfully", "id": note_id}

# ==========================================
# 3. SUBJECTS CRUD ROUTES
# ==========================================
@app.get("/api/subjects", tags=["Subjects"])
async def get_subjects():
    subjects = []
    cursor = db["subjects"].find().sort("createdAt", 1)
    async for document in cursor:
        subjects.append(subject_helper(document))
    return subjects

@app.post("/api/subjects", status_code=status.HTTP_201_CREATED, tags=["Subjects"])
async def create_subject(subject: SubjectModel):
    sub_dict = subject.model_dump()
    sub_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["subjects"].insert_one(sub_dict)
    created = await db["subjects"].find_one({"_id": result.inserted_id})
    return subject_helper(created)

@app.delete("/api/subjects/{subject_id}", tags=["Subjects"])
async def delete_subject(subject_id: str):
    if not ObjectId.is_valid(subject_id):
        raise HTTPException(status_code=400, detail="Invalid Subject ID")
    result = await db["subjects"].delete_one({"_id": ObjectId(subject_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"message": "Subject deleted successfully", "id": subject_id}

# ==========================================
# 4. SCHEDULE CRUD ROUTES
# ==========================================
@app.get("/api/schedule", tags=["Schedule"])
async def get_schedule():
    schedule = []
    cursor = db["schedule"].find().sort("date", 1)
    async for document in cursor:
        schedule.append(schedule_helper(document))
    return schedule

@app.post("/api/schedule", status_code=status.HTTP_201_CREATED, tags=["Schedule"])
async def create_schedule(item: ScheduleModel):
    item_dict = item.model_dump()
    item_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["schedule"].insert_one(item_dict)
    created = await db["schedule"].find_one({"_id": result.inserted_id})
    return schedule_helper(created)

@app.delete("/api/schedule/{schedule_id}", tags=["Schedule"])
async def delete_schedule(schedule_id: str):
    if not ObjectId.is_valid(schedule_id):
        raise HTTPException(status_code=400, detail="Invalid Schedule ID")
    result = await db["schedule"].delete_one({"_id": ObjectId(schedule_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Schedule entry not found")
    return {"message": "Schedule entry deleted successfully", "id": schedule_id}

# ==========================================
# 5. STUDY TIMER SESSIONS
# ==========================================
@app.get("/api/sessions", tags=["Sessions"])
async def get_sessions_count():
    count = await db["sessions"].count_documents({})
    return {"sessions": count}

@app.post("/api/sessions", status_code=status.HTTP_201_CREATED, tags=["Sessions"])
async def record_session():
    new_session = {"completedAt": datetime.now(timezone.utc)}
    await db["sessions"].insert_one(new_session)
    count = await db["sessions"].count_documents({})
    return {"sessions": count, "message": "Session recorded successfully"}