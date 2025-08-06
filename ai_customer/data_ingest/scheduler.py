"""Scheduler for periodic data collection jobs."""

from __future__ import annotations

import asyncio
from typing import Iterable

from apscheduler.schedulers.asyncio import AsyncIOScheduler

from .facebook_posts import collect_facebook_posts
from .google_reviews import collect_google_reviews
from .yelp_reviews import collect_yelp_reviews


async def _run_google(place_ids: Iterable[str]):
    await collect_google_reviews(place_ids)


async def _run_yelp(business_ids: Iterable[str]):
    await collect_yelp_reviews(business_ids)


async def _run_facebook(page_ids: Iterable[str]):
    await collect_facebook_posts(page_ids)


def run_scheduler() -> None:
    scheduler = AsyncIOScheduler()
    scheduler.add_job(lambda: asyncio.create_task(_run_google([])), "interval", days=1)
    scheduler.add_job(lambda: asyncio.create_task(_run_yelp([])), "interval", days=1)
    scheduler.add_job(lambda: asyncio.create_task(_run_facebook([])), "interval", days=1)
    scheduler.start()
    asyncio.get_event_loop().run_forever()


if __name__ == "__main__":  # pragma: no cover
    run_scheduler()
