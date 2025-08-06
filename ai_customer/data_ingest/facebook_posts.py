"""Fetch public Facebook posts for a given page using the Graph API."""

from __future__ import annotations

import asyncio
import os
from typing import Dict, Iterable, List

import aiohttp
from dotenv import load_dotenv

from ..db.database import insert_social_post

load_dotenv()
APP_ID = os.getenv("FACEBOOK_APP_ID")
APP_SECRET = os.getenv("FACEBOOK_APP_SECRET")
ACCESS_TOKEN = f"{APP_ID}|{APP_SECRET}" if APP_ID and APP_SECRET else None
BASE_URL = "https://graph.facebook.com/v19.0/{page_id}/posts"


async def _fetch_posts(session: aiohttp.ClientSession, page_id: str) -> List[Dict]:
    params = {"access_token": ACCESS_TOKEN, "limit": 100}
    async with session.get(BASE_URL.format(page_id=page_id), params=params) as resp:
        resp.raise_for_status()
        data = await resp.json()
        return data.get("data", [])


def _transform(post: Dict) -> Dict:
    return {
        "platform": "facebook",
        "post_id": post.get("id"),
        "author": None,
        "text": post.get("message"),
        "created": post.get("created_time"),
        "raw": post,
    }


async def collect_facebook_posts(page_ids: Iterable[str]) -> None:
    if ACCESS_TOKEN is None:
        raise RuntimeError("FACEBOOK_APP_ID and FACEBOOK_APP_SECRET must be set")

    async with aiohttp.ClientSession() as session:
        tasks = [_fetch_posts(session, pid) for pid in page_ids]
        results = await asyncio.gather(*tasks)

    for payload in results:
        for post in payload:
            insert_social_post(_transform(post))


if __name__ == "__main__":  # pragma: no cover
    asyncio.run(collect_facebook_posts([]))
