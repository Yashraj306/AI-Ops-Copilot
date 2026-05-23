from fastapi import FastAPI # type: ignore
from app.api.routes.tasks import router as task_router
from app.api.routes.ai import router as ai_router
from app.db.database import engine, Base
from app.models.task import Task
from fastapi.middleware.cors import CORSMiddleware
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Ops Copilot")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
) 

app.include_router(task_router)
app.include_router(ai_router)
@app.get("/")
def home():
    return {"message": "AI Ops Copilot Running"}