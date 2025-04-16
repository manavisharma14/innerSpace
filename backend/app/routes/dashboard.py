from fastapi import APIRouter, Query
from app.db import database
from app.models import journal
from datetime import datetime, timedelta
from sqlalchemy import select, cast, Date

router = APIRouter()

MOOD_SCORE_MAP = {
    "Excited / Joyful": 10,
    "Smiling": 9,
    "Playful": 8,
    "Calm / Neutral": 7,
    "Surprised / Shocked": 6,
    "Sad / Disappointed": 4,
    "Frustrated / Confused": 3,
    "Worried / Anxious": 2,
    "Angry / Stressed": 1,
}


@router.get("/weekly-reflection/{user_id}")
async def weekly_reflection(user_id: str, offset_weeks: int = Query(0)):
    today = datetime.now().date()

    # Align to calendar week: Monday–Sunday
    monday = today - timedelta(days=today.weekday()) + timedelta(weeks=offset_weeks)
    sunday = monday + timedelta(days=6)

    # Select everything safely and cast date field to Date
    query = select(journal).where(
        (journal.c.user_id == user_id) &
        (cast(journal.c.date, Date) >= monday) &
        (cast(journal.c.date, Date) <= sunday)
    )

    entries = await database.fetch_all(query)
    print("Week range:", monday, "to", sunday)
    print("Fetched entries:", len(entries), [e["date"] for e in entries])

    # Mood Emotion Trend
    mood_emotion_trend = [
    {
        "date": entry["date"],
        "moodScore": MOOD_SCORE_MAP.get(entry["mood_emotion"], 5)
    }
    for entry in entries
]


    # Wake & Sleep Times
    sleep_times = [
        {
            "date": entry["date"],
            "wakeUpTime": int(entry["wake_up_time"].split(":")[0]) if entry["wake_up_time"] else 0,
            "sleepTime": int(entry["sleep_time"].split(":")[0]) if entry["sleep_time"] else 0,
            "sleepDuration": (
                (24 - int(entry["sleep_time"].split(":")[0]) + int(entry["wake_up_time"].split(":")[0]))
                if int(entry["wake_up_time"].split(":")[0]) < int(entry["sleep_time"].split(":")[0])
                else (int(entry["wake_up_time"].split(":")[0]) - int(entry["sleep_time"].split(":")[0]))
            ) if entry["sleep_time"] and entry["wake_up_time"] else 0
        }
        for entry in entries
    ]

    # Task Completion
    status_count = {"yes": 0, "no": 0, "maybe": 0}
    for entry in entries:
        status = entry["task_status"] if entry["task_status"] in status_count else "maybe"
        status_count[status] += 1


    task_completion = [{"status": k, "value": v} for k, v in status_count.items()]

    # Summary Stats
    valid_sleep_entries = [
        (int(entry["sleep_time"].split(":")[0]), int(entry["wake_up_time"].split(":")[0]))
        for entry in entries if entry["sleep_time"] and entry["wake_up_time"]
    ]

    avg_sleep = (
        sum((24 + sleep - wake) % 24 for sleep, wake in valid_sleep_entries) / len(valid_sleep_entries)
        if valid_sleep_entries else 0
    )

    return {
        "moodEmotionTrend": mood_emotion_trend,
        "sleepTimes": sleep_times,
        "taskCompletion": task_completion,
        "summary": {
            "avgSleep": round(avg_sleep, 2),
            "avgMoodEmotion": "Good" if entries else "-",
            "avgMoodPhysical": "Fine" if entries else "-",  # Placeholder, not used
        },
        "weekRange": {
            "start": str(monday),
            "end": str(sunday)
        }
    }
