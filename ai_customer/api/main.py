"""FastAPI entrypoint for the AI Customer service."""

from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import ChatRequest, ChatResponse
from ..rag.service import answer_question

app = FastAPI(title="AI Customer")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"]
)


@app.post("/analysis/chat", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    answer = answer_question(req.mode, req.question)
    return ChatResponse(answer=answer)


if __name__ == "__main__":  # pragma: no cover
    import uvicorn

    uvicorn.run("ai_customer.api.main:app", host="0.0.0.0", port=8000, reload=True)
