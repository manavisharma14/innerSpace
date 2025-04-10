# app/routes/ai_analysis.py

from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai  # Google Gemini SDK
import os

router = APIRouter()

# Load Gemini API Key from .env or directly here
genai.configure(api_key=os.getenv("AIzaSyBP6UMwzyODQhNiNH-FW04ij6Q-JowreKA"))

class JournalEntry(BaseModel):
    gratitude: str
    physicalState: str
    selfCare: str
    notes: str
    createdAt: str

@router.post("/analyze/")
async def analyze_journal(entry: JournalEntry):

    prompt = f"""
    Analyze this journaling entry and return:
    - A reflection summary (empathetic tone)
    - A positive affirmation generated from the context
    - One gentle suggestion for the user

    Journal:
    Gratitude: {entry.gratitude}
    Physical State: {entry.physicalState}
    Self Care: {entry.selfCare}
    Notes: {entry.notes}
    """

    model = genai.getGenerativeModel({"model": "models/gemini-1.5-pro-latest"})
    response = model.generate_content(prompt)

    return {"reflection": response.text}
