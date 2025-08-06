"""Utilities for fetching Google reviews using the Outscraper API."""

from __future__ import annotations

import asyncio
import os
from typing import Dict, Iterable, List

import aiohttp
from dotenv import load_dotenv

from ..db.database import insert_review

load_dotenv()

OUTSCRAPER_KEY = os.getenv("OUTSCRAPER_API_KEY")
BASE_URL = "https://api.app.outscraper.com/maps/reviews-v3"


async def _fetch_reviews(session: aiohttp.ClientSession, place_id: str) -> List[Dict]:
    """Fetch reviews for a single Google Place ID.

    Parameters
    ----------
    session:
        Shared :class:`aiohttp.ClientSession`.
    place_id:
        Google Place ID to retrieve reviews for.
    """
    params = {"place_id": place_id, "limit": 100}
    headers = {"X-API-KEY": OUTSCRAPER_KEY or ""}
    async with session.get(BASE_URL, params=params, headers=headers) as resp:
        resp.raise_for_status()
        payload = await resp.json()
        return payload.get("data", [])


def _transform(review: Dict) -> Dict:
    """Normalize Outscraper review payload to database structure."""
    return {
        "source": "google",
        "sid": review.get("review_id"),
        "author": review.get("author_title"),
        "text": review.get("review_text"),
        "rating": review.get("review_rating"),
        "created": review.get("review_datetime_utc"),
        "raw": review,
    }


async def collect_google_reviews(place_ids: Iterable[str]) -> None:
    """Fetch reviews for multiple place IDs and insert them into the database."""
    if OUTSCRAPER_KEY is None:
        raise RuntimeError("OUTSCRAPER_API_KEY is not set")

    async with aiohttp.ClientSession() as session:
        tasks = [_fetch_reviews(session, pid) for pid in place_ids]
        results = await asyncio.gather(*tasks)

    for payload in results:
        for review in payload:
            insert_review(_transform(review))


if __name__ == "__main__":  # pragma: no cover - manual run
    asyncio.run(collect_google_reviews([]))
