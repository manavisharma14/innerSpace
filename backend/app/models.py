from pydantic import BaseModel
from typing import Optional
from datetime import date

class JournalEntry(BaseModel):
    user_id: str
    date: date
    gratitude: str
    mood: Optional[str] = None
    self_care: Optional[str] = None
    notes: Optional[str] = None
