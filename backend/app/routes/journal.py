from fastapi import APIRouter, HTTPException
from app.schemas import JournalEntry

from app.models import journal
from app.db import database

router = APIRouter()



@router.post("/journal/")
async def create_entry(entry: JournalEntry):
    query = journal.insert().values(
        user_id = entry.user_id,
        date = entry.date,
        gratitude = entry.gratitude,
        mood = entry.mood,
        self_care = entry.self_care,
        notes = entry.notes
    )

    await database.execute(query)
    return {"message": "Entry created successfully"}


@router.get("/journal/")
async def get_all_entries():
    query = journal.select()
    return await database.fetch_all(query)



# New: Get Entry by Date
@router.get("/journal/{date}")
async def get_entry_by_date(date: str):
    query = journal.select().where(journal.c.date == date)
    entry = await database.fetch_one(query)
    if entry is None:
        raise HTTPException(status_code=404, detail="Entry not found")
    return entry
