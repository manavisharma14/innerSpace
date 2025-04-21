from fastapi import APIRouter, HTTPException
from app.schemas import JournalEntry
from app.models import journal
from app.db import database
from sqlalchemy.dialects.postgresql import insert

router = APIRouter()

# Create or update journal entry
@router.post("/journal/")
async def create_or_update_entry(entry: JournalEntry):
    query = insert(journal).values(
        user_id=entry.user_id,
        date=entry.date,
        gratitude=entry.gratitude,
        mood_emotion=entry.mood_emotion,
        mood_physical=entry.mood_physical,
        self_care=entry.self_care,
        notes=entry.notes,
        wake_up_time=entry.wake_up_time,
        sleep_time=entry.sleep_time,
        water_intake=entry.water_intake,
        task=entry.task,
        task_status=entry.task_status,
    ).on_conflict_do_update(
        index_elements=["user_id", "date"],
        set_={
            "gratitude": entry.gratitude,
            "mood_emotion": entry.mood_emotion,
            "mood_physical": entry.mood_physical,
            "self_care": entry.self_care,
            "notes": entry.notes,
            "wake_up_time": entry.wake_up_time,
            "sleep_time": entry.sleep_time,
            "water_intake": entry.water_intake,
            "task": entry.task,
            "task_status": entry.task_status,
        }
    )
    await database.execute(query)
    return {"message": "Entry created or updated successfully"}


# Get all entries
@router.get("/journal/")
async def get_all_entries():
    query = journal.select()
    return await database.fetch_all(query)


# ✅ NEW: Get all entries for a specific user
@router.get("/journal/user/{user_id}")
async def get_entries_by_user(user_id: str):
    query = journal.select().where(journal.c.user_id == user_id)
    return await database.fetch_all(query)



# Get entry by date (optional)
@router.get("/journal/date/{date}")
async def get_entry_by_date(date: str):
    query = journal.select().where(journal.c.date == date)
    entry = await database.fetch_one(query)
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry
