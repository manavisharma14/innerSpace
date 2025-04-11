from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

router = APIRouter()

# Load API Key
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class JournalEntry(BaseModel):
    gratitude: str
    physicalState: str
    selfCare: str
    notes: str
    createdAt: str

@router.post("/analyze/")
async def analyze_journal(entry: JournalEntry):

    prompt = f"""
    You're an empathetic well-being coach for a journaling app.

    Your job is to read today's journal entry and respond like a real person — warm, encouraging, realistic.

    Please return:

    1. A short reflection summary (conversational, warm tone)
    2. A personal affirmation (relatable, down-to-earth)
    3. A gentle suggestion for tomorrow (small action, healthy habit, mindset shift)

    --- Journal Entry ---
    Gratitude: {entry.gratitude}
    Physical State: {entry.physicalState}
    Self Care: {entry.selfCare}
    Notes: {entry.notes}
    ----------------------

    Be kind. Be specific. Be human.
    """

    model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
    response = model.generate_content(prompt)

    return {"reflection": response.text}
