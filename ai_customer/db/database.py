"""Database helper functions using SQLAlchemy."""

from __future__ import annotations

import os
from typing import Dict, Iterable

from sqlalchemy import JSON, TIMESTAMP, Column, Integer, MetaData, String, Table, create_engine, insert, select
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.engine import Engine
from sqlalchemy.sql import text


def get_engine() -> Engine:
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_KEY")
    if not url or not key:
        raise RuntimeError("SUPABASE_URL or SUPABASE_SERVICE_KEY missing")
    host = url.replace("https://", "")
    return create_engine(f"postgresql://postgres:{key}@{host}:5432/postgres", pool_pre_ping=True)


engine = get_engine()
metadata = MetaData()

reviews = Table(
    "reviews",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("source", String),
    Column("source_id", String),
    Column("author", String),
    Column("text", String),
    Column("rating", Integer),
    Column("created_at", TIMESTAMP),
    Column("raw_json", JSONB),
)

social_posts = Table(
    "social_posts",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("platform", String),
    Column("post_id", String),
    Column("author", String),
    Column("text", String),
    Column("created_at", TIMESTAMP),
    Column("raw_json", JSONB),
)

processed_entries = Table(
    "processed_entries",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("source_table", String),
    Column("source_row_id", Integer),
    Column("sentiment", String),
    Column("aspects", JSON),
    Column("embedding", String),  # stored as text for simplicity
    Column("processed_at", TIMESTAMP, server_default=text("now()")),
)


metadata.create_all(engine)


def insert_review(data: Dict) -> None:
    with engine.begin() as conn:
        conn.execute(insert(reviews).values(
            source=data["source"],
            source_id=data["sid"],
            author=data.get("author"),
            text=data.get("text"),
            rating=data.get("rating"),
            created_at=data.get("created"),
            raw_json=data.get("raw"),
        ))


def insert_social_post(data: Dict) -> None:
    with engine.begin() as conn:
        conn.execute(insert(social_posts).values(
            platform=data["platform"],
            post_id=data.get("post_id"),
            author=data.get("author"),
            text=data.get("text"),
            created_at=data.get("created"),
            raw_json=data.get("raw"),
        ))


def insert_processed_entry(data: Dict) -> None:
    with engine.begin() as conn:
        conn.execute(insert(processed_entries).values(
            source_table=data["source_table"],
            source_row_id=data["source_row_id"],
            sentiment=data.get("sentiment"),
            aspects=data.get("aspects"),
            embedding=data.get("embedding"),
        ))


def fetch_unprocessed_reviews(limit: int = 100) -> Iterable[Dict]:
    query = select(reviews.c.id, reviews.c.text).where(~reviews.c.id.in_(
        select(processed_entries.c.source_row_id).where(processed_entries.c.source_table == "reviews")
    )).limit(limit)
    with engine.begin() as conn:
        for row in conn.execute(query):
            yield {"id": row.id, "text": row.text}
