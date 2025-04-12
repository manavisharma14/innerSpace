from sqlalchemy import Column, Table, Integer, String, Date
from app.db import metadata

journal = Table(
    "journal",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", String),
    Column("date", Date),
    Column("gratitude", String),
    Column("mood", String),
    Column("self_care", String),
    Column("notes", String),
    Column("wake_up_time", String),     # new
    Column("sleep_time", String),       # new
    Column("water_intake", String),     # new
    Column("task", String),             # new
    Column("task_status", String),      # new
)
