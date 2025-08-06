"""Text embedding helpers using the OpenAI API."""

from __future__ import annotations

import os
from typing import List

import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
MODEL = "text-embedding-3-small"


def embed(text: str) -> List[float]:
    """Return an embedding vector for ``text``."""
    res = openai.Embedding.create(model=MODEL, input=text)
    return res["data"][0]["embedding"]
