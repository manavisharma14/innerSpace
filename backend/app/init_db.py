from app.db import database

async def add_unique_constraint():
    try:
        await database.execute("""
            ALTER TABLE journal
            ADD CONSTRAINT journal_user_date_unique UNIQUE (user_id, date);
        """)
        print("✅ Unique constraint added on (user_id, date)")
    except Exception as e:
        print("⚠️ Could not add unique constraint (maybe it already exists):", e)
