"""High level service for answering questions via RAG."""

from __future__ import annotations

from .retriever import query_collection
from .generator import generate_answer


COLLECTION_MAP = {"my": "my_customer", "market": "market_customer"}


def answer_question(mode: str, question: str) -> str:
    collection_name = COLLECTION_MAP.get(mode, "my_customer")
    docs = query_collection(collection_name, question)
    context = "\n".join(docs)
    return generate_answer(mode, question, context)
