import os
import asyncio
import certifi
import dns.resolver
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from typing import Optional, List
from fastapi import FastAPI, APIRouter, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ServerSelectionTimeoutError, AutoReconnect
from pydantic import BaseModel, Field
from bson import ObjectId
from dotenv import load_dotenv

# Use reliable public DNS resolvers to prevent local router (192.168.1.1) timeouts on MongoDB SRV records
try:
    dns.resolver.default_resolver = dns.resolver.Resolver(configure=False)
    dns.resolver.default_resolver.nameservers = ['8.8.8.8', '1.1.1.1']
except Exception:
    pass

load_dotenv()

# MongoDB connection variables
MONGODB_URL = os.getenv("MONGODB_URL", "").strip()
DATABASE_NAME = os.getenv("DATABASE_NAME", "studymate").strip()

# Global database connection objects
db_client = None
db = None
db_connected = False

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_client, db, db_connected
    print("Connecting to MongoDB Atlas...")
    try:
        db_client = AsyncIOMotorClient(
            MONGODB_URL,
            tlsCAFile=certifi.where(),
            serverSelectionTimeoutMS=3000,
            connectTimeoutMS=3000
        )
        db = db_client[DATABASE_NAME]
        await asyncio.wait_for(db_client.admin.command('ping'), timeout=3.0)
        db_connected = True
        print("[OK] Connected to MongoDB Atlas Cloud!")
    except Exception as err:
        db_connected = False
        print(f"[WARNING] MongoDB Atlas Cloud is currently unreachable: {err}")
        print("[INFO] Server is running in resilient mode. Database calls will retry on availability.")
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

@app.exception_handler(ServerSelectionTimeoutError)
@app.exception_handler(AutoReconnect)
async def mongo_exception_handler(request, exc):
    return JSONResponse(
        status_code=503,
        content={
            "error": "Database unreachable",
            "detail": "MongoDB Atlas connection timed out. Ensure your public IP is whitelisted (0.0.0.0/0) in Atlas Network Access."
        }
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

class TaskUpdateModel(BaseModel):
    title: Optional[str] = None
    subject: Optional[str] = None
    priority: Optional[str] = None
    dueDate: Optional[str] = None
    completed: Optional[bool] = None

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

class NoteUpdateModel(BaseModel):
    title: Optional[str] = None
    subject: Optional[str] = None
    content: Optional[str] = None

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

class ScheduleUpdateModel(BaseModel):
    title: Optional[str] = None
    subject: Optional[str] = None
    date: Optional[str] = None
    startTime: Optional[str] = None
    endTime: Optional[str] = None

def schedule_helper(item) -> dict:
    return {
        "id": str(item["_id"]),
        "title": item.get("title", ""),
        "subject": item.get("subject", "General"),
        "date": item.get("date", ""),
        "startTime": item.get("startTime", ""),
        "endTime": item.get("endTime", ""),
    }

# 5. FEEDBACK
class FeedbackModel(BaseModel):
    name: str = "Anonymous"
    email: str = "Not provided"
    type: str = "General Feedback"
    message: str = Field(..., min_length=1)

def feedback_helper(item) -> dict:
    created = item.get("createdAt")
    created_str = created.isoformat() if isinstance(created, datetime) else str(created or "")
    return {
        "id": str(item["_id"]),
        "name": item.get("name", "Anonymous"),
        "email": item.get("email", "Not provided"),
        "type": item.get("type", "General Feedback"),
        "message": item.get("message", ""),
        "createdAt": created_str,
    }

# ==========================================
# ROUTER (Mounted on / and /api)
# ==========================================
api_router = APIRouter()

# --- System & Health ---
@api_router.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "database": "connected" if db_connected else "disconnected (offline mode)",
    }

# --- 1. TASKS ---
@api_router.get("/tasks", tags=["Tasks"])
async def get_tasks():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    tasks = []
    cursor = db["tasks"].find().sort("createdAt", -1)
    async for document in cursor:
        tasks.append(task_helper(document))
    return tasks

@api_router.post("/tasks", status_code=status.HTTP_201_CREATED, tags=["Tasks"])
async def create_task(task: TaskModel):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    task_dict = task.model_dump()
    task_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["tasks"].insert_one(task_dict)
    created = await db["tasks"].find_one({"_id": result.inserted_id})
    return task_helper(created)

