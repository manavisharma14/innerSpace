import json
import re
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

Return your response STRICTLY in this JSON format:

{{
"summary": "Short reflection summary (conversational, warm tone)",
"affirmation": "Personal affirmation (encouraging words)",
"suggestion": "Gentle suggestion for tomorrow (specific action)",
"sleepInsight": "Comment on their wake up & sleep times and its effect on their day",
"waterInsight": "Comment on their water intake if needed"
}}

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

Be human. Be specific. Be kind.
Respond ONLY in the JSON format specified.
"""

    try:
        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        response = model.generate_content(prompt)

        print("GEMINI RAW RESPONSE: ", response)

        if response and response.text:
            # Extract clean JSON from Gemini response
            extracted_json = re.search(r"\{.*\}", response.text, re.DOTALL)
            
            if extracted_json:
                parsed_data = json.loads(extracted_json.group())
                return parsed_data  # This will send a clean dict to React

        return {"reflection": "Couldn't generate reflection today. Please try again later!"}

    except Exception as e:
        print("GEMINI ERROR:", e)
        return {"reflection": "AI generation failed due to server error."}