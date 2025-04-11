from sqlalchemy import Column, Table, Integer, String, Date
from app.db import metadata

journal = Table(
    "journal",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", String),
    Column("date", Date),
    Column("gratitude", String),  # <--- FIXED typo here
    Column("mood", String),
    Column("self_care", String),
    Column("notes", String),
)