@api_router.put("/tasks/{task_id}", tags=["Tasks"])
async def update_task(task_id: str, updates: TaskUpdateModel):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid Task ID")
    update_data = {k: v for k, v in updates.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    result = await db["tasks"].update_one(
        {"_id": ObjectId(task_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    updated = await db["tasks"].find_one({"_id": ObjectId(task_id)})
    return task_helper(updated)

@api_router.patch("/tasks/{task_id}/toggle", tags=["Tasks"])
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

@api_router.delete("/tasks/{task_id}", tags=["Tasks"])
async def delete_task(task_id: str):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(status_code=400, detail="Invalid Task ID")
    result = await db["tasks"].delete_one({"_id": ObjectId(task_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully", "id": task_id}

# --- 2. NOTES ---
@api_router.get("/notes", tags=["Notes"])
async def get_notes():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    notes = []
    cursor = db["notes"].find().sort("createdAt", -1)
    async for document in cursor:
        notes.append(note_helper(document))
    return notes

@api_router.post("/notes", status_code=status.HTTP_201_CREATED, tags=["Notes"])
async def create_note(note: NoteModel):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    note_dict = note.model_dump()
    note_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["notes"].insert_one(note_dict)
    created = await db["notes"].find_one({"_id": result.inserted_id})
    return note_helper(created)

@api_router.put("/notes/{note_id}", tags=["Notes"])
async def update_note(note_id: str, updates: NoteUpdateModel):
    if not ObjectId.is_valid(note_id):
        raise HTTPException(status_code=400, detail="Invalid Note ID")
    update_data = {k: v for k, v in updates.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    result = await db["notes"].update_one(
        {"_id": ObjectId(note_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    updated = await db["notes"].find_one({"_id": ObjectId(note_id)})
    return note_helper(updated)

@api_router.delete("/notes/{note_id}", tags=["Notes"])
async def delete_note(note_id: str):
    if not ObjectId.is_valid(note_id):
        raise HTTPException(status_code=400, detail="Invalid Note ID")
    result = await db["notes"].delete_one({"_id": ObjectId(note_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"message": "Note deleted successfully", "id": note_id}

# --- 3. SUBJECTS ---
@api_router.get("/subjects", tags=["Subjects"])
async def get_subjects():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    subjects = []
    cursor = db["subjects"].find().sort("createdAt", 1)
    async for document in cursor:
        subjects.append(subject_helper(document))
    return subjects

@api_router.post("/subjects", status_code=status.HTTP_201_CREATED, tags=["Subjects"])
async def create_subject(subject: SubjectModel):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    sub_dict = subject.model_dump()
    sub_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["subjects"].insert_one(sub_dict)
    created = await db["subjects"].find_one({"_id": result.inserted_id})
    return subject_helper(created)

@api_router.delete("/subjects/{subject_id}", tags=["Subjects"])
async def delete_subject(subject_id: str):
    if not ObjectId.is_valid(subject_id):
        raise HTTPException(status_code=400, detail="Invalid Subject ID")
    result = await db["subjects"].delete_one({"_id": ObjectId(subject_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Subject not found")
    return {"message": "Subject deleted successfully", "id": subject_id}

# --- 4. SCHEDULE ---
@api_router.get("/schedule", tags=["Schedule"])
async def get_schedule():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    schedule = []
    cursor = db["schedule"].find().sort("date", 1)
    async for document in cursor:
        schedule.append(schedule_helper(document))
    return schedule

@api_router.post("/schedule", status_code=status.HTTP_201_CREATED, tags=["Schedule"])
async def create_schedule(item: ScheduleModel):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    item_dict = item.model_dump()
    item_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["schedule"].insert_one(item_dict)
    created = await db["schedule"].find_one({"_id": result.inserted_id})
    return schedule_helper(created)

@api_router.put("/schedule/{schedule_id}", tags=["Schedule"])
async def update_schedule(schedule_id: str, updates: ScheduleUpdateModel):
    if not ObjectId.is_valid(schedule_id):
        raise HTTPException(status_code=400, detail="Invalid Schedule ID")
    update_data = {k: v for k, v in updates.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields provided for update")
    result = await db["schedule"].update_one(
        {"_id": ObjectId(schedule_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Schedule entry not found")
    updated = await db["schedule"].find_one({"_id": ObjectId(schedule_id)})
    return schedule_helper(updated)

@api_router.delete("/schedule/{schedule_id}", tags=["Schedule"])
async def delete_schedule(schedule_id: str):
    if not ObjectId.is_valid(schedule_id):
        raise HTTPException(status_code=400, detail="Invalid Schedule ID")
    result = await db["schedule"].delete_one({"_id": ObjectId(schedule_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Schedule entry not found")
    return {"message": "Schedule entry deleted successfully", "id": schedule_id}

# --- 5. STUDY SESSIONS ---
@api_router.get("/sessions", tags=["Sessions"])
async def get_sessions_count():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    count = await db["sessions"].count_documents({})
    return {"sessions": count}

@api_router.post("/sessions", status_code=status.HTTP_201_CREATED, tags=["Sessions"])
async def record_session():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    new_session = {"completedAt": datetime.now(timezone.utc)}
    await db["sessions"].insert_one(new_session)
    count = await db["sessions"].count_documents({})
    return {"sessions": count, "message": "Session recorded successfully"}

# --- 6. FEEDBACK ---
@api_router.get("/feedback", tags=["Feedback"])
async def get_feedback():
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    feedbacks = []
    cursor = db["feedbacks"].find().sort("createdAt", -1)
    async for document in cursor:
        feedbacks.append(feedback_helper(document))
    return feedbacks

@api_router.post("/feedback", status_code=status.HTTP_201_CREATED, tags=["Feedback"])
async def create_feedback(item: FeedbackModel):
    if db is None:
        raise HTTPException(status_code=503, detail="Database not ready")
    item_dict = item.model_dump()
    item_dict["createdAt"] = datetime.now(timezone.utc)
    result = await db["feedbacks"].insert_one(item_dict)
    created = await db["feedbacks"].find_one({"_id": result.inserted_id})
    return feedback_helper(created)

# Mount router on both /api (standard) and / (fallback for VITE_API_URL pointing to domain root)
app.include_router(api_router, prefix="/api")
app.include_router(api_router)

@app.get("/", tags=["System"])
async def root():
    return {
        "status": "online",
        "system": "Study Mate API",
        "database": "MongoDB Atlas Cloud",
        "database_connected": db_connected,
        "docs": "/docs"
    }