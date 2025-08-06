"""Aspect-based sentiment analysis via zero-shot classification."""

from __future__ import annotations

from typing import Dict, List

from transformers import pipeline

ASPECTS: List[str] = ["service", "price", "staff", "speed", "quality"]
_classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")


def extract_aspects(text: str) -> Dict[str, float]:
    """Return aspect scores for a piece of text."""
    result = _classifier(text, ASPECTS)
    return {label: float(score) for label, score in zip(result["labels"], result["scores"])}
