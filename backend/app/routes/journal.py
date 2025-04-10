from fastapi import APIRouter
from app.models import JournalEntry  # import your JournalEntry model/schema

router = APIRouter()

# In-memory fake database (temporary storage)
fake_db = []


# Create Journal Entry (POST)
@router.post("/journal/")
async def create_entry(entry: JournalEntry):
    fake_db.append(entry)
    return {
        "message": "Entry created successfully!",
        "entry": entry
    }


# Get All Journal Entries (GET)
@router.get("/journal/")
async def get_all_entries():
    return fake_db
