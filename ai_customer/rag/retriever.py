"""Wrapper around ChromaDB for document retrieval."""

from __future__ import annotations

import os
from typing import List

import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv

load_dotenv()

client = chromadb.PersistentClient(path=os.getenv("CHROMA_PATH", "chroma_db"))
openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.getenv("OPENAI_API_KEY"), model_name="text-embedding-3-small"
)

my_collection = client.get_or_create_collection("my_customer", embedding_function=openai_ef)
market_collection = client.get_or_create_collection(
    "market_customer", embedding_function=openai_ef
)


def add_to_collection(collection_name: str, docs: List[str], metadatas: List[dict], ids: List[str]) -> None:
    collection = client.get_collection(collection_name)
    collection.add(documents=docs, metadatas=metadatas, ids=ids)


def query_collection(collection_name: str, text: str, k: int = 5) -> List[str]:
    collection = client.get_collection(collection_name)
    results = collection.query(query_texts=[text], n_results=k)
    return results["documents"][0]
