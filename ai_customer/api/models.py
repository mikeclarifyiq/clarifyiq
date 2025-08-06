"""Pydantic models for API requests and responses."""

from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    mode: str = Field(pattern="^(my|market)$")
    question: str


class ChatResponse(BaseModel):
    answer: str
