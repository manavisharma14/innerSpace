from pydantic import BaseModel
from typing import Optional
from datetime import date

class JournalEntry(BaseModel):
    user_id: str
    date: date
    gratitude: str
    mood_emotion: Optional[str] = None   # from MoodSelect.jsx
    mood_physical: Optional[str] = None  # from physicalState input
    self_care: Optional[str] = None
    notes: Optional[str] = None
    wake_up_time: Optional[str] = None     # new
    sleep_time: Optional[str] = None       # new
    water_intake: Optional[str] = None     # new
    task: Optional[str] = None             # new
    task_status: Optional[str] = None      # new
