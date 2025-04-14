from fastapi import APIRouter
from app.db import database
from app.models import journal
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/weekly-reflection/{user_id}")
async def weekly_reflection(user_id: str):
    today = datetime.now().date()
    week_ago = today - timedelta(days=7)

    query = journal.select().where(
        (journal.c.user_id == user_id) &
        (journal.c.date >= week_ago)
    )

    entries = await database.fetch_all(query)

    # Mood Trends (Emotional + Physical)
    mood_emotion_trend = [
        {
            "date": entry["date"],
            "moodScore": len(entry["mood_emotion"]) if entry["mood_emotion"] else 5
        }
        for entry in entries
    ]

    mood_physical_trend = [
        {
            "date": entry["date"],
            "moodScore": len(entry["mood_physical"]) if entry["mood_physical"] else 5
        }
        for entry in entries
    ]

    # Sleep & Wake Time
    sleep_times = [
        {
            "date": entry["date"],
            "wakeUpTime": int(entry["wake_up_time"].split(":")[0]) if entry["wake_up_time"] else 0,
            "sleepTime": int(entry["sleep_time"].split(":")[0]) if entry["sleep_time"] else 0
        }
        for entry in entries
    ]

    # Task Completion
    status_count = {"yes": 0, "no": 0, "maybe": 0}
    for entry in entries:
        status = entry["task_status"] if entry["task_status"] in status_count else "maybe"
        status_count[status] += 1

    task_completion = [{"status": k, "value": v} for k, v in status_count.items()]

    # Weekly Summary
    avg_sleep = sum(
        [int(entry["sleep_time"].split(":")[0]) - int(entry["wake_up_time"].split(":")[0])
         for entry in entries if entry["sleep_time"] and entry["wake_up_time"]]
    ) / len(entries) if entries else 0

    total_water = sum([int(entry["water_intake"].split()[0]) for entry in entries if entry["water_intake"]]) if entries else 0

    return {
        "moodEmotionTrend": mood_emotion_trend,
        "moodPhysicalTrend": mood_physical_trend,
        "sleepTimes": sleep_times,
        "taskCompletion": task_completion,
        "summary": {
            "avgSleep": round(avg_sleep, 2),
            "totalWaterIntake": f"{total_water} cups",
            "avgMoodEmotion": "Good" if entries else "-",
            "avgMoodPhysical": "Fine" if entries else "-",
        }
    }
