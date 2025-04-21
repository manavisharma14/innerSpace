from fastapi import APIRouter, Query
from app.db import database
from app.models import journal
from datetime import datetime, timedelta
from sqlalchemy import select, cast, Date
from collections import Counter

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
    monday = today - timedelta(days=today.weekday()) + timedelta(weeks=offset_weeks)
    sunday = monday + timedelta(days=6)

    query = select(journal).where(
        (journal.c.user_id == user_id) &
        (cast(journal.c.date, Date) >= monday) &
        (cast(journal.c.date, Date) <= sunday)
    )

    entries = await database.fetch_all(query)

    # Mood trends
    mood_emotion_trend = [
        {"date": entry["date"], "moodScore": MOOD_SCORE_MAP.get(entry["mood_emotion"], 5)}
        for entry in entries
        if entry["mood_emotion"]
    ]
    mood_physical_trend = [
        {"date": entry["date"], "moodScore": MOOD_SCORE_MAP.get(entry["mood_physical"], 5)}
        for entry in entries
        if entry["mood_physical"]
    ]

    # Wake & sleep time parsing
    sleep_times = []
    for entry in entries:
        try:
            wake_hour = int(entry["wake_up_time"].split(":")[0])
            sleep_hour = int(entry["sleep_time"].split(":")[0])
            sleep_duration = (sleep_hour - wake_hour) % 24
            sleep_times.append({
                "date": entry["date"],
                "wakeUpTime": wake_hour,
                "sleepTime": sleep_hour,
                "sleepDuration": sleep_duration
            })
        except Exception:
            sleep_times.append({
                "date": entry["date"],
                "wakeUpTime": 0,
                "sleepTime": 0,
                "sleepDuration": 0
            })

    # Task Completion
    status_count = Counter(entry["task_status"] if entry["task_status"] else "maybe" for entry in entries)
    task_completion = [{"status": k, "value": v} for k, v in status_count.items()]

    # Summary stats
    valid_sleep_durations = [s["sleepDuration"] for s in sleep_times if s["sleepDuration"] > 0]
    avg_sleep = round(sum(valid_sleep_durations) / len(valid_sleep_durations), 2) if valid_sleep_durations else 0

    all_emotion_moods = [entry["mood_emotion"] for entry in entries if entry["mood_emotion"]]
    all_physical_moods = [entry["mood_physical"] for entry in entries if entry["mood_physical"]]

    most_common_emotion = Counter(all_emotion_moods).most_common(1)
    most_common_physical = Counter(all_physical_moods).most_common(1)

    return {
        "moodEmotionTrend": mood_emotion_trend,
        "moodPhysicalTrend": mood_physical_trend,
        "sleepTimes": sleep_times,
        "taskCompletion": task_completion,
        "summary": {
            "avgSleep": avg_sleep,
            "avgMoodEmotion": most_common_emotion[0][0] if most_common_emotion else "-",
            "avgMoodPhysical": most_common_physical[0][0] if most_common_physical else "-",
        },
        "weekRange": {
            "start": str(monday),
            "end": str(sunday)
        }
    }
