"""Generate answers using retrieved context and OpenAI GPT models."""

from __future__ import annotations

import os

import openai
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
MODEL = "gpt-4o-mini"

PROMPT_TEMPLATE = (
    "You are an AI customer. Using the following context from {mode} data, answer the question.\n"
    "Context:\n{context}\n\nQuestion: {question}\nAnswer in 2-3 sentences and finish with a numeric impact suggestion."
)


def generate_answer(mode: str, question: str, context: str) -> str:
    prompt = PROMPT_TEMPLATE.format(mode=mode, question=question, context=context)
    res = openai.ChatCompletion.create(model=MODEL, messages=[{"role": "user", "content": prompt}])
    return res["choices"][0]["message"]["content"]
