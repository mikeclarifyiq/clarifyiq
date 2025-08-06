"""Processing pipeline for sentiment, aspect extraction and embeddings."""

from __future__ import annotations

import json
from typing import Dict, Iterable

from ..db.database import fetch_unprocessed_reviews, insert_processed_entry
from .absa import extract_aspects
from .embed import embed
from .sentiment import sentiment_score


BATCH_SIZE = 100


def process_reviews(batch_size: int = BATCH_SIZE) -> None:
    """Process unprocessed reviews and store results."""
    rows: Iterable[Dict] = fetch_unprocessed_reviews(limit=batch_size)
    for row in rows:
        text = row["text"]
        sent = sentiment_score(text)
        aspects = extract_aspects(text)
        emb = embed(text)
        insert_processed_entry(
            {
                "source_table": "reviews",
                "source_row_id": row["id"],
                "sentiment": sent,
                "aspects": json.dumps(aspects),
                "embedding": json.dumps(emb),
            }
        )


if __name__ == "__main__":  # pragma: no cover
    process_reviews()
