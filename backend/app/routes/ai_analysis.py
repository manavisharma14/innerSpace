from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

router = APIRouter()

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class JournalEntry(BaseModel):
    gratitude: str
    physicalState: str
    selfCare: str
    notes: str
    task: str
    taskStatus: str
    wakeUpTime: str
    sleepTime: str
    waterIntake: str
    mood: str
    createdAt: str


@router.post("/analyze/")
async def analyze_journal(entry: JournalEntry):

    prompt = f"""
You're an empathetic well-being coach helping someone reflect on their day.

Be warm, understanding, and realistic — like a friend who listens deeply and responds kindly.

Look at their full journal entry, understand their day, their energy, and their habits — and write back in a human, conversational tone.

Return ONLY:

1. A short reflection summary — talk to them like a human. Mention specific things from their entry.
2. A personal affirmation — encouraging words that feel real and not cheesy.
3. A gentle suggestion for tomorrow — small, actionable, personalized advice.

--- Journal Entry ---
Gratitude: {entry.gratitude}
Mood Selected: {entry.mood}
Physical State: {entry.physicalState}
Self Care: {entry.selfCare}
Notes: {entry.notes}
Main Task: {entry.task}
Task Completed: {entry.taskStatus}
Wake Up Time: {entry.wakeUpTime}
Sleep Time: {entry.sleepTime}
Water Intake: {entry.waterIntake}
----------------------

Important:
- Be human.
- Be specific.
- Be kind.
- Avoid generic advice.
- Respond like you're talking to them directly.

"""
