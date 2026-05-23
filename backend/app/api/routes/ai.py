from fastapi import APIRouter # type: ignore

from app.schemas.ai_schema import AIRequest
from app.services.ai_service import analyze_task

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)

@router.post("/analyze")
def analyze(data: AIRequest):

    result = analyze_task(data.task)

    return {
        "analysis": result
    }