"""Fetch Yelp reviews using the Yelp Fusion API."""

from __future__ import annotations

import asyncio
import os
from typing import Dict, Iterable, List

import aiohttp
from dotenv import load_dotenv

from ..db.database import insert_review

load_dotenv()
YELP_API_KEY = os.getenv("YELP_API_KEY")
BASE_URL = "https://api.yelp.com/v3/businesses/{id}/reviews"


async def _fetch_reviews(session: aiohttp.ClientSession, business_id: str) -> List[Dict]:
    headers = {"Authorization": f"Bearer {YELP_API_KEY}"}
    async with session.get(BASE_URL.format(id=business_id), headers=headers) as resp:
        resp.raise_for_status()
        data = await resp.json()
        return data.get("reviews", [])


def _transform(review: Dict) -> Dict:
    return {
        "source": "yelp",
        "sid": review.get("id"),
        "author": review.get("user", {}).get("name"),
        "text": review.get("text"),
        "rating": review.get("rating"),
        "created": review.get("time_created"),
        "raw": review,
    }


async def collect_yelp_reviews(business_ids: Iterable[str]) -> None:
    if YELP_API_KEY is None:
        raise RuntimeError("YELP_API_KEY is not set")

    async with aiohttp.ClientSession() as session:
        tasks = [_fetch_reviews(session, bid) for bid in business_ids]
        results = await asyncio.gather(*tasks)

    for payload in results:
        for review in payload:
            insert_review(_transform(review))


if __name__ == "__main__":  # pragma: no cover
    asyncio.run(collect_yelp_reviews([]))
