from fastapi import APIRouter, Depends # type: ignore
from sqlalchemy.orm import Session

from app.schemas.task_schema import TaskCreate
from app.services.task_service import create_task, get_all_tasks
from app.db.deps import get_db

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.get("/")
def fetch_tasks(db: Session = Depends(get_db)):
    return get_all_tasks(db)

@router.post("/")
def add_task(task: TaskCreate, db: Session = Depends(get_db)):
    return create_task(db, task)