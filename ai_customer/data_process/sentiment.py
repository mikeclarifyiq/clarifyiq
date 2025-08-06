"""Sentiment analysis helpers using VADER."""

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

_analyzer = SentimentIntensityAnalyzer()


def sentiment_score(text: str) -> float:
    """Return a compound sentiment score between -1 and 1."""
    return float(_analyzer.polarity_scores(text)["compound"])
