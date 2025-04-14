from sqlalchemy import Table, Column, Integer, String, Date, MetaData, UniqueConstraint
from app.db import metadata

# Journal Table
journal = Table(
    "journal",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", String),
    Column("date", Date),
    Column("gratitude", String),
    Column("mood_emotion", String),
    Column("mood_physical", String),
    Column("self_care", String),
    Column("notes", String),
    Column("wake_up_time", String),
    Column("sleep_time", String),
    Column("water_intake", String),
    Column("task", String),
    Column("task_status", String),
    UniqueConstraint("user_id", "date", name="unique_user_date")
)

# Weekly Reflection Table
weekly_reflection = Table(
    "weekly_reflection",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", String),  # Firebase UID
    Column("date", Date),
    Column("best_moment", String),
    Column("proud_of", String),
    Column("challenges", String),
    Column("lessons", String),
    Column("next_week_goal", String),
)
